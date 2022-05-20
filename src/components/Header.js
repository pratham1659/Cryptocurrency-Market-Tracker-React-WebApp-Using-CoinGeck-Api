import React, { useState, useEffect } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  ThemeProvider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { createTheme } from "@material-ui/core/styles";
import { CryptoState } from "../AppContext";

const useStyles = makeStyles({
  title: {
    flex: 1,
    // color: "#2862ff",
    // fontFamily: "Montserrat",
    fontSize: "25px",
    fontWeight: "bold",
    cursor: "pointer",
  },
});

const Header = () => {
  //NewMenuItems
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  //Previous Work
  const classes = useStyles();
  const history = useHistory();

  const { currency, setCurrency } = CryptoState();

  console.log(currency);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar
        color="transparent"
        position="static"
        style={{ borderBottom: "1px solid grey" }}>
        <Container>
          <Toolbar>
            <Typography
              onClick={() => history.push("/")}
              className={classes.title}>
              FuzionX-Network
            </Typography>
            <div className="menu-link">
              <ul>
                <li>
                  <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                </li>
                <li>
                  <Link to="/exchanges">Exchanges</Link>
                </li>
                <li>
                  <Link to="/news">News</Link>
                </li>
              </ul>
            </div>

            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}>
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
