import React from "react";
import LoginForm from "./Login/LoginForm";
import RegisterForm from "./Register/RegisterForm";
import * as styled from "./UserForm.styles";

export default function UserForm() {
  return (
    <styled.UserForm>
      <styled.Container>
        <LoginForm />
      </styled.Container>
      <styled.Container>
        <RegisterForm />
      </styled.Container>
    </styled.UserForm>
  );
}
