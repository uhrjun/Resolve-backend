import React from "react";
import { Container, Column } from "./Issues.styles";
import {
  Tags,
  Priority,
  TableProfilePicture,
  SubData,
} from "../../../Atomics/Table";

export default function IssueDetail(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <Container>
        <Column style={{ width: "75%", marginRight: "5%" }}>
          {props.description}
        </Column>
        <Column>
          Submitted by:
          <div style={{ display: "flex" }}>
            <TableProfilePicture src={props.submitter.profile_picture} />
            <p>
              {props.submitter.first_name + " " + props.submitter.last_name}
            </p>
          </div>
          <br />
          Label:
          {props.labels.map((item, id) => (
            <Tags key={id} style={{ backgroundColor: item.color }}>
              {item.name}
            </Tags>
          ))}
          <br />
          Priority:
          <Priority>{props.priority}</Priority>
          <br />
          Assigned to:
          <div style={{ display: "flex" }}>
            {props.assignees.map((item, id) => (
              <>
                <TableProfilePicture key={id} src={item.profile_picture} />
                <p key={id}>{item.first_name + " " + item.last_name}</p>
              </>
            ))}
          </div>
        </Column>
      </Container>
    </div>
  );
}
