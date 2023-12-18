import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import { useDispatch } from "react-redux";
import { createUser } from "../slice/usersSlice";

export default function SetDisplayName() {
  const [displayName, setDisplayName] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const auth = getAuth();
  const dispatch = useDispatch();

  const updateDisplayName = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      const data = {
        uid: currentUser.uid,
        photoURL: currentUser.photoURL,
        displayName: currentUser.displayName,
      };
      dispatch(createUser(data));
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
      <div className="min-h-screen w-100 bg-gray-800 flex flex-row justify-center align-middle">
        <div className="flex flex-col mt-32 ml-32 gap-8">
          <h1 className="text-6xl text-white font-mono">
            You&apos;re almost there! 👋
          </h1>
          <p className="text-3xl text-white font-mono">
            Create <span className="italic text-teal-500">displayName</span> to
            get started
          </p>

          <form
            className="flex flex-row gap-9 mt-10 w-3/4"
            onSubmit={updateDisplayName}
          >
            <input
              type="text"
              className="bg-gray-900 p-3 text-2xl text-teal-500 font-sans font-thin w-3/4 outline-none focus:border-0 focus:border-b-[1px] focus:border-teal-500 focus:placeholder:text-teal-500 focus:text-teal-500 focus:placeholder-shown:0 transition-all duration-100"
              placeholder={isFocus ? "min. 1 char" : " Enter displayName"}
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              onFocus={() => setIsFocus(true)}
              onBlur={() => {
                setIsFocus(false);
              }}
            />
            {displayName.length >= 1 ? (
              <button
                className="p-3 text-white text-2xl font-light border-0 bg-teal-500 w-1/6 rounded-lg mb-0.5"
                type="submit"
              >
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </>
  );
}
