import { useDispatch, useSelector } from "react-redux";
import Chat from "./Chat";
import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import { fetchFriends } from "../slice/friendsSlice";

export default function Chats() {
  const friends = useSelector((state) => state.friends.friends);
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      try {
        dispatch(fetchFriends(currentUser.uid));
      } catch (error) {
        console.error(error);
      }
    }
  }, [currentUser, dispatch]);

  return (
    <div
      id="chats"
      className="bg-gray-800 w-full h-full flex flex-col text-5xl text-white scroll-p-0 scroll-m-0"
    >
      {friends &&
        friends.map((friend) => {
          return <Chat key={friend.friendshipid} friend={friend} />;
        })}
    </div>
  );
}
