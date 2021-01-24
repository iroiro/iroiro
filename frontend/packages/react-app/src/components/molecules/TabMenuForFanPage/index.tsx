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
        <Tab label="Creator Log" {...a11yProps(2)} />
        <Tab label="Donation" {...a11yProps(3)} />
        <Tab label="User History" {...a11yProps(4)} />
      </Tabs>
    </>
  );
};
