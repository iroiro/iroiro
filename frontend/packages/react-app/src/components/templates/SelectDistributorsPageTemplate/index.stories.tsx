import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import SelectDistributorsPageTemplate, { Distributors } from "./index";
import { Distributor } from "../../../interfaces";

export default {
  title: "Templates/SelectDistributorsPageTemplate",
  component: SelectDistributorsPageTemplate,
} as Meta;

const Template: Story<Distributors> = (args) => (
  <BrowserRouter>
    <SelectDistributorsPageTemplate {...args} />
  </BrowserRouter>
);

const distributors: Distributor[] = [
  {
    id: "0x48889feca4574810e5a5b30b6b93146a837500fb",
    distributorCid: "Qmf8C4mjVGgzxVzWcAevxCHZiCCUG38rxeDC7Byt5tsVoA",
    distributorMetadata: {
      name: "Audius Followers Distributor",
      description:
        "This distributer enables creators to distributes tokens for their followers on Auduis.",
      image: "https://example.com/distributerimage.jpg",
    },
  },
  {
    id: "0x48889feca4574810e5a5b30b6b93146a837500fb",
    distributorCid: "Qmf8C4mjVGgzxVzWcAevxCHZiCCUG38rxeDC7Byt5tsVoA",
    distributorMetadata: {
      name: "Audius Followers Distributor",
      description:
        "This distributer enables creators to distributes tokens for their followers on Auduis.",
      image: "https://example.com/distributerimage.jpg",
    },
  },
  {
    id: "0x48889feca4574810e5a5b30b6b93146a837500fb",
    distributorCid: "Qmf8C4mjVGgzxVzWcAevxCHZiCCUG38rxeDC7Byt5tsVoA",
    distributorMetadata: {
      name: "Audius Followers Distributor",
      description:
        "This distributer enables creators to distributes tokens for their followers on Auduis.",
      image: "https://example.com/distributerimage.jpg",
    },
  },
];

const tokenAddress: string = "0xD92E713d051C37EbB2561803a3b5FBAbc4962431";

export const Default = Template.bind({});
Default.args = {
  distributors,
  tokenAddress,
};
