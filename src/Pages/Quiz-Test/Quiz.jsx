import { useContext } from "react";
import Container from "../../Components/Container/Container";
import { AuthContext } from "../../Providers/AuthProviders";
import useAxiosPublic from "../../hooks/useAxios/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import QuizList from "../../Components/Quiz/QuizList";
import { LifeLine } from "react-loading-indicators";

const Quiz = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosPublic();

  // Fetch user data from the backend
  const { data: dbuser = [], isLoading } = useQuery({
    queryKey: ["dbuser", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // Ensure query only runs if user.email exists
  });
  // console.log(user);
  const role = dbuser[0]?.role;

  const quizzes = [
    {
      id: 1,
      sub_name: "Mathematics",
      sub_code: "MATH101",
      teacher_name: "John Doe",
      total_marks: 50,
      total_time: "60 minutes",
      leaderboard: true,
    },
    {
      id: 2,
      sub_name: "Physics",
      sub_code: "PHY101",
      teacher_name: "Jane Smith",
      total_marks: 40,
      total_time: "45 minutes",
      leaderboard: false,
    },
    {
      id: 3,
      sub_name: "Chemistry",
      sub_code: "CHEM101",
      teacher_name: "Michael Brown",
      total_marks: 60,
      total_time: "90 minutes",
      leaderboard: true,
    },
  ];

  return (
    <Container>
      <div className="py-20">
        <h2 className="text-center text-4xl font-bold mb-8">
          Welcome to Quiz Page
        </h2>

        {/* Show loading state while role is being fetched */}
        {isLoading ? (
          <div className="flex justify-center">
            {" "}
            <LifeLine
              color="#425c42"
              size="medium"
              text="Please Wait...."
              textColor="#000"
            />
          </div>
        ) : role === "Teacher" ? (
          <QuizList role="Teacher" user={user}  />
        ) : (
          <div>
            <QuizList role="Student" user={user} quizzes={quizzes} />
          </div>
        )}
      </div>
    </Container>
  );
};

export default Quiz;
