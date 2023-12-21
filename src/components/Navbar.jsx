import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar({ setShowProfile }) {
  const { currentUser } = useContext(AuthContext);
  let photoURL;
  if (currentUser) {
    photoURL = currentUser.photoURL;
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-700 w-full flex flex-row text-5xl p-5 text-white justify-between">
      <div className="cursor-pointer">
        {photoURL ? (
          <img
            src={currentUser.photoURL}
            alt=""
            className="w-[48px] h-[48px] rounded-full"
            onClick={() => setShowProfile(true)}
          />
        ) : (
          <FaUserCircle onClick={() => setShowProfile(true)} />
        )}
      </div>
      <button
        className="text-lg bg-gray-600 px-3 rounded-xl hover:bg-gray-500 hidden sm:block"
        onClick={handleSignOut}
      >
        Log Out
      </button>
    </div>
  );
}
