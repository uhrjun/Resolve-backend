import styled from "styled-components";
import { UserImage } from "./Styles";

export const TableContainer = styled.div`
  margin-top: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0px solid black;
  border-radius: 10px;
  overflow: hidden;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  overflow-x: auto;
`;
export const tableHead = styled.thead`
  background-color: ${(props) => props.theme.lgrey};
  border-bottom: 2px solid ${(props) => props.theme.grey1};
`;
export const tableHeaderRow = styled.tr`
  display: table-row-group;
`;
export const tableHeader = styled.th`
  text-align: left;
  width: 2%;
  padding: 1em 0em 1em 0em;
`;
export const tableBody = styled.tbody`
  background-color: white;
`;

export const tableBodyRow = styled.tr`
  display: table-row-group;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.offwhite};
    transition: all 0.1s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
`;

export const tableBodyData = styled.td`
  text-align: left;
  padding: 0.65em 0em 0.65em 0em;
  width: 4%;
  border-bottom: 1px solid #ccc;
`;

export const TableProfilePicture = styled(UserImage)`
  display: block;
  height: 40px;
  width: 40px;
  margin-left: auto;
  margin-right: auto;
`;

export const issueLabel = styled.div`
  display: inline;
  padding: 0.25em 0.4em 0.25em 0.4em;
  text-align: center;
  border-radius: 5px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.55);
`;

export const SubData = styled.p`
  color: ${(props) => props.theme.dgrey2};
`;

export const imageContainer = styled.div`
  width: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const imageContainerItem = styled.img`
  border: 4px solid white;
  width: 35px;
  height: 35px;
  padding: 0;
  margin-left: -10px;
  border-radius: 25px;
  margin-right: 0px;
  ${tableBodyRow}:hover & {
    border: 4px solid ${(props) => props.theme.offwhite};
  }
`;

export const Tags = styled.div`
  display: inline;
  padding: 0.35em 0.5em 0.35em 0.5em;
  text-align: center;
  border-radius: 5px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.55);
`;

export const priorityColor = (value) => {
  if (value.children.length === 4) {
    return value.theme.red1;
  }
  if (value.children.length === 6) {
    return value.theme.blue1;
  }
  if (value.children.length === 3) {
    return value.theme.green2;
  }
};

export const Priority = styled.span`
  background-color: ${(value) => priorityColor(value)};
  display: inline;
  padding: 0.35em 0.5em 0.35em 0.5em;
  text-align: center;
  border-radius: 5px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.65);
`;
