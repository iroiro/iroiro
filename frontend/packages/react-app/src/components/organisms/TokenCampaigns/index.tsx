import * as React from "react";
import { Typography } from "@material-ui/core";
import TokenCampaignCard from "../../molecules/TokenCampaignCard";
import { TokenInformationState } from "../../../interfaces";

export interface TokenCampaignsProps {
  readonly state: TokenInformationState;
}

const TokenCampaigns = ({
  state: { campaignInformationList },
}: TokenCampaignsProps) => (
  <div>
    <Typography variant="h4" component="h3">
      Campaigns
    </Typography>
    {campaignInformationList.length === 0 ? (
      <Typography>No campaigns for this Token yet.</Typography>
    ) : (
      <>
        {campaignInformationList.map((info) => (
          <TokenCampaignCard campaignInformation={info} />
        ))}
      </>
    )}
  </div>
);

export default TokenCampaigns;
