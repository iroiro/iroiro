import React from "react";
import { Header } from "../../index";
import { Theme, Box, Typography, Link } from "@material-ui/core";
import LogoButton from "../../atoms/LogoButton";
import LinkButton from "../../atoms/LinkButton";
import WalletButton from "../../atoms/WalletButton";
import { withStyles } from "@material-ui/core/styles";

const MBox = withStyles((theme: Theme) => ({
  root: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(4),
    },
  },
}))(Box);

const AppHeader: React.FC = () => {
  return (
    <div>
      <Box bgcolor={"primary.main"} style={{ textAlign: "center" }} py={1}>
        <Typography style={{ color: "white", fontSize: 12 }}>
          🎨 Beta - Use at your own risk. Twitter:{" "}
          <Link
            href={"https://twitter.com/IroiroTokens"}
            style={{ color: "white" }}
          >
            @IroiroTokens
          </Link>{" "}
          🎨
        </Typography>
      </Box>
      <Header>
        <MBox>
          <LogoButton />
        </MBox>
        <Box display="flex">
          <LinkButton
            m={1}
            path="/dashboard"
            text="Distribution"
            color={"secondary"}
          />
          <LinkButton m={1} path="/explore" text="Explore" color={"primary"} />
          <Box mr={1}>
            <WalletButton />
          </Box>
        </Box>
      </Header>
      <hr color={"lightgray"} style={{ margin: "0px" }} />
    </div>
  );
};

export default AppHeader;
