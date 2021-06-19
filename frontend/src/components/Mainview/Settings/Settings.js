import React, { useState, useEffect } from "react";
import axiosInstance from "../../../apis/accounts.instance";
import * as Yup from "yup";
import { Form, Formik, Field } from "formik";
import * as styled from "./Settings.styles";
import { Input } from "../../../Atomics/Styles";

const Settings = () => {
  const [userdata, setUserData] = useState([]);

  useEffect(() => {
    const UserDetails = () => {
      axiosInstance
        .get("/user")
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    UserDetails();
  }, []);

  const initialValues = {
    profile_picture: userdata.profile_picture,
    username: userdata.username,
    email: userdata.email,
    first_name: userdata.first_name,
    last_name: userdata.last_name,
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <styled.SettingsFormContainer>
      <styled.userImg src={userdata.profile_picture}></styled.userImg>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <Field as={Input} type="text" name="username" id="username" />
          <br />
          <Field as={Input} type="text" name="email" id="email" />
          <br />
          <Field as={Input} type="text" name="first_name" id="first_name" />
          <br />
          <Field as={Input} type="text" name="last_name" id="last_name" />
        </Form>
      </Formik>
    </styled.SettingsFormContainer>
  );
};

/*       {userdata.map((data) => (
        <p key={data.id}>{data.username}</p>
      ))} */
export default Settings;
