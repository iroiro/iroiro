import React from "react";
import { Box, Link, Heading, Text } from "rimble-ui";
import AppHeader from "../../molecules/AppHeader";
import TokenList from "../../organisms/TokenList";
import { TokenListState, ACTIONS } from "../../../reducers/tokens";
import SetTokenModal from "../../organisms/SetTokenModal";
import AddNewToken from "../../atoms/AddNewToken";

export interface ExplorePageTemplateProps {
  readonly state: TokenListState;
  dispatch: React.Dispatch<ACTIONS>;
}

const ExplorePageTemplate = ({ state, dispatch }: ExplorePageTemplateProps) => (
  <div>
    <AppHeader />
    <Box m={"auto"} my={5} width={[3 / 4, 1 / 2]}>
      <Heading as={"h1"}>Token Explorer</Heading>
      <Text>
        Check the status of the tokens you have been distributed and information
        on the campaign.
      </Text>
      <TokenList state={state} />
      <AddNewToken color={state.color} dispatch={dispatch} />
      <SetTokenModal state={state} dispatch={dispatch} />
    </Box>
  </div>
);

export default ExplorePageTemplate;
