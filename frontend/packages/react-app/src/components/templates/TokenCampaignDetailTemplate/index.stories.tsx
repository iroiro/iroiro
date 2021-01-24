import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import {
  TokenCampaignsDetailTemplate,
  TokenCampaignsDetailTemplateProps,
} from "./index";
import { audiusState, tokenInformationState } from "../../../utils/mockData";

export default {
  title: "Templates/TokenCampaignsDeteilTemplate",
  component: TokenCampaignsDetailTemplate,
} as Meta;

const Template: Story<TokenCampaignsDetailTemplateProps> = (args) => (
  <BrowserRouter>
    <TokenCampaignsDetailTemplate {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  state: tokenInformationState,
  audiusState,
};
