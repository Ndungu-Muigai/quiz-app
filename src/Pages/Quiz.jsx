import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

import he from "he"

const Quiz = ({questions, time_limit, userAnswers, setUserAnswers}) => 
{
    //Creating an instance of the useNavigate hook
    const navigate = useNavigate()

    //State that stores the time left in seconds
    const [timeLeft, setTimeLeft] = useState(time_limit * 60) // Converting the time limit to seconds

    // State to track the current question index
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

    const [shuffledOptions, setShuffledOptions] = useState([])

    //Checking if the questions exist
    useEffect(()=>
    {
        !questions || questions.length === 0 
        ?
            toast.error("Kindly generate questions to get started",
            {
                onClose: ()=> navigate("/")
            })
        :
            null
    },[navigate, questions])

    //Creating an interval function that reduces the time limit accordingly and also clears the userAnswers state
    useEffect(()=>
    {
        setUserAnswers({})
        const quizTimer = setInterval(()=>
        {
            setTimeLeft(previous => 
            {
                // If the time is up, clear the interval and redirect to the results page. If not, reduce time left by one second
                if(previous === 0)
                {
                    clearInterval(quizTimer) //Clear the interval
                    navigate("/quiz/results") //Navigate to the results page
                    return 0
                }
                else
                {
                    return previous - 1
                }
            })
        },1000)

        //Clearnup function for the quiz timer
        return ()=> clearInterval(quizTimer)

    },[navigate, setUserAnswers])

    //Function to format the time remaining as MM:SS
    const formatTime = time => 
    {
        //Calculating the minutes and converting them to whole numbers
        const minutes = Math.floor(time/60)

        //Getting the remaining seconds
        const seconds = time % 60

        //Formatting the time. If the seconds are less than 10, add a leading 0
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
    }

    //Function to handle answer selection
    const handleAnswer = (questionIndex, answer) =>
    {
        setUserAnswers(previous => ({...previous, [questionIndex]: answer}))
    }

    //Function to handle previous button click
    const handlePreviousQuestion = () =>
    {
        if(currentQuestionIndex > 0)
        {
            setCurrentQuestionIndex(prev => prev -1 )
        }
    }

    //Function to handle next button click
    const handleNextQuestion = () =>
    {
        if(currentQuestionIndex < questions.length - 1)
        {
            setCurrentQuestionIndex(prev => prev + 1 )
        }
    }

    //Getting the current question
    const currentQuestion = questions[currentQuestionIndex]

    // Combine correct and incorrect answers and shuffle them
    useEffect(()=>
    {
        if(currentQuestion)
        {
            const options = currentQuestion.type === "boolean" ? ["True", "False"] : [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
            const shuffledOptions=options.map(option => he.decode(option)).sort(() => Math.random() - 0.5)
            setShuffledOptions(shuffledOptions)
        }
    },[currentQuestion])

    return ( 
        <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <div className="flex justify-between mb-4">
                <p className="font-semibold">Question {currentQuestionIndex + 1} of {questions.length}</p>
                <p>Time remaining: <span className="font-bold text-red-500">{formatTime(timeLeft)}</span></p>
            </div>

            <div>
                <h2 className="text-lg font-semibold">{he.decode(currentQuestion.question)}</h2>
                <div className="mt-3 space-y-2">
                    {
                        shuffledOptions.map((option, index) => (
                            <label key={index} className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 peer-checked:bg-blue-100 peer-checked:border-blue-500 transition-all">
                                <input type="radio" name={`question-${currentQuestionIndex}`} value={option} checked={userAnswers[currentQuestionIndex] === option} onChange={() => handleAnswer(currentQuestionIndex, option)} className="peer hidden"/>
                                <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-green-500 peer-checked:bg-green-500">
                                    <div className="w-2.5 h-2.5 bg-white rounded-full opacity-0 peer-checked:opacity-100"></div>
                                </div>
                                <span className="text-gray-700">{option}</span>
                            </label>
                        ))
                    }
                </div>

            </div>

            <div className="flex justify-between mt-6">
                <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0} className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50">Previous</button>
                {
                    currentQuestionIndex === questions.length - 1
                    ?
                        <button onClick={()=> navigate("/quiz/results")} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Finish quiz</button>
                    :
                        <button onClick={handleNextQuestion} className="px-4 py-2 bg-blue-500  text-white rounded-lg disabled:opacity-50">Next</button>
                }
                
            </div>
        </div>
     )
}
 
export default Quiz