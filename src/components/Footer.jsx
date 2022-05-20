import React from "react";
import { Typography } from "antd";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <Typography.Title
        level={5}
        style={{ color: "white", textAlign: "center" }}>
        Copyright © 2021
        <Link to="/" style={{ textDecoration: "none" }}>
          &nbsp;FuzionX-Network Inc.
        </Link>
        <br />
        All Rights Reserved.
      </Typography.Title>
    </div>
  );
};

export default Footer;
