import React from "react";
import { Box, Typography } from "@material-ui/core";
import AppHeader from "../../molecules/AppHeader";
import TokenList from "../../organisms/TokenList";
import { ACTIONS } from "../../../reducers/tokens";
import { TokenListState } from "../../../interfaces";
import SetTokenModal from "../../organisms/SetTokenModal";
import AddNewToken from "../../atoms/AddNewToken";
import { AppFooter } from "../../molecules/AppFooter";

export interface ExplorePageTemplateProps {
  readonly state: TokenListState;
  dispatch: React.Dispatch<ACTIONS>;
}

const ExplorePageTemplate: React.FC<ExplorePageTemplateProps> = ({
  state,
  dispatch,
}) => (
  <div style={{ height: "100vh" }}>
    <AppHeader />
    <Box
      m={"auto"}
      my={5}
      width={[4 / 5, 1 / 2]}
      p={2}
      minWidth={320}
      style={{
        boxSizing: "border-box",
        height: "calc(100% - 266px)",
        minHeight: "300px",
      }}
    >
      <Typography variant={"h3"}>Token Explorer</Typography>
      <Box mt={2}>
        <Typography>
          Check the status of the tokens you have been distributed and
          information on the campaign.
        </Typography>
      </Box>
      <TokenList state={state} />
      <AddNewToken color={state.color} dispatch={dispatch} />
      <SetTokenModal state={state} dispatch={dispatch} />
    </Box>
    <AppFooter />
  </div>
);

export default ExplorePageTemplate;
