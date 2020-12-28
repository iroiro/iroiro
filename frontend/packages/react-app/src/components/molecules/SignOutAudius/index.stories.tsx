import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import SignOutAudius, { SignOutAudiusProps } from "./index";

export default {
  title: "Molecules/SignOutAudius",
  component: SignOutAudius,
} as Meta;

const Template: Story<SignOutAudiusProps> = (args) => (
  <BrowserRouter>
    <SignOutAudius {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
