import { useState, useEffect, useCallback } from 'react';

const INITIAL_CHATS = [
  {
    id: 1,
    name: "Alex Wanderer",
    username: "@alex_travels",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    lastMessage: "That view looks incredible! 🏔️",
    timestamp: "2m ago",
    unread: 2,
    isOnline: true,
    messages: [
      { id: 1, text: "Hey! Saw your latest reel.", sender: "them", time: "10:30 AM" },
      { id: 2, text: "That view looks incredible! 🏔️", sender: "them", time: "10:32 AM" }
    ]
  },
  {
    id: 2,
    name: "Sarah Hikes",
    username: "@sarah_hikes",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    lastMessage: "When are you visiting Bali?",
    timestamp: "1h ago",
    unread: 0,
    isOnline: false,
    messages: [
        { id: 1, text: "When are you visiting Bali?", sender: "them", time: "9:15 AM" }
    ]
  },
  {
    id: 3,
    name: "Mike Lens",
    username: "@mike_lens",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
    lastMessage: "Thanks for the tips!",
    timestamp: "3h ago",
    unread: 0,
    isOnline: true,
    messages: [
        { id: 1, text: "Thanks for the tips!", sender: "them", time: "Yesterday" }
    ]
  }
];

export function useChat() {
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const activeChat = chats.find(c => c.id === activeChatId);

  const sendMessage = useCallback((text) => {
    if (!activeChatId || !text.trim()) return;

    const newMessage = {
      id: Date.now(),
      text,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update UI immediately
    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: text,
          timestamp: "Just now"
        };
      }
      return chat;
    }));

    // Simulate Reply
    setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
            const replyMessage = {
                id: Date.now() + 1,
                text: "That sounds awesome! Let's plan something soon. 🔥",
                sender: "them",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setChats(prev => prev.map(chat => {
                if (chat.id === activeChatId) {
                    return {
                        ...chat,
                        messages: [...chat.messages, replyMessage],
                        lastMessage: replyMessage.text,
                        timestamp: "Just now"
                    };
                }
                return chat;
            }));
            setIsTyping(false);
        }, 2000); // Typing duration
    }, 1000); // Delay before typing starts

  }, [activeChatId]);

  const markAsRead = (chatId) => {
      setChats(prev => prev.map(c => c.id === chatId ? { ...c, unread: 0 } : c));
  };

  return {
    chats,
    activeChat,
    activeChatId,
    setActiveChatId,
    sendMessage,
    isTyping,
    markAsRead
  };
}
