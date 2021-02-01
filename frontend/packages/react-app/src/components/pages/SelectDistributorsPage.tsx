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
  const result = distributors.filter(
    (distributor) =>
      distributor.id !== "0x590b4465a94be635bf2f760025c61ec3680f687c"
  );
  return (
    <>
      <SelectDistributorsPageTemplate
        tokenAddress={tokenAddress}
        distributors={result}
      />
    </>
  );
};

export default SelectDistributorsPage;
