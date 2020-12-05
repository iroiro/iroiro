import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import TokenCampaignCard, { TokenCampaignCardProps } from "./index";

export default {
  title: "Molecules/TokenCampaignCard",
  component: TokenCampaignCard,
} as Meta;

const Template: Story<TokenCampaignCardProps> = (args) => (
  <BrowserRouter>
    <TokenCampaignCard {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  campaignInformation: {
    address: "",
    name: "A campaign",
    description: "This is a campaign.",
    image: "",
  },
};
