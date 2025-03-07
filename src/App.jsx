import './App.css'
import 'react-toastify/dist/ReactToastify.css'

import { Routes, Route } from 'react-router'
import { useState } from 'react'
import { Slide, ToastContainer } from 'react-toastify'

import Generate from './Pages/Generate Questions'
import QuizLanding from './Pages/Quiz Landing Page'
import Quiz from './Pages/Quiz'
import Results from './Pages/Results'

function App() 
{
  const [questions, setQuestions] = useState([])
  const [time_limit, setTimeLimit] = useState(15)
  const [userAnswers, setUserAnswers] = useState({})

  console.log(questions)

  return (
    <div className='text-black min-h-screen bg-gray-100 flex items-center justify-center'>
      <ToastContainer position='top-right' bodyClassName="text-black" autoClose={2500} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme='light' transition={Slide}/>
      <Routes>
        <Route path='/' element={<Generate setQuestions={setQuestions} time_limit={time_limit} setTimeLimit={setTimeLimit}/>}></Route>
        <Route path='/quiz' element={<QuizLanding questions={questions} time_limit={time_limit}/>}
        ></Route>
        <Route path='/quiz/start' element={<Quiz questions={questions} time_limit={time_limit} userAnswers={userAnswers} setUserAnswers={setUserAnswers}/>}></Route>
        <Route path='/quiz/results' element={<Results questions={questions} userAnswers={userAnswers}/>}></Route>
      </Routes>
    </div>
  )
}

export default App
