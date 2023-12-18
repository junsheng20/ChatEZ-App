import { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { useDispatch } from "react-redux";
import { deleteMessages } from "../slice/messagesSlice";

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
  const dispatch = useDispatch();

  const handleHover = () => {
    setShowDropdown(true);
  };

  const handleLeave = () => {
    setShowDropdown(false);
  };

  const handleDeleteMessage = async () => {
    try {
      setLoading(true);
      console.log("start delete");
      await dispatch(deleteMessages(messageid));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      console.log("delete complete");
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

  return (
    <div
      className={`flex ${
        senderid === currentUserid ? "flex-row-reverse" : "flex-row"
      } w-full h-max`}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <div
        className={`w-max max-w-[80%] h-max ${
          senderid === currentUserid ? "bg-teal-500" : "bg-gray-700"
        }  p-2 px-4 rounded-xl`}
      >
        <div className="flex flex-row gap-4">
          <p className="font-normal text-lg text-white whitespace-wrap break-all">
            {content}
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
              {showDropdown && senderid === currentUserid ? (
                <div className="flex flex-col justify-center">
                  <button
                    className="min-w-[50px] font-light text-md text-white"
                    onClick={handleDeleteMessage}
                  >
                    <i className="fa-solid fa-trash"></i>
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
