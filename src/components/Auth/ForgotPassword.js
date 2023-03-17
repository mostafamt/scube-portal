import React, { useEffect, useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import useStore from "../Store/store";
import config from "../../config";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [stage, setStage] = useState(1); // 1 = email stage, 2 = code stage
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const error = useStore((state) => state.error);
  const setError = useStore((state) => state.setError);

  useEffect(() => {
    setError("");
    setLoading(false);
  }, []);

  const user = new CognitoUser({
    Username: username,
    Pool: config.UserPool,
  });

  const sendCode = (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    if (username === "") {
      setError("* Username Field is required");
      setLoading(false);
      return;
    }
    user.forgotPassword({
      onSuccess: (data) => {
        setError("Please check your email for verification code");
        setLoading(false);
        setStage(2);
      },
      onFailure: (err) => {
        setError(err.message);
        setLoading(false);
        console.error("onFailure:", err);
      },
      // inputVerificationCode: (data) => {
      //   console.log(2, data);
      //   setError("Please check your email for verification code");
      //   setStage(2);
      //   setLoading(false);
      // },
    });
  };

  const resetPassword = (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    if (!code || !password || !confirmPassword) {
      setError("* Fields are required");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      console.error("Passwords are not the same");
      setLoading(false);
      return;
    }

    user.confirmPassword(code, password, {
      onSuccess: (data) => {
        setError("");
        setLoading(false);
        navigate("/login");
      },
      onFailure: (err) => {
        setError(err.message);
        setLoading(false);
        console.error("onFailure:", err);
      },
    });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Forgotten Password
          </Typography>

          {stage === 1 && (
            <Box component="form" onSubmit={sendCode} noValidate sx={{ mt: 1 }}>
              {error && (
                <Alert sx={{ width: "100%" }} severity="error">
                  {error}
                </Alert>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                // id="username"
                label="Username"
                name="username"
                // autoComplete="username"
                autoFocus
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {" "}
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                Submit
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/login" variant="body2">
                    Back
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="signup" variant="body2"></Link>
                </Grid>
              </Grid>
            </Box>
          )}
          {stage === 2 && (
            <Box
              component="form"
              onSubmit={resetPassword}
              noValidate
              sx={{ mt: 1 }}
            >
              {/* <p style={{ color: "red" }}>{error}</p> */}
              {error && (
                <Alert sx={{ width: "100%" }} severity="error">
                  {error}
                </Alert>
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                // id="password"
                // autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                // id="confirmPassword"
                // autoComplete="confirmPassword"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                // id="code"
                label="Verification Code"
                name="code"
                // autoComplete="code"
                // autoFocus
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {" "}
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                Reset Password
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link variant="body2" onClick={() => setStage(1)}>
                    Back
                  </Link>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
}
