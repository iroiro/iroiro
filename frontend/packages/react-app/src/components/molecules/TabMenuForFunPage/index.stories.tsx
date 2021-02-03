import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { TabMenuForFanPage, TabMenuForFanPageProps } from "./index";

export default {
  title: "Molecules/Tab Menu",
  component: TabMenuForFanPage,
} as Meta;

const Template: Story<TabMenuForFanPageProps> = (args) => (
  <TabMenuForFanPage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  value: 0,
};
