import React, { useEffect, useState, useCallback } from "react";
import { RouteComponentProps } from "react-router-dom";
import SelectDistributorsPageTemplate from "../templates/SelectDistributorsPageTemplate";
import { GET_DISTRIBUTORS } from "../../graphql/subgraph";
import { useLazyQuery } from "@apollo/react-hooks";
import { Distributor } from "../../interfaces";

interface Props extends RouteComponentProps<{ tokenAddress: string }> {}

const SelectDistributorsPage = (props: Props) => {
  const tokenAddress = props.match.params.tokenAddress;
  const [getDistributors, { loading, error, data }] = useLazyQuery(
    GET_DISTRIBUTORS
  );
  const [distributors, setDistributors] = useState<Distributor[]>([]);

  const getDistributorMetadata = useCallback(async (distributors) => {
    for (let i = 0; i < distributors.length; i++) {
      const cid = distributors[i].distributorCid;
      const url = `https://cloudflare-ipfs.com/ipfs/${cid}`;
      const response = await fetch(url);
      const data = await response.json();
      distributors[i].distributorMetadata = data;
    }
    setDistributors(distributors);
    console.log(distributors);
  }, []);

  useEffect(() => {
    getDistributors();
  }, [getDistributors]);

  useEffect(() => {
    if (data) {
      getDistributorMetadata(data.distributors);
    }
  }, [data, getDistributorMetadata]);

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
