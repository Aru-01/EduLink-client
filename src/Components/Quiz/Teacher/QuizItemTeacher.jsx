import { useState } from "react";
import QuizLeaderBoard from "../QuizLeaderBoard";

const QuizItemTeacher = ({ quiz }) => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleLeaderboardToggle = () => {
    setShowLeaderboard(!showLeaderboard);
  };

  return (
    <>
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

      {/* Leaderboard Button */}
      <button
        className="bg-blue-600 text-white py-2 px-4 rounded-full font-medium hover:bg-blue-700 transition-all duration-200"
        onClick={handleLeaderboardToggle}
      >
        {showLeaderboard ? "Hide Leaderboard" : "View Leaderboard"}
      </button>
      {showLeaderboard && (
        <div className="mt-4">
          <QuizLeaderBoard quizId={quiz.id} />
        </div>
      )}
    </div>
    </>
  );
};

export default QuizItemTeacher;
