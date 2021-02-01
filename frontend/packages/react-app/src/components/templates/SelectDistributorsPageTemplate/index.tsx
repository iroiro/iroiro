import React from "react";
import { Typography, Box, Container } from "@material-ui/core";
import AppHeader from "../../molecules/AppHeader";
import { Distributor } from "../../../interfaces";
import DistributorList from "../../organisms/DistributorList";
import { AppFooter } from "../../molecules/AppFooter";

export interface Distributors {
  readonly distributors: Distributor[];
  readonly tokenAddress: string;
}

const SelectDistributorsPageTemplate: React.FC<Distributors> = ({
  distributors,
  tokenAddress,
}) => {
  return (
    <div style={{ height: "100vh" }}>
      <AppHeader />
      <Box
        mt={5}
        style={{
          boxSizing: "border-box",
          height: "calc(100% - 266px)",
          minHeight: "300px",
        }}
      >
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
      <AppFooter />
    </div>
  );
};

export default SelectDistributorsPageTemplate;
