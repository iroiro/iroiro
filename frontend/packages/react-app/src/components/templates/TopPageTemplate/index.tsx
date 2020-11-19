import React from "react";
import { Box, Flex } from "rimble-ui";
import AppHeader from "../../molecules/AppHeader";
import TopPageBody from "../../molecules/TopBody";

const TopPageTemplate = () => (
  <div style={{ minHeight: "100vh" }}>
    <AppHeader />
    <Box
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${window.location.origin}/top_bg.svg)`,
        backgroundSize: "contain",
      }}
    >
      <Flex
        m={"auto"}
        py={5}
        width={[1, 2 / 3]}
        style={{ alignItems: "center" }}
      >
        <TopPageBody />
      </Flex>
    </Box>
  </div>
);

export default TopPageTemplate;
