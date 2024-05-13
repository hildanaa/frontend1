import React, { useState } from 'react';

const QuizQuestion = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (selectedOption) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = selectedOption;
    setUserAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResults(false);
  };

  const calculateScore = () => {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].correctAnswer) {
        score++;
      }
    }
    return score;
  };

  const score = calculateScore();

  return (
    <div>
      {!showResults ? (
        <>
          <h2>Quiz</h2>
          <p>Question {currentQuestion + 1} of {questions.length}</p>
          <p>{questions[currentQuestion].question}</p>

          <ul>
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={option}
                    checked={userAnswers[currentQuestion] === option}
                    onChange={() => handleAnswerSelect(option)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>

          <button className='btn btn-primary btn-sm' onClick={handleNextQuestion}>Next Question</button>
        </>
      ) : (
        <>
          <h2>Quiz Results</h2>
          <p>You scored {score} out of {questions.length}.</p>
          <button className='btn btn-primary btn-sm' onClick={handleResetQuiz}>Restart Quiz</button>
        </>
      )}
    </div>
  );
};

export default QuizQuestion;