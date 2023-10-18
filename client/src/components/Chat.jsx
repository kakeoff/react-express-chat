import React from "react";
import { useEffect } from "react";
import io from "socket.io-client";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import Messages from "./Messages";

const socket = io.connect("http://localhost:4000");
const Chat = () => {
  const { search } = useLocation();
  const [params, setParams] = useState({ room: "", user: "" });
  const [state, setState] = useState([]);
  const [message, setMessage] = useState("");
  const [isEmojiOpen, setEmojiOpen] = useState(false);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));

    setParams(searchParams);

    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on("message", ({ data }) => {
      setState((_state) => [..._state, data]);
    });
  }, []);

  const handleSubmit = () => {};
  const handleChange = ({ target: { value } }) => setMessage(value);
  const onEmojiClick = ({ emoji }) => {
    setMessage(`${message} ${emoji}`);
  };
  return (
    <>
      <div className="w-full h-full p-[30px]">
        <div className="bg-black/60 h-full w-full flex flex-col rounded-[16px] text-white">
          <div className="w-full h-[50px] bg-black/40 flex flex-row justify-between items-center p-[20px] rounded-t-[16px]">
            <div>ROOM ID: {params.room}</div>
            <div>0 users in this room</div>
            <Link to="/">
              <button className="bg-red-500/60 rounded-[16px] h-[30px] px-[10px] hover:scale-[1.03] hover:bg-red-500/80 transition duration-200">
                LEFT THE ROOM
              </button>
            </Link>
          </div>

          <div className="w-full h-full overflow-hidden">
            <Messages messages={state} name={params.name} />
          </div>

          <div className="w-full h-[70px] bg-black/40 flex flex-row justify-between items-center rounded-b-[16px]">
            <input
              placeholder="Type a message..."
              name="message"
              value={message}
              onChange={handleChange}
              className="bg-transparent focus:outline-none h-full p-[20px] w-full"
              type="text"
              autoComplete="off"
              required
            />
            <button
              className="text-[35px] h-[50px] min-w-[50px] mr-[5px] rounded-[16px] flex items-center justify-center hover:scale-[1.05] hover:bg-gray-700/50 transition duration-200"
              onClick={() => setEmojiOpen(!isEmojiOpen)}
            >
              😎
            </button>

            <div className="absolute right-[100px] bottom-[90px]">
              {isEmojiOpen && <EmojiPicker onEmojiClick={onEmojiClick} />}
            </div>

            <button
              onClick={handleSubmit}
              className="h-[50px] w-[50px] mr-[5px] rounded-[16px] flex items-center justify-center hover:scale-[1.05] hover:bg-gray-700/50 transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50px"
                height="50px"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
