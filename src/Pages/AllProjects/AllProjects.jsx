import { useContext, useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import Container from "../../Components/Container/Container";
import profile from "../../assets/profile/avater.png";
import { AuthContext } from "../../Providers/AuthProviders";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import PostProject from "./PostProject";
import useAxiosPublic from "../../hooks/useAxios/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import ProjectsCard from "../../Components/Projects/ProjectsCard";
import ProjectsSkeleton from "../../Components/SkeletonEffect/ProjectsSkeleton";

const AllProjects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const handleModalToggle = () => setIsModalOpen(!isModalOpen);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await axiosPublic.get("/projects");
      return res.data;
    },
  });
  // console.log(projects, isLoading);

  return (
    <Container>
      <Helmet>
        <title>EduLink | Projects</title>
      </Helmet>
      <div className="py-20 w-9/12 mx-auto">
        <h3 className="font-lora text-red-600 font-extrabold  text-4xl text-center mb-10">
          Explore All Projects
        </h3>
        {/* post card */}
        <div className="flex justify-center items-center mb-5  bg-slate-100 px-4 py-6 rounded-2xl">
          <Link to="/profile" >
            <img
              src={user?.photoURL ? user.photoURL : profile}
              alt="user-profile"
              className="w-12 h-12 rounded-full mr-4 "
            />
          </Link>
          <div
            className="relative flex-grow cursor-pointer bg-gray-200 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-full transform hover:scale-105 transition-transform"
            onClick={handleModalToggle}
          >
            <span className="absolute top-0 left-0 w-full h-full bg-gray-200 opacity-50 rounded-full"></span>
            <span className="relative z-10">Display Your Innovation</span>
          </div>
          <FaPhotoVideo
            onClick={handleModalToggle}
            className="ml-4 text-2xl cursor-pointer text-blue-500"
          />
        </div>
        {isModalOpen && (
          <PostProject closeModal={handleModalToggle} user={user} />
        )}

        {isLoading && (
          <div className="my-20 bg-slate-100 py-4 rounded-xl shadow mx-auto">
            <ProjectsSkeleton />
          </div>
        )}
        {/* Project cards go here */}
        <div className="bg-slate-100 py-4 rounded-xl shadow">
          {projects.map((project) => (
            <ProjectsCard key={project.id} project={project}></ProjectsCard>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default AllProjects;
