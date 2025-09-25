const QuestionDisplay = ({ question }) => {
  return (
    <div className="mb-4 p-4 bg-gray-100 rounded shadow">
      <h2 className="font-bold text-lg mb-2">Câu hỏi hiện tại:</h2>
      <p className="text-base">{question}</p>
    </div>
  )
}

export default QuestionDisplay