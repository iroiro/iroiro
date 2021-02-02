import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import UUIDURLList, { UUIDURLListProps } from "./index";
import { v4 as uuidv4 } from "uuid";
import { uuidInitialState } from "../../../reducers/uuid";

export default {
  title: "Organisms/UUIDURLList",
  component: UUIDURLList,
} as Meta;

const Template: Story<UUIDURLListProps> = (args) => (
  <BrowserRouter>
    <UUIDURLList {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  tokenAddress: "0xd92e713d051c37ebb2561803a3b5fbabc4962431",
  uuidState: {
    ...uuidInitialState,
    rawTargets: [...Array(10)].map(() => uuidv4()),
  },
};
