import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import { tokenInformationState } from "../../../utils/mockData";
import { TokenCampaignsTemplate, TokenCampaignsTemplateProps } from "./index";

export default {
  title: "Templates/TokenCampaignsTemplate",
  component: TokenCampaignsTemplate,
} as Meta;

const Template: Story<TokenCampaignsTemplateProps> = (args) => (
  <BrowserRouter>
    <TokenCampaignsTemplate {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  state: tokenInformationState,
};
