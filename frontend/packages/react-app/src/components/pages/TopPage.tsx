import React, { useCallback, useEffect, useState } from "react";
import { web3Modal } from "../../utils/web3Modal";
import { Web3Provider } from "@ethersproject/providers";
import TopPageTemplate from "../templates/TopPageTemplate";

const TopPage: React.FC = () => {
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

  return <TopPageTemplate />;
};

export default TopPage;
