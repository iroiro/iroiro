import React from "react";
import { Heading, Loader } from "rimble-ui";
import AppHeader from "../molecules/AppHeader";
import Container from "../atoms/Container"
import CreatedTokenInfo from "../organisms/CreatedTokenInfo";

const DashboardPageTemplate = ({ provider, loadWeb3Modal, tokens, withdrawToken, restartStaking, stopStaking}) => (
  <div>
    <AppHeader provider={provider} loadWeb3Modal={loadWeb3Modal}/>
    <Container>
      <Heading as={"h2"}>Created Tokens</Heading>
      {tokens.length == 0 &&
        <Loader size="80px" m="auto" />
      }
      {tokens.map(token => 
        <CreatedTokenInfo
          key={token.address}
          token={token}
          withdrawToken={withdrawToken}
          restartStaking={restartStaking}
          stopStaking={stopStaking}
        />
      )}
    </Container>
  </div>
)

export default DashboardPageTemplate
