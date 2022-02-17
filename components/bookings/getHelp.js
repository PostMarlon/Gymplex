const GetHelp = ({ showHelpOverlay }) => {
  return (
    <div className="fixed flex items-center justify-center h-screen w-screen z-50" style={{ backgroundColor: "rgba(0,0,0,.72)" }}>
      <div className="bg-white w-1/2 -mt-40 p-10 rounded">
        <h1 className="text-3xl font-semibold opacity-75 mb-4">Get in touch with a personal trainer</h1>

        <div>
          <textarea className="py-4 px-8 bg-gray-200 rounded border-2 w-full resize-none " rows={6} placeholder="Type a message to your personal trainer"></textarea>
          <button className="w-full text-white mt-8 bg-blue-600 p-2 rounded">Send</button>
          <button className="w-full text-black mt-4 bg-gray-200 p-2 rounded mb-2" onClick={showHelpOverlay}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetHelp;
