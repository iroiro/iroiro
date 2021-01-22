import React, { Dispatch } from "react";
import {
  Box,
  Container,
  makeStyles,
  Tab,
  Tabs,
  Theme,
} from "@material-ui/core";
import TokenInformationBar from "../TokenInformationBar";
import BasicTokenInformation from "../BasicTokenInformation";
import TokenCampaigns from "../TokenCampaigns";
import AudiusCampaignDetailPanel from "../AudiusCampaignDetailPanel";
import WalletCampaignDetailPanel from "../WalletCampaignDetailPanel";
import UserHistory from "../UserHistory";
import { TokenInformationState } from "../../../interfaces";
import { TokenInformationAction } from "../../../reducers/tokenInformation";
import { AUDIUS_ACTIONS, AudiusState } from "../../../reducers/audius";

// See https://material-ui.com/components/tabs/#tabs
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface TokenInformationProps {
  readonly state: TokenInformationState;
  readonly dispatch: Dispatch<TokenInformationAction>;
  readonly audiusState: AudiusState;
  readonly audiusDispatch: Dispatch<AUDIUS_ACTIONS>;
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  chart: {
    paddingTop: theme.spacing(6),
  },
}));

function CampaignDetailPanel({
  state,
  dispatch,
  audiusState,
  audiusDispatch,
}: TokenInformationProps) {
  if (state.campaignAddress) {
    if (state.distributorType === "") {
      return <TokenCampaigns state={state} dispatch={dispatch} />;
    }
    if (state.distributorType === "audius") {
      return (
        <AudiusCampaignDetailPanel
          state={state}
          dispatch={dispatch}
          audiusState={audiusState}
          audiusDispatch={audiusDispatch}
        />
      );
    }
    if (state.distributorType === "wallet") {
      return <WalletCampaignDetailPanel state={state} dispatch={dispatch} />;
    }
  }
  return <TokenCampaigns state={state} dispatch={dispatch} />;
}

export const TokenInformationTabs: React.FC<TokenInformationProps> = ({
  state,
  dispatch,
  audiusState,
  audiusDispatch,
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setValue(newValue);
    dispatch({ type: "campaignAddress:remove" });
    dispatch({ type: "isTokenCheckFinished:remove" });
    dispatch({ type: "isCampaignClaimable:remove" });
    dispatch({ type: "isCampaignClaimed:remove" });
  };

  return (
    <div className={classes.root}>
      <TokenInformationBar state={state} />
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
      <Container maxWidth="md">
        <TabPanel value={value} index={0}>
          <BasicTokenInformation state={state} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CampaignDetailPanel
            state={state}
            dispatch={dispatch}
            audiusState={audiusState}
            audiusDispatch={audiusDispatch}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box pt={8} textAlign="center">
            Coming soon...
          </Box>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Box pt={8} textAlign="center">
            Coming soon...
          </Box>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <UserHistory state={state} />
        </TabPanel>
      </Container>
    </div>
  );
};

export default TokenInformationTabs;
