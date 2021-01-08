import * as React from "react";
import { TokenInformationState } from "../../../interfaces";
import {
  Card,
  CardContent,
  makeStyles,
  Typography,
  Box,
  Container,
} from "@material-ui/core";
import EtherscanLink from "../../atoms/EtherscanLink";
import { getBalanceDevidedByDecimals } from "../../../utils/web3";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(3),
  },
  link: {
    padding: theme.spacing(6, 0, 0),
  },
}));

export interface BasicTokenInformationProps {
  readonly state: TokenInformationState;
}

const BasicTokenInformation: React.FC<BasicTokenInformationProps> = ({
  state: { token },
}) => {
  const classes = useStyles();

  return (
    <div style={{ marginTop: "24px" }}>
      <Card>
        <CardContent>
          <Container>
            {!token ? (
              <Box my={4}>
                <Typography>Loading Token information...</Typography>
              </Box>
            ) : (
              <>
                <Box display="flex" justifyContent="start" mt={2}>
                  <Box>
                    <Typography variant="subtitle1">Name:</Typography>
                    <Typography variant="h4">{token.name}</Typography>
                  </Box>
                  <Box ml={8}>
                    <Typography variant="subtitle1">Symbol:</Typography>
                    <Typography variant="h4">{token.symbol}</Typography>
                  </Box>
                </Box>
                <Box display="flex" justifyContent="start" my={2}>
                  <Box>
                    <Typography variant="subtitle1">Total Supply:</Typography>
                    <Typography variant="h4">
                      {getBalanceDevidedByDecimals(
                        token.totalSupply,
                        token.decimals
                      )}
                    </Typography>
                  </Box>
                  <Box ml={8}>
                    <Typography variant="subtitle1">Decimals:</Typography>
                    <Typography variant="h4">{token.decimals}</Typography>
                  </Box>
                </Box>
              </>
            )}
          </Container>
        </CardContent>
      </Card>
      <div className={classes.link}>
        {!!token && <EtherscanLink type="token" address={token.tokenAddress} />}
      </div>
    </div>
  );
};

export default BasicTokenInformation;
