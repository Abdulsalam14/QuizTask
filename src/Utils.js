
export function nextQuestion(current, questions, setCurrent) {
    if (current !== null) {
      const id = current.id;
      const nextQuestion = questions.find((question) => question.id === id + 1);
      setCurrent(nextQuestion);
    }
  }
  
  export function prevQuestion(current, questions, setCurrent) {
    if (current !== null) {
      const id = current.id;
      const prevQuestion = questions.find((question) => question.id === id - 1);
      setCurrent(prevQuestion);
    }
  }
  
  export function submitAnswer(value, current, setCurrent, setSelectedAnswer, correctCount, setIsEnd, questions) {
    const answeredId = current.answers.findIndex((answerObj) => Object.values(answerObj)[0] === value);
    current.answered = answeredId;
    if (current.answered === current.trueIndex) correctCount.current++;
    setCurrent(current);
    setSelectedAnswer(null);
    
    const isEnd = questions.every((question) => question.answered !== null);
    if (isEnd) setIsEnd(true);
  }
  
  export function closeDialog(setSelectedAnswer) {
    setSelectedAnswer(null);
  }
  
  export function restartQuiz(questions, setQuestions, setCurrent, setSelectedAnswer, setIsEnd, correctCount) {
    const updatedQuestions = questions.map((question) => ({ ...question, answered: null }));
    setQuestions(updatedQuestions);
    setCurrent(updatedQuestions[0]);
    setSelectedAnswer(null);
    setIsEnd(false);
    correctCount.current = 0;
  }
  