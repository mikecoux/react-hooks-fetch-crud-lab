import React, { useState } from "react";
import QuestionItem from "./QuestionItem"

function QuestionList({ questions }) {
  //Do I need state for these?
  const [removedQuestions, setRemovedQuestions] = useState([])
  const [changedQuestion, setChangedQuestion] = useState('')

  function handleDeleteQuestion(key) {
    setRemovedQuestions([...removedQuestions, key]);
    fetch(`http://localhost:4000/questions/${key}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    });
  }

  function handleChangeQuestion(e, key) {
    let correctedIndexObj = {
      correctIndex: e.target.value
    }
    fetch(`http://localhost:4000/questions/${key}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(correctedIndexObj)
    })
      .then(res => res.json())
      .then(data => setChangedQuestion(data))
  }

  const allQuestions = questions
  .filter((question) => {
    return !removedQuestions.includes(question.id)
  })
  .map((question) => {
    if(changedQuestion.id === question.id) {
      return changedQuestion
    } else {
      return question
    }
  })
  .map((question) => {
    return <QuestionItem key={question.id} question={question} onDeleteQuestion={handleDeleteQuestion} onChangeQuestion={handleChangeQuestion}/>
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{allQuestions}</ul>
    </section>
  );
}

export default QuestionList;
