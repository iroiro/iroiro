import React, { useEffect, useState, useCallback } from "react";
import { RouteComponentProps } from "react-router-dom";
import SelectDistributorsPageTemplate from "../templates/SelectDistributorsPageTemplate";
import { GET_DISTRIBUTORS } from "../../graphql/subgraph";
import { useLazyQuery } from "@apollo/react-hooks";
import { Distributor } from "../../interfaces";
import distributors from "../../utils/distributors";

const SelectDistributorsPage: React.FC<
  RouteComponentProps<{
    tokenAddress: string;
  }>
> = (props) => {
  const tokenAddress = props.match.params.tokenAddress;
  // const [getDistributors, { data }] = useLazyQuery(GET_DISTRIBUTORS);
  // const [distributors, setDistributors] = useState<Distributor[]>([]);

  // const getDistributorMetadata = useCallback(async (distributors) => {
  //   for (let i = 0; i < distributors.length; i++) {
  //     const cid = distributors[i].distributorCid;
  //     const url = `https://cloudflare-ipfs.com/ipfs/${cid}`;
  //     const response = await fetch(url);
  //     distributors[i].distributorMetadata = await response.json();
  //   }
  //   setDistributors(distributors);
  // }, []);

  // useEffect(() => {
  //   getDistributors();
  // }, [getDistributors]);

  // useEffect(() => {
  //   if (data) {
  //     console.log(data);
  //     getDistributorMetadata(data.distributors);
  //   }
  // }, [data, getDistributorMetadata]);

  return (
    <>
      <SelectDistributorsPageTemplate
        tokenAddress={tokenAddress}
        distributors={distributors}
      />
    </>
  );
};

export default SelectDistributorsPage;
