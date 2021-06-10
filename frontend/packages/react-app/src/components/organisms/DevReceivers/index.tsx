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
import { Grid, Typography, Box } from "@material-ui/core";
import styled from "styled-components";
import theme from "../../../theme/mui-theme";
import { useHistory } from "react-router-dom";
import { DevReceiver } from "../../../generated/graphql";
import DevReceiverCard from "../../molecules/DevReceiverCard";

export interface DevReceiversProps {
  readonly devReceivers: DevReceiver[];
}

const DevReceivers: React.FC<DevReceiversProps> = ({ devReceivers }) => {
  const history = useHistory();

  if (devReceivers.length === 0) {
    return (
      <Wrapper>
        <Grid container>
          <Box p={4}>
            <Typography variant="h3">Dev Receivers</Typography>
            <Typography>
              You can earn $DEV rewards by burning community tokens with
              DevReceiver.
            </Typography>
          </Box>
          <Box p={4} textAlign="center">
            <Typography>No Dev Receivers are created yet.</Typography>
          </Box>
        </Grid>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Grid container>
        <Box p={4}>
          <Typography variant="h3">Dev Receivers</Typography>
          <Typography>
            You can earn $DEV rewards by burning community tokens with
            DevReceiver.
          </Typography>
        </Box>
        {devReceivers.map((devReceiver) => {
          const symbolPair = `${devReceiver.propertyToken.symbol}/${devReceiver.communityToken.symbol}`;
          return (
            <Grid key={devReceiver.id} item xs={12} sm={4}>
              <StyledBox>
                <DevReceiverCard
                  devReceiver={devReceiver}
                  symbolPair={symbolPair}
                  onClickActionArea={() =>
                    history.push(`/dev-receivers/${devReceiver.id}`)
                  }
                />
              </StyledBox>
            </Grid>
          );
        })}
      </Grid>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  background-color: #fff;
  ${theme.breakpoints.down(760)} {
    margin: 0 -26px;
  }
`;

const StyledBox = styled(Box)`
  box-sizing: border-box;
  margin-top: 16px;
  padding: 0 16px 16px;
  ${theme.breakpoints.down(600)} {
    width: 100%;
    padding: 8px;
  }
`;

export default DevReceivers;
