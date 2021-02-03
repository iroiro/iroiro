import * as React from "react";
import styled from "styled-components";
import LogoButton from "../../atoms/LogoButton";

export const NotFoundPageTemplate = () => (
  <ContentWrapper>
    <div style={{ textAlign: "center" }}>
      <OopsMsg>\ Oops! /</OopsMsg>
      <span style={{ fontSize: "5rem" }}>🤭</span>
      <div style={{ marginBottom: 98 }}>
        <Mark>404</Mark>
        <div>Sorry, Page Not Found</div>
      </div>
      <LogoButton />
    </div>
  </ContentWrapper>
);
const ContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const OopsMsg = styled.div`
  font-size: 1rem;
  margin-bottom: -5px;
`;

const Mark = styled.div`
  display: inline-block;
  font-size: 3.5rem;
  font-weight: bold;
  padding: 5px 21px;
  background-color: rgb(226, 94, 137);
  color: white;
  border-radius: 5px;
  margin-bottom: 18px;
`;
