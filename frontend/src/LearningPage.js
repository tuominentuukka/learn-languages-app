import React from "react";
import Button from "@mui/material/Button";
import LearningPageFinnish from "./LearningPageFinnish";
import LearningPageEnglish from "./LearningPageEnglish";

class LearningPage extends React.Component {
  constructor() {
    super();
    this.state = {
      words: [],
      answers: [],
      score: [0],
      finnish: false,
      english: false,
    };
    this._onButtonClick = this._onButtonClick.bind(this);
    this._onButtonClick2 = this._onButtonClick2.bind(this);
  }
  _onButtonClick() {
    this.setState({
      finnish: false,
      english: true,
    });
    console.log(this._onButtonClick);
  }
  _onButtonClick2() {
    this.setState({
      finnish: true,
      english: false,
    });
    console.log(this._onButtonClick2);
  }

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          name="finnish"
          style={{ marginTop: "20px", marginRight: "20px" }}
          onClick={this._onButtonClick}
        >
          Kirjoita suomeksi
        </Button>
        <Button
          variant="outlined"
          name="english"
          style={{ marginTop: "20px", marginLeft: "20px" }}
          onClick={this._onButtonClick2}
        >
          Kirjoita englanniksi
        </Button>
        <div>
          {this.state.finnish ? <LearningPageFinnish /> : null}
          {this.state.english ? <LearningPageEnglish /> : null}
        </div>
      </div>
    );
  }
}

export default LearningPage;
