import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const QuizLanding = ({questions, time_limit}) => 
    {
    const navigate = useNavigate();

    // Check if questions are available and redirect if none are available
    useEffect(() => 
    {
        !questions || questions.length === 0 
        ?
            toast.error("Kindly generate questions to get started",
            {
                onClose: ()=> navigate("/")
            })
        :
            null
    }, [navigate, questions]);

    // useEffect(() => 
    // {
        //If the 15 second quiz start count is greater than 0, reduce the count. Redirect to quiz page otherwise
    //     if (countdown > 0) 
    //     {
    //         const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    //         return () => clearTimeout(timer);
    //     } 
    //     else 
    //     {
    //         navigate("/quiz/start")
    //     }
    // }, [countdown, navigate, questions, time_limit]);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-primary">Quiz Starts Soon!</h1>
                <p className="text-md mt-4">Your questions have been set. Click the "Start Quiz" button to get started</p>
                <p className="text-md mt-2">You have <span className="font-semibold">{time_limit} minutes</span> to complete the quiz. All the best!</p>
                <button onClick={()=> navigate("/quiz/start")} className="btn btn-primary px-6 py-2 text-white rounded-md mt-3">Start Quiz</button>
            </div>
        </div>
    );
};

export default QuizLanding;
