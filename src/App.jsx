import React from "react"
import "./assets/styles/style.css"
import { AnswersList, Chats } from "./components"
import { FormDialog } from "./components/forms";
import { db } from './firebase/index'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",
      dataset: {},
      open: false
    }
    this.selectAnswer = this.selectAnswer.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats;
    chats.push({
      text: this.state.dataset[nextQuestionId].question,
      type: "question"
    })
    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentId: nextQuestionId
    })
  }

  selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case (nextQuestionId === "init"):
        setTimeout(() => this.displayNextQuestion(nextQuestionId), 500);
        break;
      case (nextQuestionId === 'contact'):
        this.handleClickOpen();
        break;
      case (/^https:*/.test(nextQuestionId)):
        // 정규식에서 ^* : 앞글자가 *인 것. 
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank';
        a.click();
        break;
      default:
        const chats = this.state.chats;
        chats.push({
          text: selectedAnswer,
          type: "answer"
        })
        this.setState({
          chats: chats
        })
        setTimeout(() => this.displayNextQuestion(nextQuestionId), 500);
        break;
    }
  }

  initDataset = (dataset) => {
    this.setState({ dataset: dataset })
  }

  componentDidMount() {
    (async () => {
      const dataset = this.state.dataset;
      await db.collection('questions').get().then(snapshots => {
        snapshots.forEach(doc => {
          const id = doc.id;
          const data = doc.data()
          dataset[id] = data
        })
      })
      this.initDataset(dataset)
      const initAnswer = "";
      this.selectAnswer(initAnswer, this.state.currentId);
    })();
  }


  componentDidUpdate() {
    const scrollArea = document.querySelector("#scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
    //scrollHeight: 스크롤바가 있는 컨텐츠의 높이
    //scrollTop: 가려진 스크롤바 컨텐츠의 윗부분
    //scrollTop에 scrollHeight를 넣으면 기존의 높이만큼 화면이 내려감
  }

  handleClickOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          <Chats chats={this.state.chats} />
          <AnswersList answers={this.state.answers} select={this.selectAnswer} />
          <FormDialog
            open={this.state.open}
            handleClose={this.handleClose}
            handleClickOpen={this.handleClickOpen}
          />
        </div>
      </section>
    )
  }
}
