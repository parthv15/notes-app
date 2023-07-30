import React from "react";
import { User } from "../model/user";
import * as NotesApi from "../network/notesApi";
import { Button, Navbar } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}

const NavBarLoggedOutView = ({
  onLoginClicked,
  onSignUpClicked,
}: NavBarLoggedOutViewProps) => {
  return (
    <>
      <Button onClick={onSignUpClicked}> Sign Up</Button>
      <Button onClick={onLoginClicked}> Log In</Button>
    </>
  );
};

export default NavBarLoggedOutView;
