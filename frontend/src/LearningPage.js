/**
 * @author Tuukka Tuominen
 * @version 1.0.0
 */

import React from "react";
import Button from "@mui/material/Button";
import LearningPageFinnish from "./LearningPageFinnish";
import LearningPageEnglish from "./LearningPageEnglish";

/**
 * @class LearningPage
 * Represents a LearningPage.
 * <br>Class to choose which learning page to show.
 * @extends React.Component
 */
class LearningPage extends React.Component {
  /**
   * Constructor to set states.
   * @constructor
   */
  constructor() {
    super();
    this.state = {
      words: [],
      answers: [],
      score: [0],
      finnish: false,
      english: false,
    };
    this._onButtonClickFinnish = this._onButtonClickFinnish.bind(this);
    this._onButtonClickEnglish = this._onButtonClickEnglish.bind(this);
  }

  /**
   * Set page to show finnish writing version.
   */
  _onButtonClickFinnish() {
    this.setState({
      finnish: true,
      english: false,
    });
  }

  /**
   * Set page to show english writing version.
   */
  _onButtonClickEnglish() {
    this.setState({
      finnish: false,
      english: true,
    });
  }

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          name="finnish"
          style={{ marginTop: "20px", marginRight: "20px" }}
          onClick={this._onButtonClickFinnish}
        >
          Kirjoita suomeksi
        </Button>
        <Button
          variant="outlined"
          name="english"
          style={{ marginTop: "20px", marginLeft: "20px" }}
          onClick={this._onButtonClickEnglish}
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
