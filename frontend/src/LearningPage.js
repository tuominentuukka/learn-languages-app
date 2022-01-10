import React from "react";
import "./App.css";

class LearningPage extends React.Component {
  state = { words: [] };
  async componentDidMount() {
    let hr = await fetch("http://localhost:8080/words");
    let json = await hr.json();
    this.setState({ words: json });
  }
  render() {
    if (this.state.words.length === 0) {
      return <p>loading...</p>;
    } else {
      let ui = this.state.words.map((word) => (
        <li key={word.id}>
          {word.id} - {word.english_word} - {word.finnish_word}
        </li>
      ));
      return <ul>{ui}</ul>;
    }
  }
}

export default LearningPage;
