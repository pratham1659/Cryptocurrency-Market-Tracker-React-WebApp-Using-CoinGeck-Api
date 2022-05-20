import React from "react";
import { Footer } from "../components";
import Banner from "../components/Banner/Banner";
import CoinsTable from "../components/CoinsTable";

const Cryptocurrencies = () => {
  return (
    <>
      <Banner />
      <CoinsTable />
      <Footer />
    </>
  );
};

export default Cryptocurrencies;
