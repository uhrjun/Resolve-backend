import styled from "styled-components";

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.isSidebarOpen ? "20%" : "5%")};
  max-width: 280px;
  min-width: 80px;
  background-color: ${(props) => props.theme.bluegrey2};
  color: ${(props) => props.theme.white};
  position: relative;
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
  border-radius: 7px;
  margin: 5px;
`;

export const SidebarHeaderContainer = styled.div`
  width: auto;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 25px;
  vertical-align: middle;
  text-align: center;
`;

export const SidebarHeader = styled.h1`
  font-weight: 600;
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  cursor: pointer;
`;

export const SidebarHeaderIcon = styled.img`
  float: ${(props) => (props.isSidebarOpen ? "right" : "center")};
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

export const MenuItemContainer = styled.div`
  border: none;
  outline: none;
  &:focus {
    border: none;
    outline: none;
  }
  &:active {
    outline: none;
    border: none;
  }
`;

export const MenuItem = styled.div`
  border-radius: 5px;
  border: none;
  outline: none;
  white-space: nowrap;
  margin: 10px 10px;
  padding: 10px 10px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected ? props.theme.bluegrey1 : "transparent"};
  font-weight: ${(props) => (props.selected ? "600" : "500")};

  ${(props) =>
    !props.isSidebarOpen &&
    `
    text-align: center;
  `}
  &:hover {
    background-color: ${(props) => props.theme.bluegrey1};
  }
`;

export const Text = styled.p`
  display: ${(props) => (props.isSidebarOpen ? "inline" : "none")};
  color: white;
  vertical-align: middle;
`;

export const Icon = styled.img`
  vertical-align: middle;
  float: middle;
  ${(p) =>
    p.isSidebarOpen &&
    `padding-right: 20px; transition: 0.1s linear padding-right`};
  height: 24px;
  width: 24px;
`;
