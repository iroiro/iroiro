import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import SetupCampaign, { SetupCampaignFormProps } from "./index";
import { distributorFormState } from "../../../utils/mockData";

export default {
  title: "Organisms/SetupCampaign",
  component: SetupCampaign,
} as Meta;

const Template: Story<SetupCampaignFormProps> = (args) => (
  <BrowserRouter>
    <SetupCampaign {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  distributorFormState: distributorFormState,
};
