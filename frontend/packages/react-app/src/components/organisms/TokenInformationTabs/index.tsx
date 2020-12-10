import * as React from "react";
import {
  AppBar,
  Box,
  Container,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Theme,
} from "@material-ui/core";
import TokenInformationBar from "../TokenInformationBar";
import BasicTokenInformation from "../BasicTokenInformation";
import TokenCampaigns from "../TokenCampaigns";
import { TokenInformationTemplateProps } from "../../templates/TokenInformationTemplate";
import BalanceHistoryChart from "../../molecules/BalanceHistoryChart";
import UserActivities from "../UserActivities";
import TokenDetailCampaignPanel from "../TokenCampaignDetailPanel";
import UserHistory from "../UserHistory";

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
      {value === index && <Box p={3}>{children}</Box>}
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
  chart: {
    paddingTop: theme.spacing(6),
  },
}));

export function TokenInformationTabs({
  state,
  dispatch,
}: TokenInformationTemplateProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    if (newValue !== 1) {
      dispatch({ type: "campaignAddress:remove" });
      dispatch({ type: "isTokenCheckFinished:remove" });
      dispatch({ type: "isCampaignClaimable:remove" });
      dispatch({ type: "isCampaignClaimed:remove" });
    }
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
          scrollButtons="auto"
          indicatorColor="primary"
          centered
        >
          <Tab label="Basic" {...a11yProps(0)} />
          <Tab label="Campaigns" {...a11yProps(1)} />
          <Tab label="Creator Log" {...a11yProps(2)} />
          <Tab label="Donation" {...a11yProps(3)} />
          <Tab label="User History" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <Container maxWidth="sm">
        <TabPanel value={value} index={0}>
          <BasicTokenInformation state={state} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {!state.campaignAddress ? (
            <TokenCampaigns state={state} dispatch={dispatch} />
          ) : (
            <TokenDetailCampaignPanel state={state} />
          )}
        </TabPanel>
        <TabPanel value={value} index={2}>
          Coming soon...
        </TabPanel>
        <TabPanel value={value} index={3}>
          Coming soon...
        </TabPanel>
        <TabPanel value={value} index={4}>
          <UserHistory state={state} />
        </TabPanel>
      </Container>
    </div>
  );
}

export default TokenInformationTabs;
