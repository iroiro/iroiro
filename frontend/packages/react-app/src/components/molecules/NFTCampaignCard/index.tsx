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
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  CardActions,
} from "@material-ui/core";

export interface NFTCampaignCardProps {
  readonly image: string;
  readonly name: string;
  readonly description: string;
  readonly onClickActionArea?: () => void;
  readonly button?: JSX.Element;
}

const NFTCampaignCard: React.FC<NFTCampaignCardProps> = ({
  image,
  name,
  description,
  onClickActionArea,
  button,
}) => {
  const contents = (
    <>
      {image !== "" && <CardMedia component="img" image={image} />}
      {(name !== "" || description !== "") && (
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      )}
    </>
  );

  return (
    <Card>
      {onClickActionArea !== undefined ? (
        <CardActionArea onClick={onClickActionArea}>{contents}</CardActionArea>
      ) : (
        <>{contents}</>
      )}
      <CardActions>{button}</CardActions>
    </Card>
  );
};

export default NFTCampaignCard;
