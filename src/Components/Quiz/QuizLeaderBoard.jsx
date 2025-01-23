const QuizLeaderBoard = ({ quizId }) => {
  // For demonstration, let's use some mock leaderboard data
  const leaderboard = [
    { name: "Student A", score: 95 },
    { name: "Student B", score: 88 },
    { name: "Student C", score: 75 },
  ];

  return (
    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
      <h4 className="text-lg font-semibold">Leaderboard for Quiz {quizId}</h4>
      <ul className="list-none space-y-2">
        {leaderboard.map((entry, index) => (
          <li key={index}>
            <strong>{entry.name}</strong>: {entry.score} / 100
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizLeaderBoard;
