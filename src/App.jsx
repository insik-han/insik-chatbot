import React from 'react'
import './assets/styles/style.css'
import defaultDataset from './dataset'
import { AnswersList, Chats } from './components'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",
      dataset: defaultDataset,
      open: false
    }
  }

  initAnswer = () => {
    const initDataset = this.state.dataset[this.state.currentId];
    const initAnswers = initDataset.answers;

    this.setState({
      answers: initAnswers
    })
  }

  initChats = () => {
    const initDataset = this.state.dataset[this.state.currentId];
    const chats = this.state.chats;
    chats.push({
      text: initDataset.question,
      type: 'question'
    })

    this.setState({
      chats: chats
    })
  }

  componentDidMount() {
    //렌더링 후 초기 데이터셋
    this.initAnswer();
    this.initChats();
  }

  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          <Chats chats={this.state.chats} />
          <AnswersList answers={this.state.answers} />
        </div>
      </section>
    )
  }
}
