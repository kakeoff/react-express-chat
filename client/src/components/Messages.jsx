import React from "react";

const Messages = ({ messages, name }) => {
  return (
    <div className="p-[20px]">
      {messages.map(({ user, message }, i) => {
        const isMe =
          user && user.name.trim().toLowerCase() === name.trim().toLowerCase();
        return (
          <div
            key={i}
            className={`flex mb-[15px] flex-col ${
              isMe ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`flex flex-col px-[10px] max-w-[50%] overflow-hidden break-words py-[3px] rounded-[12px] ${
                isMe
                  ? "text-end bg-gradient-to-r from-purple-900 to-purple-600"
                  : "text-start bg-gradient-to-l from-violet-900 to-violet-600"
              }`}
            >
              <span className="text-[12px] font-[700] text-gray-200">
                {user.name}
              </span>
              <span className="text-[14px] font-[500]">{user.message}</span>
              <span className="text-[14px] font-[500]">{message}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
