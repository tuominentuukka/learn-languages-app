import React from "react";
import "./App.css";
import axios from "axios";

const url = `http://localhost:8080/words`;

class LearningPage extends React.Component {
  constructor() {
    super();
    this.state = { words: [], answers: [], score: [0] };
  }
  //state = { words: [], answers: [] };
  componentDidMount() {
    axios.get(url).then((res) => {
      const words = res.data;
      this.setState({ words });
    });
  }

  async addAnswer(word) {
    let rightAnswer = [];
    let answers = [...this.state.answers];
    let answer = [...[word.id]];
    let score = [...this.state.score];
    answer = this.state.answer;
    answers[word.id] = await answer;
    this.setState({ answers });
    rightAnswer = await this.state.words.find(
      (word) =>
        word.id === answers.indexOf(this.state.answers[word.id]) &&
        word.finnish_word === answer
    );

    if (rightAnswer.finnish_word === answer) {
      score[0] = score[0] + 1;
      this.setState({ score });
    }
    console.log(score);
  }

  render() {
    return (
      <div className="content">
        <ul>
          {this.state.words.map((word) => (
            <li key={word.id}>
              {word.english_word} -{" "}
              <input
                type="text"
                onChange={(event) => {
                  this.setState({ answer: event.target.value });
                }}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    this.addAnswer(word);
                  }
                }}
              ></input>
            </li>
          ))}
        </ul>
        <h3>
          score = {this.state.score[0]}/{this.state.words.length}
        </h3>
      </div>
    );
  }
}

export default LearningPage;
