import { useState } from "react";
import QuizItemTeacher from "./QuizItemTeacher";
import AddQuizModal from "./AddQuizModal";

const QuizListTeacher = ({ user, quizzes, addQuiz }) => {
  // console.log(user);
  const [showAddQuizModal, setShowAddQuizModal] = useState(false);

  const handleAddQuizModalToggle = () => {
    setShowAddQuizModal(!showAddQuizModal);
  };

  const handleAddQuiz = (quizData) => {
    addQuiz(quizData); // Add the new quiz
    setShowAddQuizModal(false); // Close modal after submission
  };

  return (
    <div className="p-6 space-y-6">
      {/* Add Quiz Button */}
      <div className="text-center">
        <button
          onClick={handleAddQuizModalToggle}
          className="relative mt-4 p-4  text-base px-5 py-3 overflow-hidden font-medium text-black bg-green-500 border border-black rounded-lg shadow-inner group"
        >
          <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
          <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
          <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
          <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
          <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
          <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease text-base font-semibold">
            + Add New Quiz
          </span>
        </button>
      </div>

      {/* Add Quiz Modal */}
      {showAddQuizModal && (
        <AddQuizModal
          user={user}
          onClose={handleAddQuizModalToggle}
          onSubmit={handleAddQuiz}
        />
      )}

      {/* Quiz Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((quiz) => (
          <QuizItemTeacher key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
};

export default QuizListTeacher;
