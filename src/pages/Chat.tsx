import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Users, ChevronRight } from "lucide-react";
import { chatGroups, directMessages, chatMessages } from "@/data/communityMockData";

type View = "list" | "chat";

const Chat = () => {
  const [view, setView] = useState<View>("list");
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const allChats = [...directMessages, ...chatGroups];
  const currentChat = allChats.find((c) => c.id === activeChat);

  const openChat = (id: string) => {
    setActiveChat(id);
    setView("chat");
  };

  if (view === "chat" && currentChat) {
    return (
      <div className="flex flex-col h-[100dvh] max-w-lg mx-auto">
        {/* Chat Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card/90 backdrop-blur-xl">
          <button
            onClick={() => setView("list")}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-sm">
            {currentChat.type === "group" || currentChat.type === "system"
              ? currentChat.avatar
              : <span className="text-xs font-bold text-secondary-foreground">{currentChat.avatar}</span>}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{currentChat.name}</p>
            {"members" in currentChat && (
              <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Users className="w-3 h-3" /> {currentChat.members} Mitglieder
              </p>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {chatMessages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`flex gap-2 ${msg.isOwn ? "flex-row-reverse" : ""}`}
            >
              {!msg.isOwn && (
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                  msg.isTrainer ? "gradient-streak text-primary-foreground" : "bg-secondary text-secondary-foreground"
                }`}>
                  {msg.avatar}
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-3 py-2 ${
                  msg.isOwn
                    ? "gradient-streak text-primary-foreground rounded-br-md"
                    : "bg-secondary text-foreground rounded-bl-md"
                }`}
              >
                {!msg.isOwn && (
                  <p className={`text-[10px] font-semibold mb-0.5 ${
                    msg.isTrainer ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {msg.sender}
                  </p>
                )}
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={`text-[9px] mt-1 ${
                  msg.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  {msg.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-border bg-card/90 backdrop-blur-xl pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="flex gap-2 items-center">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nachricht schreiben..."
              className="flex-1 bg-secondary rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button className="w-10 h-10 rounded-full gradient-streak flex items-center justify-center shrink-0">
              <Send className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="px-4 mb-5">
        <h1 className="text-2xl font-bold text-foreground">Chats</h1>
        <p className="text-sm text-muted-foreground">Deine Gruppen & Nachrichten</p>
      </div>

      {/* Direct Messages */}
      <div className="px-4 mb-5">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Direkte Nachrichten</p>
        <div className="space-y-1">
          {directMessages.map((dm, i) => (
            <motion.button
              key={dm.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => openChat(dm.id)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors text-left"
            >
              <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm shrink-0 ${
                dm.type === "trainer" ? "gradient-streak text-primary-foreground font-bold" : "bg-secondary"
              }`}>
                {dm.type === "system" ? dm.avatar : <span className="text-xs font-bold">{dm.avatar}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground truncate">{dm.name}</p>
                  <span className="text-[10px] text-muted-foreground shrink-0">{dm.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{dm.lastMessage}</p>
              </div>
              {dm.unread > 0 && (
                <div className="w-5 h-5 rounded-full gradient-streak flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-primary-foreground">{dm.unread}</span>
                </div>
              )}
              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Group Chats */}
      <div className="px-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Gruppen</p>
        <div className="space-y-1">
          {chatGroups.map((group, i) => (
            <motion.button
              key={group.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              onClick={() => openChat(group.id)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors text-left"
            >
              <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-lg shrink-0">
                {group.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground truncate">{group.name}</p>
                  <span className="text-[10px] text-muted-foreground shrink-0">{group.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{group.lastMessage}</p>
              </div>
              {group.unread > 0 && (
                <div className="w-5 h-5 rounded-full gradient-streak flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-primary-foreground">{group.unread}</span>
                </div>
              )}
              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;
