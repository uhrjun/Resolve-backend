import React, { useState } from "react";
import { projectService } from "../../../utils/project.service";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import * as styled from "./Projects.styles";
import * as form from "../../../Atomics/Form";
import { Input, Label } from "../../../Atomics/Styles";
import Modal from "../../../Atomics/Modal";
import { FiPlus } from "react-icons/fi";
export default function NewProjectForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleIsModalOpen = () => setIsModalOpen(!isModalOpen);

  const initialValues = {
    project_name: "",
  };

  const validationSchema = Yup.object({
    project_name: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    projectService.createProject(values).then(() => {
      toggleIsModalOpen();
    });
  };

  return (
    <div>
      <styled.NewProjectButton onClick={toggleIsModalOpen}>
        <FiPlus
          style={{
            fontSize: "22px",
          }}
        />
        New Project
      </styled.NewProjectButton>
      {isModalOpen && (
        <Modal closeModal={() => setIsModalOpen(false)}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <form.Heading>New project</form.Heading>
              <Label>Project name:</Label>
              <Field
                as={Input}
                type="text"
                name="project_name"
                id="project_name"
              />
              <br />
              <form.SubmitButton type="submit">Create</form.SubmitButton>
            </Form>
          </Formik>
        </Modal>
      )}
    </div>
  );
}
