import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import AppHeader from "./index";

export default {
  title: "Molecules/AppHeader",
  component: AppHeader,
} as Meta;

const Template: Story = (args) => (
  <BrowserRouter>
    <AppHeader {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  loadWeb3Modal: () => {},
};
