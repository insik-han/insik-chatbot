import React from "react";
import "./assets/styles/style.css";
import defaultDataset, { IDataset } from "./dataset";

interface IProps {
  answers: string[];
  chats: string[];
  currentId: string;
  dataset: IDataset;
}

class App extends React.Component {
  constructor(props: IProps) {
    super(props);
    this.state = {
      answers: [], // 대답 데이터
      chats: [], // 채팅 데이터
      currentId: "init", // 현재 질문 ID
      dataset: { defaultDataset }, // 질문과 대답 데이터셋
      open: false, // 문의 오픈 관리
    };
  }
  render() {
    return (
      <section className="c-section">
        <div className="c-box"></div>
      </section>
    );
  }
}
export default App;
