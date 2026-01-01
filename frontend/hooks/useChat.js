import { useState, useEffect, useCallback, useRef } from 'react';
import api from '../utils/api';

export function useChat() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  
  const pollingInterval = useRef(null);

  // 1. Fetch current user profile to identify "me"
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get("/auth/profile");
        setCurrentUser(res.data);
      } catch (err) {
        console.error("Chat Profile Error:", err);
      }
    }
    fetchProfile();
  }, []);

  // 2. Fetch conversations
  const fetchConversations = useCallback(async () => {
    if (!currentUser) return;
    try {
      const res = await api.get("/chat/conversations");
      
      const transformedChats = res.data.map(conv => {
        const otherParticipant = conv.participants.find(p => p.id !== currentUser.id);
        const lastMsg = conv.messages[0];
        
        return {
          id: conv.id,
          name: otherParticipant?.name || "User " + otherParticipant?.id,
          username: "@" + (otherParticipant?.username || "user"),
          avatar: otherParticipant?.avatar,
          lastMessage: lastMsg?.text || "Started a conversation",
          timestamp: lastMsg ? new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "",
          unread: 0, // Simplified for now
          isOnline: true, // Simplified
        };
      });
      
      setChats(transformedChats);
      setLoading(false);
    } catch (err) {
      console.error("Fetch Conversations Error:", err);
    }
  }, [currentUser]);

  // 3. Fetch messages for active chat
  const fetchMessages = useCallback(async () => {
    if (!activeChatId) return;
    try {
      const res = await api.get(`/chat/messages/${activeChatId}`);
      const transformedMessages = res.data.map(msg => ({
        id: msg.id,
        text: msg.text,
        sender: msg.senderId === currentUser?.id ? "me" : "them",
        time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }));
      setMessages(transformedMessages);
    } catch (err) {
      console.error("Fetch Messages Error:", err);
    }
  }, [activeChatId, currentUser]);

  // Initial Load + Polling
  useEffect(() => {
    if (currentUser) {
      fetchConversations();
      
      pollingInterval.current = setInterval(() => {
        fetchConversations();
        if (activeChatId) fetchMessages();
      }, 3000); 
    }
    
    return () => clearInterval(pollingInterval.current);
  }, [currentUser, fetchConversations, activeChatId, fetchMessages]);

  // Message Sending
  const sendMessage = useCallback(async (text) => {
    if (!activeChatId || !text.trim()) return;

    try {
      const res = await api.post("/chat/messages", {
        text,
        conversationId: activeChatId
      });

      const newMessage = {
        id: res.data.id,
        text: res.data.text,
        sender: "me",
        time: "Just now"
      };

      setMessages(prev => [...prev, newMessage]);
      fetchConversations(); // Update sidebar immediately
    } catch (err) {
      console.error("Send Message Error:", err);
    }
  }, [activeChatId, fetchConversations]);

  const activeChat = chats.find(c => c.id === activeChatId) || {};
  // Overlay current active messages onto activeChat object for ChatInterface compatibility
  const activeChatWithMessages = {
      ...activeChat,
      messages: messages
  };

  return {
    chats,
    activeChat: activeChatWithMessages,
    activeChatId,
    setActiveChatId,
    sendMessage,
    isTyping,
    loading,
    markAsRead: () => {} // Simplified for now
  };
}

