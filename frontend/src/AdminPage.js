import React from "react";
import "./App.css";
import axios from "axios";

class AdminPage extends React.Component {
  constructor() {
    super();
    this.state = {
      english_word: "",
      finnish_word: "",
      words: [],
    };
  }
  //state = { words: [] };
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

  onSubmit = (event) => {
    event.preventDefault();
    const { english_word, finnish_word } = this.state;

    axios.post("/words", { english_word, finnish_word }).then((res) => {
      console.log(res);
      console.log(res.data);
      axios.get(`/words`).then((res) => {
        const words = res.data;
        this.setState({ words });
      });
      this.setState({ english_word: "", finnish_word: "" });
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { english_word, finnish_word } = this.state;
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
        <div className="form">
          <form onSubmit={this.onSubmit}>
            <label>
              {" "}
              englanniksi:
              <input
                type="text"
                name="english_word"
                value={english_word}
                onChange={this.onChange}
              />
            </label>
            <label>
              {" "}
              suomeksi:
              <input
                type="text"
                name="finnish_word"
                value={finnish_word}
                onChange={this.onChange}
              />
            </label>
            <button type="submit"> lisää </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AdminPage;
