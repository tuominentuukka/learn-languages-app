import React from "react";
import "./App.css";
import axios from "axios";

class AdminPage extends React.Component {
  state = { words: [] };
  async componentDidMount() {
    axios.get(`/words`).then((res) => {
      const words = res.data;
      this.setState({ words });
    });
  }

  removeWord = (e, word) => {
    const url = `/words/${word.id}`;
    axios
      .delete(url)
      .then((res) => {
        this.setState((previousState) => {
          return {
            words: previousState.words.filter((m) => m.id !== word.id),
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="content">
        <div className="list">
          <ul>
            {this.state.words.map((word) => (
              <li key={word.id}>
                {word.english_word} - {word.finnish_word}{" "}
                <button type="submit" onClick={(e) => this.removeWord(e, word)}>
                  poista sana
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="form"></div>
      </div>
    );
  }
}

export default AdminPage;
