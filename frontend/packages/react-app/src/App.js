import React, { useCallback, useEffect, useState } from "react";
import { Contract } from "@ethersproject/contracts";
import { Web3Provider, getDefaultProvider } from "@ethersproject/providers";
import { useQuery } from "@apollo/react-hooks";

import { Body, Button, Header, Image, Link } from "./components";
import { web3Modal, logoutOfWeb3Modal } from './utils/web3Modal'
import logo from "./ethereumLogo.png";

import { addresses, abis } from "@project/contracts";
import GET_TRANSFERS from "./graphql/subgraph";

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

function WalletButton({ provider, loadWeb3Modal }) {
  return (
    <Button
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {!provider ? "Connect Wallet" : "Disconnect Wallet"}
    </Button>
  );
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
    <div>
      <Header>
        <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} />
      </Header>
      <Body>
        <Image src={logo} alt="react-logo" />
        <p>
          Edit <code>packages/react-app/src/App.js</code> and save to reload.
        </p>
        {/* Remove the "hidden" prop and open the JavaScript console in the browser to see what this function does */}
        <Button hidden onClick={() => readOnChainData()}>
          Read On-Chain Balance
        </Button>
        <Link
          href="https://ethereum.org/developers/#getting-started"
          style={{ marginTop: "8px" }}
        >
          Learn Ethereum
        </Link>
        <Link href="https://reactjs.org">Learn React</Link>
        <Link href="https://thegraph.com/docs/quick-start" >Learn The Graph</Link>
      </Body>
    </div>
  );
}

export default App;
