import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import Modal from "../../../Atomics/Modal";
import * as s from "./../../../Atomics/Table";
import IssueDetail from "./IssueDetail";

export default function IssueTable({ columns, data }) {
  const [isEmpty, setIsEmpty] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState({});
  const toggleIsModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  function HandleShow(selected) {
    setSelectedIssue(selected);
    console.log("Here ya go!");
    console.log(selectedIssue);
    toggleIsModalOpen();
  }

  const tableInstance = useTable({
    columns,
    data,
  });

  useEffect(() => {
    if (data.length === 0) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }, [isEmpty, data.length]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return isEmpty === true ? (
    <s.TableContainer>
      <s.Table {...getTableProps()}>
        <s.tableHead>
          {headerGroups.map((headerGroup) => (
            <s.tableHeaderRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <s.tableHeader {...column.getHeaderProps()}>
                  {column.render("Header")}
                </s.tableHeader>
              ))}
            </s.tableHeaderRow>
          ))}
        </s.tableHead>
        <s.tableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <s.tableBodyRow
                {...row.getRowProps()}
                onClick={() => HandleShow(row.original)}
              >
                {row.cells.map((cell) => {
                  return (
                    <s.tableBodyData {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </s.tableBodyData>
                  );
                })}
              </s.tableBodyRow>
            );
          })}
          {isModalOpen && (
            <Modal closeModal={() => setIsModalOpen(false)}>
              <IssueDetail {...selectedIssue} />
            </Modal>
          )}
          <s.tableBodyRow>
            <s.tableBodyData></s.tableBodyData>
          </s.tableBodyRow>
        </s.tableBody>
      </s.Table>
    </s.TableContainer>
  ) : (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Nothing to display
      </div>
    </>
  );
}
