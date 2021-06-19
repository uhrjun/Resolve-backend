import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../apis/projects.instance";
import IssueTable from "../../Issues/IssueTable";
import { COLUMNS } from "./columns";
import Labels from "./Labels";
import NewIssueForm from "./NewIssue";
import * as styled from "./ProjectDetail.styles";

const ProjectDetail = () => {
  const [loading, setLoading] = useState(true);
  const [projectDetail, setProjectDetail] = useState();
  const [projectIssue, setProjectIssue] = useState([]);

  const selectedProject = useParams().id;
  const idUrl = "/projects/" + selectedProject;
  const issueUrl = "projects/" + selectedProject + "/issues/";

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => projectIssue, [projectIssue]);

  const getProjectIssue = useCallback(() => {
    axiosInstance
      .get(issueUrl)
      .then((res) => {
        setProjectIssue(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [issueUrl]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 250);
    function getProjectDetail() {
      axiosInstance
        .get(idUrl)
        .then((res) => {
          setProjectDetail(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getProjectDetail();
    getProjectIssue();
  }, [idUrl, getProjectIssue]);

  return (
    <div>
      {loading === false ? (
        <styled.Container>
          <styled.ProjectTitle>
            <h1>{projectDetail.project_name}</h1>
            <styled.breaker />
          </styled.ProjectTitle>
          <styled.Controlbar>
            <styled.buttonContainer>
              <NewIssueForm />
              <Labels />
            </styled.buttonContainer>
            <styled.membersContainer>
              {projectDetail.members.map((item, id) => {
                return (
                  <styled.profilePicture key={id} src={item.profile_picture} />
                );
              })}
            </styled.membersContainer>
          </styled.Controlbar>
          <IssueTable columns={columns} data={data} />
        </styled.Container>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProjectDetail;
