import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import WaitingProcessDialog, { WaitingProcessDialogProps } from "./index";
import { distributorFormState } from "../../../utils/mockData";

export default {
  title: "Molecules/WaitingProcessDialog",
  component: WaitingProcessDialog,
} as Meta;

const Template: Story<WaitingProcessDialogProps> = (args) => (
  <BrowserRouter>
    <WaitingProcessDialog {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  distributorFormState,
};

export const Request = Template.bind({});
Request.args = {
  distributorFormState: {
    ...distributorFormState,
    requestDeployCampaign: true,
  },
};
