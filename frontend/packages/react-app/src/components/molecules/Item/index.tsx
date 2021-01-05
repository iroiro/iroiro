import React from "react";
import { Typography, Box } from "@material-ui/core";

export interface ItemProps {
  readonly title: string;
  readonly text: string;
}

const Item: React.FC<ItemProps> = ({ title, text }) => {
  return (
    <Box mr={4}>
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="h4">{text}</Typography>
    </Box>
  );
};

export default Item;
