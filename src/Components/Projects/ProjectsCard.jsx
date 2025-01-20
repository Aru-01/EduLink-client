import { useState, useEffect } from "react";
import { FaCommentAlt, FaHeart, FaShare } from "react-icons/fa";
import profile from "../../assets/profile/avater.png";
import TimeFormate from "../TimeFormate/TimeFormate";
import useAxiosPublic from "../../hooks/useAxios/useAxiosPublic";
import ImgModal from "./ImgModal";
import CommentModal from "./CommentModal";

const ProjectsCard = ({ project, userId }) => {
  const [loved, setLoved] = useState(false);
  const [loveCount, setLoveCount] = useState(project.react || 0);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(project.comments || []);
  const { _id, title, description, img, authorImg, authorName, createdAt } =
    project;

    const axiosPublic = useAxiosPublic();
  
    useEffect(() => {
      const checkUserReaction = async () => {
        try {
          const response = await axiosPublic.get(
            `/projects/${_id}/check-reaction?userId=${userId}`
          );
          setLoved(response.data.hasReacted);
        } catch (error) {
          console.error("Error checking reaction:", error);
        }
      };
  
      checkUserReaction();
    }, [_id, userId, axiosPublic]);
  
    const handleLoveClick = async () => {
      if (!loved) {
        try {
          await axiosPublic.post(`/projects/${_id}/react`, {
            userId,
            action: "increment",
          });
          setLoveCount(loveCount + 1);
          setLoved(true);
        } catch (error) {
          console.error("Error updating reaction:", error);
        }
      } else {
        try {
          await axiosPublic.post(`/projects/${_id}/react`, {
            userId,
            action: "decrement",
          });
          setLoveCount(loveCount - 1);
          setLoved(false);
        } catch (error) {
          console.error("Error updating reaction:", error);
        }
      }
    };

  const handleCommentClick = () => {
    setIsCommentModalOpen(true);
  };

  const handleImageClick = () => {
    console.log("Image clicked, opening modal...");
    setIsImageModalOpen(true);
  };

  const handleCommentSubmit = async () => {
    if (comment.trim() === "") return;

    try {
      await axiosPublic.post(`/projects/${_id}/comment`, {
        userId,
        comment,
      });
      setComments([...comments, comment]);
      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

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
            <h3 className="text-sm font-bold text-gray-900 hover:underline hover:cursor-pointer">
              {authorName}
            </h3>
            <p className="text-xs text-gray-500 font-semibold">
              {TimeFormate(createdAt)}
            </p>
          </div>
        </div>
        {/* Post Content */}
        <div className="px-4 py-2">
          <p className="text-gray-900 text-lg">{title}</p>
          <p className="text-gray-700 text-sm">{description}</p>
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
            className={`flex items-center ${
              loved ? "text-red-500" : "text-gray-600"
            } hover:text-red-500`}
            onClick={handleLoveClick}
            disabled={loved} // Prevent multiple clicks if already loved
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
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        comments={comments}
        project={project}
        onCommentSubmit={handleCommentSubmit}
      />
        {/* Image Modal */}
        {isImageModalOpen && (
          <ImgModal
            isOpen={isImageModalOpen}
            onClose={() => setIsImageModalOpen(false)}
            imgSrc={img}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectsCard;
