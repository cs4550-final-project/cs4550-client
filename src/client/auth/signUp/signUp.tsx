import React, { useEffect, useState } from "react";
import { FormControl, Grid } from "@mui/material";
import { Box } from "@mui/system";
import styles from "../auth.module.scss";
import { TextField } from "@mui/material";
import Button from "../../components/button/button";
import { useNavigate } from "react-router-dom";
import ToggleButtons from "../../components/toggle/toggle";
import { signUp, signIn } from "../../../service/auth/authService";

const SignUp = ({ setUser }: { setUser: Function }) => {
  const [role, setRole] = useState<string>("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const navigateTo = useNavigate();

  const handleSignInClick = () => {
    navigateTo("/signin");
  };

  const handleSignUp = (e: any) => {
    e.preventDefault();
    if (
      (role === "critic" && !company) ||
      !username ||
      !password ||
      !password_confirmation
    ) {
      setError("Missing required fields. Please fill in all information.");
    } else {
      setError("");
      let newUser = {
        user: { username, password, password_confirmation, company, role },
      };
      signUp(newUser)
        .then(() => signIn({ username, password }))
        .then((res) => {
          setUser(res.data.user);
        })
        .then(() => navigateTo("/"))
        .catch((e) => {
          setError(e.message);
        });
    }
  };

  const handleChange = (e: any) => {
    const target = e.target;
    switch (target.name) {
      case "username":
        setUsername(target.value);
        break;
      case "password":
        setPassword(target.value);
        break;
      case "password_confirmation":
        setPasswordConfirmation(target.value);
        break;
      case "company":
        setCompany(target.value);
        break;
    }
  };

  useEffect(() => {
    console.log(username, password, company);
  }, []);
  return (
    <Grid container justifyContent="center" className={styles.authContainer}>
      <Grid item xs={12} md={4}>
        <h3>Sign Up</h3>
        <p className={styles.description}>
          Welcome to Recipeasy! Enter a username and password to get started.
        </p>
        <FormControl className={styles.formControl}>
          <p>I am a:</p>
          <ToggleButtons
            options={[
              { label: "Regular User", value: "user" },
              { label: "Food Critic", value: "critic" },
            ]}
            value={role}
            setValue={setRole}
          ></ToggleButtons>
          <p className={`caption ${styles.roleDescription}`}>
            {role === "user"
              ? "As a regular user you'll be able to view recipes, save recipes, and view reviews from food critics!"
              : "As a food critic, you can leave professional critiques on recipes."}
          </p>
          <TextField
            id="username"
            label="Username"
            name="username"
            value={username}
            onChange={handleChange}
            sx={{ marginTop: "16px" }}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            autoComplete="current-password"
            sx={{ marginTop: "16px" }}
          />
          <TextField
            id="password_confirmation"
            label="Password Confirmation"
            type="password"
            name="password_confirmation"
            value={password_confirmation}
            onChange={handleChange}
            autoComplete="current-password"
            sx={{ marginTop: "16px" }}
          />
          {role === "critic" && (
            <TextField
              id="company"
              name="company"
              value={company}
              onChange={handleChange}
              label="Your Company"
              sx={{ marginTop: "16px" }}
            />
          )}
          {error && <p className={`caption ${styles.errorMsg}`}>{error}</p>}
          <Button
            label={"Sign Up"}
            onClick={handleSignUp}
            variant="contained"
            style="primary"
            sx={{ marginTop: "16px" }}
          />
        </FormControl>
        <p className={`caption ${styles.bottomLink}`}>
          Already have an account?{" "}
          <a onClick={handleSignInClick}>Click here to sign in.</a>
        </p>
      </Grid>
    </Grid>
  );
};

export default SignUp;
