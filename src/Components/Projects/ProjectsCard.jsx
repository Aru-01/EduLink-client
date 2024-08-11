import { FaCommentAlt, FaHeart, FaShare } from "react-icons/fa";
import profile from "../../assets/profile/avater.png";
import { useState } from "react";
import { Modal } from "@material-tailwind/react";
import TimeFormate from "../TimeFormate/TimeFormate";

const ProjectsCard = ({ project }) => {
  const [loved, setLoved] = useState(false);
  const [loveCount, setLoveCount] = useState(project.react);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(project.comments || []);

  const handleLoveClick = () => {
    if (!loved) {
      setLoveCount(loveCount + 1);
      setLoved(true);
      // Send the love count to the backend to persist the state
    } else {
      setLoveCount(loveCount - 1);
      setLoved(false);
      // Update the backend to decrease the love count
    }
  };

  const handleCommentClick = () => {
    setIsCommentModalOpen(true);
  };

  const handleImageClick = () => {
    setIsImageModalOpen(true);
  };

  const handleCommentSubmit = async () => {
    if (comment.trim() !== "") {
      // Here you would typically send the comment to the backend
      setComments([...comments, comment]);
      setComment("");
    }
  };

  const { title, description, img, authorImg, authorName, createdAt } = project;

  return (
    <div className="">
      <div className="w-9/12 mx-auto bg-white shadow rounded-lg overflow-hidden my-4">
        {/* Post Header */}
        <div className="flex items-center px-4 py-3">
          <img
            className="h-10 w-10 rounded-full object-cover border-2 border-blue-400"
            src={authorImg || profile}
            alt="Avatar"
          />
          <div className="ml-3">
            <h3 className="text-sm font-bold text-gray-900">{authorName}</h3>
            <p className="text-xs text-gray-500 font-semibold">{TimeFormate(createdAt)}</p>
          </div>
        </div>

        {/* Post Content */}
        <div className="px-4 py-2 ">
          <p className="text-gray-900 text-xl font-semibold">{title}</p>
          <p className="text-gray-700 text-lg font-lora">{description}</p>
          {img && (
            <img
              className="mt-2 rounded-lg cursor-pointer"
              src={img}
              alt="Post"
              onClick={handleImageClick}
            />
          )}
        </div>

        {/* Reactions */}
        <div className="flex justify-between items-center px-4 py-2 bg-gray-100">
          <button
            className={`flex items-center ${loved ? "text-red-500" : "text-gray-600"} hover:text-red-500`}
            onClick={handleLoveClick}
          >
            <FaHeart className="mr-1" /> Love {loveCount}
          </button>
          <button
            className="flex items-center text-gray-600 hover:text-blue-500"
            onClick={handleCommentClick}
          >
            <FaCommentAlt className="mr-1" /> Comment
          </button>
          <button className="flex items-center text-gray-600 hover:text-blue-500">
            <FaShare className="mr-1" /> Share
          </button>
        </div>

        {/* Comment Modal */}
        {isCommentModalOpen && (
          <Modal
            size="lg"
            active={isCommentModalOpen}
            toggler={() => setIsCommentModalOpen(false)}
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Comments</h3>
              <div className="space-y-4">
                {comments.map((cmt, index) => (
                  <div key={index} className="text-gray-600">
                    {cmt}
                  </div>
                ))}
                <div className="flex items-center mt-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mr-2 p-2 border rounded"
                  />
                  <button
                    onClick={handleCommentSubmit}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        )}

        {/* Image Modal */}
        {isImageModalOpen && (
          <Modal
            size="lg"
            active={isImageModalOpen}
            toggler={() => setIsImageModalOpen(false)}
          >
            <div className="flex justify-center items-center p-4">
              <img src={img} alt="Full Image" className="max-w-full max-h-full" />
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ProjectsCard;
