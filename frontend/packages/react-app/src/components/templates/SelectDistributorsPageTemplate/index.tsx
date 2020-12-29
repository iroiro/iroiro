import React from "react";
import { Heading } from "rimble-ui";
import Container from "../../atoms/Container";
import AppHeader from "../../molecules/AppHeader";
import { Distributor } from "../../../interfaces";
import DistributorList from "../../organisms/DistributorList";

export interface Distributors {
  readonly distributors: Distributor[];
  readonly tokenAddress: string;
}

const SelectDistributorsPageTemplate: React.FC<Distributors> = ({
  distributors,
  tokenAddress,
}) => {
  return (
    <>
      <AppHeader />
      <Container>
        <Heading as={"h1"}>Select distributor</Heading>
        <DistributorList
          distributors={distributors}
          tokenAddress={tokenAddress}
        />
      </Container>
    </>
  );
};

export default SelectDistributorsPageTemplate;
