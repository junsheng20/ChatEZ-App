export default function Chats() {
  return (
    <div
      id="chats"
      className="bg-gray-800 w-full h-full flex flex-col text-5xl text-white scroll-p-0 scroll-m-0"
    >
      <div className="w-full flex flex-row gap-5 p-5 hover:bg-gray-700">
        <i className="fa-regular fa-circle-user"></i>
        <div className="flex flex-col text-lg">
          <p className="text-lg">James</p>
          <p className="text-sm text-gray-300">Last Message</p>
        </div>
      </div>

      <div className="w-full flex flex-row gap-5 p-5 hover:bg-gray-700">
        <i className="fa-regular fa-circle-user"></i>
        <div className="flex flex-col text-lg">
          <p className="text-lg">James</p>
          <p className="text-sm text-gray-300">Last Message</p>
        </div>
      </div>
    </div>
  );
}
