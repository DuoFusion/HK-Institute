import React, { useEffect, useRef } from 'react';
import { notification } from 'antd';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../ReduxToolkit/Hooks';
import { setUserUnreadCount, setUserLatestMessage } from '../ReduxToolkit/Slice/ChatSlice';
import { AntdNotification } from '../Utils/toast/toastNotification';
import socket from '../socket';

const ToastNotification: React.FC = () => {
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const location = useLocation();
  
  const { user } = useAppSelector((state) => state.auth);
  const { userUnreadCounts } = useAppSelector((state) => state.chat);
  
  const currentUserId = user?.user?._id;
  const isOnChatsPage = location.pathname === '/chats';

  // Play notification sound
  const playNotificationSound = () => {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {
          // Fallback: create a simple beep sound
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.1);
        });
      }
    } catch (error) {
      console.log('Audio playback failed:', error);
    }
  };

  // Join user to personal room and other rooms ONLY when on chats page
  const joinRooms = () => {
    if (!currentUserId || !isOnChatsPage) return;

    // Join personal room
    socket.emit("join", currentUserId);
    
    // Join admin room (if user is admin)
    socket.emit("join_admin_room", { userId: currentUserId });
    
    // Join general chat room
    socket.emit("join_room", { 
      roomId: "general", 
      userId: currentUserId,
      userName: user?.user?.firstName || user?.user?.name || "User"
    });
    
    // Join support room (if needed)
    socket.emit("join_room", { 
      roomId: "support", 
      userId: currentUserId,
      userName: user?.user?.firstName || user?.user?.name || "User"
    });

    console.log("Joined rooms for user:", currentUserId, "on chats page");
  };

  // Leave rooms when leaving chats page or component unmounts
  const leaveRooms = () => {
    if (!currentUserId) return;

    socket.emit("leave", currentUserId);
    socket.emit("leave_room", { roomId: "general", userId: currentUserId });
    socket.emit("leave_room", { roomId: "support", userId: currentUserId });
    
    console.log("Left rooms for user:", currentUserId);
  };

  // Join rooms when entering chats page
  useEffect(() => {
    if (isOnChatsPage && currentUserId) {
      joinRooms();
    }
  }, [isOnChatsPage, currentUserId]);

  // Leave rooms when leaving chats page
  useEffect(() => {
    if (!isOnChatsPage && currentUserId) {
      leaveRooms();
    }
  }, [isOnChatsPage, currentUserId]);

  useEffect(() => {
    if (!currentUserId) return;

    // Handle new messages - this is the key for live updates
    const handleReceiveMessage = (message: any) => {
      if (message.senderId && message.senderId !== currentUserId) {
        const senderId = typeof message.senderId === "string" ? message.senderId : message.senderId._id;
        
        if (senderId) {
          // Update unread count for this sender
          const currentCount = userUnreadCounts[senderId] || 0;
          dispatch(setUserUnreadCount({ userId: senderId, count: currentCount + 1 }));

          // Update latest message
          dispatch(setUserLatestMessage({ userId: senderId, message }));

          // Play notification sound
          playNotificationSound();

          // Show toast notification using the utility function
          const messageText = message.senderName || 'Someone';
          const descriptionText = message.message || 'You have a new message';
          
          AntdNotification(
            notification, 
            'success', 
            `New Message from ${messageText}`,
            descriptionText
          );
        }
      }
    };

    // Handle room messages (only when on chats page)
    const handleRoomMessage = (data: any) => {
      if (!isOnChatsPage) return; // Only handle room messages on chats page
      
      const { roomId, message, senderName, senderId } = data;
      
      if (senderId !== currentUserId) {
        // Play notification sound
        playNotificationSound();

        // Show room message notification
        AntdNotification(
          notification, 
          'info', 
          `🏠 ${roomId.toUpperCase()} Room: ${senderName}`,
          message
        );
      }
    };

    // Handle room join confirmation
    const handleRoomJoined = (data: any) => {
      if (!isOnChatsPage) return; // Only show on chats page
      
      console.log("Successfully joined room:", data.roomId);
      AntdNotification(
        notification, 
        'success', 
        `✅ Joined Room`,
        `Successfully joined ${data.roomId} room`
      );
    };

    // Handle room leave confirmation
    const handleRoomLeft = (data: any) => {
      console.log("Left room:", data.roomId);
    };

    // Handle messages seen confirmation
    const handleMessagesSeen = ({ senderId }: { senderId: string }) => {
      // Update unread count to 0 for the user whose messages were seen
      dispatch(setUserUnreadCount({ userId: senderId, count: 0 }));
    };

    // Handle individual unread count updates
    const handleUnreadCount = ({ senderId, count }: { senderId: string; count: number }) => {
      if (senderId) {
        dispatch(setUserUnreadCount({ userId: senderId, count }));
      }
    };

    // Handle user joined room notification (only when on chats page)
    const handleUserJoinedRoom = (data: any) => {
      if (!isOnChatsPage) return; // Only show on chats page
      
      if (data.userId !== currentUserId) {
        AntdNotification(
          notification, 
          'info', 
          `👋 User Joined`,
          `${data.userName} joined ${data.roomId} room`
        );
      }
    };

    // Handle user left room notification (only when on chats page)
    const handleUserLeftRoom = (data: any) => {
      if (!isOnChatsPage) return; // Only show on chats page
      
      if (data.userId !== currentUserId) {
        AntdNotification(
          notification, 
          'info', 
          `👋 User Left`,
          `${data.userName} left ${data.roomId} room`
        );
      }
    };

    // Set up event listeners
    socket.on("receive_message", handleReceiveMessage);
    socket.on("room_message", handleRoomMessage);
    socket.on("room_joined", handleRoomJoined);
    socket.on("room_left", handleRoomLeft);
    socket.on("user_joined_room", handleUserJoinedRoom);
    socket.on("user_left_room", handleUserLeftRoom);
    socket.on("messages_seen", handleMessagesSeen);
    socket.on("unread_count", handleUnreadCount);

    // Cleanup event listeners and leave rooms
    return () => {
      if (isOnChatsPage) {
        leaveRooms();
      }
      socket.off("receive_message", handleReceiveMessage);
      socket.off("room_message", handleRoomMessage);
      socket.off("room_joined", handleRoomJoined);
      socket.off("room_left", handleRoomLeft);
      socket.off("user_joined_room", handleUserJoinedRoom);
      socket.off("user_left_room", handleUserLeftRoom);
      socket.off("messages_seen", handleMessagesSeen);
      socket.off("unread_count", handleUnreadCount);
    };
  }, [dispatch, currentUserId, userUnreadCounts, user, isOnChatsPage]);

  return (
    <>
      {/* Hidden audio element for notification sounds */}
      <audio 
        ref={audioRef} 
        preload="auto"
        style={{ display: 'none' }}
      >
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT" type="audio/wav" />
      </audio>
    </>
  );
};

export default ToastNotification;
