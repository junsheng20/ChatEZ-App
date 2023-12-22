import { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "use-local-storage";
import { fetchFriendDetails, fetchFriends } from "../slice/friendsSlice";
import { AuthContext } from "./AuthProvider";
import { retrieveMessages, sendMessages } from "../slice/messagesSlice";
import { FaUserCircle } from "react-icons/fa";

export default function MessageBar() {
  const [inputText, setInputText] = useState("");
  const [currentChat, setCurrentChat] = useLocalStorage("currentChat");
  const { currentUser } = useContext(AuthContext);
  let currentUserid;
  if (currentUser) {
    currentUserid = currentUser.uid;
  }
  const friend = useSelector((state) => state.friends.friend);
  const messages = useSelector((state) => state.messages.messages);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.friends.loading);

  const handleSend = () => {
    const data = {
      senderid: currentUserid,
      receiverid: friend.uid,
      friendshipid: currentChat,
      content: inputText,
    };
    try {
      dispatch(sendMessages(data));
    } catch (error) {
      console.error(error);
    } finally {
      setInputText("");
    }
  };

  useEffect(() => {
    if (currentChat) {
      try {
        dispatch(
          fetchFriendDetails({
            friendshipid: currentChat,
            currentUserid,
          })
        );
        dispatch(
          retrieveMessages({ friendshipid: currentChat, currentUserid })
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, [currentChat, currentUserid, dispatch]);

  useEffect(() => {
    if (messages.length === 1) {
      try {
        dispatch(fetchFriends(currentUserid));
      } catch (error) {
        console.error(error);
      }
    }
  }, [currentUserid, dispatch, messages.length]);

  return (
    <div className="bg-black flex flex-col w-3/4">
      <div
        id="friendbar"
        className="bg-gray-700 w-full flex flex-row text-5xl p-5 pr-8 text-white justify-between"
      >
        {loading ? (
          <div className="flex flex-row gap-5 h-[48px] text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="animate-spin h-[48px] w-[48px]"
              fill="white"
            >
              <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
            </svg>
          </div>
        ) : (
          <div>
            {friend ? (
              <div className="flex flex-row gap-5">
                {friend.photourl ? (
                  <img
                    src={friend.photourl}
                    alt="profile"
                    className="w-[48px] h-[48px] rounded-full"
                  />
                ) : (
                  <FaUserCircle />
                )}

                <p className="text-2xl pt-2">{friend.displayname}</p>
              </div>
            ) : (
              <div className="flex flex-row gap-5 h-[48px]"></div>
            )}
          </div>
        )}

        <div className="text-3xl mt-2 hover:opacity-80">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
      </div>

      <div
        id="messages"
        className={`w-full h-[calc(100%-164px)] bg-gray-800 px-12 py-6 flex flex-col-reverse gap-1 ${
          messages.length === 0 ? "" : "overflow-y-auto"
        }`}
      >
        {messages.length === 0 && (
          <div className="flex flex-col justify-center gap-10 h-full py-32">
            <h1 className="font-mono text-white text-2xl mx-auto">
              Search for users to start a chat !
            </h1>
            {/* <img
              src="https://firebasestorage.googleapis.com/v0/b/chatez-ed4e6.appspot.com/o/group-chat_5907298.png?alt=media&token=f64e2e84-0ce0-48bd-82ca-18458c5ae932"
              alt=""
              className="w-1/3 h-4/5 mx-auto"
            /> */}
          </div>
        )}
        {messages &&
          messages.map((message) => {
            return <Message key={message.messageid} message={message} />;
          })}
      </div>

      <div
        id="in_put"
        className="w-full p-4 bg-gray-700 flex flex-row gap-5 text-white"
      >
        <div className="text-3xl mt-1 w-1/12 pl-10 hover:opacity-80 hidden sm:block">
          <i className="fa-solid fa-plus"></i>
        </div>
        <div className="w-10/12">
          <input
            type="text"
            className="border-0 bg-gray-600 w-full p-2 pl-5 text-xl rounded-2xl text-white placeholder:font-extralight outline-none font-extralight"
            placeholder="Type a message"
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />
        </div>
        {inputText.length > 0 ? (
          <div
            className="text-3xl mt-1 w-1/12 hover:opacity-90"
            onClick={handleSend}
          >
            <i className="fa-solid fa-paper-plane mx-auto"></i>
          </div>
        ) : (
          <div className="w-1/12"></div>
        )}
      </div>
    </div>
  );
}
