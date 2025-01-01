const Question= ({ question, currentQuestionIndex, totalQuestions, handleAnswer })=>{
    return(
        <div className="question-section">
        <h2>
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </h2>
        <h3 dangerouslySetInnerHTML={{ __html: question.question }} />
        <ul className="answer-options">
          {question.answers.map((answer, index) => (
            <li
              key={index}
              onClick={() => handleAnswer(answer)}
              dangerouslySetInnerHTML={{ __html: answer }}
              className="answer-option"
            />
          ))}
        </ul>
      </div>
    )
}
export  default Question