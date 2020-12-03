import React from "react";
import AppHeader from "../../molecules/AppHeader";
import TokenInformationBar from "../../organisms/TokenInformationBar";
import BasicTokenInformation from "../../organisms/BasicTokenInformation";
import { TokenInformationState } from "../../../interfaces";

const TokenDetailTemplate = (state: TokenInformationState) => (
  <div style={{ minHeight: "100vh" }}>
    <AppHeader />
    {/* TODO Add tab */}
    <TokenInformationBar state={state} />
    <BasicTokenInformation state={state} />
  </div>
);

export default TokenDetailTemplate;
