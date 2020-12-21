import * as React from "react";
import { Chip } from "@material-ui/core";

interface ChipProps {
  text: string;
  color: "default" | "primary" | "secondary";
}

const chipPropsList: ChipProps[] = [
  {
    text: "Active",
    color: "primary",
  },
  {
    text: "Cancelled",
    color: "default",
  },
  {
    text: "Ended",
    color: "default",
  },
];

export interface CampaignStatusChipProps {
  readonly status: number;
}

const CampaignStatusChip: React.FC<CampaignStatusChipProps> = ({ status }) => {
  const chipProps = chipPropsList[status];

  return <Chip label={chipProps.text} color={chipProps.color} size="small" />;
};

export default CampaignStatusChip;
