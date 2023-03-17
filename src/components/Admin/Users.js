import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import useStore from "../Store/store";
import config from "../../config";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropzone from "react-dropzone";
import { useSearchParams } from "react-router-dom";

let parsedData;

let IdToken, Authorization, TENANT_ID, headers;
const currentUser = config.UserPool.getCurrentUser();
if (currentUser) {
  currentUser.getSession((err, session) => {
    if (err) {
      console.log("error please try login again");
    } else {
      IdToken = session.idToken.jwtToken;
      Authorization = session.accessToken.jwtToken;
      TENANT_ID = config.TENANT_ID;
      headers = {
        authorization: JSON.stringify({ Authorization, IdToken, TENANT_ID }),
      };
    }
  });
} else {
  console.log("Please login ");
}

export default function Users() {
  const { setUsers, addUser, removeUser, users, setPageTitle } = useStore(
    (state) => state
  );

  const userColumns = [
    { field: "col1", headerName: "Username", width: 150 },
    { field: "col2", headerName: "Full Name", width: 200 },
    { field: "col3", headerName: "Grade", width: 100 },
    { field: "col4", headerName: "Email", width: 250 },
    { field: "col5", headerName: "Email Verified", width: 130 },
    { field: "col6", headerName: "Role", width: 100 },
    { field: "col7", headerName: "Status", width: 300 },
    { field: "col8", headerName: "Creation Date", width: 200 },
  ];

  const userRows = [];
  for (let i = 0; i < users.length; i++) {
    userRows.push({
      id: users[i].username,
      col1: users[i].username,
      col2: users[i].given_name + " " + users[i].family_name,
      col3: users[i].grade,
      col4: users[i].email,
      col5: users[i].email_verified,
      col6: users[i]["custom:role"],
      col7:
        (users[i].enabled ? "Enabled" : "Disabled") + " / " + users[i].status,
      col8: users[i].creationDate,
    });
  }

  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const [openDialog, setOpenDialog] = useState(false);
  const [showSubmitBtn, setShowSubmitBtn] = useState(true);
  const [error, setError] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [action, setAction] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState("");
  const [role, setRole] = useState("");
  const [selectionUserModel, setSelectionUserModel] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
  const [gradeDialog, setGradeDialog] = useState(false);
  const [gradeValue, setGradeValue] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [poolId, setPoolId] = useState("");
  const [tenantId, setTenantId] = useState("");

  const notifyError = (message) => {
    toast.error(message, {
      theme: "colored",
      closeOnClick: true,
      hideProgressBar: true,
      autoClose: 3000,
    });
  };
  const notifySuccess = (message) => {
    toast.success(message, {
      theme: "colored",
      closeOnClick: true,
      hideProgressBar: true,
      autoClose: 3000,
    });
  };
  useEffect(() => {
    setPageTitle("Users");
  }, []);

  const [isAdmin, setIsAdmin] = useState("");
  useEffect(() => {
    const user = config.UserPool.getCurrentUser();
    if (user) {
      user.getSession((err, session) => {
        if (err) {
          console.log(err.message);
        } else {
          setIsAdmin(
            session.idToken.payload["custom:role"] === "superadmin"
              ? true
              : false
          );
        }
      });
    }
  }, []);
  const getUsers = () => {
    axios
      .get(`${config.apiURL}/cognito/${poolId}/users`, {
        headers,
      })
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch(() => {
        setUsers([]);
      });
  };
  useEffect(() => {
    setPoolId(
      searchParams.get("p")
        ? searchParams.get("p")
        : config.UserPool.getUserPoolId()
    );
    setTenantId(
      searchParams.get("tenantId")
        ? searchParams.get("tenantId")
        : config.TENANT_ID
    );
    if (poolId) {
      getUsers();
    }
  }, [poolId, searchParams]);

  const handleClickOpen = (action, username = null) => {
    if (action === "add") {
      setAction("add");
      clearForm();
      setShowSubmitBtn(true);
      setDialogTitle("Add New User");
      setOpenDialog(true);
      setError("");
    } else if (action === "view") {
      setAction("view");
      setDialogTitle("View User");
      setShowSubmitBtn(false);
      const u = users.find((user) => user.username === username);
      fillForm(u);
      setOpenDialog(true);
    } else if (action === "edit") {
      setAction("edit");
      setDialogTitle("Edit User");
      setShowSubmitBtn(true);
      const u = users.find((user) => user.username === username);
      fillForm(u);
      setOpenDialog(true);
    } else if (action === "addBulk") {
      setAction("addBulk");
      clearForm();
      setShowSubmitBtn(true);
      setDialogTitle("Add Bulk Users");
      setOpenDialog(true);
    }
  };
  const fillForm = (user) => {
    setUsername(user.username);
    setGivenName(user.given_name);
    setFamilyName(user.family_name);
    setRole(user["custom:role"]);
    setEmail(user.email);
    setGrade(user.grade);
  };
  const handleClose = () => {
    setOpenDialog(false);
    setFileName("");
  };

  const clearForm = () => {
    setUsername("");
    setGivenName("");
    setFamilyName("");
    setRole("");
    // setPassword("");
    setEmail("");
    setGrade("");
  };

  const changeHandler = (file) => {
    if (file) {
      setFileName(file.name);
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          parsedData = results.data;
        },
      });
    } else {
      console.log("no file");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (action === "add") {
      setError("");
      if (
        username === "" ||
        // password === "" ||
        givenName === "" ||
        familyName === "" ||
        email === "" ||
        role === ""
      ) {
        setError("Form fields are required");
      } else if (role === "student" && grade === "") {
        setError("Form fields are required");
      } else {
        let data = [
          {
            username: username,
            // password: password,
            given_name: givenName,
            family_name: familyName,
            email: email,
            role: role,
            tenantId: tenantId,
            grade: grade,
          },
        ];
        axios
          .post(`${config.apiURL}/cognito/${poolId}/users`, data, { headers })
          .then((res) => {
            if (res.data.responses[0].statusCode === 200) {
              addUser(res.data.responses[0].user);
              setOpenDialog(false);
              notifySuccess("User added successfully");
            } else {
              setError(res.data.responses[0].message);
            }
          })
          .catch((err) => {
            notifyError(err.message);
          });
      }
    } else if (action === "edit") {
      setOpenDialog(false);
      alert("User updated successfully");
    } else if (action === "addBulk") {
      setLoading(true);
      setOpenDialog(false);
      for (let user of parsedData) {
        user.tenantId = tenantId;
      }

      axios
        .post(`${config.apiURL}/cognito/${poolId}/users`, parsedData, {
          headers,
        })
        .then((res) => {
          for (let x of res.data.responses) {
            if (x.statusCode === 200) {
              addUser(x.user);
            }
          }
          setFileName("");

          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          notifyError(err.message);
        });
    }
  };

  const handleDeleteUsers = async (names) => {
    if (names.length === 0) {
      notifyError("Please select users to be deleted");
    } else {
      setLoading(true);
      setDeleteUsersDialog(false);
      axios
        .delete(`${config.apiURL}/cognito/${poolId}/users`, {
          data: { users: names, tenantId },
          headers,
        })
        .then(() => {
          for (let name of names) {
            removeUser(name);
          }
          setOpenDialog(false);
          setLoading(false);
          notifySuccess("Users deleted successfully");
        })
        .catch((err) => {
          notifyError(err.message);
          setLoading(false);
        });
    }
  };

  const handleSetGrade = async (names, gradeValue, tenantId) => {
    console.log(names, gradeValue, tenantId);
    if (names.length === 0) {
      notifyError("Please select users to set their grade");
    } else {
      setLoading(true);
      axios
        .put(
          `${config.apiURL}/users/set-grade`,
          { names, tenantId, grade: gradeValue },
          {
            headers,
          }
        )
        .then(() => {
          setLoading(false);
          setGradeDialog(false);
          getUsers();
          notifySuccess("Users grades are set successfully");
        })
        .catch((err) => {
          notifyError(err.message);
          setLoading(false);
        });
    }
  };

  const setUsersPasswords = async (names) => {
    if (names.length === 0) {
      notifyError("Please select users to reset their passwords");
    } else {
      setLoading(true);
      axios
        .post(`${config.apiURL}/cognito/${poolId}/users/set-password`, names, {
          headers,
        })
        .then(() => {
          setLoading(false);
          notifySuccess("Users passwords are set successfully");
        })
        .catch((err) => {
          notifyError(err.message);
          setLoading(false);
        });
    }
  };
  // const handleDelete = async (username) => {
  //   axios
  //     .delete(`${config.apiURL}/cognito/${poolId}/users/${username}`, { headers })
  //     .then((res) => {
  //       removeUser(username);
  //       setOpenDialog(false);
  //     })
  //     .catch((err) => {
  //       notifyError(err.message);
  //     });
  // };
  return (
    <>
      {isLoggedIn && (
        <>
          <ToastContainer />
          <Box sx={{ display: "flex" }}>
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: "125vh",
                // mb: 30,
              }}
            >
              <Container maxWidth="lg">
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      mt: 2,
                      display: "flex",
                      flexDirection: "row-reverse",
                    }}
                  >
                    <Grid
                      item
                      xs={6}
                      sx={{
                        display: "flex",
                        flexDirection: "row-reverse",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => handleClickOpen("add")}
                        sx={{
                          ml: 1,
                          typography: {
                            xs: { fontSize: 8 },
                            sm: { fontSize: 10 },
                            md: { fontSize: 13 },
                          },
                        }}
                      >
                        Add User
                      </Button>
                      <Button
                        sx={{
                          ml: 1,
                          typography: {
                            xs: { fontSize: 8 },
                            sm: { fontSize: 10 },
                            md: { fontSize: 13 },
                          },
                        }}
                        variant="outlined"
                        onClick={() => {
                          if (selectionUserModel.length === 0) {
                            notifyError("Please select users to be deleted");
                          } else {
                            setDeleteUsersDialog(true);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        // flexDirection: "row-reverse",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => {
                          if (selectionUserModel.length === 0) {
                            notifyError(
                              "Please select users to set their grade"
                            );
                          } else {
                            setGradeDialog(true);
                          }
                        }}
                        sx={{
                          ml: 1,
                          typography: {
                            xs: { fontSize: 8 },
                            sm: { fontSize: 10 },
                            md: { fontSize: 13 },
                          },
                        }}
                      >
                        Set Grade
                      </Button>
                    </Grid>

                    <Grid
                      item
                      xs={6}
                      sx={{
                        display: "flex",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => handleClickOpen("addBulk")}
                        sx={{
                          mr: 1,
                          typography: {
                            xs: { fontSize: 8 },
                            sm: { fontSize: 10 },
                            md: { fontSize: 13 },
                          },
                        }}
                      >
                        Add Bulk Users
                      </Button>
                      {/* <Button
                        sx={{
                          mr: 1,
                          typography: {
                            xs: { fontSize: 8 },
                            sm: { fontSize: 10 },
                            md: { fontSize: 13 },
                          },
                        }}
                        variant="outlined"
                        onClick={() => handleClickOpen("")}
                      >
                        Review Reports
                      </Button> */}
                      <Button
                        sx={{
                          mr: 1,
                          typography: {
                            xs: { fontSize: 8 },
                            sm: { fontSize: 10 },
                            md: { fontSize: 13 },
                          },
                        }}
                        variant="outlined"
                        onClick={() => {
                          if (selectionUserModel.length === 0) {
                            notifyError(
                              "Please select users to reset their passwords"
                            );
                          } else {
                            setUsersPasswords(selectionUserModel);
                          }
                        }}
                      >
                        Reset Password
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper sx={{ height: 650, width: 1 }}>
                      <DataGrid
                        checkboxSelection
                        onSelectionModelChange={(newSelectionModel) => {
                          setSelectionUserModel(newSelectionModel);
                        }}
                        selectionModel={selectionUserModel}
                        onPageSizeChange={(newPageSize) =>
                          setPageSize(newPageSize)
                        }
                        pageSize={pageSize}
                        rowsPerPageOptions={[10, 20, 100]}
                        pagination
                        rows={userRows}
                        columns={userColumns}
                        // disableColumnFilter
                        // disableColumnSelector
                        // disableDensitySelector
                        components={{
                          Toolbar: GridToolbar,
                        }}
                        componentsProps={{
                          toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                          },
                        }}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
          <Dialog fullWidth maxWidth="sm" open={openDialog}>
            <DialogTitle
              style={{
                background: "#0694a8",
                color: "white",
                marginBottom: 20,
              }}
            >
              {dialogTitle}
            </DialogTitle>
            {action === "addBulk" && (
              <DialogContent>
                <Grid container display={"flex"} flexDirection={"column"}>
                  <Grid item xs={12}>
                    {error && (
                      <Alert
                        severity="error"
                        onClose={() => {
                          setError("");
                        }}
                      >
                        {error}
                      </Alert>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      p: 5,
                      mt: 1,
                      textAlign: "center",
                      border: "1px dashed grey",
                      backgroundColor: "#e8f4f6",
                    }}
                  >
                    <Dropzone
                      maxFiles={1}
                      accept={{ "text/csv": [".csv"] }}
                      onDrop={(selectedFiles) => {
                        setError("");
                        changeHandler(selectedFiles[0]);
                      }}
                      onDropRejected={() => {
                        console.log("rejected");
                        setError("Only one .csv file is allowed");
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>
                              {fileName
                                ? fileName
                                : "Drag 'n' drop a .csv file here, or click to select a file"}
                            </p>
                          </div>
                        </section>
                      )}
                    </Dropzone>
                  </Grid>
                </Grid>
              </DialogContent>
            )}
            {action === "add" && (
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {error && (
                      <Alert
                        severity="error"
                        onClose={() => {
                          setError("");
                        }}
                      >
                        {error}
                      </Alert>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Username"
                      required
                      fullWidth
                      size="small"
                      name="username"
                      id="username"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      autoFocus
                      variant="filled"
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={6}>
                    <TextField
                      label="Password"
                      required
                      fullWidth
                      variant="filled"
                      size="small"
                      name="password"
                      type="password"
                      id="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </Grid> */}
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="First Name"
                      required
                      fullWidth
                      variant="filled"
                      size="small"
                      name="givenName"
                      id="givenName"
                      value={givenName}
                      onChange={(event) => setGivenName(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Last Name"
                      required
                      fullWidth
                      variant="filled"
                      size="small"
                      id="familyName"
                      name="familyName"
                      value={familyName}
                      onChange={(event) => setFamilyName(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      label="Email"
                      required
                      fullWidth
                      variant="filled"
                      size="small"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required variant="filled">
                      <InputLabel id="demo-simple-select-filled-label">
                        Role
                      </InputLabel>
                      <Select
                        label="Role"
                        size="small"
                        name="role"
                        // autoComplete="role"
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                      >
                        <MenuItem value="admin" hidden={!isAdmin}>
                          Administrator
                        </MenuItem>
                        <MenuItem value="teacher">Teacher</MenuItem>
                        <MenuItem value="student">Student</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      required
                      variant="filled"
                      disabled={role === "student" ? false : true}
                    >
                      <InputLabel id="demo-simple-select-filled-label">
                        Grade
                      </InputLabel>
                      <Select
                        label="Grade"
                        size="small"
                        name="grade"
                        // autoComplete="grade"
                        value={grade}
                        onChange={(event) => setGrade(event.target.value)}
                      >
                        <MenuItem value="-1">KG1</MenuItem>
                        <MenuItem value="0">KG2</MenuItem>
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                        <MenuItem value="6">6</MenuItem>
                        <MenuItem value="7">7</MenuItem>
                        <MenuItem value="8">8</MenuItem>
                        <MenuItem value="9">9</MenuItem>
                        <MenuItem value="10">10</MenuItem>
                        <MenuItem value="11">11</MenuItem>
                        <MenuItem value="12">12</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </DialogContent>
            )}

            <DialogActions>
              <Grid container display={"flex"} flexDirection={"row"}>
                <Grid item xs={6}>
                  {action === "addBulk" ? (
                    <Button
                      sx={{ ml: 2, mb: 1 }}
                      variant="outlined"
                      download
                      href="/static/files/users.csv"
                    >
                      Download CSV header
                    </Button>
                  ) : null}
                </Grid>

                <Grid
                  item
                  xs={6}
                  display={"flex"}
                  flexDirection={"row-reverse"}
                >
                  {showSubmitBtn && (
                    <Button
                      sx={{ mr: 2, mb: 1 }}
                      type="submit"
                      variant="contained"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  )}
                  <Button sx={{ mb: 1 }} onClick={handleClose}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Dialog>

          <Dialog
            open={deleteUsersDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Confirm to delete</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete these users?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteUsersDialog(false)}>No</Button>
              <Button
                onClick={() => handleDeleteUsers(selectionUserModel)}
                autoFocus
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            fullWidth
            open={gradeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Set Grade</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    required
                    variant="filled"
                    // disabled={role === "student" ? false : true}
                  >
                    <InputLabel id="demo-simple-select-filled-label">
                      Grade
                    </InputLabel>
                    <Select
                      // label="Grade"
                      size="small"
                      name="gradeValue"
                      // autoComplete="grade"
                      value={gradeValue}
                      onChange={(event) => setGradeValue(event.target.value)}
                    >
                      <MenuItem value="-1">KG1</MenuItem>
                      <MenuItem value="0">KG2</MenuItem>
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                      <MenuItem value="4">4</MenuItem>
                      <MenuItem value="5">5</MenuItem>
                      <MenuItem value="6">6</MenuItem>
                      <MenuItem value="7">7</MenuItem>
                      <MenuItem value="8">8</MenuItem>
                      <MenuItem value="9">9</MenuItem>
                      <MenuItem value="10">10</MenuItem>
                      <MenuItem value="11">11</MenuItem>
                      <MenuItem value="12">12</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setGradeDialog(false)}>Cancel</Button>
              <Button
                onClick={() =>
                  handleSetGrade(selectionUserModel, gradeValue, tenantId)
                }
                autoFocus
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      )}
    </>
  );
}
