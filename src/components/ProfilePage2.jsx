import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { FaUserCircle } from "react-icons/fa";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { updateUserDisplayName, updateUserPhotoURL } from "../slice/usersSlice";
// import { updateUserPhotoURL } from "../slice/usersSlice";

export default function ProfilePage2({ setShowProfile }) {
  const { currentUser } = useContext(AuthContext);
  let photoURL;
  if (currentUser) {
    photoURL = currentUser.photoURL;
  }
  const [displayName, setDisplayName] = useState("");
  const [showApplyChanges, setShowApplyChanges] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const dispatch = useDispatch();

  const handleInputClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    try {
      setLoading(true);
      const storageRef = ref(storage, currentUser.uid);
      const snapshot = await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(snapshot.ref);
      await updateProfile(auth.currentUser, {
        photoURL: photoURL,
      });
      const photourl = { photourl: photoURL };
      try {
        dispatch(updateUserPhotoURL({ photourl, uid: currentUser.uid }));
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDisplayName = async (e) => {
    e.preventDefault();
    try {
      setLoading2(true);
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      const displayname = { displayname: displayName };
      dispatch(
        updateUserDisplayName({
          displayname,
          uid: currentUser.uid,
        })
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading2(false);
      setShowApplyChanges(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName);
    }
  }, [currentUser]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-14 w-full h-[88px] bg-gray-700 text-2xl text-white p-5 px-10">
        <div className="flex flex-col justify-center">
          <i
            className="fa-solid fa-arrow-left cursor-pointer"
            onClick={() => setShowProfile(false)}
          ></i>
        </div>

        <div className="flex flex-col justify-center text-2xl">
          <p>Profile</p>
        </div>
      </div>

      <div className="flex flex-col">
        <form action="" onSubmit={handleUpdateDisplayName}>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept=".jpeg, .png, .jpg"
            onChange={handleImageUpload}
          />

          <div>
            <div
              className="relative w-48 h-48 overflow-hidden cursor-pointer group rounded-full mx-auto mt-10"
              onClick={handleInputClick}
            >
              {photoURL ? (
                <img
                  src={photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover group-hover:opacity-50 transition-opacity duration-300"
                />
              ) : (
                <FaUserCircle className="w-full h-full object-cover group-hover:opacity-50 transition-opacity duration-300 text-white" />
              )}

              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-700 opacity-100 bg-opacity-80">
                  <span className="text-white text-lg">Loading ...</span>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <span className="text-white text-lg">Upload Profile Pic</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col text-2xl text-white font-thin mt-10 p-10 gap-2 mx-auto">
            <label htmlFor="username" className="text-teal-500">
              displayName
            </label>

            <input
              type="text"
              className="font-sans font-thin text-3xl text-white bg-gray-900 border-0 border-b-[1px] border-gray-700 focus:border-white w-3/4 outline-0 p-3 pl-0 focus:text-white transition-all duration-500"
              onChange={(e) => {
                setDisplayName(e.target.value);
                setShowApplyChanges(true);
              }}
              value={displayName}
            />
          </div>

          {showApplyChanges ? (
            <div className="flex mx-auto px-10">
              {loading2 ? (
                <button
                  className="bg-teal-600 hover:bg-teal-500 text-white text-xl rounded-xl p-3"
                  disabled
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="animate-spin h-[28px] w-[28px]"
                    fill="white"
                  >
                    <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
                  </svg>
                </button>
              ) : (
                <button
                  className="bg-teal-600 hover:bg-teal-500 text-white text-xl rounded-xl p-3"
                  type="submit"
                >
                  Apply Changes
                </button>
              )}
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
}
