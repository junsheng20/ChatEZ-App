import { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "use-local-storage";
import { fetchFriendDetails, fetchFriends } from "../slice/friendsSlice";
import { AuthContext } from "./AuthProvider";
import { retrieveMessages, sendMessages } from "../slice/messagesSlice";

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
        dispatch(retrieveMessages(currentChat));
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
        <div className="flex flex-row gap-5">
          {friend.photourl ? (
            <img
              src={friend.photourl}
              alt="profile"
              className="w-[48px] h-[48px] rounded-full"
            />
          ) : (
            <i className="fa-regular fa-circle-user"></i>
          )}

          <p className="text-2xl pt-2">{friend.displayname}</p>
        </div>
        <div className="text-3xl mt-2 hover:opacity-80">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
      </div>

      <div
        id="messages"
        className="w-full h-[calc(100%-164px)] bg-gray-800 px-12 py-6 flex flex-col-reverse gap-1"
      >
        {messages &&
          messages.map((message) => {
            return <Message key={message.messageid} message={message} />;
          })}
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
