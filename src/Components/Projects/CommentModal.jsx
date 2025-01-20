import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import TimeFormate from "../TimeFormate/TimeFormate";

const CommentModal = ({ isOpen, onClose, project, comments, onCommentSubmit }) => {
  const [newComment, setNewComment] = useState("");

  if (!isOpen) return null;

  const { authorName, createdAt, title, description, img } = project;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 md:mx-0">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg mx-auto font-semibold">{`${authorName}'s Post`}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
            <FaTimes className="text-xl" />
          </button>
        </div>
        <div className="p-4">
          
          {/* Author Information */}
          <div className="flex items-center mb-4">
            <div className="mr-3">
              {/* Placeholder for Author's Profile Image */}
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            </div>
            <div>
              <p className="text-gray-900 font-bold">{authorName}</p>
              <p className="text-gray-500 text-sm">{TimeFormate(createdAt)}</p>
            </div>
          </div>


          {/* Post Content */}
          <div className="mb-4">
            <p className="text-gray-900 text-lg font-bold">{title}</p>
            <p className="text-gray-700 text-sm">{description}</p>
            {img && (
              <img
                className="mt-2 rounded-lg cursor-pointer"
                src={img}
                alt="Post"
              />
            )}
          </div>

          <hr className="mb-4" />

          {/* Comments Section */}
          <div className="max-h-40 overflow-y-auto">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="border-b border-gray-200 py-2">
                  <p className="text-gray-700">{comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>
        <div className="p-4 border-t">
          <div className="flex">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 p-2 border rounded-l"
            />
            <button
              onClick={() => {
                onCommentSubmit(newComment);
                setNewComment("");
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
