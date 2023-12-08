import { useContext, useEffect, useState } from "react";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import { AuthContext } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen w-100">
      {/* Top Bar */}
      <div className="h-28 bg-gray-900">
        <div className="max-w-6xl flex flex-row justify-between mx-auto py-8">
          <div className="font-mono text-5xl text-white font-semibold">
            Chat<span className="text-emerald-400">EZ</span>
          </div>

          {isSignUp ? (
            <div className="font-sans text-white pt-4 text-lg">
              <p>
                <span className="text-emerald-400 hover:underline">
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      setIsSignUp(false);
                    }}
                  >
                    Log in
                  </a>
                </span>
                {"    "}
                Instead
              </p>
            </div>
          ) : (
            <div className="font-sans text-white pt-4 text-lg">
              <p>
                New User?{" "}
                <span className="text-emerald-400 hover:underline">
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      setIsSignUp(true);
                    }}
                  >
                    Sign Up
                  </a>
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="h-[calc(100vh-112px)] bg-gray-900 flex flex-row">
        {/* Bottom Left */}
        <div className="w-2/5 h-full bg-gray-900 flex align-middle max-w-7xl">
          <img
            src="src/assets/chatEZ.png"
            alt="Logo"
            className="mx-auto h-80 mt-28"
          />
        </div>

        {/* Bottom Right */}
        {isSignUp ? <SignUp /> : <Login />}
      </div>
    </div>
  );
}
