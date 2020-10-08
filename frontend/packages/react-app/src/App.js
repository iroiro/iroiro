import React, {useCallback, useEffect, useState} from "react";
import {Contract} from "@ethersproject/contracts";
import {getDefaultProvider, Web3Provider} from "@ethersproject/providers";
import {useQuery} from "@apollo/react-hooks";

import {web3Modal} from './utils/web3Modal'

import {abis, addresses} from "@project/contracts";
import GET_TRANSFERS from "./graphql/subgraph";
import TopPageTemplate from "./components/templates/TopPageTemplate";

async function readOnChainData() {
  // Should replace with the end-user wallet, e.g. Metamask
  const defaultProvider = getDefaultProvider();
  // Create an instance of an ethers.js Contract
  // Read more about ethers.js on https://docs.ethers.io/v5/api/contract/contract/
  const ceaErc20 = new Contract(addresses.ceaErc20, abis.erc20, defaultProvider);
  // A pre-defined address that owns some CEAERC20 tokens
  const tokenBalance = await ceaErc20.balanceOf("0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C");
  console.log({ tokenBalance: tokenBalance.toString() });
}

function App() {
  const { loading, error, data } = useQuery(GET_TRANSFERS);
  const [provider, setProvider] = useState();

  /* Open wallet selection modal. */
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    setProvider(new Web3Provider(newProvider));
  }, []);

  /* If user has loaded a wallet before, load it automatically. */
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  React.useEffect(() => {
    if (!loading && !error && data && data.transfers) {
      console.log({ transfers: data.transfers });
    }
  }, [loading, error, data]);

  return (
    <TopPageTemplate
      provider={provider}
      loadWeb3Modal={loadWeb3Modal}
      readOnChainData={readOnChainData}
    />
  );
}

export default App;
