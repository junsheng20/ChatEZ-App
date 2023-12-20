import { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function ProfilePage({ setShowProfile }) {
  const { currentUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  console.log(currentUser);

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.displayName);
    }
  }, [currentUser]);

  const handleImageUpload = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="flex flex-col">
      <div className="w-full h-[88px] bg-gray-700 flex gap-10">
        <button
          className="px-2 py-3 rounded bg-gray-600 cursor-pointer"
          onClick={() => setShowProfile(false)}
        >
          Back
        </button>
        <p>Profile</p>

        <div className="w-full h-full">
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept=".jpeg, .png, .jpg"
          />

          <div
            className="relative w-40 h-40 overflow-hidden cursor-pointer group rounded-full"
            onClick={handleImageUpload}
          >
            {currentUser.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt="Profile"
                className="w-full h-full object-cover group-hover:opacity-50 transition-opacity duration-300"
              />
            ) : (
              <FaUserCircle className="w-full h-full object-cover group-hover:opacity-50 transition-opacity duration-300 text-white" />
            )}

            <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              <span className="text-white text-lg">Upload Profile Pic</span>
            </div>
          </div>

          <div className="w-full md:w-[50%] mt-6 px-2">
            <form>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </form>
          </div>

          <div className="absolute left-1 bottom-3 bg-gray-500 px-2 py-3 rounded cursor-pointer -500 hover:text-gray-800">
            <button className=" text-white ">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
