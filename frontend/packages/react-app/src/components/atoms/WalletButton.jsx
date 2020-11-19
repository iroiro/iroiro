import { Button } from "rimble-ui";
import { logoutOfWeb3Modal } from "../../utils/web3Modal";
import React, { useContext } from "react";
import { AppContext, useUpdateWeb3 } from "../../App";

const WalletButton = () => {
  const appContext = useContext(AppContext);
  const stateContext = appContext.state;
  const stateDispatch = appContext.dispatch;
  const showWeb3Modal = useUpdateWeb3();

  return (
    <Button.Outline
      mainColor="#333"
      mr={4}
      onClick={() => {
        if (!stateContext.provider) {
          showWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {!stateContext.provider ? "Connect Wallet" : "Disconnect Wallet"}
    </Button.Outline>
  );
};

export default WalletButton;
