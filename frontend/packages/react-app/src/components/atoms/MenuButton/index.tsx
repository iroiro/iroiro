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

import { Card, CardActionArea } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

export interface MenuButtonProps {
  title: string;
  description: string;
  color: "creator" | "user";
  disabled?: boolean;
  onClick?: () => void;
}

const MenuButton = ({ disabled = false, ...props }) => {
  const color = props.color === "creator" ? "#70C2D2" : "#D06689";

  return (
    <Card
      onClick={props.onClick}
      variant="outlined"
      style={{ border: `1px solid ${disabled ? "#E0E0E0" : color}` }}
    >
      <CardActionArea disabled={disabled} style={{ height: "100%" }}>
        <Frame disabled={disabled}>
          <Title disabled={disabled} color={color}>
            {props.title}
          </Title>
          <p style={{ color: disabled ? "#A7A7A7" : "#000" }}>
            {props.description}
          </p>
        </Frame>
      </CardActionArea>
    </Card>
  );
};

interface TitleProps {
  readonly disabled: boolean;
  readonly color: string;
}

const Title = styled.p<TitleProps>`
  position: relative;
  padding-bottom: 18px;
  margin-bottom: 18px;
  font-size: 1.125rem;
  font-weight: bold;
  color: ${(props) => (props.disabled ? "#A7A7A7" : props.color)};

  &::after {
    content: "";
    width: 30px;
    border-bottom: 1px solid
      ${(props) => (props.disabled ? "#A7A7A7" : props.color)};
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

interface FrameProps {
  readonly disabled: boolean;
}

const Frame = styled.div<FrameProps>`
  cursor: ${(props) => (props.disabled ? "inherit" : "pointer")};
  background-color: #fff;
  border-radius: 6px;
  padding: 14px;
  text-align: center;
`;

export default MenuButton;
