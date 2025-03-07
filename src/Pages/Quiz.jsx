import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const QuizStart = ({questions, time_limit}) => {
    const navigate = useNavigate();

    const [timeLeft, setTimeLeft] = useState(time_limit * 60);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        if (!questions) {
            navigate("/");
            return;
        }
        
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        
        return () => clearInterval(timer);
    }, [questions, navigate]);

    const handleSelectAnswer = (questionIndex, answer) => {
        setAnswers((prev) => ({
            ...prev,
            [questionIndex]: answer,
        }));
    };

    const handleSubmit = () => {
        navigate("/quiz/results", { state: { questions, answers } });
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-center text-primary">Quiz</h1>
            <p className="text-center text-gray-600">Time Left: <span className="font-semibold text-red-500">{formatTime(timeLeft)}</span></p>
            
            <div className="mt-6 space-y-4">
                {questions.map((q, index) => (
                    <div key={index} className="border p-4 rounded-md">
                        <p className="font-medium">{index + 1}. {q.question}</p>
                        <div className="mt-2 space-y-2">
                            {[...q.incorrect_answers, q.correct_answer].sort().map((option, i) => (
                                <label key={i} className="block p-2 border rounded-md cursor-pointer">
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={option}
                                        checked={answers[index] === option}
                                        onChange={() => handleSelectAnswer(index, option)}
                                    />
                                    {" "}{option}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="flex justify-center mt-6">
                <button onClick={handleSubmit} className="btn btn-primary px-6 py-2 text-white rounded-md">Submit</button>
            </div>
        </div>
    );
};

export default QuizStart;
