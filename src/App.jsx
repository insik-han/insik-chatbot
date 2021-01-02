import React, { useState, useEffect, useCallback } from "react"
import "./assets/styles/style.css"
import { AnswersList, Chats } from "./components"
import { FormDialog } from "./components/forms";
import { db } from './firebase/index'

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState("init");
  const [dataset, setDataset] = useState({});
  const [open, setOpen] = useState(false);

  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    addChats({
      text: nextDataset.question,
      type: "question"
    })
    setAnswers(nextDataset.answers);
    setCurrentId(nextQuestionId);
  }

  const selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case (nextQuestionId === 'contact'):
        handleClickOpen();
        break;
      case (/^https:*/.test(nextQuestionId)):
        // 정규식에서 ^* : 앞글자가 *인 것. 
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank';
        a.click();
        break;
      default:
        addChats({
          text: selectedAnswer,
          type: "answer"
        })
        console.log(chats);
        setTimeout(() => displayNextQuestion(nextQuestionId), dataset[nextQuestionId], 500);
        break;
    }
  }

  const addChats = (chat) => setChats(prevChats => [...prevChats, chat]);

  useEffect(() => {
    (async () => {
      const initDataset = {};
      await db.collection('questions').get().then(snapshots => {
        snapshots.forEach(doc => {
          const id = doc.id;
          const data = doc.data();
          initDataset[id] = data;
        })
      })
      setDataset();
      displayNextQuestion(currentId, initDataset[currentId]);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const scrollArea = document.querySelector("#scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  return (
    <section className="c-section">
      <div className="c-box">
        <Chats chats={chats} />
        <AnswersList answers={answers} select={selectAnswer} />
        <FormDialog
          open={open}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
        />
      </div>
    </section>
  )
}

export default App;