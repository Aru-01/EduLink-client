import { useNavigate } from "react-router-dom";

const QuizItemStudent = ({ quiz }) => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate(`/quiz/${quiz._id}`);
  };

  return (
    <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
      <h3 className="text-2xl font-semibold text-blue-900 mb-2 border-b border-blue-300 pb-2">
        {quiz.sub_name}
      </h3>
      <p className="text-blue-800 font-medium">Subject Code: {quiz.sub_code}</p>
      <p className="text-blue-700 mt-2">
        <span className="font-semibold">Total Marks:</span> {quiz.total_marks}
      </p>
      <p className="text-blue-700 mb-4">
        <span className="font-semibold">Time:</span> {quiz.total_time} mins
      </p>

      <button
        className="bg-green-600 text-white py-2 px-4 rounded mt-4"
        onClick={handleStartQuiz}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default QuizItemStudent;
