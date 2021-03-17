import React, { useState } from "react";
import { authService } from "../../../utils/auth.service";
import { Field, Form, Formik } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import Modal from "../../../Styles/Modal";

//Styles
import * as styled from "./RegisterForm.styles";
import modalStyle from "../../../Styles/Modal";
import { Input, SecondaryButton, Label } from "../../../Styles/Styles";

export default function RegisterForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleIsModalOpen = () => setIsModalOpen(!isModalOpen);
  const history = useHistory();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    first_name: "",
    last_name: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    email: Yup.string().required("Required").email(),
    password: Yup.string().required("Required"),
    passwordConfirmation: Yup.string()
      .required("Required")
      .test("password-match", "Passwords must match", function (value) {
        return this.parent.password === value;
      }),
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    authService
      .register(
        values.username,
        values.email,
        values.password,
        values.first_name,
        values.last_name
      )
      .then(() => {
        history.push("/");
      });
  };

  return (
    <div>
      <SecondaryButton type="button" onClick={() => toggleIsModalOpen()}>
        Register
      </SecondaryButton>
      {isModalOpen && (
        <Modal closeModal={() => setIsModalOpen(false)}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <styled.RegisterHeading>Register</styled.RegisterHeading>
              <Label>Username</Label>
              <Field
                as={Input}
                type="text"
                name="username"
                id="username"
                placeholder="Username"
              />
              <br />
              <Label>Email</Label>
              <Field
                as={Input}
                type="text"
                name="email"
                id="email"
                placeholder="arjun@example.com"
              />
              <br />
              <Label>Password</Label>
              <Field
                as={Input}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
              <br />
              <Label>Confirm password</Label>
              <Field
                as={Input}
                type="password"
                name="passwordConfirmation"
                id="passwordConfirmation"
                placeholder="Confirm password"
              />
              <br />
              <Label>First name</Label>
              <Field
                as={Input}
                type="text"
                name="first_name"
                id="first_name"
                placeholder="First name"
              />
              <br />
              <Label>Last name</Label>
              <Field
                as={Input}
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Last name"
              />
              <br />
              <styled.RegisterSubmitButton type="submit">
                Submit
              </styled.RegisterSubmitButton>
            </Form>
          </Formik>
        </Modal>
      )}
    </div>
  );
}
