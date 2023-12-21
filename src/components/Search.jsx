import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersByDisplayName } from "../slice/usersSlice";
import SearchResult from "./SearchResult";
import _ from "lodash";

export default function Search() {
  const [displayName, setDisplayName] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        await dispatch(fetchUsersByDisplayName(displayName));
      } catch (error) {
        console.error(error);
      }
    };

    const debouncedSearch = _.debounce(handleSearch, 500);

    if (displayName.length > 0) {
      setShow(true);
      debouncedSearch();
    } else if (displayName.length === 0) {
      setShow(false);
    }

    return () => {
      debouncedSearch.cancel(); // Cancel the debounce on component unmount
    };
  }, [dispatch, displayName]);

  return (
    <div className="w-full p-4 bg-gray-800 flex flex-col border-b-[0.5px] gap-2 border-white">
      <input
        type="text"
        className="border-0 bg-gray-700 w-full p-2 pl-4 text-xl rounded-2xl text-white font-extralight outline-0"
        placeholder="Search users"
        onChange={(e) => setDisplayName(e.target.value)}
        value={displayName}
      />
      {loading && (
        <div className="p-5 text-white text-lg">
          <p>Searching users...</p>
        </div>
      )}
      {users &&
        show &&
        users.map((user) => {
          return (
            <SearchResult
              key={user.uid}
              user={user}
              setDisplayName={setDisplayName}
            />
          );
        })}
    </div>
  );
}
