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

type AddressTypes = "user" | "token" | "tx";

export interface EtherscanLinkProps {
  readonly type: AddressTypes;
  readonly addressOrTxHash: string;
  readonly additionalTokenAddress?: string;
  readonly small?: boolean;
}

// TODO enable switch network, url regard to address type
const EtherscanLink: React.FC<EtherscanLinkProps> = ({
  type,
  addressOrTxHash,
  additionalTokenAddress,
  small = false,
}) => {
  const network: string = process.env?.REACT_APP_NETWORK ?? "mainnet";
  const baseUrl =
    network === "mainnet"
      ? "https://etherscan.io/"
      : `https://${network}.etherscan.io/`;

  const link = useMemo(() => {
    switch (type) {
      case "user":
        return `${baseUrl}token/${additionalTokenAddress}?a=${addressOrTxHash}`;
      case "token":
        return `${baseUrl}token/${addressOrTxHash}`;
      case "tx":
        return `${baseUrl}tx/${addressOrTxHash}`;
    }
  }, [baseUrl, addressOrTxHash, additionalTokenAddress]);

  if (addressOrTxHash === "") {
    return null;
  }

  return (
    <Typography align="center" style={{ fontSize: small ? "14px" : "1rem" }}>
      <Link href={link} target="_blank">
        View on Etherscan&nbsp;&nbsp;
        <FontAwesomeIcon
          icon={faExternalLinkAlt}
          size={small ? "sm" : undefined}
        />
      </Link>
    </Typography>
  );
};

export default EtherscanLink;
