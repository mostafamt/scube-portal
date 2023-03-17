import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import GroupIcon from "@mui/icons-material/Group";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useStore from "../Store/store";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import config from "../../config";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import { Alert, DialogContentText, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

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

export default function Tenants() {
  const [openDialog, setOpenDialog] = useState(false);
  const [id, setId] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [issuer, setIssuer] = useState("");
  const [audience, setAudience] = useState("");
  const [clientId, setClientId] = useState("");
  const [domainName, setDomainName] = useState("");
  const [loginURL, setLoginURL] = useState("");
  const [lomURL, setLomURL] = useState("");
  const [cpURL, setCpURL] = useState("");
  const [qaURL, setQAURL] = useState("");
  const [lopURL, setLOPURL] = useState("");
  const [type, setType] = useState("");
  const [scopes, setScopes] = useState("");
  const [activeUsersLimits, setActiveUsersLimits] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [error, setError] = useState("");
  const [action, setAction] = useState("");
  const [showSubmitBtn, setShowSubmitBtn] = useState(true);
  const [dialogTitle, setDialogTitle] = useState("");
  const [deleteDialog, setDeleteDialog] = useState(false);

  const navigate = useNavigate();

  const { isLoggedIn, tenants, setTenants, setPageTitle } = useStore(
    (state) => state
  );

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
    setPageTitle("Tenants");
  }, []);
  useEffect(() => {
    getTenantsFromDB();
  }, []);

  const getTenantsFromDB = () => {
    axios
      .get(config.tenantsURL, { headers })
      .then((res) => {
        setTenants(res.data.tenants);
      })
      .catch((err) => {
        notifyError(err.message);
        setTenants([]);
      });
  };

  const handleAdd = (tenant) => {
    axios
      .post(config.tenantsURL, tenant, { headers })
      .then((res) => {
        notifySuccess("Tenant added successfully");
      })
      .catch((err) => {
        notifyError(err);
      });
    setOpenDialog(false);
    setTimeout(() => {
      getTenantsFromDB();
    }, 1000);
  };

  const handleDelete = (tenantId) => {
    axios
      .delete(config.tenantsURL + "/" + tenantId, { headers })
      .then((res) => {
        notifySuccess("Tenant deleted successfully");
      })
      .catch((err) => {
        notifyError(err.message);
      });
    setDeleteDialog(false);
    setTimeout(() => {
      getTenantsFromDB();
    }, 1000);
  };

  const handleUpdate = (tenantId, data) => {
    axios
      .patch(config.tenantsURL + "/" + tenantId, data, { headers })
      .then((res) => {
        notifySuccess("Tenant Updated successfully");
      })
      .catch((error) => {
        notifyError(error);
      });
    setOpenDialog(false);
    setTimeout(() => {
      getTenantsFromDB();
    }, 1000);
  };

  const handleClickOpen = (action, id = null) => {
    if (action === "add") {
      setAction("add");
      clearForm();
      setShowSubmitBtn(true);
      setDialogTitle("Add New Tenant");
      setOpenDialog(true);
    } else if (action === "view") {
      setDialogTitle("View Tenant");
      setShowSubmitBtn(false);
      const t = tenants.find((tenant) => tenant.tenant_id === id);
      fillForm(t);
      setOpenDialog(true);
    } else if (action === "edit") {
      setAction("edit");
      setDialogTitle("Edit Tenant");
      setShowSubmitBtn(true);
      const t = tenants.find((tenant) => tenant._id === id);
      fillForm(t);
      setOpenDialog(true);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setError("");
  };

  const clearForm = () => {
    setError("");
    setDomainName("");
    setScopes("");
    setTenantName("");
    setTenantId("");
    setIssuer("");
    setAudience("");
    setClientId("");
    setLoginURL("");
    setLomURL("");
    setCpURL("");
    setQAURL("");
    setLOPURL("");
    setType("");
    setActiveUsersLimits("");
    setExpirationDate("");
  };

  const fillForm = (tenant) => {
    setError("");
    setId(tenant._id);
    setDomainName(tenant.domain_name);
    setScopes(tenant.scopes);
    setTenantName(tenant.name);
    setTenantId(tenant.tenant_id);
    setIssuer(tenant.issuer);
    setAudience(tenant.audience);
    setClientId(tenant.app_client_id);
    setLoginURL(tenant.login_url);
    setLomURL(tenant.lom_redirect_uri);
    setCpURL(tenant.cp_redirect_uri);
    setQAURL(tenant.qa_redirect_uri);
    setLOPURL(tenant.lop_redirect_uri);
    setType(tenant.type);
    setActiveUsersLimits(tenant.active_users_limit);
    setExpirationDate(tenant.expiration_date || "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !tenantName ||
      !tenantId ||
      !domainName ||
      !clientId ||
      !issuer ||
      !loginURL ||
      !lomURL ||
      !cpURL ||
      !qaURL ||
      !lopURL ||
      !scopes ||
      !type
    ) {
      setError("Please fill all required fields");
    } else {
      if (action === "add") {
        let data = {
          domain_name: [domainName],
          scopes: [scopes],
          tenant_id: tenantId,
          name: tenantName,
          issuer: issuer,
          app_client_id: clientId,
          login_url: loginURL,
          lom_redirect_uri: lomURL,
          cp_redirect_uri: cpURL,
          qa_redirect_uri: qaURL,
          lop_redirect_uri: lopURL,
          type: type,
          active_users_limit: activeUsersLimits,
          expiration_date: expirationDate,
        };
        if (audience) {
          data.audience = audience;
        }
        handleAdd(data);

        // `Tenant added successfully. \n\nAn API Secret Key is created and it will be displayed only now.\n\n API Secret KEY: ${tenant.tenant_secret} \n\nPlease store it somewhare safe because as soon as you navigate away from this page, we will not be able to retrieve or restore the key.`
      } else if (action === "edit") {
        let data = {
          _id: id,
          domain_name: domainName,
          scopes: scopes,
          tenant_id: tenantId,
          name: tenantName,
          issuer: issuer,
          app_client_id: clientId,
          login_url: loginURL,
          lom_redirect_uri: lomURL,
          cp_redirect_uri: cpURL,
          qa_redirect_uri: qaURL,
          lop_redirect_uri: lopURL,
          type: type,
          active_users_limit: activeUsersLimits,
          expiration_date: expirationDate,
        };
        if (audience) {
          data.audience = audience;
        }
        handleUpdate(id, data);
      }
    }
  };

  return (
    <>
      {isLoggedIn && (
        <>
          <ToastContainer />
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
              }}
            >
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "row-reverse",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => handleClickOpen("add")}
                    >
                      Add New Tenant
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    <Paper>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell style={{ fontWeight: "bold" }}>
                              #
                            </TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>
                              Name
                            </TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>
                              Tenant ID
                            </TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>
                              Creation Date
                            </TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>
                              Expiration Date
                            </TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>
                              Actions
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {tenants.map((tenant, index) => (
                            <TableRow key={tenant._id}>
                              <TableCell>{index + 1}</TableCell>

                              <TableCell>{tenant.name}</TableCell>
                              <TableCell>{tenant?.tenant_id}</TableCell>
                              <TableCell>
                                {new Date(
                                  tenant.createdAt
                                ).toLocaleDateString()}
                              </TableCell>
                              {tenant.expiration_date ? (
                                <TableCell>
                                  {new Date(
                                    tenant.expiration_date
                                  ).toLocaleDateString()}
                                </TableCell>
                              ) : (
                                <TableCell>-</TableCell>
                              )}
                              <TableCell>
                                <Tooltip title="View Users" placement="bottom">
                                  <GroupIcon
                                    style={{ marginRight: 10 }}
                                    onClick={() =>
                                      navigate(
                                        `/users?tenantId=${
                                          tenant.tenant_id
                                        }&p=${tenant.issuer.split("/")[3]}`
                                      )
                                    }
                                  />
                                </Tooltip>
                                <Tooltip title="View tenant" placement="bottom">
                                  <VisibilityIcon
                                    style={{ marginRight: 10 }}
                                    onClick={() =>
                                      handleClickOpen("view", tenant.tenant_id)
                                    }
                                  />
                                </Tooltip>
                                <Tooltip title="Edit tenant" placement="bottom">
                                  <EditIcon
                                    style={{ marginRight: 10 }}
                                    onClick={() =>
                                      handleClickOpen("edit", tenant._id)
                                    }
                                  />
                                </Tooltip>
                                <Tooltip
                                  title="Delete tenant"
                                  placement="bottom"
                                >
                                  <DeleteIcon
                                    style={{ marginRight: 10 }}
                                    onClick={() => {
                                      setId(tenant._id);
                                      setDeleteDialog(true);
                                    }}
                                  />
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
          <Dialog fullWidth maxWidth="lg" open={openDialog}>
            <DialogTitle
              style={{
                background: "#0694a8",
                color: "white",
                marginBottom: 20,
              }}
            >
              {dialogTitle}
            </DialogTitle>

            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} mb={3}>
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
                    label="Tenant Name"
                    required
                    fullWidth
                    variant="filled"
                    size="small"
                    name="tenant_name"
                    id="tenant_name"
                    value={tenantName}
                    onChange={(event) => setTenantName(event.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Tenant ID"
                    required
                    fullWidth
                    variant="filled"
                    size="small"
                    name="tenant_id"
                    id="tenant_id"
                    value={tenantId}
                    onChange={(event) => setTenantId(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Domain Name"
                    required
                    fullWidth
                    variant="filled"
                    size="small"
                    name="domain_name"
                    id="domain_name"
                    value={domainName}
                    onChange={(event) => setDomainName(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Issuer"
                    required
                    fullWidth
                    variant="filled"
                    size="small"
                    id="issuer"
                    name="issuer"
                    value={issuer}
                    onChange={(event) => setIssuer(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Audience"
                    // required
                    fullWidth
                    variant="filled"
                    size="small"
                    id="audience"
                    name="audience"
                    value={audience}
                    onChange={(event) => setAudience(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Client ID"
                    required
                    fullWidth
                    variant="filled"
                    size="small"
                    id="client_id"
                    name="client_id"
                    value={clientId}
                    onChange={(event) => setClientId(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormLabel></FormLabel>
                  <TextField
                    label="Login URL"
                    required
                    fullWidth
                    variant="filled"
                    size="small"
                    id="login_url"
                    name="login_url"
                    value={loginURL}
                    onChange={(event) => setLoginURL(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormLabel></FormLabel>
                  <TextField
                    label="LOM Redirect URI"
                    required
                    fullWidth
                    variant="filled"
                    size="small"
                    id="lom_redirect_uri"
                    name="lom_redirect_uri"
                    value={lomURL}
                    onChange={(event) => setLomURL(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Course Player Redirect URI"
                    required
                    fullWidth
                    variant="filled"
                    size="small"
                    id="cp_redirect_uri"
                    name="cp_redirect_uri"
                    value={cpURL}
                    onChange={(event) => setCpURL(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Q&A Redirect URI"
                    required
                    fullWidth
                    variant="filled"
                    size="small"
                    id="qa_redirect_uri"
                    name="qa_redirect_uri"
                    value={qaURL}
                    onChange={(event) => setQAURL(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="LO Player Redirect URI"
                    required
                    fullWidth
                    variant="filled"
                    size="small"
                    id="lop_redirect_uri"
                    name="lop_redirect_uri"
                    value={lopURL}
                    onChange={(event) => setLOPURL(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Scopes"
                    name="scopes"
                    required
                    variant="filled"
                    fullWidth
                    size="small"
                    id="scopes"
                    value={scopes}
                    onChange={(event) => setScopes(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth required variant="filled">
                    <InputLabel id="demo-simple-select-filled-label">
                      Type
                    </InputLabel>
                    <Select
                      size="small"
                      defaultValue=""
                      name="type"
                      value={type}
                      onChange={(event) => setType(event.target.value)}
                    >
                      <MenuItem value="token">Token</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Active Users Limit"
                    // required
                    fullWidth
                    variant="filled"
                    size="small"
                    type="number"
                    id="active_users_limit"
                    name="active_users_limit"
                    value={activeUsersLimits}
                    onChange={(event) =>
                      setActiveUsersLimits(event.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Expiration Date"
                    // required
                    fullWidth
                    variant="filled"
                    size="small"
                    id="expiration_date"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={
                      expirationDate
                        ? dayjs(expirationDate).format("YYYY-MM-DD")
                        : ""
                    }
                    onChange={(event) => setExpirationDate(event.target.value)}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              {showSubmitBtn ? (
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              ) : null}
            </DialogActions>
          </Dialog>
          <Dialog
            open={deleteDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Confirm to delete</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {/* Are you sure? */}
                Are you sure you want to delete this tenant?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteDialog(false)}>No</Button>
              <Button onClick={() => handleDelete(id)} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
}
