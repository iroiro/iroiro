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
  Typography,
} from "@material-ui/core";
import TokenInformationBar from "../TokenInformationBar";
import BasicTokenInformation from "../BasicTokenInformation";
import TokenCampaigns from "../TokenCampaigns";
import TokenCampaignDetail from "../TokenCampaignDetail";
import TokenRequestCard from "../../molecules/CheckRequestCard";
import TokenClaimCard from "../../molecules/TokenClaimCard";
import { TokenInformationTemplateProps } from "../../templates/TokenInformationTemplate";
import BalanceHistoryChart from "../../molecules/BalanceHistoryChart";
import UserActivities from "../UserActivities";
import TokenDetailCampaignPanel from "../TokenCampaignDetailPanel";

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
          {!!state.campaignAddress ? (
            <TokenDetailCampaignPanel
              state={state}
              campaignAddress={state.campaignAddress}
              isApproved={state.isTokenApproved}
              isRequested={state.isTokenRequested}
              isClaimable={state.isCampaignClaimable}
              isClaimed={state.isCampaignClaimed}
            />
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
          <Grid container spacing={4} direction="column">
            <Grid item xs={12}>
              <UserActivities state={state} />
            </Grid>
            <Grid item xs={12}>
              <BalanceHistoryChart balances={state.balances} />
            </Grid>
          </Grid>
        </TabPanel>
      </Container>
    </div>
  );
}

export default TokenInformationTabs;
