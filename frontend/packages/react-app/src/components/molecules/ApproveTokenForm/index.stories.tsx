import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import ApproveTokenForm, { ApproveTokenFormProps } from "./index";
import { distributorFormState } from "../../../utils/mockData";

export default {
  title: "Molecules/ApproveTokenForm",
  component: ApproveTokenForm,
} as Meta;

const Template: Story<ApproveTokenFormProps> = (args) => (
  <BrowserRouter>
    <ApproveTokenForm {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  m: 4,
  distributorFormState,
};
