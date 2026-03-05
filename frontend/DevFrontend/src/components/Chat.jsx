import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    // ✅ Fixed: socket created once in useEffect, reused in sendMessage via ref
    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinchat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, text }) => {
      setMessages((prev) => [...prev, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, targetUserId]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim() || !socketRef.current) return;
    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage.trim(),
    });
    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col mx-auto h-[calc(100vh-120px)] max-w-2xl px-4 py-6">
      {/* Header */}
      <div className="bg-[#111] border border-[#222] rounded-t-xl px-5 py-4">
        <h1 className="font-semibold text-white">Chat</h1>
        <p className="text-gray-500 text-xs mt-0.5">End-to-end encrypted</p>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-black border-x border-[#222] overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600 text-sm">Send a message to start the conversation</p>
          </div>
        )}
        {messages.map((msg, index) => {
          const isSelf = msg.firstName === user.firstName;
          return (
            <div
              key={index}
              className={`flex items-end gap-2 ${isSelf ? "justify-end" : "justify-start"}`}
            >
              {!isSelf && (
                <img
                  src={`https://i.pravatar.cc/32?u=${msg.firstName}`}
                  alt="avatar"
                  className="w-7 h-7 rounded-full object-cover border border-[#333]"
                />
              )}
              <div
                className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${isSelf
                    ? "bg-white text-black rounded-br-sm"
                    : "bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded-bl-sm"
                  }`}
              >
                <p>{msg.text}</p>
                <span className={`text-xs mt-1 block ${isSelf ? "text-gray-500" : "text-gray-500"}`}>
                  {msg.firstName}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-[#111] border border-[#222] rounded-b-xl px-4 py-3 flex items-center gap-3">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#444] transition-colors"
        />
        <button
          onClick={sendMessage}
          disabled={!newMessage.trim()}
          className="bg-white text-black text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
