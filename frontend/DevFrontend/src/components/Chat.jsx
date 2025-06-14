import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
const Chat = () => {
  const { targetUserId } = useParams();
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState();
  const user = useSelector((store) => store.user);
  const userId = user?._id; // inital user will be null , react render in multiple cycle
  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinchat", { userId, targetUserId });
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);
  return (
    <div className="flex flex-col m-5 h-[70vh] border w-2/3 mx-auto">
      <h1 className="p-3 text-lg font-bold border-b border-gray-600">Chats</h1>
      <div className="flex-1 p-5 overflow-y-auto space-y-2">
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {/* Incoming message (left side) */}
          <div className="flex items-start gap-2">
            <img
              src="https://i.pravatar.cc/40"
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <div className="bg-gray-700 text-white p-3 rounded-lg max-w-[70%]">
              <p>Hey! How are you?</p>
              <span className="text-xs text-gray-400 block text-right mt-1">
                10:30 AM
              </span>
            </div>
          </div>

          {/* Outgoing message (right side) */}
          <div className="flex items-start justify-end gap-2">
            <div className="bg-blue-600 text-white p-3 rounded-lg max-w-[70%]">
              <p>I'm good! What about you?</p>
              <span className="text-xs text-gray-200 block text-right mt-1">
                10:31 AM
              </span>
            </div>
            <img
              src="https://i.pravatar.cc/40?u=me"
              alt="your avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>

          
          
        </div>
      </div>
      <div className="p-3 border-t border-gray-600 flex items-center gap-2 ">
        <input className="flex-1 border border-gray-600 text-white rounded p-2"></input>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
