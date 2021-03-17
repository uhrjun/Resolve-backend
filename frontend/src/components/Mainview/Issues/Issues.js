import React, { useState, useEffect, useMemo } from "react";
import { COLUMNS } from "./columns";
import axiosInstance from "../../../apis/projects.instance";
import IssueTable from "./IssueTable";

export default function UserIssues() {
  const [issues, setIssues] = useState([]);
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => issues, [issues]);

  useEffect(() => {
    function getIssues() {
      axiosInstance
        .get("/issues/user")
        .then((res) => {
          setIssues(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getIssues();
  }, []);

  return <IssueTable columns={columns} data={data} />;
}
