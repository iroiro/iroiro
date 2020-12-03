import * as React from "react";
import { Link, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

export interface EtherscanLinkProps {
  readonly address: string;
  readonly network: string;
}

// TODO enable switch network, url regard to address type
const EtherscanLink = ({ address }: EtherscanLinkProps) => {
  return (
    <Typography>
      <Link href={`https://rinkeby.etherscan.io/token/${address}`}>
        View on Etherscan
        <FontAwesomeIcon icon={faExternalLinkAlt} />
      </Link>
    </Typography>
  );
};

export default EtherscanLink;
