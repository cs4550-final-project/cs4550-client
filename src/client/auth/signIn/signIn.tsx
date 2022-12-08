import React, { useState } from "react";
import { FormControl, Grid, TextField } from "@mui/material";
import styles from "../auth.module.scss";
import Button from "../../components/button/button";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../../service/auth/authService";
import { User } from "../../types/user";

const SignIn = ({ setUser }: { setUser: Function }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigateTo = useNavigate();
  const handleSignUpClick = () => {
    navigateTo("/signup");
  };

  const handleChange = (e: any) => {
    const target = e.target;
    if (target.name === "username") {
      setUsername(target.value);
    } else {
      setPassword(target.value);
    }
  };

  const handleSignIn = (e: any) => {
    e.preventDefault();
    signIn({ username, password })
      .then((res) => {
        setUser(res.data.user);
      })
      .then(() => navigateTo("/"))
      .catch(() => {
        setError(true);
      });
  };

  return (
    <Grid container justifyContent="center" className={styles.authContainer}>
      <Grid item xs={12} md={4}>
        <h3>Sign In</h3>
        <p className={styles.description}> Welcome back to Sandwiches!</p>
        <FormControl className={styles.formControl}>
          <TextField
            id="username"
            name="username"
            label="Username"
            onChange={handleChange}
            value={username}
            sx={{ marginTop: "16px" }}
          />
          <TextField
            id="password"
            label="Password"
            name="password"
            onChange={handleChange}
            value={password}
            type="password"
            autoComplete="current-password"
            sx={{ marginTop: "16px" }}
          />
          {error && (
            <p className={`caption ${styles.errorMsg}`}>
              There was an error with your credentials. Please try again.
            </p>
          )}
          <Button
            label={"Sign In"}
            variant="contained"
            style="primary"
            onClick={handleSignIn}
            sx={{ marginTop: "16px" }}
          />
        </FormControl>
        <p className={`caption ${styles.bottomLink}`}>
          Don't have an account?{" "}
          <a onClick={handleSignUpClick}>Click here to sign up.</a>
        </p>
      </Grid>
    </Grid>
  );
};

export default SignIn;
