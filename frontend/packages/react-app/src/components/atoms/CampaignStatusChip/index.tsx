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
