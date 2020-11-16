import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0'
import LogoButton, { LogoButtonProps } from "./index";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Atoms/LogoButton",
  component: LogoButton
} as Meta

const Template: Story<LogoButtonProps> = (args) => (
  <BrowserRouter>
    <LogoButton {...args} />
  </BrowserRouter>
)

export const Default = Template.bind({})
Default.args = {}
