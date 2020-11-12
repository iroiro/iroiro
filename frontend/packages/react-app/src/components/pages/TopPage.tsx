import React, {useCallback, useEffect, useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import {GET_TOKENS} from "../../graphql/subgraph";
import {web3Modal} from "../../utils/web3Modal";
import {getDefaultProvider, Web3Provider} from "@ethersproject/providers";
import TopPageTemplate from "../templates/TopPageTemplate";
import {Contract} from "@ethersproject/contracts";
// @ts-ignore
import {abis, addresses} from "@project/contracts";

const TopPage = () => {
  const [provider, setProvider] = useState<Web3Provider>();

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

  return (
    <TopPageTemplate
      provider={provider}
      loadWeb3Modal={loadWeb3Modal}
    />
  );
}

export default TopPage;