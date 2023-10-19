import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const FIELDS = {
  NAME: "name",
  ROOM: "room",
};
const Main = () => {
  const { NAME, ROOM } = FIELDS;
  const [values, setValues] = useState({ [NAME]: "", [ROOM]: "" });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleClick = (e) => {
    const isDisabled = Object.values(values).some((value) => !value);

    if (isDisabled) e.preventDefault();
  };

  return (
    <div className="flex w-full h-full justify-center items-center">
      <form>
        <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-violet-900 to-fuchsia-900 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-black/70 text-white shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <div>
                  <h1 className="text-2xl font-semibold">
                    JOIN CHAT WITH FRIENDS
                  </h1>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative group">
                      <input
                        autoComplete="off"
                        id="name"
                        name="name"
                        type="text"
                        value={values[NAME]}
                        className="peer placeholder-transparent text-white h-10 w-full group-hover:border-purple-500 transition duration-300 border-b-[1px] bg-transparent focus:outline-none focus:borer-rose-600"
                        placeholder="NAME"
                        onChange={handleChange}
                        required
                      />
                      <label
                        htmlFor="name"
                        className="absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        NAME
                      </label>
                    </div>
                    <div className="relative group">
                      <input
                        autoComplete="off"
                        id="room"
                        name="room"
                        value={values[ROOM]}
                        type="text"
                        className="peer placeholder-transparent text-white group-hover:border-purple-500 transition duration-300 bg-transparent h-10 w-full border-b-[1px] border-gray-300 focus:outline-none focus:borer-rose-600"
                        placeholder="ROOM"
                        onChange={handleChange}
                        required
                      />
                      <label
                        htmlFor="room"
                        className="absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        ROOM
                      </label>
                    </div>
                    <div className="relative">
                      <Link
                        to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
                        onClick={handleClick}
                      >
                        <button
                          type="submit"
                          className="bg-gradient-to-r from-indigo-900 via-violet-900 to-fuchsia-900 w-full mt-[20px] text-white rounded-md px-2 py-1 hover:scale-[1.05] transition duration-200"
                        >
                          JOIN ROOM
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Main;
