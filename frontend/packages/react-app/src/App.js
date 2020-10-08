import React from "react";
import {Contract} from "@ethersproject/contracts";
import {getDefaultProvider, Web3Provider} from "@ethersproject/providers";
import {abis, addresses} from "@project/contracts";
import TopPage from "./components/pages/TopPage";

const App = () => (
  // pages should be routed with router
  <TopPage />
)

export default App;
