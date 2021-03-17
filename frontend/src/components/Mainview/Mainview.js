import React from "react";
import * as styled from "./Mainview.styles";
import Routes from "../../Routes";
import TopBar from "./Topbar/Topbar";

const Mainview = (props) => {
  return (
    <styled.MainviewContainer>
      <TopBar />
      <Routes />
    </styled.MainviewContainer>
  );
};

export default Mainview;
