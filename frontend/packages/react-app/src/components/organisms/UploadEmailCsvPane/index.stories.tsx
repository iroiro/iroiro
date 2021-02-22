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
import UploadEmailCsvPane, { TargetsProps } from "./index";
import { emailState, walletListState } from "../../../utils/mockData";

export default {
  title: "Organisms/UploadEmailCsvPane",
  component: UploadEmailCsvPane,
} as Meta;
const Template: Story<TargetsProps> = (args) => (
  <BrowserRouter>
    <UploadEmailCsvPane {...args} />
  </BrowserRouter>
);

export const NotUploadedYet = Template.bind({});
NotUploadedYet.args = {
  emailState: {
    ...emailState,
    emailList: [],
  },
};

export const UploadedEmptyCsv = Template.bind({});
UploadedEmptyCsv.args = {
  emailState: {
    ...emailState,
    isValidEmails: true,
    emailList: [],
    isCsvUploaded: true,
  },
};

export const UploadedInvalidCsv = Template.bind({});
UploadedInvalidCsv.args = {
  emailState: {
    ...emailState,
    isValidEmails: false,
    emailList: ["string"],
    isCsvUploaded: true,
  },
};

export const Uploaded = Template.bind({});
Uploaded.args = {
  emailState: {
    ...emailState,
    isValidEmails: true,
    emailList: ["text@example.com"],
    isCsvUploaded: true,
    quantity: "1",
  },
};

export const ExceedUpperLimit = Template.bind({});
ExceedUpperLimit.args = {
  emailState: {
    ...emailState,
    isValidEmails: true,
    isCsvUploaded: true,
    quantity: "2001",
    emailList: [...Array(2001).map(() => "text@example.com")],
  },
};
