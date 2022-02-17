import React, { useEffect } from "react";
import Footer from "../components/footer";
import supabase from "../lib/supabase";
import moment from "moment";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { CreateNote, GetNotes, UpdateNote, DeleteNote } from "../logic/checkprogression";

const CheckProgression = (props) => {
  const [notes, setNotes] = React.useState([]);
  const [noteContent, setNoteContent] = React.useState("");
  const [updateNoteDetails, setUpdateNoteDetails] = React.useState({});

  useEffect(async () => {
    const allNotes = await GetNotes();
    const notes = allNotes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    setNotes(notes);
  }, []);

  return (
    <div>
      <div className="bg-gray-100 flex flex-col items-center pt-40 pb-20">
        <div className="w-full p-2 md:p-8 lg:w-2/3 lg:p-0">
          <div className="mb-6">
            <p className="font-bold text-4xl">Your Progression</p>
          </div>
          <div className="bg-white shadow-sm p-4 items-center flex justify-center flex-col md:p-6 md:px-12 lg:p-8">
            <div className="w-full">
              <p className="mb-4">Gym attendance over 12 months</p>

              <div className="w-full h-72 bg-gray-400"></div>
            </div>
            <div className="flex flex-col w-full sm:flex-row">
              <div className="mt-4 text-center sm:text-left sm:mr-4">
                <p className="text-3xl font-medium text-gray-800 sm:text-4xl">24</p>
                <p className="font-light text-sm">Total Bookings</p>
              </div>

              <div className="text-center sm:text-left">
                <p className="mt-4 text-3xl font-medium text-gray-800 sm:text-4xl">5</p>
                <p className="font-light text-sm">Total classes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full border-box mt-20 p-2 md:p-8 lg:p-12">
          <div>
            <p className="font-bold text-4xl mb-6">Notes</p>
            <textarea
              className="p-8 bg-gray-200 rounded border-2 w-full resize-none"
              rows={6}
              placeholder="Type a note here to save your progression below"
              value={updateNoteDetails?.id ? updateNoteDetails.content : noteContent}
              onChange={(e) => (updateNoteDetails?.id ? setUpdateNoteDetails({ ...updateNoteDetails, content: e.target.value }) : setNoteContent(e.target.value))}
            ></textarea>
            <button
              className="w-full text-white mt-8 bg-blue-600 p-2 rounded"
              onClick={() => {
                toast.promise(updateNoteDetails?.id ? UpdateNote(updateNoteDetails) : CreateNote(noteContent), {
                  pending: "Creating new note",
                  success: {
                    render({ data }) {
                      if (updateNoteDetails.id) {
                        const newNotes = notes.map((note) => (note.id === updateNoteDetails.id ? updateNoteDetails : note));
                        setNotes(newNotes);
                        setUpdateNoteDetails({});
                        return "Note updated successfully 👌";
                      } else {
                        setNotes([data[0], ...notes]);
                        setNoteContent("");
                        return "New note created 👌";
                      }
                    },
                  },
                  error: {
                    render({ data }) {
                      return `${JSON.stringify(data)} 🤯`;
                    },
                  },
                });
              }}
            >
              {updateNoteDetails?.id ? "Update note" : "Create note"}
            </button>
          </div>

          <div className="w-full grid mt-20 gap-6 grid-cols-1 lg:gap-8 lg:grid-cols-2 xl:gap-12 xl:grid-cols-4">
            {notes.map((note, index) => (
              <div key={Math.random()} className="bg-yellow-200 p-4 px-6 shadow-lg relative flex items-center flex-col">
                <div className="absolute top-0 -m-3 ml-3">
                  <img src="./images/pin.png" height={30} width={30} />
                </div>
                <p className="text-center mt-6">{moment(note.created_at).format("DD/MM/YYYY")}</p>
                <p className="mt-4">{note.content}</p>
                <div className="flex space-x-4 mt-4">
                  <p className="text-blue-500 cursor-pointer" onClick={() => setUpdateNoteDetails(note)}>
                    Update note
                  </p>
                  <p>-</p>
                  <p
                    className="text-red-500 cursor-pointer"
                    onClick={async () => {
                      if (confirm("Are you sure you want to delete this note?")) {
                        await DeleteNote(note);
                        const newNotes = notes.filter((item) => item.id !== note.id);
                        setNotes(newNotes);
                      }
                    }}
                  >
                    Delete note
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return { props: {}, redirect: { destination: "/account/signin" } };
  }
  return { props: { user } };
}

export default CheckProgression;
