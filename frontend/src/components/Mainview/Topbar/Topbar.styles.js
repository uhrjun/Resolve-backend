import styled from "styled-components";
import { Input, PrimaryButton, UserImage } from "../../../Styles/Styles";

export const TopBarContainer = styled.div`
  display: flex;
  border-radius: 7px;
  padding: 0.75em;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.bluegrey2};
  margin-bottom: 1em;
`;
export const SearchBarContainer = styled.div`
  display: flex;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.grey1};
`;

export const SearchBar = styled(Input)`
  border: none;
  border-radius: 5px;
  padding: 0.5em;
  margin: 0em 0em 0em 0em;
  color: ${(props) => props.theme.white};
  background-color: transparent;

  &:focus {
    border: none;
    box-shadow: none;
    background-color: transparent;
  }

  &::placeholder {
    color: ${(props) => props.theme.grey1};
  }
`;

export const SearchBarButton = styled(PrimaryButton)`
  color: black;
  font-size: 12px;
  background-image: none;
  background-color: transparent;
  color: ${(props) => props.theme.white};
  border-radius: 0px 6px 6px 0px;
  size: 22px;
  cursor: pointer;

  &:hover {
    background-image: none;
    background-color: transparent;
  }
  &:focus {
    background-image: none;
    background-color: transparent;
  }
`;
export const SearchBarButtonIcon = styled.svg`
  padding: 0;
  margin: 0;
  height: 20px;
  width: 20px;
`;

export const LogoutButton = styled(UserImage)`
  padding: none;
  margin: none;
  height: 35px;
  width: 35px;
`;
