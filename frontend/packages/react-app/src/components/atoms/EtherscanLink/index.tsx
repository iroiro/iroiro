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

import * as React from "react";
import { useMemo } from "react";
import { Link, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

type AddressTypes = "user" | "token" | "tx" | "contract";

export interface EtherscanLinkProps {
  readonly type: AddressTypes;
  readonly addressOrTxHash: string;
  readonly additionalTokenAddress?: string;
  readonly small?: boolean;
}

const URLs: { [network: string]: { [type: string]: string } } = {
  // mainnet
  "1": {
    site: "Etherscan",
    user: "https://etherscan.io/token/{tokenAddress}?a={address}",
    contract: "https://etherscan.io/address/{address}",
    token: "https://etherscan.io/token/{address}",
    tx: "https://etherscan.io/tx/{txHash}",
  },
  // ropsten
  "3": {
    site: "Etherscan",
    user: "https://ropsten.etherscan.io/token/{tokenAddress}?a={address}",
    contract: "https://ropsten.etherscan.io/address/{address}",
    token: "https://ropsten.etherscan.io/token/{address}",
    tx: "https://ropsten.etherscan.io/tx/{txHash}",
  },
  // rinkeby
  "4": {
    site: "Etherscan",
    user: "https://rinkeby.etherscan.io/token/{tokenAddress}?a={address}",
    contract: "https://rinkeby.etherscan.io/address/{address}",
    token: "https://rinkeby.etherscan.io/token/{address}",
    tx: "https://rinkeby.etherscan.io/tx/{txHash}",
  },
  // kovan
  "42": {
    site: "Etherscan",
    user: "https://kovan.etherscan.io/token/{tokenAddress}?a={address}",
    contract: "https://kovan.etherscan.io/address/{address}",
    token: "https://kovan.etherscan.io/token/{address}",
    tx: "https://kovan.etherscan.io/tx/{txHash}",
  },
  // xDAI
  "100": {
    site: "Blockscout",
    user: "https://blockscout.com/xdai/mainnet/address/{address}/tokens",
    contract:
      "https://blockscout.com/xdai/mainnet/address/{address}/transactions",
    token:
      "https://blockscout.com/xdai/mainnet/tokens/{address}/token-transfers",
    tx: "https://blockscout.com/xdai/mainnet/tx/{txHash}/token-transfers",
  },
  // Matic
  "137": {
    site: "Blockscout",
    user: "https://explorer-mainnet.maticvigil.com/address/{address}/tokens",
    contract:
      "https://explorer-mainnet.maticvigil.com/address/{address}/transactions",
    token:
      "https://explorer-mainnet.maticvigil.com/tokens/{address}/token-transfers",
    tx:
      "https://explorer-mainnet.maticvigil.com/tx/{txHash}/internal-transactions",
  },
};

// TODO enable switch network, url regard to address type
const EtherscanLink: React.FC<EtherscanLinkProps> = ({
  type,
  addressOrTxHash,
  additionalTokenAddress,
  small = false,
}) => {
  const network: string = process.env?.REACT_APP_CHAIN_ID ?? "1";
  const URL = URLs[network];

  const link = useMemo(() => {
    switch (type) {
      case "user":
        return URL.user
          .replace("{address}", addressOrTxHash)
          .replace("{tokenAddress}", additionalTokenAddress ?? "");
      case "contract":
        return URL.contract.replace("{address}", addressOrTxHash);
      case "token":
        return URL.token.replace("{address}", addressOrTxHash);
      case "tx":
        return URL.tx.replace("{txHash}", addressOrTxHash);
    }
  }, [URL, addressOrTxHash, additionalTokenAddress]);

  if (addressOrTxHash === "") {
    return null;
  }

  return (
    <Typography align="center" style={{ fontSize: small ? "14px" : "1rem" }}>
      <Link href={link} target="_blank">
        View on {URL.site}&nbsp;&nbsp;
        <FontAwesomeIcon
          icon={faExternalLinkAlt}
          size={small ? "sm" : undefined}
        />
      </Link>
    </Typography>
  );
};

export default EtherscanLink;
