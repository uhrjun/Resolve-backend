import styled from "styled-components";
import { PrimaryButton } from "../../../Atomics/Styles";

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
  font-weight: 600;
  font-size: 18px;
  color: ${(props) => props.theme.blue2};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-bottom: 1em;
  padding: 0.75em 0.75em;
  border: 2px solid ${(props) => props.theme.blue2};
  background-color: transparent;
  width: 100%;
  &:hover {
    background-color: ${(props) => props.theme.blue1};
    border: 2px solid ${(props) => props.theme.blue1};
    color: white;
    transition: all 0.25s linear;
  }
  &:focus {
    background-color: ${(props) => props.theme.blue1};
    border: 2px solid ${(props) => props.theme.blue1};
  }
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
  text-align: center;
`;

export const CreateProjectButton = styled(PrimaryButton)`
  width: 100%;
  color: white;
  margin: 10px 0px;
`;
