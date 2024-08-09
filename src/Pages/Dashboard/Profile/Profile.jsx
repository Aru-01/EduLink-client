import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import useAxiosPublic from "../../../hooks/useAxios/useAxiosPublic";
import profile from "../../../assets/profile/avater.png";
import {  useQuery, useQueryClient } from "@tanstack/react-query";
import "./Profile.css";
import { Helmet } from "react-helmet";
import UpdateForm from "../../../Components/UpdateForm/UpdateForm";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosPublic();
  const queryClient = useQueryClient();

  const { data: dbuser = [] } = useQuery({
    queryKey: ["dbuser", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user.email}`);
      return res.data;
    },
  });
  // console.log(dbuser[0]);
  const role = dbuser[0]?.role;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClose = () => {
    setIsModalOpen(false);
    queryClient.invalidateQueries(["dbuser", user?.email]); // Refetch user data
  };
  return (
    <section className="w-full overflow-hidden dark:bg-gray-900">
      <Helmet>
        <title>EduLink | Profile</title>
      </Helmet>
      <div className={`flex flex-col ${isModalOpen && "blur-sm"}`}>
        {/* cover  */}
        <div className="w-full h-[15rem] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_200%] animate-gradient-x"></div>

        {/* Profile Image */}
        <div className="sm:w-[80%] xs:w-[90%] mx-auto flex">
          <img
            src={user?.photoURL ? user.photoURL : profile}
            alt="Profile Image"
            className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-blue-500 relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]"
          />

          {/* Full Name */}
          <h1 className="w-full text-left my-4 sm:mx-4 xs:pl-4 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif">
            {user?.displayName}
          </h1>
        </div>

        <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
          {/* Description */}
          <p className="w-fit text-gray-700 dark:text-gray-400 font-bold text-md">
            {dbuser[0]?.bio || "No bio available."}
          </p>
          {/* Conditionally Render Based on Role */}
          {role === "Student" ? (
            <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
              <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
                <div className="w-full">
                  <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                    <div className="flex flex-col pb-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Student ID || Roll
                      </dt>
                      <dd className="text-lg font-semibold">
                        {dbuser[0]?.roll}
                      </dd>
                    </div>
                    <div className="flex flex-col py-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Department
                      </dt>
                      <dd className="text-lg font-semibold">
                        {dbuser[0]?.department}
                      </dd>
                    </div>
                    <div className="flex flex-col py-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Phone
                      </dt>
                      <dd className="text-lg font-semibold">
                        {dbuser[0]?.phone}
                      </dd>
                    </div>
                    <div className="flex flex-col py-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        E-mail
                      </dt>
                      <dd className="text-lg font-semibold">
                        {dbuser[0]?.email ? dbuser[0]?.email : "N/A"}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="w-full">
                  <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                    <div className="flex flex-col pb-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Registration No
                      </dt>
                      <dd className="text-lg font-semibold">
                        {dbuser[0]?.registration}
                      </dd>
                    </div>
                    <div className="flex flex-col py-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Semester
                      </dt>
                      <dd className="text-lg font-semibold">
                        <dd className="text-lg font-semibold">
                          {dbuser[0]?.semester}
                          <sup>
                            {dbuser[0]?.semester == 1
                              ? "st"
                              : dbuser[0]?.semester == 2
                              ? "nd"
                              : dbuser[0]?.semester == 3
                              ? "rd"
                              : "th"}
                          </sup>
                        </dd>
                      </dd>
                    </div>
                    <div className="flex flex-col py-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Guardian Phone
                      </dt>
                      <dd className="text-lg font-semibold">
                        {dbuser[0]?.guardianPhone}
                      </dd>
                    </div>
                    <div className="flex flex-col py-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Date Of Birth
                      </dt>
                      <dd className="text-lg font-semibold">
                        {dbuser[0]?.dob ? dbuser[0]?.dob : "N/A"}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(!isModalOpen)}
                className="relative inline-flex items-center w-full justify-center px-10 py-4 overflow-hidden font-medium tracking-tighter text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_200%] animate-[background-position_3s_ease-in-out_infinite] rounded-lg group uppercase "
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-full group-hover:h-56"></span>
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                <span className="relative">Edit info</span>
              </button>
            </div>
          ) : role === "Teacher" ? (
            <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
              <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
                <div className="w-full">
                  <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                    <div className="flex flex-col pb-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Teacher ID
                      </dt>
                      <dd className="text-lg font-semibold">
                        {dbuser[0]?.teacherID}
                      </dd>
                    </div>
                    <div className="flex flex-col py-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        E-mail
                      </dt>
                      <dd className="text-lg font-semibold">
                        {dbuser[0]?.email}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="w-full">
                  <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                    <div className="flex flex-col pb-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Department
                      </dt>
                      <dd className="text-lg font-semibold">
                        {dbuser[0]?.department}
                      </dd>
                    </div>
                    <div className="flex flex-col pt-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Phone Number
                      </dt>
                      <dd className="text-lg font-semibold">
                        {dbuser[0]?.phone}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(!isModalOpen)}
                className="relative inline-flex items-center w-full justify-center px-10 py-4 overflow-hidden font-medium tracking-tighter text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_200%] animate-[background-position_3s_ease-in-out_infinite] rounded-lg group uppercase "
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-full group-hover:h-56"></span>
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                <span className="relative">Edit info</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-red-500 mb-4">Please wait a moment...!</p>
              <div className="flex items-center justify-center">
                <div className="loader border-4 border-t-4 border-blue-500 border-t-transparent rounded-full w-10 h-10 animate-spin"></div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <UpdateForm userData={dbuser[0]} closeModal={handleModalClose} />
        </div>
      )}
    </section>
  );
};

export default Profile;
