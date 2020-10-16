import React, {useCallback, useEffect, useState} from "react"
import { Web3Provider} from "@ethersproject/providers";
import {web3Modal} from "../../utils/web3Modal";
import ExplorePageTemplate from "../templates/ExplorePageTemplate";
import {GET_TOKENS_BALANCE_USER_HOLDS} from "../../graphql/subgraph";
import {useLazyQuery} from "@apollo/react-hooks";

const ExplorePage = () => {
  const [provider, setProvider] = useState()
  const [tokens, setTokens] = useState([])
  const [walletAddress, setWalletAddress] = useState("")

  /* Open wallet selection modal. */
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    setProvider(new Web3Provider(newProvider));
  }, []);

  const [getTokensBalance, { loading, error, data }] = useLazyQuery(GET_TOKENS_BALANCE_USER_HOLDS)

  useEffect(() => {
    if (walletAddress !== "") {
      getTokensBalance({
        variables: {id: walletAddress.toLowerCase()}
      })
    }
  }, [walletAddress]);

  useEffect(() => {
    if (loading || error || !data) {
      return
    }
    const tmpTokens = data.account.tokens.map(accountToken => ({
        address: accountToken.token.id,
        name: accountToken.token.name,
        symbol: accountToken.token.symbol,
        balance: accountToken.balance
    }))
    setTokens(tmpTokens)
  }, [loading, error, data, setTokens]);

  /* If user has loaded a wallet before, load it automatically. */
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  useEffect(() => {
    const f = async() => {
      if (!provider) {
        return
      }
      const signer = await provider.getSigner()
      const walletAddress = await signer.getAddress()
      setWalletAddress(walletAddress)
    }
    f()
  }, [provider, setWalletAddress])

  return (
    <ExplorePageTemplate
      provider={provider}
      loadWeb3Modal={loadWeb3Modal}
      tokens={tokens}
    />
  );
}

export default ExplorePage
