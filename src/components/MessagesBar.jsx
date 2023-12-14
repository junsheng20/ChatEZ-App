import { useState } from "react";
import Message from "./Message";

export default function MessageBar() {
  const [inputText, setInputText] = useState("");

  return (
    <div className="bg-black flex flex-col w-3/4">
      <div
        id="friendbar"
        className="bg-gray-700 w-full flex flex-row text-5xl p-5 pr-8 text-white justify-between"
      >
        <div className="flex flex-row gap-5">
          <i className="fa-regular fa-circle-user"></i>
          <p className="text-2xl pt-2">James</p>
        </div>
        <div className="text-3xl mt-2 hover:opacity-80">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
      </div>

      <div
        id="messages"
        className="w-full h-[calc(100%-164px)] bg-gray-800 px-12 py-6 flex flex-col gap-1 overflow-y-scroll"
      >
        <Message owner={"Jun Sheng"} />
        <Message owner={"Jun Xian"} />
        <Message owner={"Jun Sheng"} />
        <Message owner={"Jun Xian"} />
      </div>

      <div
        id="in_put"
        className="w-full p-4 bg-gray-700 flex flex-row gap-5 text-white"
      >
        <div className="text-3xl mt-1 w-1/12 pl-10 hover:opacity-80">
          <i className="fa-solid fa-plus"></i>
        </div>
        <div className="w-10/12">
          <input
            type="text"
            className="border-0 bg-gray-600 w-full p-2 pl-5 text-xl rounded-2xl text-white placeholder:font-extralight outline-none font-extralight"
            placeholder="Type a message"
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
          />
        </div>
        {inputText.length > 0 ? (
          <div className="text-3xl mt-1 w-1/12 hover:opacity-90">
            <i className="fa-solid fa-paper-plane mx-auto"></i>
          </div>
        ) : (
          <div className="w-1/12"></div>
        )}
      </div>
    </div>
  );
}
