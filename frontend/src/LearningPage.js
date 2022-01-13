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

const url = `http://localhost:8080/words`;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  maxWidth: "70px",
  textAlign: "center",
  margin: "auto",
};

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

    if (rightAnswer !== undefined && rightAnswer.finnish_word === answer) {
      score[0] = score[0] + 1;
      this.setState({ score });
    }
    console.log(rightAnswer, score);
  }

  render() {
    return (
      <div className="content">
        <TableContainer
          component={Paper}
          style={{ maxWidth: "800px", textAlign: "center", margin: "auto" }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell style={style}>Englanniksi</StyledTableCell>
                <StyledTableCell align="right" style={style}>
                  Suomeksi
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.words.map((word) => (
                <StyledTableRow key={word.id}>
                  <StyledTableCell component="th" scope="row" style={style}>
                    {word.english_word}
                  </StyledTableCell>
                  <StyledTableCell align="right" style={style}>
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
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <h3>
          score = {this.state.score[0]}/{this.state.words.length}
        </h3>
      </div>
    );
  }
}

export default LearningPage;
