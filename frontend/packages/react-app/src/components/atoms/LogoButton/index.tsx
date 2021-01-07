import * as React from "react";
import { Link } from "react-router-dom";

const LogoButton: React.FC = () => (
  <Link to="/" style={{ textDecoration: "none" }}>
    <img
      src={`${window.location.origin}/iroiro_logo.svg`}
      alt="logo"
      width="100"
      height="auto"
    />
  </Link>
);

export default LogoButton;
