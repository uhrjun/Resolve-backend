import React, { useState, useEffect } from "react";
import axiosInstance from "../../../apis/projects.instance";
import ProjectList from "../Projects/Projects";

export default function DashBoard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function getProjects() {
      await axiosInstance
        .get("/projects/member")
        .then((res) => {
          setProjects(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getProjects();
  }, []);

  return (
    <div>
      <ProjectList />
    </div>
  );
}
