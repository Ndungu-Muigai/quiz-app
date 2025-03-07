import { useNavigate } from "react-router";

import he from "he"

const Results = ({ questions, userAnswers}) => 
{
    const navigate = useNavigate();

    // Calculate the total score
    const score = questions.reduce((total, question, index) => 
    {
        return total + (userAnswers[index] === question.correct_answer ? 1 : 0);
    }, 0);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">Quiz Results</h1>
            <p className="text-lg font-semibold text-center mb-6">
                Final Score: <span className="text-green-600">{score}</span> / {questions.length}
            </p>

            <div className="space-y-6">
                {
                    questions.map((question, index) => 
                    {
                        const userAnswer = userAnswers[index];
                        const correctAnswer = question.correct_answer;
                        const isCorrect = userAnswer === correctAnswer;

                        return (
                            <div key={index} className="p-4 border border-gray-300 rounded-lg">
                                <h2 className="text-lg font-semibold">{index + 1}. {he.decode(question.question)}</h2>
                                <p className="mt-2">
                                    <span className="font-medium">Your Answer:</span>{" "}
                                    <span className={`px-2 py-1 rounded ${isCorrect ?"text-green-600" : "text-red-600"}`}>{he.decode(userAnswer) || "No answer"}
                                    </span>
                                </p>
                                {
                                    !isCorrect && (
                                        <p className="mt-1 text-gray-700">
                                            <span className="font-medium">Correct Answer:</span>{""}
                                            <span className="px-2 py-1 text-green-600">{he.decode(correctAnswer)}</span>
                                        </p>
                                    )
                                }
                            </div>
                        );
                    })
                }
            </div>

            <div className="mt-6 text-center">
                <button onClick={() => {navigate("/")}} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Take a new Quiz</button>
            </div>
        </div>
    );
};

export default Results;
