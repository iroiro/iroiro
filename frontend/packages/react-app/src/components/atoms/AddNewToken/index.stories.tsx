import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import AddNewToken, { AddNewTokenProps } from "./index";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Atoms/AddNewToken",
  component: AddNewToken,
} as Meta;

const Template: Story<AddNewTokenProps> = (args) => (
  <BrowserRouter>
    <AddNewToken {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  color: "itred",
};
