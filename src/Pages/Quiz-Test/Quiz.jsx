import { useContext, useState } from "react";
import Container from "../../Components/Container/Container";
import { AuthContext } from "../../Providers/AuthProviders";
import useAxiosPublic from "../../hooks/useAxios/useAxiosPublic";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Quiz = () => {
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

  const role = dbuser[0]?.role;
  console.log(role);
  return (
    <Container>
    <div className="py-20">
      {/* Heading */}
      <h2 className="text-center text-4xl text-red-700 font-bold mb-4">
        Welcome to Quiz Page
      </h2>
      <p className="text-center text-xl text-gray-600 mb-8">
        Ready to test your knowledge?
      </p>

      {/* Conditional Rendering based on Role */}
      {role === "Student" ? (
        <div className="text-center space-y-6">
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Get Ready for the Quiz
            </h3>
            <p className="text-lg text-gray-500 mb-6">
              Test your skills with the quiz. Click below to start.
            </p>
            <button className="bg-blue-600 text-white py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300">
              Start Quiz
            </button>
          </div>
          {/* Additional UI for students */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
            <p className="text-lg text-gray-600">
              Make sure to review your notes before starting. Good luck!
            </p>
          </div>
        </div>
      ) : role === "Teacher" || role === "admin" ? (
        <div className="text-center space-y-6">
          <div className="bg-green-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Ready to Add a New Quiz?
            </h3>
            <p className="text-lg text-gray-500 mb-6">
              Create a new quiz for your students. Click below to add a quiz.
            </p>
            <button className="bg-green-600 text-white py-3 px-8 rounded-full hover:bg-green-700 transition duration-300">
              Add Quiz
            </button>
          </div>
          {/* Additional UI for teachers/admin */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
            <p className="text-lg text-gray-600">
              You can manage quizzes and track student performance from here.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  </Container>
  );
};

export default Quiz;
