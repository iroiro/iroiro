import * as React from "react";
import { Paper, Typography, Box, Button } from "@material-ui/core";
import { UUID_ACTIONS, UUIDState } from "../../../reducers/uuid";
import CopyToClipboard from "react-copy-to-clipboard";
import { useState } from "react";

export interface UUIDURLListProps {
  readonly tokenAddress: string;
  readonly campaignAddress: string;
  readonly uuidState: UUIDState;
  readonly uuidDispatch: React.Dispatch<UUID_ACTIONS>;
}

const UUIDURLList: React.FC<UUIDURLListProps> = ({
  tokenAddress,
  campaignAddress,
  uuidState,
  uuidDispatch,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const urlList = uuidState.rawTargets
    .map(
      (uuid) =>
        `${window.location.origin}/explore/${tokenAddress}/distributors/${uuidState.distributorAddress}/campaigns/${campaignAddress}?uuid=${uuid}`
    )
    .join("\n");

  return (
    <Box mt={2}>
      <Paper>
        <Box p={4}>
          <Box m={"auto"} width={[3 / 4]} mt={2}>
            <Typography variant={"h4"}>4. URL List</Typography>
            <Box mt={2}>
              <Typography display="inline">
                A campaign is created successfully and
              </Typography>
              <Typography display="inline" color="primary">
                {" "}
                {uuidState.rawTargets.length} campaign URLs{" "}
              </Typography>
              <Typography display="inline">
                are generated for your fans.
              </Typography>
              <Typography>
                Copy and distribute it! Please note, this URL will be deleted
                after you move from this page, so please be careful.
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            my={4}
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            <Box mr={4}>
              <CopyToClipboard text={urlList} onCopy={() => setIsCopied(true)}>
                <Button color="primary" variant="contained">
                  Copy URLs to clipboard
                </Button>
              </CopyToClipboard>
            </Box>
            <Box>
              <Button
                color="secondary"
                variant="contained"
                disabled={!isCopied}
                onClick={() => {
                  uuidDispatch({ type: "moveToCampaignPage:on" });
                }}
              >
                Go to campaign detail
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default UUIDURLList;
