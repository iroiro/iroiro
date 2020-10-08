import {Button} from "../index";
import {logoutOfWeb3Modal} from "../../utils/web3Modal";
import React from "react";

const WalletButton = ({provider, loadWeb3Modal}) => (
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
  )

export default WalletButton
