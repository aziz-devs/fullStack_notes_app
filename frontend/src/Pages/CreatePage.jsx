// creating a simple CreatePage for test

import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";

function CreatePage() {
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [loadaing, isLoading] = useState(false);

  function handlesubmit(e) {

    e.preventDefault();
    console.log(title);
    console.log(content);
   }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto ">
          <Link to={"/"} className="btn btn-ghost mb-6">
            {/* import the ArrowLeftIcon from react lucide */}
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Creat new note</h2>
              <form onSubmit={handlesubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="write your note here..."
                    className="textarea textarea-bordered h-32"
                    value={content}
                    onChange={(e) => setcontent(e.target.value)}
                  ></textarea>
                </div>
                
                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={loadaing}>
                    {loadaing ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
