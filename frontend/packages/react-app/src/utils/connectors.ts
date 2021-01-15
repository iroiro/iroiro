import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { AuthereumConnector } from "@web3-react/authereum-connector";
import { FortmaticConnector } from "@web3-react/fortmatic-connector";
import { PortisConnector } from "@web3-react/portis-connector";
import { TorusConnector } from "@web3-react/torus-connector";

const POLLING_INTERVAL = 12000;
const RPC_URLS: { [chainId: number]: string } = {
  4: process.env.REACT_APP_RPC_URL_4 as string,
};

export const injected = new InjectedConnector({
  supportedChainIds: [4],
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 4: RPC_URLS[4] },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

export const authereum = new AuthereumConnector({ chainId: 4 });

export const fortmatic = new FortmaticConnector({
  apiKey: process.env.REACT_APP_FORTMATIC_API_KEY as string,
  chainId: 4,
});

export const portis = new PortisConnector({
  dAppId: process.env.REACT_APP_PORTIS_DAPP_ID as string,
  networks: [4],
});

export const torus = new TorusConnector({ chainId: 4 });
