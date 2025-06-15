import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id; // inital user will be null , react render in multiple cycle
  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinchat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, text }) => {
      console.log(firstName + ":" + text);
      setMessages((prev) => [...prev, { firstName, text }]);
    });
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };
  return (
    <div className="flex flex-col m-5 h-[70vh] border w-2/3 mx-auto">
      <h1 className="p-3 text-lg font-bold border-b border-gray-600">Chats</h1>
      <div className="flex-1 p-5 overflow-y-auto space-y-2">
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((msg, index) => {
            const isSelf = msg.firstName === user.firstName;
            return (
              <div
                key={index}
                className={`flex items-start ${
                  isSelf ? "justify-end" : ""
                } gap-2`}
              >
                {!isSelf && (
                  <img
                    src="https://i.pravatar.cc/40"
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div
                  className={`${
                    isSelf ? "bg-blue-600" : "bg-gray-700"
                  } text-white p-3 rounded-lg max-w-[70%]`}
                >
                  <p>{msg.text}</p>
                  <span className="text-xs text-gray-400 block text-right mt-1">
                    {msg.firstName}
                  </span>
                </div>
                {isSelf && (
                  <img
                    src="https://i.pravatar.cc/40?u=me"
                    alt="your avatar"
                    className="w-8 h-8 rounded-full"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-3 border-t border-gray-600 flex items-center gap-2 ">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-600 text-white rounded p-2"
        ></input>
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
