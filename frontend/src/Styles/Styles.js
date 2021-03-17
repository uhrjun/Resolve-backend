import styled from "styled-components";

export const Input = styled.input`
  font-size: 16px;
  padding: 0.5em 0.2em;
  border-radius: 5px;
  border: 1px solid hsla(0, 0%, 0%, 0.4);
  outline: none;
  &:focus {
    background-color: rgba(189, 195, 199, 0.2);
    border: 0.5px solid hsla(0, 0%, 0%, 1);
  }
`;

export const PrimaryButton = styled.button`
  font-weight: 500;
  color: white;
  margin: 0px;
  padding: 0.65em 1em;
  background-color: rgba(52, 152, 219, 1);
  border-radius: 3px;
  outline: none;
  border: none;
  &:hover {
    background-color: rgba(52, 152, 219, 0.3);
    color: white;
    transition: all 0.25s;
  }
  &:focus {
    background-color: rgba(52, 152, 219, 0.3);
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  background-color: rgba(46, 204, 113, 1);
  &:hover {
    background-color: rgba(46, 204, 113, 0.4);
  }
  &:focus {
    background-color: rgba(46, 204, 113, 0.4);
  }
`;

export const Label = styled.p`
  padding: 0em 0em;
  margin-bottom: 0.2em;
`;

export const Textarea = styled.textarea`
  padding: 0.5em 0.2em;
  width: 100%;
  resize: none;
  border-radius: 5px;
  border: 1px solid hsla(0, 0%, 0%, 0.2);
  outline: none;
  width: 500px;
  height: 200px;
  &:focus {
    background-color: rgba(189, 195, 199, 0.2);
    border: 0.5px solid hsla(0, 0%, 0%, 1);
  }
`;

export const UserImage = styled.img`
  border-radius: 50px;
`;
