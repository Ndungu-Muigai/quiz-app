import './App.css'
import { Routes, Route } from 'react-router'
import Generate from './Pages/Generate Questions'
import { useState } from 'react'
import QuizLanding from './Pages/Quiz Landing Page'
import QuizStart from './Pages/Quiz'
import Quiz from './Pages/Test'

function App() 
{
  const [questions, setQuestions] = useState([])
  const [time_limit, setTimeLimit] = useState(15)
  const [results, setResults] = useState(0)

  console.log(questions)

  return (
    <div className='text-black min-h-screen bg-gray-100 flex items-center justify-center'>
      <Routes>
        <Route path='/' element={<Generate setQuestions={setQuestions} time_limit={time_limit} setTimeLimit={setTimeLimit}/>}></Route>
        <Route path='/quiz' element={<QuizLanding questions={questions} time_limit={time_limit}/>}
        ></Route>
        <Route path='/quiz/start' element={<QuizStart questions={questions} time_limit={time_limit}/>}></Route>
        <Route path='/test' element={<Quiz/>}></Route>
      </Routes>
    </div>
  )
}

export default App
