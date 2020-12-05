import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import DepositTokenForm from "./index";

export default {
  title: "Molecules/DepositTokenForm",
  component: DepositTokenForm,
} as Meta;

const Template: Story = () => (
  <BrowserRouter>
    <DepositTokenForm />
  </BrowserRouter>
);

export const Default = Template.bind({});
