import React, { useRef, useState } from "react";
import "./App.css";
import { quizzes } from "./data";
import AnswerDialog from "./Dialog";
import EndDialog from "./EndDialog";
import { nextQuestion, prevQuestion, submitAnswer, closeDialog, restartQuiz } from "./Utils";


export default function Main() {
  const [questions ,setQuestions]=useState(quizzes)
  const [current, setCurrent] = useState(questions[0]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isEnd, setIsEnd] = useState(false);
  let correctCount =useRef(0);

  function onSelected(question) {
    setCurrent(question);
  }

  function onSelectedAnswer(answer) {
    setSelectedAnswer(answer);
  }


  function next() {
    nextQuestion(current, questions, setCurrent);
  }
  
  function prev() {
    prevQuestion(current, questions, setCurrent);
  }
  
  function submit(value) {
    submitAnswer(value, current, setCurrent, setSelectedAnswer, correctCount, setIsEnd, questions);
  }
  
  function close() {
    closeDialog(setSelectedAnswer);
  }
  
  function restart() {
    restartQuiz(questions, setQuestions, setCurrent, setSelectedAnswer, setIsEnd, correctCount);
  }

  return (
    <div className="main">
      <AnswerDialog
        selectedAnswer={selectedAnswer}
        onSubmit={submit}
        onClose={close}
      />

      <EndDialog
        isEnd={isEnd}
        correctCount={correctCount}
        restart={restart}
      />
      <h3>Quiz title</h3>
      <div className="main-first">
        <div className="left">
          {current && (
            <div className="question">
              <h2>Question {current.id} </h2>
              <h3>{current.title}</h3>
            </div>
          )}

          <div className="answers">
            {current && current.answers.map((answer, index) => (
                <div key={index}>
                  {Object.entries(answer).map(([answer, value]) => (
                    <h4 key={index}
                      className={
                        "answer" +
                        (current.answered !== null ? " answeredd" : "") +
                        (current.answered !== current.trueIndex &&
                        current.answered === index
                          ? " incorrect"
                          : "") +
                        ((current.answered === index &&
                          current.answered === current.trueIndex) ||
                        (current.answered !== null &&
                          index === current.trueIndex &&
                          current.answered !== index)
                          ? " correct"
                          : "")
                      }
                      onClick={() => {
                        onSelectedAnswer(value);
                      }}
                    >
                      {value}
                    </h4>
                  ))}
                </div>
              ))}
            {current !== null && (
              <div className="buttons">
                <button
                  onClick={prev}
                  disabled={current.id > 1 ? null : "disabled"}
                >
                  Prev
                </button>
                <button
                  onClick={next}
                  disabled={current.id < questions.length ? null : "disabled"}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>

        {current && (
          <div className="right">
            <p>Question {current.id}/10 </p>
            <div className="questions">
              {questions &&
                questions.map((question, index) => (
                  <div
                    className={
                      "question-circle" +
                      (question.answered !== null ? " answered" : "") +
                      (question.id === current.id ? " active" : "")
                    }
                    onClick={() => {
                      onSelected(question);
                    }}
                    key={index}
                  >
                    <h4>{question.id}</h4>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
