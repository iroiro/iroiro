/*
 *     Copyright (C) 2021 TART K.K.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see https://www.gnu.org/licenses/.
 */

import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { FortmaticConnector } from "@web3-react/fortmatic-connector";
import { PortisConnector } from "@web3-react/portis-connector";
import { TorusConnector } from "@web3-react/torus-connector";

const POLLING_INTERVAL = 12000;
const chainId = Number.parseInt(process.env.REACT_APP_CHAIN_ID ?? "1");
const isSupported = [1, 4, 42].includes(chainId);

type NetworkName = "mainnet" | "rinkeby" | "kovan";

const chainIdToNetwork: { [network: number]: NetworkName } = {
  1: "mainnet",
  4: "rinkeby",
  42: "kovan",
};

export const injected = new InjectedConnector({
  supportedChainIds: [chainId],
});

export const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: process.env.REACT_APP_RPC_URL ?? "" },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

export const fortmatic = isSupported
  ? new FortmaticConnector({
      apiKey: process.env.REACT_APP_FORTMATIC_API_KEY as string,
      chainId: chainId,
    })
  : undefined;

export const portis = isSupported
  ? new PortisConnector({
      dAppId: process.env.REACT_APP_PORTIS_DAPP_ID as string,
      networks: [chainId],
    })
  : undefined;

console.debug(chainId, { network: chainIdToNetwork[chainId] });
export const torus = isSupported
  ? new TorusConnector({
      chainId: chainId,
      initOptions: { network: { host: chainIdToNetwork[chainId] } },
    })
  : undefined;
