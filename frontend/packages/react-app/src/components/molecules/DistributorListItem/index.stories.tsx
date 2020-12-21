import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import DistributorListItem, { DistributorProps } from "./index";
import { distributor, tokenAddress } from "../../../utils/mockData";

export default {
  title: "Molecules/DistributorListItem",
  component: DistributorListItem,
} as Meta;

const Template: Story<DistributorProps> = (args) => (
  <BrowserRouter>
    <DistributorListItem {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  distributor,
  tokenAddress,
};
