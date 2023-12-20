import { useState } from "react";
import Chats from "./Chats";
import Navbar from "./Navbar";
import Search from "./Search";
import ProfilePage from "./ProfilePage2";

export default function Sidebar() {
  const [showProfile, setShowProfile] = useState(false);
  return (
    <div className="bg-gray-900 w-1/4 flex flex-col border-r-[0.1px] border-r-gray-400 ease-in-out">
      {showProfile ? (
        <ProfilePage setShowProfile={setShowProfile} />
      ) : (
        <>
          <Navbar setShowProfile={setShowProfile} />
          <Search />
          <Chats />
        </>
      )}
    </div>
  );
}
