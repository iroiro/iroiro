import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import DistributorList, { DistributorsProps } from "./index";
import { Distributor } from "../../../interfaces";
import { distributor } from "../../../utils/mockData";

export default {
  title: "Organisms/DistributorList",
  component: DistributorList,
} as Meta;

const Template: Story<DistributorsProps> = (args) => (
  <BrowserRouter>
    <DistributorList {...args} />
  </BrowserRouter>
);

const distributors: Distributor[] = [distributor, distributor, distributor];

const tokenAddress = "0xD92E713d051C37EbB2561803a3b5FBAbc4962431";

export const Default = Template.bind({});
Default.args = {
  distributors,
  tokenAddress,
};
