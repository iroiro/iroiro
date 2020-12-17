import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import DepositTokenForm, { ApproveTokenFormProps } from "./index";
import { distributorFormState } from "../../../utils/mockData";

export default {
  title: "Molecules/DepositTokenForm",
  component: DepositTokenForm,
} as Meta;

const Template: Story<ApproveTokenFormProps> = (args) => (
  <BrowserRouter>
    <DepositTokenForm {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  m: 4,
  distributorFormState,
};
