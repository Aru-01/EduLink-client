import { useQuery } from "@tanstack/react-query";
import QuizItemStudent from "./QuizItemStudent";
import QuizListTeacher from "./Teacher/QuizListTeacher";
import useAxiosPublic from "../../hooks/useAxios/useAxiosPublic";

const QuizList = ({ role, user }) => {
  const axiosSecure = useAxiosPublic();

  const { data: quizes = [], isLoading } = useQuery({
    queryKey: ["quizes"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/quizes`);
      return res.data;
    },
    // enabled: !!user?.email, // Ensure query only runs if user.email exists
  });
  console.log(quizes);
  return (
    <div className="space-y-6">
      {role === "Student" ? (
        <>
          <h3 className="text-center font-mono text-lg">Available Quiz</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizes.map((quiz, index) => (
              <QuizItemStudent key={index} quiz={quiz} />
            ))}
          </div>
        </>
      ) : (
        <QuizListTeacher user={user} quizzes={quizes} />
      )}
    </div>
  );
};

export default QuizList;
