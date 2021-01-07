import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import WalletButton from "./index";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Atoms/WalletButton",
  component: WalletButton,
} as Meta;

const Template: Story = (args) => (
  <BrowserRouter>
    <WalletButton {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
