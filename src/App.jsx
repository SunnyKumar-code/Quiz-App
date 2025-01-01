import React, { useState, useEffect } from "react";
import axios from "axios";
import Question from "./components/Question";
import Score from "./components/Score";
import Loader from "./components/Loader";
import "./App.css";

const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  // Fetch questions using Axios
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(API_URL);
        const formattedQuestions = response.data.results.map((question) => ({
          question: question.question,
          answers: shuffleAnswers([
            ...question.incorrect_answers,
            question.correct_answer,
          ]),
          correctAnswer: question.correct_answer,
        }));
        setQuestions(formattedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  // Timer logic
  useEffect(() => {
    if (timer > 0 && !isQuizComplete) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (!isQuizComplete) {
      handleNextQuestion();
    }
  }, [timer, isQuizComplete]);

  // Shuffle answers
  const shuffleAnswers = (answers) => answers.sort(() => Math.random() - 0.1);

  // Handle user selecting an answer
  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    handleNextQuestion();
  };

  // Handle moving to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(10);
    } else {
      setIsQuizComplete(true);
    }
  };

  // Restart quiz
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimer(10);
    setIsQuizComplete(false);
  };

  if (questions.length === 0) {
    return <Loader />;
  }

  if (isQuizComplete) {
    return (
      <Score
        score={score}
        totalQuestions={questions.length}
        restartQuiz={restartQuiz}
      />
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h1>Quiz App</h1>
      <Question
        question={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        handleAnswer={handleAnswer}
      />
      <p>Time Remaining: {timer}s</p>
    </div>
  );
}

export default App;
