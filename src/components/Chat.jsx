import useLocalStorage from "use-local-storage";
import { FaUserCircle } from "react-icons/fa";

export default function Chat({ friend }) {
  const { photourl, displayname, content, timestamp, friendshipid } = friend;
  //   const { currentUser } = useContext(AuthContext);
  const [currentChat, setCurrentChat] = useLocalStorage("currentChat");
  //   const dispatch = useDispatch();

  return (
    <div
      className={`w-full flex flex-row gap-5 p-5 hover:bg-gray-700 ${
        friendshipid === currentChat ? "bg-gray-700" : ""
      }`}
      onClick={() => setCurrentChat(friendshipid)}
    >
      {photourl ? (
        <img
          src={photourl}
          alt="profile pic"
          className="w-[48px] h-[48px] rounded-full"
        />
      ) : (
        <FaUserCircle />
      )}
      <div className="flex flex-col text-lg">
        <p className="text-lg">{displayname}</p>
        <p className="text-sm text-gray-300">{content}</p>
      </div>
    </div>
  );
}
