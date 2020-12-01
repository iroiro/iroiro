import React from "react";
import { Box, Heading, Text } from "rimble-ui";
import AppHeader from "../../molecules/AppHeader";
import { TokenListState, ACTIONS } from "../../../reducers/tokens";
import TokenList from "../../organisms/TokenList";
import SetTokenModal from "../../organisms/SetTokenModal";
import AddNewToken from "../../atoms/AddNewToken";

export interface DashboardPageTemplateProps {
  readonly state: TokenListState;
  dispatch: React.Dispatch<ACTIONS>;
}

const DashboardPageTemplate = ({
  state,
  dispatch,
}: DashboardPageTemplateProps) => (
  <div>
    <AppHeader />
    <Box m={"auto"} my={5} width={[3 / 4, 1 / 2]}>
      <Heading as={"h1"}>Token Distribution Dashboard</Heading>
      <Text>
        You can create a token distribution campaign. Let's set the tokens to be
        distributed and create a campaign.
      </Text>
      <TokenList state={state} />
      <AddNewToken color={state.color} dispatch={dispatch} />
      <SetTokenModal state={state} dispatch={dispatch} />
    </Box>
  </div>
);

export default DashboardPageTemplate;
