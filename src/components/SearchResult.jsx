export default function SearchResult({ user }) {
  const { photourl, displayname } = user;

  return (
    <div className="w-full flex flex-row gap-5 p-5 hover:bg-gray-700 text-5xl text-white rounded-xl">
      {photourl ? (
        <img src={photourl} alt="" className="w-[48px] h-[48px] rounded-full" />
      ) : (
        <i className="fa-regular fa-circle-user"></i>
      )}

      <div className="flex flex-col text-lg">
        <p className="text-lg">{displayname}</p>
      </div>
    </div>
  );
}
