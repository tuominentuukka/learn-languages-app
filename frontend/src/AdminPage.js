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
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
const port = process.env.PORT || 8080;
const url = `http://localhost:${port}/words`;

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
  componentDidMount() {
    axios.get(url).then((res) => {
      const words = res.data;
      this.setState({ words });
    });
  }

  removeWord = (e, word) => {
    axios
      .delete(url + `/${word.id}`)
      .then((res) => {
        this.setState((previousState) => {
          return {
            words: previousState.words.filter(
              (previous) => previous.id !== word.id
            ),
          };
        });
      })
      .catch((err) => {});
  };

  updateWord = (e, word) => {
    e.preventDefault();
    const { english_word, finnish_word } = this.state;
    let data = {
      english_word: english_word,
      finnish_word: finnish_word,
      id: word.id,
    };
    axios
      .put(url, data)
      .then((res) => {
        axios.get(url).then((res) => {
          const words = res.data;
          this.setState({ words });
        });
        this.setState({ english_word: "", finnish_word: "" });
      })
      .catch((err) => {});
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { english_word, finnish_word } = this.state;

    axios.post(url, { english_word, finnish_word }).then((res) => {
      axios.get(url).then((res) => {
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
      <Box className="body">
        <Box className="content">
          <Box className="list">
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
                    <StyledTableCell style={style}></StyledTableCell>
                    <StyledTableCell style={style}></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.words.map((word) => (
                    <StyledTableRow key={word.id}>
                      <StyledTableCell component="th" scope="row" style={style}>
                        {word.english_word}
                      </StyledTableCell>
                      <StyledTableCell align="right" style={style}>
                        {word.finnish_word}
                      </StyledTableCell>
                      <StyledTableCell align="right" style={style}>
                        <Button
                          variant="contained"
                          type="submit"
                          style={{ backgroundColor: "red" }}
                          onClick={(e) => this.removeWord(e, word)}
                        >
                          poista
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="right" style={style}>
                        <Button
                          variant="contained"
                          type="submit"
                          onClick={(e) => this.updateWord(e, word)}
                        >
                          päivitä
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box className="form">
            <TableContainer
              component={Paper}
              style={{ maxWidth: "540px", textAlign: "center", margin: "auto" }}
            >
              <form onSubmit={this.onSubmit}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell style={style}>
                        Englanniksi
                      </StyledTableCell>
                      <StyledTableCell align="right" style={style}>
                        Suomeksi
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row" style={style}>
                        <TextField
                          type="text"
                          name="english_word"
                          value={english_word}
                          onChange={this.onChange}
                          size="small"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="right" style={style}>
                        <TextField
                          type="text"
                          name="finnish_word"
                          value={finnish_word}
                          size="small"
                          onChange={this.onChange}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
                <Button
                  variant="contained"
                  type="submit"
                  style={(style, { margin: "10px", backgroundColor: "green" })}
                >
                  {" "}
                  lisää{" "}
                </Button>
              </form>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default AdminPage;
