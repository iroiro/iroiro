import React, {useCallback, useEffect, useState} from "react";
import {web3Modal} from "../../utils/web3Modal";
import {Web3Provider} from "@ethersproject/providers";
import ExplorePageTemplate from "../templates/ExplorePageTemplate";

const ExplorePage = () => {
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

  return (
    <ExplorePageTemplate
      provider={provider} 
      loadWeb3Modal={loadWeb3Modal}
    />
  );
}

export default ExplorePage