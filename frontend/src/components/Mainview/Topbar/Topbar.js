import React, { useEffect, useState } from "react";
import * as styled from "./Topbar.styles";
import { authService } from "../../../utils/auth.service";
import { useHistory } from "react-router-dom";
import { DropDown } from "../../../Atomics/dropDown";

const TopBar = (props) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const userLocal = localStorage.getItem("resolve-user-data");
    setUserData(JSON.parse(userLocal));
  }, []);

  let history = useHistory();
  function logoutAndRedirect() {
    authService.logout();
    history.push("/userauth");
  }

  return (
    <styled.TopBarContainer>
      <styled.SearchBarContainer>
        <styled.SearchBar placeholder={"Search"} />
        <styled.SearchBarButton>
          <styled.SearchBarButtonIcon
            xmlns="http://www.w3.org/2000/svg"
            width="192"
            height="192"
            fill="white"
            viewBox="0 0 256 256"
          >
            <rect width="256" height="256" fill="none"></rect>
            <circle
              cx="116"
              cy="116"
              r="84"
              fill="none"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></circle>
            <line
              x1="175.39356"
              y1="175.40039"
              x2="223.99414"
              y2="224.00098"
              fill="none"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></line>
          </styled.SearchBarButtonIcon>
        </styled.SearchBarButton>
      </styled.SearchBarContainer>
      <styled.LogoutButton
        onClick={logoutAndRedirect}
        src={userData.profile_picture}
        alt={""}
      />
    </styled.TopBarContainer>
  );
};

export default TopBar;
