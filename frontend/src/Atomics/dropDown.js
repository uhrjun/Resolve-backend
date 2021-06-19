import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const DropDownList = styled.ul`
  color: red;
`;

const dropDown = (props) => {
  <DropDownList>{props.children}</DropDownList>;
};

export default dropDown;
