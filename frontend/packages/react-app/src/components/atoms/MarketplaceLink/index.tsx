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
import { Link, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

type Market = "opensea" | "rarible";

export interface MarketplaceLinkProps {
  readonly chainId: string;
  readonly market: Market;
  readonly address: string;
  readonly campaignId: string;
  readonly small?: boolean;
}

const baseURLs: { [chainId: string]: { opensea: string; rarible: string } } = {
  "1": {
    opensea: "https://opensea.io/",
    rarible: "https://rarible.com/",
  },
  "4": {
    opensea: "https://testnets.opensea.io/",
    rarible: "https://rinkeby.rarible.com/",
  },
};

const MarketplaceLink: React.FC<MarketplaceLinkProps> = ({
  chainId,
  market,
  address,
  campaignId,
  small = false,
}) => {
  const baseUrl: string | undefined = baseURLs?.[chainId]?.[market];
  if (baseUrl === undefined) {
    return null;
  }

  const name = market === "opensea" ? "OpenSea" : "Rarible";
  const tokenId = campaignId.split("-")[1];
  const link =
    market === "opensea"
      ? `${baseUrl}assets/${address}/${tokenId}`
      : `${baseUrl}token/${address}:${tokenId}`;

  return (
    <Typography align="center" style={{ fontSize: small ? "14px" : "1rem" }}>
      <Link href={link} target="_blank">
        View on {name}&nbsp;&nbsp;
        <FontAwesomeIcon
          icon={faExternalLinkAlt}
          size={small ? "sm" : undefined}
        />
      </Link>
    </Typography>
  );
};

export default MarketplaceLink;
