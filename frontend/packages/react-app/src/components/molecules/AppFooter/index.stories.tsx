import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { AppFooter } from ".";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Molecules/AppFooter",
  component: AppFooter,
} as Meta;

const Template: Story = () => (
  <BrowserRouter>
    <AppFooter />
  </BrowserRouter>
);

export const Default = Template.bind({});
