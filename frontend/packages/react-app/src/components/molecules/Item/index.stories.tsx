import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import Item, { ItemProps } from "./index";
import { distributor, tokenAddress } from "../../../utils/mockData";

export default {
  title: "Molecules/Item",
  component: Item,
} as Meta;

const Template: Story<ItemProps> = (args) => (
  <BrowserRouter>
    <Item {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  title: "Title",
  text: "text",
};
