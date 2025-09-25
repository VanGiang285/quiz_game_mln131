const CrosswordGrid = ({
  questions,
  finalQuestion,
  selectedId,
  userAnswers,
  completedIds,
  handleRowClick,
  handleInputChange,
  gameWon
}) => {
  return (
    <div className="flex flex-col gap-3 mt-6 w-full max-w-2xl shadow-lg p-6 bg-white rounded-lg">
      {questions.map(q => {
        const id = q.id;
        const isCompleted = completedIds.has(id);
        const isSelected = selectedId === id;
        const rowAnswers = userAnswers[id] || Array(q.answer.length).fill('');
        return (
          <div
            key={id}
            className={`flex items-center gap-4 p-2 rounded-md ${isCompleted ? 'bg-green-100' : 'bg-gray-50'} hover:bg-gray-100 cursor-pointer`}
            onClick={() => handleRowClick(id)} // vẫn giữ click cả dòng
          >
            <span className="w-10 text-right font-semibold text-gray-700">{q.id}.</span>
            <div className="flex rounded-md overflow-hidden">
              {rowAnswers.map((char, index) => (
                <input
                  key={index}
                  type="text"
                  value={isCompleted ? q.answer[index].toUpperCase() : char}
                  onFocus={() => handleRowClick(id)}   // 👈 khi click vào input -> chọn dòng + hiển thị câu hỏi
                  onChange={e =>
                    !isCompleted ? handleInputChange(id, index, e.target.value) : null
                  }
                  className={`w-12 h-12 border border-gray-300 text-center uppercase font-bold text-xl
                    ${isCompleted && index === q.revealColumn - 1 ? 'bg-yellow-200' : ''}
                    ${isSelected ? 'bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50'}
                    disabled:cursor-pointer disabled:bg-green-100`}
                  maxLength={1}
                  disabled={isCompleted}   // 👈 chỉ khóa khi đã hoàn thành, không cần chọn dòng nữa
                />
              ))}
            </div>
          </div>
        );
      })}
      <h3 className="font-bold text-lg mt-6 mb-2 text-center text-gray-800">Final Question</h3>
      <div
        className={`flex justify-center border-2 border-black rounded-md overflow-hidden p-1 ${gameWon ? 'bg-green-100' : 'bg-gray-50'} hover:bg-gray-100 cursor-pointer`}
        onClick={() => handleRowClick('final')}
      >
        {Array(finalQuestion.answer.length).fill(0).map((_, index) => (
          <input
            key={index}
            type="text"
            value={
              gameWon
                ? finalQuestion.answer[index].toUpperCase()
                : (userAnswers['final'] || [])[index] || ''
            }
            onFocus={() => handleRowClick('final')}   // 👈 click input -> hiển thị câu hỏi Final
            onChange={e =>
              !gameWon ? handleInputChange('final', index, e.target.value) : null
            }
            className="w-12 h-12 border border-gray-300 text-center uppercase font-bold text-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-pointer disabled:bg-green-100"
            maxLength={1}
            disabled={gameWon}   // 👈 chỉ khóa khi đã thắng
          />
        ))}
      </div>
    </div>
  );
};

export default CrosswordGrid;
