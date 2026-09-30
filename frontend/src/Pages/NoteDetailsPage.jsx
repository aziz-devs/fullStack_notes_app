import { ArrowLeftIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import axios from "axios";
import { LoaderIcon } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

function NoteDetailsPage() {
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate=useNavigate();
  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("error fatching notes", error);
        toast.error("faild to load note details");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  function handleDelete() {

    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    setSaving(true);

    try {
      axios.delete(`http://localhost:5000/api/notes/${id}`);
      toast.success("note deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("error in handleDelete", error);
      toast.error("failed to delete note");
    } finally {
      setSaving(false);
    }
  }
  function handleSave() {}

  console.log({ note });

  if (isLoading) {
    return (
      <div className="min-h-screen flex bg-base-200 items-center justify-center text-primary ">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen bg-base-200 ">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto bg-base-100 p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
              <Link to="/" className="btn btn-ghost">
                <ArrowLeftIcon className="h5 w5" />
                Back to Notes
              </Link>
              <button
                className="btn btn-outline btn-error"
                onclick={handleDelete}
              >
                <Trash2Icon className="h-5 w-5" />
                Delete Note
              </button>
            </div>

            <div className="card bg-base-100">
              <div className="card-body">
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note title"
                    className="input input-bordered"
                    value={note.title}
                    onChange={(e) =>
                      setNote({ ...note, title: e.target.value })
                    }
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="write your note here..."
                    className="textarea textarea-bordered h-32"
                    value={note.content}
                    onChange={(e) =>
                      setNote({ ...note, content: e.target.value })
                    }
                  ></textarea>
                </div>
                <div className="card-actions justify-end">
                  <button
                    onclick={handleSave}
                    className="btn btn-primary"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteDetailsPage;
