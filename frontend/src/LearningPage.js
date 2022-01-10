import React from "react";
import "./App.css";
import axios from "axios";

class LearningPage extends React.Component {
  state = { words: [] };
  async componentDidMount() {
    axios.get(`/words`).then((res) => {
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
              {word.english_word} - {word.finnish_word}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default LearningPage;
