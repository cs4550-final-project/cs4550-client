import React, { useState } from "react";
import { FormControl, Grid } from "@mui/material";
import { Box } from "@mui/system";
import styles from "../auth.module.scss";
import { TextField } from "@mui/material";
import Button from "../../components/button/button";
import { useNavigate } from "react-router-dom";
import ToggleButtons from "../../components/toggle/toggle";

const SignUp = () => {
  const [role, setRole] = useState<string>("user");
  const navigateTo = useNavigate();
  const handleSignInClick = () => {
    navigateTo("/signin");
  };
  return (
    <Grid container justifyContent="center" className={styles.authContainer}>
      <Grid item xs={12} md={4}>
        <h3>Sign Up</h3>
        <p className={styles.description}>
          Welcome to Sandwiches! Enter a username and password to get started.
        </p>
        <FormControl className={styles.formControl}>
          <TextField
            id="username"
            label="Username"
            sx={{ marginTop: "16px" }}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            sx={{ marginTop: "16px" }}
          />
          <TextField
            id="password"
            label="Password Confirmation"
            type="password"
            autoComplete="current-password"
            sx={{ margin: "16px 0" }}
          />
          <p>I am a:</p>
          <ToggleButtons
            options={[
              { label: "Regular User", value: "user" },
              { label: "Food Critic", value: "critic" },
            ]}
            value={role}
            setValue={setRole}
          ></ToggleButtons>
          <Button label={"Sign Up"} variant="contained" style="primary" />
        </FormControl>
        <p className={`caption ${styles.bottomLink}`}>
          Already have an account?{" "}
          <a onClick={handleSignInClick}>Click here to sign up.</a>
        </p>
      </Grid>
    </Grid>
  );
};

export default SignUp;
