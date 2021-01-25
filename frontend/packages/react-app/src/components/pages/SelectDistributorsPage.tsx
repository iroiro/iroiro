import React from "react";
import { RouteComponentProps } from "react-router-dom";
import SelectDistributorsPageTemplate from "../templates/SelectDistributorsPageTemplate";
import distributors from "../../utils/distributors";

const SelectDistributorsPage: React.FC<
  RouteComponentProps<{
    tokenAddress: string;
  }>
> = (props) => {
  const tokenAddress = props.match.params.tokenAddress;
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
