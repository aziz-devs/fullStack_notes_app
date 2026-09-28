// creating a simple homepage for test
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../Components/Navbar";
import NoteCard from "../Components/NoteCard";
import RateLimtedUI from "../Components/RateLimtedUI";
import { useEffect, useState } from "react";
import Notesnotfound from "../Components/Notesnotfound";

function Homepage() {
  // Initialize the state for the homepage

  const [isRatedLimted, setIsRatedLimited] = useState(false); // Set to true for testing purposes
  const [Notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);



  // useEffect hook to fetch notes from the backend API when the component mounts

  useEffect(() => {

    const fatchNotes = async () => {
    
    
      try {
    
        const res = await axios.get("http://localhost:5000/api/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRatedLimited(false);
    
      } catch (error) {
    
        console.log("error fatching notes", error);
        if (error.response?.status === 429) {
          setIsRatedLimited(true);
    
        } else {
          toast.error("failed to loead notes");
        }
    
      } finally {
        setIsLoading(false);
      }
    };
    fatchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRatedLimted && <RateLimtedUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {isLoading && (
          <div className="text-center text-primary py-10 ">
            Loading notes...
          </div>
        )}

{Notes.length === 0 && !isRatedLimted && <Notesnotfound />}


        {Notes.length > 0 && !isRatedLimted && (
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-6">
            {Notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;
