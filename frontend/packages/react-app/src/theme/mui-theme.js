import { createMuiTheme } from "@material-ui/core";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import customTheme from "./rinble-ui-theme";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#E25E89",
    },
    secondary: {
      main: "#CAFC74",
    },
  },
});

export default theme;
