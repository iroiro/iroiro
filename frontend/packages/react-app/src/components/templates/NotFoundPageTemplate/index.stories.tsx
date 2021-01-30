import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import { NotFoundPageTemplate } from ".";

export default {
  title: "Templates/NotFoundPageTemplate",
  component: NotFoundPageTemplate,
} as Meta;

const Template: Story = () => (
  <BrowserRouter>
    <NotFoundPageTemplate />
  </BrowserRouter>
);

export const Default = Template.bind({});
