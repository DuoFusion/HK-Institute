import { Empty, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { Badge, Card, Col } from "reactstrap";
import { Image } from "../../CoreComponents/Image";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { setSelectUser, setUserLatestMessage, setUserUnreadCount } from "../../ReduxToolkit/Slice/ChatSlice";
import { dynamicImage } from "../../Utils";
import { FormatTime } from "../../Utils/DateFormatted";
import socket from "../../socket";

const Sidebar = () => {
  const [isAllStudents, setAllStudents] = useState([]);

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { selectedUser, userUnreadCounts, userLatestMessages, isChatSearchData } = useAppSelector((state) => state.chat);

  const currentUserId = user?.user?._id;

  const changeUserClick = useCallback(
    (selectUser: any) => {
      // Instantly clear unread count for this user
      dispatch(setUserUnreadCount({ userId: selectUser._id, count: 0 }));
      dispatch(setSelectUser(selectUser));

      // Notify the server that messages are seen
      if (currentUserId && selectUser._id) {
        socket.emit("mark_seen", { senderId: selectUser._id, receiverId: currentUserId });
      }
    },
    [dispatch, currentUserId]
  );

  useEffect(() => {
    if (currentUserId) {
      socket.emit("join", currentUserId);
      socket.emit("get_admin", { senderId: currentUserId });
    }
  }, [currentUserId]);

  useEffect(() => {
    if (!currentUserId) return;

    // Handle admin users list
    const handleAdminUsers = (data: any) => {
      console.log("Admin users list:", data);
      if (data?.users && Array.isArray(data.users)) {
        setAllStudents(data.users);
        
        // Initialize unread counts for all users
        data.users.forEach((user: any) => {
          if (user._id && user._id !== currentUserId) {
            // Get unread count for each user
            socket.emit("get_unread_count", { 
              senderId: user._id, 
              receiverId: currentUserId 
            });
            
            // Get latest message for each user
            socket.emit("get_latest_message", {
              senderId: user._id,
              receiverId: currentUserId,
            });
          }
        });
      }
    };

    // Handle latest message responses
    const handleLatestMessage = ({ senderId, message }: { senderId: string; message: any }) => {
      if (message && senderId) {
        dispatch(setUserLatestMessage({ userId: senderId, message }));
      }
    };

    // Handle new messages - this is the key for live updates
    const handleReceiveMessage = (message: any) => {
      console.log("Received new message:", message);
      if (message.senderId && message.senderId !== currentUserId) {
        const senderId = typeof message.senderId === "string" ? message.senderId : message.senderId._id;
        
        if (senderId) {
          // Update unread count for this sender
          const currentCount = userUnreadCounts[senderId] || 0;
          dispatch(setUserUnreadCount({ userId: senderId, count: currentCount + 1 }));

          // Update latest message
          dispatch(setUserLatestMessage({ userId: senderId, message }));
        }
      }
    };

    // Handle messages seen confirmation
    const handleMessagesSeen = ({ senderId }: { senderId: string }) => {
      console.log("Messages marked as seen for:", senderId);
      // Update unread count to 0 for the user whose messages were seen
      dispatch(setUserUnreadCount({ userId: senderId, count: 0 }));
    };

    // Handle individual unread count updates
    const handleUnreadCount = ({ senderId, count }: { senderId: string; count: number }) => {
      console.log("Unread count update:", { senderId, count });
      if (senderId) {
        dispatch(setUserUnreadCount({ userId: senderId, count }));
      }
    };

    // Set up event listeners
    socket.on("get_admin_all", handleAdminUsers);
    socket.on("latest_message_response", handleLatestMessage);
    socket.on("receive_message", handleReceiveMessage);
    socket.on("messages_seen", handleMessagesSeen);
    socket.on("unread_count", handleUnreadCount);

    // Cleanup event listeners
    return () => {
      socket.off("get_admin_all", handleAdminUsers);
      socket.off("latest_message_response", handleLatestMessage);
      socket.off("receive_message", handleReceiveMessage);
      socket.off("messages_seen", handleMessagesSeen);
      socket.off("unread_count", handleUnreadCount);
    };
  }, [dispatch, currentUserId, userUnreadCounts]);

  // Refresh unread counts and latest messages periodically
  useEffect(() => {
    if (currentUserId && isAllStudents.length > 0) {
      const refreshData = () => {
        isAllStudents.forEach((user: any) => {
          if (user._id && user._id !== currentUserId) {
            // Refresh unread count
            socket.emit("get_unread_count", { 
              senderId: user._id, 
              receiverId: currentUserId 
            });
            
            // Refresh latest message
            socket.emit("get_latest_message", {
              senderId: user._id,
              receiverId: currentUserId,
            });
          }
        });
      };

      // Refresh every 30 seconds to keep counts updated
      const interval = setInterval(refreshData, 30000);
      
      return () => clearInterval(interval);
    }
  }, [currentUserId, isAllStudents]);

  return (
    <Col xxl="3" xl="4" md="5" className="box-col-5">
      <Card className="left-sidebar-wrapper">
        <div className="advance-options">
          <div className="common-space">
            <p>Admin Chats</p>
          </div>

          {isAllStudents?.length > 0 ? (
            <ul className="chats-user custom-scrollbar">
              {isAllStudents
                .slice()
                .sort((a, b) => {
                  // Sort by unread count first, then by latest message time
                  const aUnread = userUnreadCounts[a._id] || 0;
                  const bUnread = userUnreadCounts[b._id] || 0;
                  
                  if (aUnread !== bUnread) {
                    return bUnread - aUnread; // Higher unread count first
                  }
                  
                  // If unread counts are same, sort by latest message time
                  const aTime = userLatestMessages[a._id]?.createdAt || a.lastMessageTime || 0;
                  const bTime = userLatestMessages[b._id]?.createdAt || b.lastMessageTime || 0;
                  return new Date(bTime).getTime() - new Date(aTime).getTime();
                })
                .map((item) => {
                  const unreadCount = userUnreadCounts[item._id] || 0;
                  const latestMessage = userLatestMessages[item._id]?.message || item.lastMessage;
                  
                  return (
                    <li 
                      key={item._id} 
                      className={`common-space ${selectedUser?._id === item._id ? "active" : ""}`} 
                      onClick={() => changeUserClick(item)}
                    >
                      <div className="chat-time">
                        <div className="chat-time">
                          <div className="active-profile">
                            <Image 
                              className="img-fluid rounded-circle" 
                              src={item?.image || dynamicImage("user/user.png")} 
                              alt="user" 
                            />
                          </div>
                          <div>
                            <span>{item.name || item.firstName || item.lastName}</span>
                            <p>
                              {latestMessage 
                                ? (latestMessage.length > 30 
                                    ? `${latestMessage.substring(0, 30)}...` 
                                    : latestMessage)
                                : "Click to start chatting..."
                              }
                            </p>
                          </div>
                        </div>
                        <div>
                          {(userLatestMessages[item._id]?.createdAt || item.lastMessageTime) && (
                            <p>{FormatTime(userLatestMessages[item._id]?.createdAt || item.lastMessageTime)}</p>
                          )}
                          {unreadCount > 0 && (
                            <Badge color="success">{unreadCount}</Badge>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          ) : (
            <div className="d-flex justify-content-center align-items-center py-5">
              <Empty description={<Typography.Text type="secondary">No admin users found</Typography.Text>} />
            </div>
          )}
        </div>
      </Card>
    </Col>
  );
};

export default Sidebar;
