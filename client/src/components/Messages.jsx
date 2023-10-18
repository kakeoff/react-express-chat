import React from "react";

const Messages = ({ messages, name }) => {
  return (
    <div>
      {messages.map(({ user, message }, i) => {
        const isMe =
          user && user.name.trim().toLowerCase() === name.trim().toLowerCase();
        const classForMessage = isMe ? "bg-green-500" : "bg-red-500";
        return (
          <div key={i} className={classForMessage}>
            <span>{user.name}</span>
            <div>{message}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
