import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import WalletDialog, { WalletDialogProps } from "./index";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Molecules/WalletDialog",
  component: WalletDialog,
} as Meta;

const Template: Story<WalletDialogProps> = (args) => (
  <BrowserRouter>
    <WalletDialog {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  open: true,
  selectedValue: "",
};
