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

import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React from "react";

export interface TabMenuForFanPageProps {
  value: number;
  onChange: (value: number) => void;
}

export const TabMenuForFanPage: React.FC<TabMenuForFanPageProps> = ({
  value,
  onChange,
}) => {
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    onChange(newValue);
  };
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        scrollButtons="auto"
        indicatorColor="primary"
        textColor="primary"
        style={{ backgroundColor: "white" }}
        centered
      >
        <Tab label="Basic" {...a11yProps(0)} />
        <Tab label="Campaigns" {...a11yProps(1)} />
        <Tab label="🚧 Creator Log" {...a11yProps(2)} disabled />
        <Tab label="🚧 Donation" {...a11yProps(3)} disabled />
        <Tab label="User History" {...a11yProps(4)} />
      </Tabs>
    </>
  );
};
