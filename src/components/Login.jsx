import React, { useState } from 'react';
import styles from '../styles/login.module.css';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Background from './Background';

export default function Login() {
  const { currentUser, logIn, logOut } = useAuth();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(username, password) {
    await logIn(username, password).catch(console.error);
  }

  async function handleLogOut() {
    await logOut().catch(console.error);
  }

  return (
    <div className={styles.container}>
      <Background />
      <div className={styles.loginContent}>
        <div className={styles.loginDetails}>
          <h1 className={styles.dynamicText}>Login</h1>
          <h2>Your One Stop Destination for Password Management</h2>
          <div className={styles.formContainer}>
            <label>User Name</label>
            <input
              type="text"
              placeholder="Enter your name" 
              onChange={(e) => setUserName(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => handleLogin(username, password)}>
              Log in
            </button>
            <p className={styles.signIn}>
              New User? <Link to="/signup">Sign up</Link>
            </p>
            <button onClick={handleLogOut}>Log Out</button>
          </div>
        </div>
      </div>
    </div>
  );
}
