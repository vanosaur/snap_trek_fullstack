"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "../hooks/useChat";
import { Send, Search, Phone, Video, MoreVertical, ArrowLeft, Smile, Paperclip } from "lucide-react";

export default function ChatInterface() {
  const { chats, activeChat, activeChatId, setActiveChatId, sendMessage, isTyping, markAsRead } = useChat();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages, isTyping]);

  const handleSend = () => {
    if (inputText.trim()) {
        sendMessage(inputText);
        setInputText("");
    }
  };

  const handleKeyDown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSend();
      }
  };

  return (
    <div className="flex h-[calc(100vh-40px)] md:h-[85vh] w-full max-w-6xl mx-auto glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
      
      {/* === LEFT SIDEBAR (CHAT LIST) === */}
      <div className={`w-full md:w-[350px] border-r border-white/10 flex flex-col bg-black/40 backdrop-blur-xl absolute md:relative z-20 h-full transition-transform duration-300 ${activeChatId ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
        
        {/* Header */}
        <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">Messages</h2>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search chats..." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-teal-500/50 transition-all"
                />
            </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            {chats.map(chat => (
                <div 
                    key={chat.id}
                    onClick={() => { setActiveChatId(chat.id); markAsRead(chat.id); }}
                    className={`p-4 flex items-center gap-4 cursor-pointer transition-all hover:bg-white/5 ${activeChatId === chat.id ? 'bg-white/10 border-l-4 border-teal-500' : 'border-l-4 border-transparent'}`}
                >
                    <div className="relative">
                        <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
                        {chat.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                            <h3 className="font-bold text-white truncate">{chat.name}</h3>
                            <span className="text-xs text-zinc-500">{chat.timestamp}</span>
                        </div>
                        <p className={`text-sm truncate ${chat.unread > 0 ? 'text-white font-bold' : 'text-zinc-400'}`}>
                            {chat.lastMessage}
                        </p>
                    </div>
                    {chat.unread > 0 && (
                        <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center text-[10px] font-bold text-black">
                            {chat.unread}
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>

      {/* === RIGHT SIDE (CHAT WINDOW) === */}
      <div className={`flex-1 flex flex-col bg-black/20 backdrop-blur-md w-full absolute md:relative h-full transition-transform duration-300 ${activeChatId ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
        
        {activeChat ? (
            <>
                {/* Chat Header */}
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setActiveChatId(null)} className="md:hidden p-2 -ml-2 text-zinc-400 hover:text-white">
                            <ArrowLeft size={20} />
                        </button>
                        <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                            <h3 className="font-bold text-white">{activeChat.name}</h3>
                            <span className="text-xs text-teal-400 flex items-center gap-1">
                                {activeChat.isOnline ? 'Online' : 'Offline'}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-zinc-400">
                        <Phone className="hover:text-white cursor-pointer transition-colors" size={20} />
                        <Video className="hover:text-white cursor-pointer transition-colors" size={20} />
                        <MoreVertical className="hover:text-white cursor-pointer transition-colors" size={20} />
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar">
                    {activeChat.messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[75%] md:max-w-[60%] rounded-2xl px-5 py-3 shadow-md ${
                                msg.sender === 'me' 
                                ? 'bg-gradient-to-br from-teal-600 to-blue-600 text-white rounded-tr-none' 
                                : 'bg-zinc-800 text-gray-100 rounded-tl-none border border-white/5'
                            }`}>
                                <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
                                <span className={`text-[10px] block text-right mt-1 opacity-70 ${msg.sender === 'me' ? 'text-blue-100' : 'text-zinc-400'}`}>
                                    {msg.time}
                                </span>
                            </div>
                        </div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-zinc-800 rounded-2xl rounded-tl-none px-4 py-3 border border-white/5 flex items-center gap-1">
                                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-75"></span>
                                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-150"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-xl">
                    <div className="flex items-center gap-3 bg-zinc-900/50 border border-white/10 rounded-full px-4 py-2">
                        <button className="text-zinc-400 hover:text-white transition-colors"><Smile size={20} /></button>
                        <button className="text-zinc-400 hover:text-white transition-colors"><Paperclip size={20} /></button>
                        <input 
                            type="text" 
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a message..." 
                            className="flex-1 bg-transparent text-white placeholder-zinc-500 focus:outline-none py-2"
                        />
                        <button 
                            onClick={handleSend}
                            disabled={!inputText.trim()}
                            className={`p-2 rounded-full transition-all ${inputText.trim() ? 'bg-teal-500 text-black hover:scale-110' : 'bg-zinc-800 text-zinc-600'}`}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </>
        ) : (
            <div className="hidden md:flex flex-1 flex-col items-center justify-center text-zinc-500">
                <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-4 border border-white/5">
                    <Send size={32} className="text-teal-500 ml-1" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Your Messages</h3>
                <p>Select a chat to start messaging</p>
            </div>
        )}

      </div>
    </div>
  );
}
