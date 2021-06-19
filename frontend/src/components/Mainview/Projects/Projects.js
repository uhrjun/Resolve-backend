import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ModalProvider } from "styled-react-modal";
import axiosInstance from "../../../apis/projects.instance";
import NewProjectForm from "./NewProject";
import * as styled from "./Projects.styles";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  let history = useHistory();

  useEffect(() => {
    async function getProjects() {
      await axiosInstance
        .get("/projects/")
        .then((res) => {
          setProjects(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getProjects();
  }, []);
  console.log(projects);
  return (
    <ModalProvider>
      <NewProjectForm />
      <styled.ProjectsContainer>
        {projects.map((project) => (
          <Link
            key={project.id}
            style={{ textDecoration: "none" }}
            to={"/projects/detail/" + project.id}
          >
            <styled.ProjectItem>
              <styled.subHeader>{project.project_name}</styled.subHeader>
            </styled.ProjectItem>
          </Link>
        ))}
      </styled.ProjectsContainer>
    </ModalProvider>
  );
}

export default ProjectList;
