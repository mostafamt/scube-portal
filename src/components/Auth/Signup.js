import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { InputLabel, FormControl } from "@mui/material";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import { Country, City } from "country-state-city";
import MuiPhoneNumber from "material-ui-phone-number";
import config from "../../config";

export default function Signup() {
  const countries = Country.getAllCountries([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [username, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [gender, setGender] = useState("");
  const [BirthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("EG");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setCities(City.getCitiesOfCountry(country));
  }, [country]);

  const attributeList = [
    new CognitoUserAttribute({ Name: "email", Value: email }),
    new CognitoUserAttribute({ Name: "given_name", Value: givenName }),
    new CognitoUserAttribute({ Name: "family_name", Value: familyName }),
    new CognitoUserAttribute({ Name: "gender", Value: gender }),
    new CognitoUserAttribute({ Name: "BirthDate", Value: BirthDate }),
    new CognitoUserAttribute({
      Name: "phone_number",
      Value: phoneNumber,
    }),
    new CognitoUserAttribute({ Name: "custom:country", Value: country }),
    new CognitoUserAttribute({ Name: "custom:city", Value: city }),
    new CognitoUserAttribute({ Name: "custom:role", Value: role }),
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      username === "" ||
      role === "" ||
      password === "" ||
      email === "" ||
      givenName === "" ||
      familyName === "" ||
      gender === "" ||
      BirthDate === "" ||
      phoneNumber === "" ||
      country === "" ||
      city === ""
    ) {
      setError("* Fields are required");
      return;
    }

    config.UserPool.signUp(
      username,
      password,
      attributeList,
      null,
      (err, data) => {
        if (err) {
          console.error(err);
        } else {
          setError("");
          navigate("/verify-email");
        }
      }
    );
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <p style={{ color: "red" }}>{error}</p>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  id="username"
                  // autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(event) => setUserName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth required>
                  <InputLabel>Role</InputLabel>
                  <Select
                    label="Role"
                    name="role"
                    // autoComplete="role"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                  >
                    <MenuItem value="teacher">Teacher</MenuItem>
                    <MenuItem value="student">Student</MenuItem>
                    {/* <MenuItem value="guest">Guest</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  // autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  // autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  // autoComplete="given-name"
                  name="givenName"
                  required
                  fullWidth
                  id="givenName"
                  label="First Name"
                  value={givenName}
                  onChange={(event) => setGivenName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="familyName"
                  label="Last Name"
                  name="familyName"
                  // autoComplete="family-name"
                  value={familyName}
                  onChange={(event) => setFamilyName(event.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    label="Gender"
                    name="gender"
                    // autoComplete="gender"
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="date"
                  label="BirthDate"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) => setBirthDate(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Country</InputLabel>
                  <Select
                    label="Country"
                    name="country"
                    // autoComplete="country"
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
                  >
                    {countries.map((c) => {
                      return (
                        <MenuItem key={c.isoCode} value={c.isoCode}>
                          {c.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>City</InputLabel>
                  <Select
                    label="City"
                    name="city"
                    // autoComplete="city"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                  >
                    {cities.map((c, i) => {
                      return (
                        <MenuItem key={i} value={c.name}>
                          {c.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <MuiPhoneNumber
                  required
                  fullWidth
                  name="phoneNumber"
                  id="phoneNumber"
                  label="Phone Number"
                  value={phoneNumber}
                  defaultCountry={country.toLowerCase() || "eg"}
                  onChange={(value) => setPhoneNumber(value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
