import Chats from "./Chats";
import Navbar from "./Navbar";
import Search from "./Search";

export default function Sidebar() {
  return (
    <div className="bg-gray-900 w-1/4 flex flex-col border-r-[0.1px] border-r-gray-400">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
}
