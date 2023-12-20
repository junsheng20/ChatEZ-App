import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { useDispatch } from "react-redux";
import { deleteMessages } from "../slice/messagesSlice";
import axios from "axios";

export default function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  let currentUserid;
  if (currentUser) {
    currentUserid = currentUser.uid;
  }
  const { messageid, senderid, receiverid, friendshipid, content, timestamp } =
    message;
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msgContent, setMsgContent] = useState(null);
  const dispatch = useDispatch();

  const handleHover = () => {
    setShowDropdown(true);
  };

  const handleLeave = () => {
    setShowDropdown(false);
  };

  const handleTranslateMessage = async () => {
    const encodedParams = new URLSearchParams();
    encodedParams.set("from", "auto");
    encodedParams.set("to", "en");
    encodedParams.set("text", content);

    const options = {
      method: "POST",
      url: "https://google-translate113.p.rapidapi.com/api/v1/translator/text",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "92bbf7a67amsh4f13ed8ebdae9f9p1c3c41jsnf03b4159990d",
        "X-RapidAPI-Host": "google-translate113.p.rapidapi.com",
      },
      data: encodedParams,
    };

    try {
      setLoading(true);
      const response = await axios.request(options);
      console.log(response.data);
      setMsgContent(response.data.trans);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async () => {
    try {
      setLoading(true);
      await dispatch(deleteMessages(messageid));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const date = new Date(timestamp);

  // Convert to local time
  const localHours = date.getHours();
  const hours = localHours % 12 || 12; // Convert 0 to 12 for 12-hour clock
  const minutes = date.getMinutes();
  const amOrPm = localHours >= 12 ? "pm" : "am";

  // Format the time in 12-hour format (e.g., 11:00 pm)
  const formattedTime = `${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${amOrPm}`;

  useEffect(() => {
    if (message) {
      setMsgContent(content);
    }
  }, [content, message]);

  return (
    <div
      className={`flex ${
        senderid === currentUserid ? "flex-row-reverse" : "flex-row"
      } w-full h-max`}
    >
      <div
        className={`w-max max-w-[80%] h-max ${
          senderid === currentUserid ? "bg-teal-500" : "bg-gray-700"
        }  p-2 px-4 rounded-xl`}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        <div className="flex flex-row gap-4">
          <p className="font-normal text-lg text-white whitespace-wrap break-all">
            {msgContent}
          </p>

          {loading ? (
            <div className="flex flex-col justify-center">
              <button
                className="min-w-[50px] font-light text-md text-white"
                disabled
              >
                <i className="animate-spin fa-solid fa-spinner"></i>
              </button>
            </div>
          ) : (
            <div className="flex">
              {showDropdown ? (
                <div className="flex flex-col justify-center">
                  <button
                    className="min-w-[50px] font-light text-md text-white"
                    onClick={
                      senderid === currentUserid
                        ? handleDeleteMessage
                        : handleTranslateMessage
                    }
                  >
                    {senderid === currentUserid ? (
                      <i className="fa-solid fa-trash"></i>
                    ) : (
                      <i className="fa-solid fa-language"></i>
                    )}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col justify-end">
                  <p className="min-w-[50px] font-light text-xs text-gray-300">
                    {formattedTime}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
