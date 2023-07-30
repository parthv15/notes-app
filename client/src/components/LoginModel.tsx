import React from "react";
import { User } from "../model/user";
import { useForm } from "react-hook-form";
import { LoginCredentials } from "../network/notesApi";
import * as NotesApi from "../network/notesApi";
import { Button, Form, Modal, ModalHeader } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css";

interface LoginModelProps {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
}

const LoginModel = ({ onDismiss, onLoginSuccessful }: LoginModelProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  async function onSubmit(creds: LoginCredentials) {
    try {
      const user = await NotesApi.login(creds);
      onLoginSuccessful(user);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <ModalHeader closeButton>
        <Modal.Title>Log In</Modal.Title>
      </ModalHeader>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />

          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className={styleUtils.width100}
          >
            {" "}
            Log In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModel;
