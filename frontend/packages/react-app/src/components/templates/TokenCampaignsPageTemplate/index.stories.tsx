import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import { TokenCampaignsTemplate, TokenCampaignsTemplateProps } from "./index";
import { tokenInformationState } from "../../../utils/mockData";
import { TokenProvider } from "../../../context/token";
import { tokenReducer } from "../../../reducers/tokenContext";

export default {
  title: "Templates/TokenCampaignsTemplate",
  component: TokenCampaignsTemplate,
} as Meta;

const Template: Story<TokenCampaignsTemplateProps> = (args) => (
  <BrowserRouter>
    <TokenProvider
      initialValue={{
        token: tokenInformationState.token,
        userAddress: tokenInformationState.userAddress,
        userBalance: tokenInformationState.userBalance,
      }}
      reducer={tokenReducer}
    >
      <TokenCampaignsTemplate {...args} />
    </TokenProvider>
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  state: tokenInformationState,
};
