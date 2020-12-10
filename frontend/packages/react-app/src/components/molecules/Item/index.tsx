import React from "react";
import { Box, Text } from "rimble-ui";

export interface ItemProps {
  readonly title: string;
  readonly text: string;
}

const Item: React.FC<ItemProps> = ({ title, text }) => {
  return (
    <Box mr={4}>
      <Text fontSize={2} color="gray">
        {title}
      </Text>
      <Text fontSize={3} fontWeight="bold">
        {text}
      </Text>
    </Box>
  );
};

export default Item;
