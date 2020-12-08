import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import SetupCampaign from "./index";

export default {
  title: "Organisms/SetupCampaign",
  component: SetupCampaign,
} as Meta;

const Template: Story = () => (
  <BrowserRouter>
    <SetupCampaign />
  </BrowserRouter>
);

export const Default = Template.bind({});
