import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { useParams } from "react-router-dom";
import Select from "react-select";
import * as Yup from "yup";
import axiosInstance from "../../../../apis/projects.instance";
import * as form from "../../../../Atomics/Form";
import Modal from "../../../../Atomics/Modal";
import { Label, PrimaryButton, Textarea } from "../../../../Atomics/Styles";

export default function NewIssueForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [labelData, setlabelData] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const selectedProject = useParams().id;
  const issueUrl = "projects/" + selectedProject + "/issues/";
  const labelUrl = "projects/" + selectedProject + "/update/labels";
  const memberUrl = "projects/" + selectedProject;
  const toggleIsModalOpen = () => setIsModalOpen(!isModalOpen);
  console.log("HERE YOU GO " + selectedProject);

  useEffect(() => {
    async function getMembers() {
      await axiosInstance
        .get(memberUrl)
        .then((res) => {
          console.log(res.data.members);
          setMemberData(res.data.members);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    async function getLabels() {
      await axiosInstance
        .get(labelUrl)
        .then((res) => {
          console.log(res.data);
          setlabelData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getMembers();
    getLabels();
  }, [labelUrl, memberUrl]);

  function updateIssue(issueId, values) {
    axiosInstance
      .put(issueUrl + issueId + "/", values)
      .then((res) => {
        toggleIsModalOpen();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function createIssue(values) {
    axiosInstance
      .post(issueUrl, values)
      .then((res) => {
        const issueId = res.data.id;
        updateIssue(issueId, values);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const priority = [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ];

  const labels = labelData.map(function (label) {
    return { value: label.id, label: label.name };
  });

  const members = memberData.map(function (member) {
    return { value: member.id, label: member.username };
  });

  const initialValues = {
    title: "",
    description: "",
    priority: null,
    assignees: [],
    labels: [],
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    description: Yup.string(),
    priority: Yup.string().required(),
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
      <PrimaryButton
        onClick={toggleIsModalOpen}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BiPlus
          style={{
            fontSize: "20px",
            color: "white",
            verticalAlign: "top",
            marginRight: "2px",
          }}
        />
        Create Issue
      </PrimaryButton>
      {isModalOpen && (
        <Modal closeModal={() => setIsModalOpen(false)}>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validator={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <form.Heading>New Issue</form.Heading>
              <Label>Title:</Label>
              <Field as={form.FullInput} type="text" name="title" id="title" />
              <Label>Description:</Label>
              <Field
                as={Textarea}
                type="text"
                name="description"
                id="description"
              />
              <Label>Priority:</Label>
              <Field
                id="priority"
                name="priority"
                component={({ field, form }) => (
                  <Select
                    isMulti={false}
                    options={priority}
                    name="priority"
                    value={
                      priority
                        ? priority.find(
                            (option) => option.value === field.value
                          )
                        : ""
                    }
                    onChange={(option) =>
                      form.setValues(field.name, option.value)
                    }
                  />
                )}
              />
              <Label>Label:</Label>
              <Field
                id="labels"
                name="labels[0]"
                component={({ field, form }) => (
                  <Select
                    isMulti={false}
                    options={labels}
                    name="labels"
                    value={
                      labels
                        ? labels.find((option) => option.value === field.value)
                        : ""
                    }
                    onChange={(option) =>
                      form.setFieldValue(field.name, option.value)
                    }
                  />
                )}
              />
              <Label>Assign to:</Label>
              <Field
                id="assignees"
                name="assignees[0]"
                component={({ field, form }) => (
                  <Select
                    isMulti={false}
                    options={members}
                    name="members"
                    value={
                      members
                        ? members.find((option) => option.value === field.value)
                        : ""
                    }
                    onChange={(option) =>
                      form.setFieldValue(field.name, option.value)
                    }
                  />
                )}
              />
            </Form>
          </Formik>
        </Modal>
      )}
    </div>
  );
}
