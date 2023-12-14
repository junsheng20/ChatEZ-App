import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export default function Message({ owner }) {
  const { currentUser } = useContext(AuthContext);
  let displayName;
  if (currentUser) {
    displayName = currentUser.displayName;
  }

  return (
    <div
      className={`flex ${
        owner === displayName ? "flex-row-reverse" : "flex-row"
      } w-full h-max`}
    >
      <div
        className={`w-max max-w-[80%] h-max ${
          owner === displayName ? "bg-sky-600" : "bg-gray-700"
        }  p-2 px-4 rounded-xl`}
      >
        <div className="flex flex-row gap-4">
          <p className="font-normal text-lg text-white whitespace-wrap break-all">
            hello thanks for reaching out!
          </p>
          <div className="flex flex-col justify-end">
            <p className="min-w-[47px] font-light text-xs text-gray-300">
              11:15 am
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
