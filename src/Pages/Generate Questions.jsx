import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

const Generate = ({setQuestions, time_limit, setTimeLimit}) => 
{
    const navigate=useNavigate()

    const [categories, setCategories] = useState([])
    const [filters, setFilters] = useState({
        category: "",
        difficulty: "",
        type: "",
        total_questions: 10,
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => 
    {
        fetch("https://opentdb.com/api_category.php")
        .then((response) => response.json())
        .then((categories) => setCategories(categories.trivia_categories))
    }, [])

    const handleFilterChange = e =>setFilters((currentFilters) => ({...currentFilters,[e.target.name]: e.target.value}))

    const getQuestions = e => 
    {
        e.preventDefault()
        setLoading(true)
        setError(null)

        //Extracting the filter values by destructuring the object
        const { category, difficulty, type, total_questions } = filters

        //Constructing the API URL based on the filter values
        const apiURL = `https://opentdb.com/api.php?amount=${total_questions}${category ? `&category=${category}` : ""}${difficulty ? `&difficulty=${difficulty}` : ""}${type ? `&type=${type}` : ""}`

        //Fetching the questions
        try
        {
            fetch(apiURL)
            .then((response) => response.json())
            .then(data =>
            {
                if(data.response_code === 0)
                {
                    setQuestions(data.results)
                    setFilters(
                    {
                        category: "",
                        difficulty: "",
                        type: "",
                        total_questions: 10,
                        time_limit: 15,
                    })
                    navigate("/quiz")
                }
                else
                {
                    setError("No questions could be generated. Please try changing the filters")
                    setQuestions([])
                }
                
                setLoading(false)
            })
        }
        catch(error)
        {
            setError(error)
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-3xl font-bold text-center text-primary">Welcome to Quizify</h1>
            <p className="text-center text-gray-600 mt-2">Test your knowledge and have fun!</p>

            <form onSubmit={getQuestions} className="mt-6">
                {
                    error && <p className="text-red-600 text-center mt-4">{error}</p>
                }
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="mb-1">
                        <label className="block text-gray-700 font-medium mb-1">Category</label>
                        <select name="category" value={filters.category} onChange={handleFilterChange} className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-primary">
                            <option value="">Any category</option>
                            {
                                categories.map(category => 
                                (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mb-1">
                        <label className="block text-gray-700 font-medium mb-1">Difficulty<sup className="text-red-500 text-lg">*</sup></label>
                        <select name="difficulty" value={filters.difficulty} onChange={handleFilterChange} className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-primary" required>
                            <option value="">Select difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <div className="mb-1">
                        <label className="block text-gray-700 font-medium mb-1">Answer format<sup className="text-red-500 text-lg">*</sup></label>
                        <select name="type" value={filters.type} onChange={handleFilterChange} className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-primary" required>
                            <option value="">Any format</option>
                            <option value="multiple">Multiple choice</option>
                            <option value="boolean">True/False</option>
                        </select>
                    </div>
                    <div className="mb-1">
                        <label className="block text-gray-700 font-medium mb-1">Number of Questions</label>
                        <input type="number" name="total_questions" value={filters.total_questions} onChange={handleFilterChange} min={5} max={50} className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-primary"/>
                    </div>
                    <div className="mb-1">
                        <label className="block text-gray-700 font-medium mb-1">Time Limit (minutes)</label>
                        <input type="number" name="time_limit" value={time_limit} onChange={ e => setTimeLimit(e.target.value)} min={10} max={50} className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-primary"/>
                    </div>
                </div>

                <div className="flex justify-center mt-6">
                    <button type="submit" className="btn btn-primary px-6 py-2 text-white rounded-md" disabled={loading}>{loading ? "Generating..." : "Generate Questions"}</button>
                </div>
            </form>
        </div>
    )
}

export default Generate
