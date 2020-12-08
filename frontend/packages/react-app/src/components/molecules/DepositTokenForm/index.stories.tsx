import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import DepositTokenForm, { NumberProps } from "./index";

export default {
  title: "Molecules/DepositTokenForm",
  component: DepositTokenForm,
} as Meta;

const Template: Story<NumberProps> = (args) => (
  <BrowserRouter>
    <DepositTokenForm {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  m: 4,
};
