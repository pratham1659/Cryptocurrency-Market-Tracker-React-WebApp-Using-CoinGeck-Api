import "./App.css";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { Header } from "./components";
import { HomePage, CryptoDetails, Cryptocurrencies, CoinPage, Exchanges, News } from "./pages";
import { makeStyles } from "@material-ui/core/styles";


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
        <Route exact path="/crypto/:coinId" component={CryptoDetails} />
        <Route path="/Cryptocurrencies" component={Cryptocurrencies} exact />
        <Route path="/coins/:id" component={CoinPage} exact />
        <Route exact path="/exchanges" component={Exchanges} />
        <Route path="/news" component={News} />
      </div>
    </BrowserRouter>
  );
}

export default App;
