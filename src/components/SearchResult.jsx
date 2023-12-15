import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { checkFriend, createFriend } from "../slice/friendsSlice";

export default function SearchResult({ user, setDisplayName }) {
  const { photourl, displayname, uid } = user;
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleCreateFriend = async () => {
    let combinedid;
    if (currentUser.uid >= uid) {
      combinedid = currentUser.uid + uid;
    } else {
      combinedid = uid + currentUser.uid;
    }

    const data = {
      friendshipid: combinedid,
      uid1: currentUser.uid,
      uid2: uid,
    };

    try {
      setLoading(true);
      const resultAction = await dispatch(checkFriend(combinedid));
      if (checkFriend.fulfilled.match(resultAction)) {
        // Access the updated friendship value from the payload of the dispatched action
        const updatedFriendship = resultAction.payload;

        if (updatedFriendship) {
          console.log("already a friend", updatedFriendship);
          alert("Already friends :)");
        } else {
          console.log("Not friend", updatedFriendship);
          // Proceed with creating a new friend
          await dispatch(createFriend(data));
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-row gap-5 p-5 text-5xl text-white rounded-xl">
      {photourl ? (
        <img src={photourl} alt="" className="w-[48px] h-[48px] rounded-full" />
      ) : (
        <i className="fa-regular fa-circle-user"></i>
      )}

      <div className="flex flex-col text-lg align-middle justify-center">
        <p className="text-lg">{displayname}</p>
      </div>

      <div className="flex flex-col text-lg align-middle justify-center">
        {loading ? (
          <button
            type="button"
            className="bg-gray-800 text-lg px-3 rounded-xl ml-5"
            disabled
          >
            Load
          </button>
        ) : (
          <button
            className="text-xl bg-gray-700 px-4 py-1 rounded-xl hover:bg-teal-400 ml-5"
            onClick={handleCreateFriend}
          >
            <i className="fa-regular fa-message"></i> {""}Chat
          </button>
        )}
      </div>
    </div>
  );
}
