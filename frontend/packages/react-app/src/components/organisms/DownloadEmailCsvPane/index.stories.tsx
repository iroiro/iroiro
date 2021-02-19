/*
 *     Copyright (C) 2021 TART K.K.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see https://www.gnu.org/licenses/.
 */

import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import DownloadEmailCsvPane, { DownloadEmailCsvPaneProps } from "./index";
import { v4 as uuidv4 } from "uuid";
import { emailState } from "../../../utils/mockData";

export default {
  title: "Organisms/DownloadEmailCsvPane",
  component: DownloadEmailCsvPane,
} as Meta;

const Template: Story<DownloadEmailCsvPaneProps> = (args) => (
  <BrowserRouter>
    <DownloadEmailCsvPane {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  tokenAddress: "0xd92e713d051c37ebb2561803a3b5fbabc4962431",
  emailState: {
    ...emailState,
    rawTargets: [...Array(3)].map(() => uuidv4()),
    emailList: ["test1@example.com", "test2@example.com", "test3@example.com"],
  },
};
