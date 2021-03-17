import styled from "styled-components";
import { PrimaryButton } from "../../../Styles/Styles";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0em 0.25em;
  margin: 0.2em;
`;
export const subHeader = styled.p`
  font-size: 18px;
`;

export const DashboardContainer = styled.div`
  flex-direction: row;
`;

export const ProjectsContainer = styled.div`
  height: 100%;
  overflow: auto;
  overflow-y: scroll;
  border-radius: 5px;
`;

export const ProjectItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 1em;
  border-radius: 5px;
  margin-bottom: 1em;
  color: ${(props) => props.theme.black};
  background-color: ${(props) => props.theme.white};
  &:hover {
    background-color: ${(props) => props.theme.offwhite};
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
`;

export const NewProjectButton = styled(PrimaryButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin: 0.5em 0em;
  padding: 0.9em 0.9em;
  border: 2px solid;
  background-color: transparent;
  width: 100%;
`;

export const NewProjectButtonIcon = styled.svg`
  fill: ${(props) => props.theme.white};
  height: 22px;
  width: 22px;
  padding: 0em 0.25em;
`;

export const newProjectHeading = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 1em;
`;

export const CreateProjectButton = styled(PrimaryButton)`
  width: 100%;
  color: ${(props) => props.theme.white};
`;
