import "./App.css";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { Header } from "./components";
import HomePage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";
import { makeStyles } from "@material-ui/core/styles";
import { Layout, Typography, Space } from 'antd';


function App() {
  const useStyles = makeStyles({
    App: {
      backgroundColor: "#131722",
      color: "white",
      minHeight: "100vh",
      // TableColor: "#20222d"
    },
  });

  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Route path="/" component={HomePage} exact />
        <Route path="/coins/:id" component={CoinPage} exact />
      </div>
    </BrowserRouter>
  );
}

export default App;
