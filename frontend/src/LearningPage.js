import React from "react";
import "./App.css";
import axios from "axios";

const url = `http://localhost:8080/words`;

class LearningPage extends React.Component {
  state = { words: [] };
  async componentDidMount() {
    axios.get(url).then((res) => {
      const words = res.data;
      this.setState({ words });
    });
  }
  render() {
    return (
      <div className="content">
        <ul>
          {this.state.words.map((word) => (
            <li key={word.id}>
              {word.english_word} - <input></input>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default LearningPage;
