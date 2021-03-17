import React, { useState } from "react";
import { authService } from "../../../utils/auth.service";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import Modal from "../../../Styles/Modal";
import { Input, PrimaryButton, Label } from "../../../Styles/Styles";
import * as styled from "./LoginForm.styles";

export default function LoginForm(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleIsModalOpen = () => setIsModalOpen(!isModalOpen);

  const history = useHistory();
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    authService.login(values).then(() => {
      history.push("/");
    });
  };

  return (
    <div>
      <PrimaryButton type="button" onClick={toggleIsModalOpen}>
        Login
      </PrimaryButton>
      {isModalOpen && (
        <Modal closeModal={() => setIsModalOpen(false)}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <styled.LoginHeading>LOGIN</styled.LoginHeading>
              <Label>Username:</Label>
              <Field
                as={Input}
                type="text"
                name="username"
                id="username"
                placeholder="Username"
              />
              <br />
              <Label>Password:</Label>
              <Field
                as={Input}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
              <br />
              <styled.LoginSubmitButton type="submit">
                Login
              </styled.LoginSubmitButton>
            </Form>
          </Formik>
        </Modal>
      )}
    </div>
  );
}
