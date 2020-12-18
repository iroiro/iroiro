import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import SigninAudius, { SigninAudiusProps } from "./index";
import { audiusState } from "../../../utils/mockData";

export default {
  title: "Molecules/SigninAudius",
  component: SigninAudius,
} as Meta;

const Template: Story<SigninAudiusProps> = (args) => (
  <BrowserRouter>
    <SigninAudius {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  audiusState,
};
