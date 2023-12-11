import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

export default function SetDisplayName() {
  const [displayName, setDisplayName] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  const updateDisplayName = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    }
    if (currentUser.displayName) {
      navigate("/");
    }
  }, [navigate, currentUser]);

  return (
    <>
      <div className="min-h-screen w-100 bg-gray-900 flex flex-row">
        <div className="flex flex-col mt-32 ml-32 gap-8">
          <h1 className="text-6xl text-white font-mono">
            You&apos;re almost there! 👋
          </h1>
          <p className="text-3xl text-white font-mono">
            Create <span className="italic text-emerald-400">displayName</span>{" "}
            to get started
          </p>

          <form
            className="flex flex-row gap-9 mt-10 w-3/4"
            onSubmit={updateDisplayName}
          >
            <input
              type="text"
              className="bg-gray-800 p-3 text-slate-400 text-2xl font-sans font-light w-3/4 outline-none rounded-lg focus:border-0 focus:border-b-[1px] focus:font-light focus:border-emerald-400 focus:font-sans focus:placeholder:text-emerald-400 focus:text-emerald-400 focus:placeholder-shown:0 focus:rounded-none focus:bg-gray-900 transition-all duration-100"
              placeholder={isFocus ? "min. 2 char" : " Enter displayName"}
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              onFocus={() => setIsFocus(true)}
              onBlur={() => {
                setIsFocus(false);
              }}
            />
            {displayName.length > 1 ? (
              <button
                className="p-3 text-white text-2xl font-light border-0 bg-emerald-400 w-1/6 rounded-lg mb-0.5"
                type="submit"
              >
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            ) : (
              ""
            )}
          </form>
          <button
            className="p-3 text-white text-2xl font-light border-0 bg-emerald-400 w-1/6 rounded-lg mb-0.5"
            onClick={handleSignOut}
          >
            Log out
          </button>
        </div>
      </div>
    </>
  );
}
