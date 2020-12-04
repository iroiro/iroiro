import * as React from "react";
import {
  AppBar,
  Box,
  makeStyles,
  Tab,
  Tabs,
  Theme,
  Typography,
} from "@material-ui/core";
import TokenInformationBar from "../TokenInformationBar";
import BasicTokenInformation from "../BasicTokenInformation";
import TokenCampaigns from "../TokenCampaigns";
import TokenCampaignDetail from "../TokenCampaignDetail";
import TokenRequestCard from "../../molecules/CheckRequestCard";
import TokenClaimCard from "../../molecules/TokenClaimCard";
import { TokenInformationTemplateProps } from "../../templates/TokenDetailTemplate";

// See https://material-ui.com/components/tabs/#tabs
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function TokenInformationTabs({ state }: TokenInformationTemplateProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <TokenInformationBar state={state} />
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Basic" {...a11yProps(0)} />
          <Tab label="Campaigns" {...a11yProps(1)} />
          <Tab label="Creator Log" {...a11yProps(2)} />
          <Tab label="Donation" {...a11yProps(3)} />
          <Tab label="User History" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <BasicTokenInformation state={state} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {!!state.campaignAddress ? (
          <>
            <TokenCampaignDetail
              state={state}
              campaignAddress={state.campaignAddress}
            />
            <TokenRequestCard />
            <TokenClaimCard />
          </>
        ) : (
          <TokenCampaigns state={state} />
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        Coming soon...
      </TabPanel>
      <TabPanel value={value} index={3}>
        Coming soon...
      </TabPanel>
      <TabPanel value={value} index={4}>
        User History
      </TabPanel>
    </div>
  );
}

export default TokenInformationTabs;
