import { Dropdown, Empty, Typography } from "antd";
import { ArrowDown2 } from "iconsax-react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { IoCheckmarkDone } from "react-icons/io5";
import { Button, Card, Col, Form } from "reactstrap";
// import { Post } from "../../Api";
import { Url_Keys } from "../../Constant";
import { Image } from "../../CoreComponents/Image";
import SvgIcon from "../../CoreComponents/SvgIcon";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { addUserUnreadMessage, setSelectUser, setUserUnreadCount } from "../../ReduxToolkit/Slice/ChatSlice";
// import { fetchStudentsApiData } from "../../ReduxToolkit/Slice/StudentsSlice";
import socket from "../../socket";
import { Chat } from "../../Types/Chat";
import { dynamicImage } from "../../Utils";
import { FormatTime } from "../../Utils/DateFormatted";

const ChatWindow = () => {
  const [messageInput, setMessageInput] = useState("");
  const [editChatId, setEditChatId] = useState<string | null>(null);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [page, setPage] = useState(1);
  const [lastSeenTime, setLastSeenTime] = useState<number>(0);
  const limit = 20;

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { selectedUser, userUnreadCounts } = useAppSelector((state) => state.chat);
  
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.user?._id;
  const receiver = selectedUser?._id;

  const getAllStudents = useCallback(() => {
    // dispatch(fetchStudentsApiData({ blockFilter: "unblock" }));
  }, [dispatch]);

  // Helper function to mark messages as seen with throttling
  const markMessagesAsSeen = useCallback(() => {
    const now = Date.now();
    // Throttle to prevent too many calls (minimum 1 second between calls)
    if (now - lastSeenTime > 1000 && userId && receiver) {
      socket.emit("mark_seen", { senderId: receiver, receiverId: userId });
      setLastSeenTime(now);
    }
  }, [userId, receiver, lastSeenTime]);

  useEffect(() => {
    if (!userId) return;
    if (!socket.connected) socket.connect();

    socket.emit("join", userId);
    if (receiver) {
      socket.emit("set_active_chat", { userId, chatWith: receiver });
    }

    socket.on("receive_message", (msg: Chat) => {
      const senderId = typeof msg.senderId === "string" ? msg.senderId : msg.senderId?._id;
      if (senderId && senderId !== receiver) {
        const currentCount = userUnreadCounts[senderId] || 0;
        dispatch(setUserUnreadCount({ userId: senderId, count: currentCount + 1 }));
        dispatch(addUserUnreadMessage({ userId: senderId, message: msg }));
      }
      setChatList((prev) => [...prev, msg]);
      
      // Mark message as seen if it's from the current chat user
      if (senderId === receiver) {
        markMessagesAsSeen();
      }
    });

    socket.on("message_updated", (updated: Chat) => {
      setChatList((prev) => prev.map((msg) => (msg._id === updated._id ? updated : msg)));
    });

    socket.on("message_deleted", ({ messageId }) => {
      setChatList((prev) => prev.filter((msg) => msg._id !== messageId));
    });

    socket.on("conversation_deleted", ({ receiverId }) => {
      if (receiverId === receiver) setChatList([]);
    });

    socket.on("messages_seen", ({ receiverId }) => {
      setChatList((prev) =>
        prev.map((msg) => {
          // Mark messages as seen if they were sent by current user to the receiver
          const msgSenderId = typeof msg.senderId === "string" ? msg.senderId : msg.senderId?._id;
          if (msgSenderId === userId && (typeof msg.receiverId === "string" ? msg.receiverId : msg.receiverId?._id) === receiverId) {
            return { ...msg, seen: true };
          }
          return msg;
        })
      );
    });

    return () => {
      socket.emit("clear_active_chat", { userId });
      socket.off("receive_message");
      socket.off("message_updated");
      socket.off("message_deleted");
      socket.off("conversation_deleted");
      socket.off("messages_seen");
    };
  }, [userId, receiver, dispatch, userUnreadCounts]);

  useEffect(() => {
    setChatList([]);
    setEditChatId(null);
    setMessageInput("");
    setPage(1);

    if (userId && receiver) {
      socket.emit("get_all_chats", { senderId: userId, receiverId: receiver, page: 1, limit });
      socket.once("get_all_chats_response", (messages: Chat[]) => {
        setChatList(messages.reverse());
        markMessagesAsSeen();
      });
    }
  }, [selectedUser, userId, receiver]);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
      
      // Mark messages as seen when user scrolls to bottom
      const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
      if (isAtBottom) {
        markMessagesAsSeen();
      }
    }
  }, [chatList, userId, receiver]);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Load more messages when scrolling to top
      if (container.scrollTop === 0 && chatList.length >= limit * page) {
        const nextPage = page + 1;
        const prevHeight = container.scrollHeight;

        socket.emit("get_all_chats", {
          senderId: userId,
          receiverId: receiver,
          page: nextPage,
          limit,
        });

        socket.once("get_all_chats_response", (newChats: Chat[]) => {
          if (newChats.length > 0) {
            setChatList((prev) => [...newChats.reverse(), ...prev]);
            setTimeout(() => {
              const newHeight = container.scrollHeight;
              container.scrollTop = newHeight - prevHeight;
            }, 30);
            setPage(nextPage);
          }
        });
      }

      // Mark messages as seen when scrolling to bottom
      const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
      if (isAtBottom) {
        markMessagesAsSeen();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [chatList, page, userId, receiver]);

  useEffect(() => {
    getAllStudents();
  }, [getAllStudents]);

  // Mark messages as seen when user focuses on the chat window
  useEffect(() => {
    const handleFocus = () => {
      markMessagesAsSeen();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [markMessagesAsSeen]);

  const handleMessagePress = (e: FormEvent) => {
    e.preventDefault();
    const msg = messageInput.trim();
    if (!msg || !userId || !receiver) return;

    if (editChatId) {
      socket.emit("edit_message", { messageId: editChatId, newMessage: msg });
      setEditChatId(null);
    } else {
      const tempMessage: Chat = {
        _id: Date.now().toString(),
        senderId: { _id: userId, role: user?.user?.userType },
        receiverId: { _id: receiver, role: "user"},
        message: msg,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        seen: false,
        isDeleted: false,
      };
      setChatList((prev) => [...prev, tempMessage]);
      socket.emit("send_message", { senderId: userId, receiverId: receiver, message: msg });
      
      // Mark any unread messages from the receiver as seen when sending a message
      markMessagesAsSeen();
    }

    setMessageInput("");
  };

  const handleChatEdit = (msg: Chat) => {
    setMessageInput(msg.message);
    setEditChatId(msg._id);
  };

  const handleChatDelete = (id: string) => {
    socket.emit("delete_message", { messageId: id });
  };

  const handleAllChatDelete = () => {
    socket.emit("delete_conversation", { senderId: userId, receiverId: selectedUser?._id });
  };

  const handleBlockStudent = async () => {
    // const res = await Post(Url_Keys.Students.Edit, { id: selectedUser?._id, isBlocked: true });
    // if (res?.status === 200) {
    //   getAllStudents();
    //   dispatch(setSelectUser(null));
    // }
  };

  return (
    <Col xxl="9" xl="8" md="7" className="box-col-7">
      <Card className="right-sidebar-chat">
        {selectedUser ? (
          <>
            <div className="right-sidebar-title">
              <div className="common-space">
                <div className="chat-time">
                  <div className="active-profile">
                    <Image className="img-fluid rounded-circle" src={selectedUser.image || dynamicImage("user/user.png")} alt="user" />
                  </div>
                  <div>
                    <span>
                      {selectedUser.name}
                    </span>
                    <p> {selectedUser.lastMessage
                            ? selectedUser.lastMessage.length > 30
                              ? `${selectedUser.lastMessage.substring(0, 30)}...`
                              : selectedUser.lastMessage
                            : "Click to start chatting..."}</p>
                  </div>
                </div>
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "1",
                        label: (
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              handleBlockStudent();
                            }}
                          >
                            Block Student
                          </a>
                        ),
                      },
                      {
                        key: "2",
                        label: (
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              handleAllChatDelete();
                            }}
                          >
                            Delete All Chat
                          </a>
                        ),
                      },
                    ],
                  }}
                  trigger={["click"]}
                >
                  <div className="contact-edit chat-alert bg-light-primary">
                    <SvgIcon iconId="menubar" />
                  </div>
                </Dropdown>
              </div>
            </div>

            <div className="right-sidebar-Chats">
              <div className="msger px-2 pb-2">
                <div className="msger-chat" ref={chatContainerRef}>
                  {chatList.length > 0 ? (
                    chatList.map((item) => {
                      
                      const isCurrentUser = userId === (typeof item.senderId === "string" ? item.senderId : item.senderId?._id);
                      return (
                        <div key={item._id} className={`msg ${!isCurrentUser ? "right" : "pull-right left"}-msg`}>
                          <div className="msg-bubble mx-2">
                            <div className="msg-info d-flex justify-content-between align-items-center">
                              <div className="msg-info-name">{item.message}</div>
                              {isCurrentUser && (
                                <Dropdown
                                  menu={{
                                    items: [
                                      {
                                        key: "1",
                                        label: (
                                          <a
                                            onClick={(e) => {
                                              e.preventDefault();
                                              handleChatEdit(item);
                                            }}
                                          >
                                            Edit
                                          </a>
                                        ),
                                      },
                                      {
                                        key: "2",
                                        label: (
                                          <a
                                            onClick={(e) => {
                                              e.preventDefault();
                                              handleChatDelete(item._id);
                                            }}
                                          >
                                            Delete
                                          </a>
                                        ),
                                      },
                                    ],
                                  }}
                                  trigger={["click"]}
                                >
                                  <div className="msg-hover">
                                    <ArrowDown2 size="20" color="#000" />
                                  </div>
                                </Dropdown>
                              )}
                            </div>
                            <div className="msg-info-time text-end">
                              {FormatTime(item.createdAt)}
                              {isCurrentUser && <IoCheckmarkDone size={18} color={item.seen ? "#cca270" : "#000"} className="ms-2" />}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="d-flex justify-content-center align-items-center py-5">
                      <Empty description={<Typography.Text type="secondary">Start a conversation</Typography.Text>} />
                    </div>
                  )}
                </div>

                <Form className="msger-inputarea" onSubmit={handleMessagePress}>
                  <input className="msger-input" type="text" placeholder="Type Message..." value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
                  <Button color="primary" className="msger-send-btn" type="submit">
                    <i className="fa fa-location-arrow" />
                  </Button>
                </Form>
              </div>
            </div>
          </>
        ) : (
          <div className="no-user-selected d-flex justify-content-center align-items-center py-5">
            <Empty description={<Typography.Text type="secondary">No user selected</Typography.Text>} />
          </div>
        )}
      </Card>
    </Col>
  );
};

export default ChatWindow;
