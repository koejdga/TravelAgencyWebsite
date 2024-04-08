import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { AUTH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      username: "admin",
      password: password,
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login);

      navigate("/");
    },
    onError: () => {},
  });

  return <LoginForm login={login} setPassword={setPassword} />;
};

export default Login;
