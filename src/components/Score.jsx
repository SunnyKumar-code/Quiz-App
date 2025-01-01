const Score = ({ score, totalQuestions, restartQuiz })=>{
    return(
        <div className="quiz-complete">
        <h1>Quiz Complete</h1>
        <p>
          Your Score: {score} / {totalQuestions}
        </p>
        <button onClick={restartQuiz}>Restart Quiz</button>
      </div>
    )
}
export  default Score