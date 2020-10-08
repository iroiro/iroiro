import React from "react";
import {Button, Body, Image} from "../index";
import Links from "../molecules/Links";
import logo from "./../../ethereumLogo.png";

const TopPageBody = ({ readOnChainData}) => (
  <Body>
    <Image src={logo} alt="react-logo" />
    <p>
      Edit <code>packages/react-app/src/App.js</code> and save to reload.
    </p>
    {/* Remove the "hidden" prop and open the JavaScript console in the browser to see what this function does */}
    <Button hidden onClick={() => readOnChainData()}>
      Read On-Chain Balance
    </Button>
    <Links/>
  </Body>
)

export default TopPageBody
