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
            words: previousState.words.filter((m) => m.id !== word.id),
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateWord = (e, word) => {
    e.preventDefault();
    const { english_word, finnish_word } = this.state;
    let data = {
      english_word: english_word,
      finnish_word: finnish_word,
      id: word.id,
    };
    console.log(word.id);
    axios
      .put(url, data)
      .then((res) => {
        console.log(res.data);
        axios.get(url).then((res) => {
          const words = res.data;
          this.setState({ words });
        });
        this.setState({ english_word: "", finnish_word: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { english_word, finnish_word } = this.state;

    axios.post(url, { english_word, finnish_word }).then((res) => {
      console.log(res);
      console.log(res.data);
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
      <div className="body">
        <div className="content">
          <div className="list">
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
                        <button
                          type="submit"
                          onClick={(e) => this.removeWord(e, word)}
                        >
                          poista
                        </button>
                      </StyledTableCell>
                      <StyledTableCell align="right" style={style}>
                        <button
                          type="submit"
                          onClick={(e) => this.updateWord(e, word)}
                        >
                          päivitä
                        </button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="form">
            <form onSubmit={this.onSubmit}>
              <label>
                <h1>Lisää sana tai muokkaa haluamaasi</h1>
              </label>
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
      </div>
    );
  }
}

export default AdminPage;
