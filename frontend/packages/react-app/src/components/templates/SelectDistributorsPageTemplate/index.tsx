import React from "react";
import { Typography, Box, Container } from "@material-ui/core";
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
      <Box mt={5}>
        <Container>
          <Box mb={1}>
            <Typography variant={"h3"}>Select distributor</Typography>
          </Box>
          <DistributorList
            distributors={distributors}
            tokenAddress={tokenAddress}
          />
        </Container>
      </Box>
    </>
  );
};

export default SelectDistributorsPageTemplate;
