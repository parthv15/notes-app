import React from "react";
import { User } from "../model/user";
import * as NotesApi from "../network/notesApi";
import { Button, Navbar } from "react-bootstrap";

interface NavBarLoggedInViewProps {
  user: User;
  onLogoutSuccessful: () => void;
}

const NavBarLoggedInView = ({
  user,
  onLogoutSuccessful,
}: NavBarLoggedInViewProps) => {
  async function logout() {
    try {
      await NotesApi.logout();
      onLogoutSuccessful();
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  return (
    <>
      <Navbar.Text className="me-2">Signed In as: {user.username}</Navbar.Text>
      <Button onClick={logout}>Logout</Button>
    </>
  );
};

export default NavBarLoggedInView;
