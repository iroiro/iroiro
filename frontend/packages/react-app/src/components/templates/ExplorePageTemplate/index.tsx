import React from "react";
import { Box } from "rimble-ui";
import AppHeader from "../../molecules/AppHeader";
import TokenList from "../../organisms/TokenList";
import { UserToken, Web3Props } from "../../../interfaces";

export interface ExportPageTemplateProps extends Web3Props {
  readonly tokens: UserToken[];
  readonly loading: boolean;
}

const ExplorePageTemplate = ({ tokens, loading }: ExportPageTemplateProps) => (
  <div>
    <AppHeader />
    <Box m={"auto"} my={5} width={[4 / 5, 3 / 4]}>
      <TokenList tokens={tokens} loading={loading} />
    </Box>
  </div>
);

export default ExplorePageTemplate;
