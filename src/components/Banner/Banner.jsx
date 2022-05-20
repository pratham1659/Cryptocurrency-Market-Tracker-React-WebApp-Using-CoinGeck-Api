import React from "react";
import { makeStyles, Container, Typography } from "@material-ui/core";
import Carousel from "./Carousel";

const useStyles = makeStyles({
  banner: {
    backgroundColor: "#20222d",
  },
  bannerContent: {
    height: 250,
    display: "flex",
    flexDirection: "column",
    paddingTop: 15,
    marginTop: 1,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
});

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h3"
            style={{
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Welcome To FuzionX-Network
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get All the Info Regarding Your favorite CryptoCurrency.
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
