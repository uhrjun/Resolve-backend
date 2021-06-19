import styled from "styled-components";
import { Input } from "../Atomics/Styles";

export const Heading = styled.h2`
  font-weight: 500;
  margin-bottom: 1em;
  text-align: center;
`;

export const FullInput = styled(Input)`
  width: 500px;
`;

export const SubmitButton = styled.button`
  font-weight: 500;
  color: ${(props) => props.theme.green1};
  display: flex;
  align-items: center;
  margin: 10px 0px;
  justify-content: center;
  border-radius: 5px;
  margin-bottom: 1em;
  padding: 0.65em 0em;
  border: 2px solid ${(props) => props.theme.green1};
  background-color: transparent;
  width: 100%;
  outline: none;
  &:hover {
    background-color: ${(props) => props.theme.green1};
    border: 2px solid ${(props) => props.theme.green1};
    color: white;
    transition: all 0.25s linear;
  }
  &:focus {
    color: white;
    background-color: ${(props) => props.theme.green1};
    border: 2px solid ${(props) => props.theme.green1};
  }
  &:active {
    color: white;
    background-color: ${(props) => props.theme.green1};
    border: 2px solid ${(props) => props.theme.green1};
  }
`;
