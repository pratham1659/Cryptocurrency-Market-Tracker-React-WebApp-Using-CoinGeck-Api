import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
  Box,
  Grid,
} from "@material-ui/core";
import axios from "axios";
import { CoinList } from "../config/api";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../AppContext";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();

  const useStyles = makeStyles({
    row: {
      backgroundColor: "#1e222d",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#2a2e39",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "white",
      },
      table: {
        minWidth: 650,
        width: 700,
      },
    },
  });

  const classes = useStyles();
  const history = useHistory();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 20, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "50%", textDecoration: "none" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Grid container justifyContent="center">
          <Box sx={{ width: "70%", justifyContent: "center" }}>
            <Paper sx={{ width: "100%" }}>
              <TableContainer component={Paper}>
                {loading ? (
                  <LinearProgress style={{ backgroundColor: "#2863ff" }} />
                ) : (
                  <Table
                    aria-label="simple table"
                    className={classes.table}
                    size="small"
                    sx={{ minWidth: 300 }}
                  >
                    <TableHead style={{ backgroundColor: "#2863ff" }}>
                      <TableRow>
                        {["Coin", "Price", "24h Change", "Market Cap"].map(
                          (head) => (
                            <TableCell
                              style={{
                                color: "white",
                                fontWeight: "700",
                                fontSize: "15px",
                                fontFamily: "Montserrat",
                              }}
                              key={head}
                              align={head === "Coin" ? "" : "right"}
                            >
                              {head}
                            </TableCell>
                          )
                        )}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {handleSearch()
                        .slice((page - 1) * 10, (page - 1) * 10 + 10)
                        .map((row) => {
                          const profit = row.price_change_percentage_24h > 0;
                          return (
                            <TableRow
                              onClick={() => history.push(`/coins/${row.id}`)}
                              className={classes.row}
                              key={row.name}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                style={{
                                  display: "flex",
                                  gap: 15,
                                }}
                              >
                                <img
                                  src={row?.image}
                                  alt={row.name}
                                  height="30"
                                  style={{ marginBottom: 10 }}
                                />
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <span
                                    style={{
                                      textTransform: "uppercase",
                                      fontSize: 15,
                                    }}
                                  >
                                    {row.symbol}
                                  </span>
                                  <span style={{ color: "darkgrey" }}>
                                    {row.name}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{ fontSize: "15px" }}
                              >
                                {symbol}
                                {numberWithCommas(row.current_price.toFixed(2))}
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{
                                  color:
                                    profit > 0 ? "rgb(14, 203, 129)" : "red",
                                  fontWeight: 500,
                                  fontSize: "15px",
                                }}
                              >
                                {profit && "+"}
                                {row.price_change_percentage_24h.toFixed(2)}%
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{ fontSize: "15px" }}
                              >
                                {symbol}
                                {numberWithCommas(
                                  row.market_cap.toString().slice(0, -6)
                                )}
                                M
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                )}
              </TableContainer>
            </Paper>
          </Box>
        </Grid>

        {/* Comes from @material-ui/lab */}
        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            color: "#2863ff",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
}
