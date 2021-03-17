import * as s from "../../../../Styles/Table";
import dayjs from "dayjs";

export const COLUMNS = [
  {
    id: "profile",
    accessor: "submitter",
    Cell: ({ cell: { value } }) => (
      <>
        <s.TableProfilePicture src={value.profile_picture} alt={" "} />
      </>
    ),
  },
  {
    Header: "Submitter",
    accessor: "submitter",
    Cell: ({ cell: { value } }) => (
      <>
        <p>{value.first_name + " " + value.last_name}</p>
        <s.SubData>{value.username}</s.SubData>
      </>
    ),
  },
  {
    Header: "Name",
    accessor: "title",
  },
  {
    Header: "Priority",
    accessor: "priority",
    Cell: ({ cell: { value } }) => (
      <s.Priority value={value}>{value}</s.Priority>
    ),
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
        <s.issueLabel key={id} style={{ backgroundColor: item.color }}>
          {item.name}
        </s.issueLabel>
      ))),
  },
  {
    id: "assignee_picture",
    accessor: (row) => (
      <s.imageContainer>
        {
          (row = row.assignees.map((item, id) => (
            <s.imageContainerItem
              key={id}
              src={item.profile_picture}
            ></s.imageContainerItem>
          )))
        }
      </s.imageContainer>
    ),
  },
];
