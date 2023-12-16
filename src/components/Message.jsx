import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export default function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  let currentUserid;
  if (currentUser) {
    currentUserid = currentUser.uid;
  }
  const { senderid, receiverid, friendshipid, content, timestamp } = message;

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
          <div className="flex flex-col justify-end">
            <p className="min-w-[47px] font-light text-xs text-gray-300">
              {formattedTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
