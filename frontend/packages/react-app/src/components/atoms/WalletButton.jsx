import { Button } from "rimble-ui"
import { logoutOfWeb3Modal } from "../../utils/web3Modal"
import React from "react"

const WalletButton = ({provider, loadWeb3Modal}) => (
    <Button.Outline
      mainColor="#333"
      mr={4}
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {!provider ? "Connect Wallet" : "Disconnect Wallet"}
    </Button.Outline>
  )

export default WalletButton
