import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./styles/NotePage.module.css";
import SignUpModel from "./components/SignUpModel";
import LoginModel from "./components/LoginModel";
import NavBar from "./components/NavBar";
import { User } from "./model/user";
import * as NotesApi from "./network/notesApi";
import NotesPageLoggedInView from "./components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "./components/NotesPageLoggedOutView";
function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModel, setShowSignUpModel] = useState(false);
  const [showLoginModel, setShowLoginModel] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }

    fetchLoggedInUser();
  }, []);

  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModel(true)}
        onSignUpClicked={() => setShowLoginModel(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />
      <Container className={styles.notesPage}>
        <>
          {loggedInUser ? (
            <NotesPageLoggedInView />
          ) : (
            <NotesPageLoggedOutView />
          )}
        </>
      </Container>
      {showSignUpModel && (
        <SignUpModel
          onDismiss={() => setShowSignUpModel(false)}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModel(false);
          }}
        />
      )}

      {showLoginModel && (
        <LoginModel
          onDismiss={() => setShowLoginModel(false)}
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLoginModel(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
