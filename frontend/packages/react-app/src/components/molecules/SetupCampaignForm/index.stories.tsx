import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import SetupCampaignForm, { NumberProps } from "./index";

export default {
  title: "Molecules/SetupCampaignForm",
  component: SetupCampaignForm,
} as Meta;

const Template: Story<NumberProps> = (args) => (
  <BrowserRouter>
    <SetupCampaignForm {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = { m: 4 };
