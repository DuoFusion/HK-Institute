import { Empty, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { Search } from "react-feather";
import { Badge, Card, Col, Input, InputGroup, InputGroupText } from "reactstrap";
import { Image } from "../../CoreComponents/Image";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { setChatSearchData, setSelectUser, setUserLatestMessage, setUserUnreadCount } from "../../ReduxToolkit/Slice/ChatSlice";
import { dynamicImage } from "../../Utils";
import { FormatTime } from "../../Utils/DateFormatted";
import socket from "../../socket";

const Sidebar = () => {
  const [isAllStudents, setAllStudents] = useState([]);

  const dispatch = useAppDispatch();

  // const { allStudents } = useAppSelector((state) => state.students);
  const { user } = useAppSelector((state) => state.auth);
  const { selectedUser, userUnreadCounts, userLatestMessages, isChatSearchData } = useAppSelector((state) => state.chat);

  const currentUserId = user?.user?._id;

  const changeUserClick = useCallback(
    (selectUser: any) => {
      // Instantly clear unread count for this user
      dispatch(setUserUnreadCount({ userId: selectUser._id, count: 0 }));
      dispatch(setSelectUser(selectUser));

      // Optionally, notify the server that messages are seen
      if (currentUserId && selectUser._id) {
        socket.emit("mark_seen", { senderId: selectUser._id, receiverId: currentUserId });
      }

      // chatContainerRef.current?.scrollTo({
      //   top: chatContainerRef.current.scrollHeight,
      //   behavior: "smooth",
      // });
      const handleUnread = ({ senderId, count }: { senderId: string; count: number }) => {
        dispatch(setUserUnreadCount({ userId: senderId, count: 0 }));
      };

      socket.emit("get_unread_users", { userId: currentUserId });
      socket.on("unread_users_list", (userList) => {
        setAllStudents(userList);
      });

      // dispatch(setUserUnreadCount({ userId: selectUser._id, count: 0 })); // This line is removed as per the new_code
      return () => {
        socket.off("unread_count", handleUnread);
      };
    },
    [dispatch, currentUserId]
  );

  useEffect(() => {
    if (currentUserId) {
      socket.emit("join", currentUserId);
      socket.emit("get_unread_users", { userId: currentUserId });
    }
  }, [currentUserId]);

  useEffect(() => {
    socket.emit("get_unread_users", { userId: currentUserId });
    socket.on("unread_users_list", (userList) => {
      setAllStudents(userList);
    });
    if (isChatSearchData !== null) {
      socket.emit("search_users", { senderId: currentUserId, search: isChatSearchData !== "" && isChatSearchData });
      socket.on("search_users_result", (userList) => {
        setAllStudents(userList);
      });
    }

    socket.emit("get_unread_count", { receiverId: currentUserId });
    const handleUnread = ({ senderId, count }: { senderId: string; count: number }) => {
      dispatch(setUserUnreadCount({ userId: senderId, count: count + 1 }));
    };

    // Get latest messages for all users
    // if (currentUserId && allStudents?.user_data) {
    //   allStudents?.user_data
    //     .filter((x: any) => x._id !== currentUserId)
    //     .forEach((user: any) => {
    //       socket.emit("get_latest_message", {
    //         senderId: user._id,
    //         receiverId: currentUserId,
    //       });
    //     });
    // }

    socket.on("latest_message_response", ({ senderId, message }) => {
      if (message) {
        dispatch(setUserLatestMessage({ userId: senderId, message }));
      }
    });

    socket.on("receive_message", (message: any) => {
      // Update unread count when new message arrives
      if (message.senderId && message.senderId !== currentUserId) {
        const senderId = typeof message.senderId === "string" ? message.senderId : message.senderId._id;
        const currentCount = userUnreadCounts[senderId] || 0;
        dispatch(setUserUnreadCount({ userId: senderId, count: currentCount + 1 }));

        // Update latest message
        dispatch(setUserLatestMessage({ userId: senderId, message }));
      }
    });

    return () => {
      socket.off("unread_count", handleUnread);
      socket.off("latest_message_response");
      socket.off("receive_message");
    };
  }, [dispatch, currentUserId, userUnreadCounts, isChatSearchData]);

  useEffect(() => {
    if (currentUserId) {
      socket.emit("get_unread_users", { userId: currentUserId });

      const handleUnreadUsers = (userList) => {
        setAllStudents(userList);

        // Update unread counts in Redux
        userList.forEach((user) => {
          dispatch(setUserUnreadCount({ userId: user.userId || user._id, count: user.unreadCount || 0 }));
        });
      };

      socket.on("unread_users_list", handleUnreadUsers);

      return () => {
        socket.off("unread_users_list", handleUnreadUsers);
      };
    }
  }, [currentUserId, dispatch]);

  return (
    <Col xxl="3" xl="4" md="5" className="box-col-5">
      <Card className="left-sidebar-wrapper">
        <div className="left-sidebar-chat">
          <InputGroup>
            <InputGroupText>
              <Search className="search-icon text-gray" />
            </InputGroupText>
            <Input type="text" placeholder="Search here..." onChange={(e) => dispatch(setChatSearchData(e.target.value))} />
          </InputGroup>
        </div>

        <div className="advance-options">
          <div className="common-space">
            <p>Students Chats</p>
          </div>

          {isAllStudents?.length > 0 ? (
            <ul className="chats-user custom-scrollbar">
              {isAllStudents
                .slice()
                .sort((a, b) => {
                  const aUnread = userUnreadCounts[a._id] > 0 ? 1 : 0;
                  const bUnread = userUnreadCounts[b._id] > 0 ? 1 : 0;
                  if (aUnread !== bUnread) return bUnread - aUnread;
                  const aTime = userLatestMessages[a._id]?.createdAt || 0;
                  const bTime = userLatestMessages[b._id]?.createdAt || 0;
                  return new Date(bTime).getTime() - new Date(aTime).getTime();
                })
                .map((item) => (
                  <li key={item._id} className={`common-space ${selectedUser?._id === item._id ? "active" : ""}`} onClick={() => changeUserClick(item)}>
                    <div className="chat-time">
                      <div className="chat-time">
                        <div className="active-profile">
                          <Image className="img-fluid rounded-circle" src={item?.image || dynamicImage("user/user.png")} alt="user" />
                        </div>
                        <div>
                          <span>{item.name}</span>
                          <p>{item.lastMessage ? (item.lastMessage.length > 30 ? `${item.lastMessage.substring(0, 30)}...` : item.lastMessage) : "Click to start chatting..."}</p>
                        </div>
                      </div>
                      <div>
                        {item.lastMessageTime && <p>{FormatTime(item.lastMessageTime)}</p>}
                        {item.unreadCount > 0 && <Badge color="success">{item.unreadCount}</Badge>}
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          ) : (
            <div className="d-flex justify-content-center align-items-center py-5">
              <Empty description={<Typography.Text type="secondary">No students found</Typography.Text>} />
            </div>
          )}
        </div>
      </Card>
    </Col>
  );
};

export default Sidebar;
