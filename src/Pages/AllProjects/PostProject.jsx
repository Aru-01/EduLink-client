import { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { FaImage, FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import ConvertToBase64 from "../../hooks/base64/ConvertToBase64";
import Swal from "sweetalert2"; // Import SweetAlert
import PostSkelteton from "../../Components/SkeletonEffect/PostSkelteton";
import useAxiosPublic from "../../hooks/useAxios/useAxiosPublic";

const PostProject = ({ closeModal, user, refetch }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const axiosPublic = useAxiosPublic();

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      closeModal();
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    let base64 = null;

    if (imagePreview) {
      const file = data.image[0];
      base64 = await ConvertToBase64(file);
    }
    const currentTime = new Date().toLocaleString();

    const projectItem = {
      title: data.title,
      description: data.description,
      img: base64,
      react: 0,
      authorImg: user.photoURL,
      authorName: user.displayName,
      authorMail: user.email,
      comments: [],
      createdAt: currentTime,
    };

    const itemRes = await axiosPublic.post("/projects", projectItem);
    if (itemRes.data.insertedId) {
      setLoading(false);
      reset(); 
      closeModal();
      await refetch(); 
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "File size should be less than 5 MB.",
        });
        return;
      }
      setImagePreview(URL.createObjectURL(file));
      setValue("image", e.target.files); // Setting the image value for react-hook-form
    }
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [closeModal]);

  const watchTitle = watch("title", "");

  // Check if user object are available
  if (!user) {
    return (
      <div
        className="modal-backdrop fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center overflow-hidden"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-6/12 relative max-h-[90%] overflow-y-auto">
          <PostSkelteton />
        </div>
      </div>
    );
  }

  // Main modal content
  return (
    <div
      className="modal-backdrop fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center overflow-hidden"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-6/12 relative max-h-[90%] overflow-y-auto"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#888 #eee" }}
      >
        <div className="flex justify-between items-center">
          <Typography
            variant="h4"
            color="black"
            className="font-bold font-lora mx-auto"
          >
            Display Your Innovation.
          </Typography>
          <FaTimes
            className="cursor-pointer text-gray-500 hover:text-red-600"
            onClick={closeModal}
          />
        </div>
        <div className="border-b border-gray-300 mt-4" />
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 text-black">
          <input
            placeholder="Project Title"
            className="w-full p-2 border border-gray-300 rounded mt-4 text-2xl font-bold mb-2"
            style={{ fontSize: "1rem" }}
            {...register("title", { required: true })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">Title is required</p>
          )}
          <textarea
            placeholder="Description"
            className="w-full p-2 border border-gray-300 font-bold rounded mt-2 resize-y"
            style={{
              fontSize: "1rem",
              minHeight: "100px",
              maxHeight: "300px",
              overflowX: "auto",
              overflowY: "auto",
            }}
            {...register("description")}
          />
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Selected"
                className="w-full h-auto rounded border"
              />
            </div>
          )}
          <label className="flex items-center mt-4 cursor-pointer border border-gray-300 shadow p-3 rounded-lg">
            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
            <FaImage className="mr-2 text-green-600 text-2xl" />
            <span className="text-black font-bold">Add a Picture</span>
          </label>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            disabled={loading || !watchTitle}
          >
            {loading ? <span>Loading...</span> : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostProject;
