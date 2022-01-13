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
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
/**
 * Port for backend.
 * @const {number}
 */
const port = process.env.PORT || 8080;

/**
 * Url to backend.
 * @const {String}
 */
//const url = `http://localhost:${port}/words`;
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
 * @class AdminPage
 * Represents a AdminPage.
 * <br>Class to build AdminPage component.
 * @extends React.Component
 */

class AdminPage extends React.Component {
  /**
   * Constructor to set states.
   * @constructor
   */
  constructor() {
    super();
    this.state = {
      english_word: "",
      finnish_word: "",
      words: [],
    };
  }

  /**
   * ComponentDidMount to load data from database when accesing page.
   */
  componentDidMount() {
    axios.get(url).then((res) => {
      const words = res.data;
      this.setState({ words });
    });
  }

  /**
   * Remove word from database.
   * <br> Reload data to show current content.
   * @param {String} e
   * @param {Object} word
   */
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

  /**
   * Update word in database.
   * <br> Reload data to show updated data.
   * @param {String} e
   * @param {Object} word
   */
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

  /**
   * Add new item to database with given words.
   * @param {String} event
   */
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

  /**
   * Update words value when typing.
   * @param {String} e
   */
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
                    <StyledTableCell>Englanniksi</StyledTableCell>
                    <StyledTableCell align="right">Suomeksi</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.words.map((word) => (
                    <StyledTableRow key={word.id}>
                      <StyledTableCell component="th" scope="row">
                        {word.english_word}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {word.finnish_word}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Button
                          variant="contained"
                          type="submit"
                          style={{ backgroundColor: "red" }}
                          onClick={(e) => this.removeWord(e, word)}
                        >
                          poista
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="right">
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
                      <StyledTableCell>Englanniksi</StyledTableCell>
                      <StyledTableCell align="right">Suomeksi</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row">
                        <TextField
                          type="text"
                          name="english_word"
                          value={english_word}
                          onChange={this.onChange}
                          size="small"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="right">
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
                  style={{ margin: "10px", backgroundColor: "green" }}
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
