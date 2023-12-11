import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar() {
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
        <i className="fa-regular fa-circle-user"></i>
      </div>
      <button
        className="text-lg bg-gray-600 px-3 rounded-xl hover:bg-gray-500"
        onClick={handleSignOut}
      >
        Log Out
      </button>
    </div>
  );
}
