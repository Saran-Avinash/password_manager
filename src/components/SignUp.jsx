import React, { useState } from 'react';
import styles from '../styles/signup.module.css';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Background from './Background'; // Import the Background component

export default function Signup() {
  const [password, setPassword] = useState();
  const [userName, setUserName] = useState();
  const { signUp } = useAuth();

  async function handleRegister(username, password) {
    await signUp(username, password)
      .then((userCredentials) => JSON.stringify(userCredentials))
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className={styles.container}>
      {/* Include Background component for animated raindrop background */}
      <Background />

      <div className={styles.signupContent}>
        <div className={styles.signupDetails}>
          <h1 className={styles.dynamicText}>Sign up</h1>
          <h2>Your One Stop Destination for Password Management</h2>
          <div className={styles.formContainer}>
            <label htmlFor="">User Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <label htmlFor="">Password</label>
            <input
              type="password"
              onChange={(e) => {
                console.log(e.target.value);
                setPassword(e.target.value);
              }}
            />
            <button onClick={() => handleRegister(userName, password)}>
              Sign up
            </button>
            <p className={styles.signIn}>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
