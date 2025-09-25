import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import questionsData from './data/questions.json'
import CrosswordGrid from './components/CrosswordGrid.jsx'
import QuestionDisplay from './components/QuestionDisplay.jsx'

const App = () => {
  const { questions, finalQuestion } = questionsData
  const [selectedId, setSelectedId] = useState(null)
  const [userAnswers, setUserAnswers] = useState({})
  const [completedIds, setCompletedIds] = useState(new Set())
  const [gameWon, setGameWon] = useState(false)

  const handleRowClick = (id) => {
    console.log(`Selected row: ${id}`); // Debug log to confirm selection
    if (id === 'final' || !completedIds.has(id)) {
      setSelectedId(id)
      if (!userAnswers[id]) {
        const length = id === 'final' ? finalQuestion.answer.length : questions.find(q => q.id === id).answer.length
        setUserAnswers({ ...userAnswers, [id]: Array(length).fill('') })
      }
    }
  }

  const handleInputChange = (id, index, value) => {
    const upper = value.toUpperCase()
    if (upper.length > 1) return
    const newRow = [...(userAnswers[id] || [])]
    newRow[index] = upper
    const newAnswers = { ...userAnswers, [id]: newRow }
    setUserAnswers(newAnswers)

    if (newRow.every(c => c !== '')) {
      const entered = newRow.join('')
      if (id !== 'final') {
        const correct = questions.find(q => q.id === id).answer.toUpperCase()
        if (entered === correct) {
          setCompletedIds(new Set([...completedIds, id]))
          toast.success('Correct!')
        } else {
          toast.error('Incorrect!')
        }
      } else {
        const correct = finalQuestion.answer.toUpperCase()
        if (entered === correct) {
          toast.success('Congratulations! You won the game!')
          setGameWon(true)
        } else {
          toast.error('Incorrect final answer!')
        }
      }
    }
  }

  return (
    <div className="p-4 max-w-3xl mx-auto flex flex-col items-center">
      <QuestionDisplay
        question={
          selectedId
            ? selectedId === 'final'
              ? finalQuestion.question
              : questions.find(q => q.id === selectedId)?.question
            : 'Click a row to view the question'
        }
      />
      <CrosswordGrid
        questions={questions}
        finalQuestion={finalQuestion}
        selectedId={selectedId}
        userAnswers={userAnswers}
        completedIds={completedIds}
        handleRowClick={handleRowClick}
        handleInputChange={handleInputChange}
        gameWon={gameWon}
      />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App