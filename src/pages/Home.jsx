import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import Sidebar from "../components/Sidebar";
import MessageBar from "../components/MessagesBar";

export default function HomePage() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    } else if (!currentUser.displayName) {
      navigate("/setDisplay");
    }
  });

  return (
    <div className="flex flex-row h-screen w-screen bg-gray-900">
      <Sidebar />
      <MessageBar />
    </div>
  );
}
