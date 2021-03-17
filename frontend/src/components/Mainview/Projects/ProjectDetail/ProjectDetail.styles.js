import styled from "styled-components";
import { PrimaryButton, UserImage } from "../../../../Styles/Styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.2em;
`;

export const ProjectTitle = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

export const breaker = styled.hr`
  background-color: ${(props) => props.theme.bluegrey1};
  width: 100%;
  height: 2px;
  border: none;
  margin-left: 10px;
`;

export const Controlbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const buttonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const membersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const profilePicture = styled(UserImage)`
  width: 35px;
  height: 35px;
  padding: 0;
  margin-left: -10px;
  overflow: hidden;
  border: 5px solid ${(props) => props.theme.grey1}; ;
`;

export const submitButton = styled(PrimaryButton)`
  width: 100%;
`;

export const labelWrapper = styled.div``;
