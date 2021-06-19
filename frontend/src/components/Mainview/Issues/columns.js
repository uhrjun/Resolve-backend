import * as styled from "../../../Atomics/Table";
import dayjs from "dayjs";

export const COLUMNS = [
  {
    accessor: "submitter.profile_picture",
    Cell: ({ cell: { value } }) => (
      <>
        <styled.TableProfilePicture src={value} />
      </>
    ),
  },
  {
    Header: "Name",
    accessor: "submitter",
    Cell: ({ cell: { value } }) => (
      <>
        <p>{value.first_name + " " + value.last_name}</p>
        <styled.SubData>{value.username}</styled.SubData>
      </>
    ),
  },
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Priority",
    accessor: "priority",
    Cell: ({ cell: { value } }) => (
      <styled.Priority value={value}>{value}</styled.Priority>
    ),
  },
  {
    Header: "Project",
    accessor: "project.project_name",
    Cell: ({ cell: { value } }) => <p>{value}</p>,
  },
  {
    Header: "Date",
    accessor: (row) => (
      <>
        <p>{dayjs(row.date_created).format("DD/MM/YY")}</p>
        <p>{dayjs(row.date_created).format("hh:mma")}</p>
      </>
    ),
  },
  {
    Header: "Label",
    accessor: (row) =>
      (row = row.labels.map((item, id) => (
        <styled.issueLabel key={id} style={{ backgroundColor: item.color }}>
          {item.name}
        </styled.issueLabel>
      ))),
  },
];
