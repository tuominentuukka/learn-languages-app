/**
 * @author Tuukka Tuominen
 * @version 1.0.0
 */

import React from "react";
import "./App.css";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

/**
 * Url to backend.
 * @const {String}
 */
const url = `/words`;

/**
 * Styling for table cells.
 * @const {style}
 */
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  [`&`]: { maxWidth: "70px", textAlign: "center", margin: "auto" },
}));

/**
 * Styling for table rows.
 * @const {style}
 */
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

/**
 * @class LearningPageEnglish
 * Represents a LearningPageEnglish.
 * <br>class to build learningPage component
 * @extends React.Component
 */
class LearningPageEnglish extends React.Component {
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
    };
  }

  /**
   * componentDidMount to load data from database when accesing page
   */
  componentDidMount() {
    axios.get(url).then((res) => {
      const words = res.data;
      let array = [];
      words.map((word) => array.push(word));
      this.setState({ words: array });
    });
  }

  /**
   * AddAnswer method to check user input and compare it to
   * databases correct answer. <br>Add point if answer is correct.
   *@param {Object} word - Current word to be compared.
   */
  async addAnswer(word) {
    let rightAnswer = [];
    let answers = [...this.state.answers];
    let answer = await [...[word.id]];
    let score = [...this.state.score];
    answer = this.state.answer;
    answers[word.id] = answer;
    this.setState({ answers });

    rightAnswer = await this.state.words.find(
      (word) =>
        word.id === answers.indexOf(this.state.answers[word.id]) &&
        word.english_word === answer
    );

    if (rightAnswer !== undefined && rightAnswer.english_word === answer) {
      score[0] = score[0] + 1;
      this.setState({ score });
    }
  }

  render() {
    return (
      <Box className="content">
        <Typography component="div">
          <Box sx={{ fontSize: "h3.fontSize", m: 1 }}>Harjoittele sanoja</Box>
        </Typography>

        <TableContainer
          component={Paper}
          style={{ maxWidth: "800px", textAlign: "center", margin: "auto" }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">Suomeksi</StyledTableCell>
                <StyledTableCell>Englanniksi</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.words.map((word) => (
                <StyledTableRow key={word.id}>
                  <StyledTableCell component="th" scope="row">
                    {word.finnish_word}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <TextField
                      type="text"
                      size="small"
                      onChange={(event) => {
                        this.setState({ answer: event.target.value });
                      }}
                      onKeyPress={(event) => {
                        if (event.key === "Enter") {
                          this.addAnswer(word);
                        }
                      }}
                    ></TextField>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography component="div">
          <Box sx={{ fontSize: "h5.fontSize", m: 1 }}>
            {" "}
            Pisteesi = {this.state.score[0]}/{this.state.words.length}
          </Box>
        </Typography>
      </Box>
    );
  }
}

export default LearningPageEnglish;
