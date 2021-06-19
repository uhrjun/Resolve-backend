import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { GithubPicker } from "react-color";
import { FiDelete } from "react-icons/fi";
import { MdLabel } from "react-icons/md";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import axiosInstance from "../../../../apis/projects.instance";
import * as form from "../../../../Atomics/Form";
import Modal from "../../../../Atomics/Modal";
import { SecondaryButton } from "../../../../Atomics/Styles";
import { Label } from "../../../../Atomics/Styles";

export default function Labels() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [labelData, setlabelData] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState([]);
  const selectedProject = useParams().id;
  const labelUrl = "projects/" + selectedProject + "/update/labels/";
  const toggleIsModalOpen = () => setIsModalOpen(!isModalOpen);

  async function getLabels() {
    await axiosInstance
      .get(labelUrl)
      .then((res) => {
        setlabelData(res.data);
        toggleIsModalOpen();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function updateLabels() {
    await axiosInstance
      .get(labelUrl)
      .then((res) => {
        setlabelData(res.data);
        toggleIsModalOpen();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function createLabels(values) {
    axiosInstance
      .post(labelUrl, values)
      .then((res) => {
        console.log(res.data);
        toggleIsModalOpen();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteLabels() {
    axiosInstance
      .delete(labelUrl + selectedLabel)
      .then((res) => {
        console.log(res.data);
        toggleIsModalOpen();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const initialValues = {
    name: "",
    color: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string(),
    color: Yup.string(),
  });

  const onSubmit = (values) => {
    createLabels(values);
    updateLabels();
  };

  const projectLabels = labelData.map((label) => (
    <div
      style={{
        marginTop: "1em",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Label key={label.id} style={{ backgroundColor: label.color }}>
        {label.name}
      </Label>
      <FiDelete
        style={{ fontSize: "24px", color: "red", cursor: "pointer" }}
        onClick={() => {
          setSelectedLabel(label.id);
          deleteLabels(selectedLabel);
        }}
      />
    </div>
  ));

  const colors = [
    "#e84118",
    "#0984e3",
    "#f1c40f",
    "#4cd137",
    "#fd79a8",
    "#ff9f43",
    "#9b59b6",
    "#7f8fa6",
  ];

  return (
    <div>
      <SecondaryButton
        onClick={getLabels}
        style={{
          marginLeft: "0.15em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MdLabel
          style={{
            fontSize: "20px",
            color: "white",
            verticalAlign: "middle",
            marginRight: "2px",
          }}
        />
        Labels
      </SecondaryButton>
      {isModalOpen && (
        <Modal closeModal={() => setIsModalOpen(false)}>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "space-between",
              justifyContent: "stretch",
            }}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ setFieldValue }) => (
                <Form>
                  <form.Heading>Manage labels</form.Heading>
                  <Field
                    as={form.FullInput}
                    type="text"
                    name="name"
                    id="name"
                  ></Field>
                  <GithubPicker
                    colors={colors}
                    style={{ width: "200%" }}
                    onChangeComplete={(color) => {
                      setFieldValue("color", color.hex);
                    }}
                  />
                  <form.SubmitButton type="submit">Create</form.SubmitButton>
                </Form>
              )}
            </Formik>
          </div>
          <hr style={{ width: "100%" }} />
          <div style={{ height: "500px", width: "100%", overflowX: "scroll" }}>
            {projectLabels}
          </div>
        </Modal>
      )}
    </div>
  );
}
