import {
  ExpandLess,
  ExpandMore,
  HistoryEdu,
  AdminPanelSettings,
  Work,
  ReceiptLong,
  School,
  LibraryBooks,
  Storefront,
  Home,
  StarBorder,
} from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../Store/store";
import config from "../../config";

const Sidebar = (props) => {
  const navigate = useNavigate();

  const { selectedIndex, setSelectedIndex } = useStore((state) => state);
  const [openShop, setOpenShop] = useState(false);
  const [openAuthor, setOpenAuthor] = useState(false);
  const [openStudy, setOpenStudy] = useState(false);
  const [openBooks, setOpenBooks] = useState(false);
  const [openAlumni, setOpenAlumni] = useState(false);
  const [openQA, setOpenQA] = useState(false);
  const [openLXE, setOpenLXE] = useState(false);
  const [openCareer, setOpenCareer] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const [role, setRole] = useState("");
  useEffect(() => {
    const user = config.UserPool.getCurrentUser();
    if (user) {
      user.getSession((err, session) => {
        if (err) {
          console.log(err.message);
        } else {
          setRole(session.idToken.payload["custom:role"]);
        }
      });
    }
  }, []);

  return (
    <List
      style={{ maxHeight: "100%", overflow: "auto" }}
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        // mb: 30,
        height: "150vh",
        overflow: "auto",
      }}
    >
      {role === "admin" || role === "superadmin" ? (
        <ListItemButton
          onClick={(event) => {
            handleListItemClick(event, 0);
            navigate("/home");
          }}
          selected={selectedIndex === 0}
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
      ) : null}
      {role === "admin" || role === "superadmin" ? (
        <>
          <ListItemButton
            onClick={(event) => {
              handleListItemClick(event, 1);
              setOpenShop(!openShop);
            }}
            selected={selectedIndex === 1}
          >
            <ListItemIcon>
              <Storefront />
            </ListItemIcon>
            <ListItemText primary="Shop" />
            {openShop ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openShop} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={(event) => {
                  handleListItemClick(event, 2);
                  navigate("/readers");
                }}
                selected={selectedIndex === 2}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Readers" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={(event) => {
                  handleListItemClick(event, 3);
                  navigate("/courses");
                }}
                selected={selectedIndex === 3}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Courses" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={(event) => {
                  handleListItemClick(event, 4);
                  navigate("/books");
                }}
                selected={selectedIndex === 4}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Books" />
              </ListItemButton>
            </List>
          </Collapse>
        </>
      ) : null}
      {role === "admin" || role === "superadmin" || role === "teacher" ? (
        <>
          <ListItemButton
            onClick={(event) => {
              handleListItemClick(event, 5);
              setOpenAuthor(!openAuthor);
            }}
            selected={selectedIndex === 5}
          >
            <ListItemIcon>
              <HistoryEdu />
            </ListItemIcon>
            <ListItemText primary="uAuthorIt" />
            {openAuthor ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openAuthor} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={(event) => {
                  handleListItemClick(event, 6);
                  navigate("/los");
                }}
                selected={selectedIndex === 6}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Smart Objects" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={(event) => {
                  handleListItemClick(event, 7);
                  navigate("/ios");
                }}
                selected={selectedIndex === 7}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Interactive Objects" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={(event) => {
                  handleListItemClick(event, 8);
                  navigate("/lessons");
                }}
                selected={selectedIndex === 8}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Lessons" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={(event) => {
                  handleListItemClick(event, 9);
                  navigate("/courses");
                }}
                selected={selectedIndex === 9}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Courses" />
              </ListItemButton>
            </List>
          </Collapse>
        </>
      ) : null}
      {role === "admin" ||
      role === "superadmin" ||
      role === "teacher" ||
      role === "student" ? (
        <>
          <ListItemButton
            onClick={(event) => {
              handleListItemClick(event, 10);
              setOpenStudy(!openStudy);
            }}
            selected={selectedIndex === 10}
          >
            <ListItemIcon>
              <ReceiptLong />
            </ListItemIcon>
            <ListItemText primary="uStudyIt" />
            {openStudy ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openStudy} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={(event) => {
                  handleListItemClick(event, 11);
                  navigate("/st-courses");
                }}
                selected={selectedIndex === 11}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="My Courses" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={(event) => {
                  handleListItemClick(event, 12);
                  navigate("/st-lessons");
                }}
                selected={selectedIndex === 12}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="My Private Lessons" />
              </ListItemButton>
            </List>
          </Collapse>
        </>
      ) : null}
      {role === "admin" ||
      role === "superadmin" ||
      role === "teacher" ||
      role === "student" ? (
        <>
          <ListItemButton
            onClick={(event) => {
              handleListItemClick(event, 13);
              setOpenBooks(!openBooks);
            }}
            selected={selectedIndex === 13}
          >
            <ListItemIcon>
              <LibraryBooks />
            </ListItemIcon>
            <ListItemText primary="Smart iBooks" />
            {openBooks ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openBooks} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {role === "admin" ||
              role === "superadmin" ||
              role === "teacher" ? (
                <>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={(event) => {
                      handleListItemClick(event, 14);
                      navigate("/ebooks");
                    }}
                    selected={selectedIndex === 14}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Book Authoring" />
                  </ListItemButton>
                </>
              ) : null}
              {role === "admin" ||
              role === "superadmin" ||
              role === "student" ? (
                <>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={(event) => {
                      handleListItemClick(event, 15);
                      navigate("/st-ebooks");
                    }}
                    selected={selectedIndex === 15}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Book Reading" />
                  </ListItemButton>
                </>
              ) : null}
            </List>
          </Collapse>
        </>
      ) : null}
      {role === "admin" ||
      role === "superadmin" ||
      role === "teacher" ||
      role === "student" ? (
        <>
          <ListItemButton
            onClick={(event) => {
              handleListItemClick(event, 16);
              setOpenAlumni(!openAlumni);
            }}
            selected={selectedIndex === 16}
          >
            <ListItemIcon>
              <School />
            </ListItemIcon>
            <ListItemText primary="Alumni@Worl-LXE" />
            {openAlumni ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openAlumni} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={(event) => {
                  handleListItemClick(event, 17);
                  setOpenQA(!openQA);
                }}
                selected={selectedIndex === 17}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Q & A" />
                {openQA ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openQA} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 8 }}
                    onClick={(event) => {
                      handleListItemClick(event, 18);
                      // navigate("/");
                    }}
                    selected={selectedIndex === 18}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Questions" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 8 }}
                    onClick={(event) => {
                      handleListItemClick(event, 19);
                      // navigate("/");
                    }}
                    selected={selectedIndex === 19}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Unanswered Questions" />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={(event) => {
                  handleListItemClick(event, 20);
                  setOpenLXE(!openLXE);
                  // navigate("/lxe-profile");
                }}
                selected={selectedIndex === 20}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="LXE Profile" />
                {openLXE ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openLXE} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 8 }}
                    onClick={(event) => {
                      handleListItemClick(event, 21);
                      // navigate("/");
                    }}
                    selected={selectedIndex === 21}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="My Questions" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 8 }}
                    onClick={(event) => {
                      handleListItemClick(event, 22);
                      // navigate("/");
                    }}
                    selected={selectedIndex === 22}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="My Answers" />
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
          </Collapse>
        </>
      ) : null}
      {role === "admin" || role === "superadmin" ? (
        <>
          <ListItemButton
            onClick={(event) => {
              handleListItemClick(event, 23);
              setOpenCareer(!openCareer);
            }}
            selected={selectedIndex === 23}
          >
            <ListItemIcon>
              <Work />
            </ListItemIcon>
            <ListItemText primary="Career Consultant" />
            {openCareer ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openCareer} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={(event) => {
                  handleListItemClick(event, 24);
                  // navigate("/");
                }}
                selected={selectedIndex === 24}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="My CV" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={(event) => {
                  handleListItemClick(event, 25);
                  // navigate("/");
                }}
                selected={selectedIndex === 25}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="My Career" />
              </ListItemButton>
            </List>
          </Collapse>
        </>
      ) : null}
      {role === "admin" || role === "superadmin" ? (
        <>
          <ListItemButton
            onClick={(event) => {
              handleListItemClick(event, 26);
              setOpenAdmin(!openAdmin);
            }}
            selected={selectedIndex === 26}
          >
            <ListItemIcon>
              <AdminPanelSettings />
            </ListItemIcon>
            <ListItemText primary="Admin" />
            {openAdmin ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openAdmin} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {role === "superadmin" ? (
                <>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={(event) => {
                      handleListItemClick(event, 27);
                    }}
                    selected={selectedIndex === 27}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Confirmations" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={(event) => {
                      handleListItemClick(event, 28);
                    }}
                    selected={selectedIndex === 28}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="eCommerce" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={(event) => {
                      handleListItemClick(event, 29);
                    }}
                    selected={selectedIndex === 29}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Job KB" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={(event) => {
                      handleListItemClick(event, 30);
                      navigate("/tenants");
                    }}
                    selected={selectedIndex === 30}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Tenants" />
                  </ListItemButton>
                </>
              ) : null}
              {role === "admin" ? (
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={(event) => {
                    handleListItemClick(event, 33);
                    navigate("/users");
                  }}
                  selected={selectedIndex === 33}
                >
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItemButton>
              ) : null}

              {/* <ListItemButton
                sx={{ pl: 4 }}
                onClick={(event) => {
                  handleListItemClick(event, 31);
                  navigate("/groups");
                }}
                selected={selectedIndex === 31}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Groups" />
              </ListItemButton> */}
              {/* <ListItemButton
                sx={{ pl: 4 }}
                onClick={(event) => {
                  handleListItemClick(event, 32);
                  navigate("/courses-list");
                }}
                selected={selectedIndex === 32}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Courses" />
              </ListItemButton> */}
            </List>
          </Collapse>
        </>
      ) : null}
    </List>
  );
};

export default Sidebar;
