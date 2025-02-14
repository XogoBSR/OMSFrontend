import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menus, { getMenusForUser } from "./config/Menus";
import { useHistory, useLocation } from "react-router-dom";
import { ReactComponent as Logo } from "assets/logo2.svg";
import { AccountCircle, Logout } from "@mui/icons-material";
import {
  Avatar,
  ListItemButton,
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { UserSelector } from "../selectors";
import { AuthActions, UserActions } from "../slices/actions";
import { push } from "connected-react-router";
import PropTypes from "prop-types";
import Can from "../utils/can";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  background: theme.palette.common.light,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const LogoBox = styled(Box)(() => ({
  width: drawerWidth,
  paddingTop: 30,
  paddingBottom: 10,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const NavItem = styled(ListItemButton, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, active }) => ({
    width: 220,
    margin: "10px 0",
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    background: active === "true" ? theme.palette.primary.light : "transparent", // ✅ Dynamic background
    "& .MuiTypography-root": {
      fontWeight: active === "true" ? 700 : "normal",
      color: active === "true" ? theme.palette.primary.main : theme.palette.common.grey, // ✅ Dynamic text color
    },
    "& svg": {
      color: active === "true" ? theme.palette.primary.main : theme.palette.common.grey, // ✅ Dynamic icon color
    },
  }));
  

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 5),
  ...theme.mixins.toolbar,
  justifyContent: "center",
}));

MainLayout.propTypes = {
  children: PropTypes.any,
};

export default function MainLayout({ children }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const mobile = useMediaQuery(useTheme().breakpoints.down("sm"));
  const { pathname } = useLocation();
  const profile = useSelector(UserSelector.profile());
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [expandedMenus, setExpandedMenus] = useState({});

  useEffect(() => {
    // console.log(" Main Layout profile ",profile.role)
    dispatch(UserActions.profileUser());
  }, [dispatch]);

  useEffect(() => {
    if (mobile) {
      setOpen(false);
    }
  }, [mobile]);

  useEffect(() => {
    if (profile !== null && !profile._id) {
      dispatch(push("/"));
    }
  }, [profile, dispatch]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenuToggle = (e) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(e.currentTarget);
    }
  };

  const handleLogout = () => {
    dispatch(AuthActions.logout());
  };

  const handleToggle = (menuName) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName], // Toggle expand state
    }));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" elevation={4} open={open}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton onClick={handleDrawerToggle} edge="start">
            <MenuIcon />
          </IconButton>
          <Tooltip title="Account settings">
            <IconButton onClick={handleMenuToggle} size="small" sx={{ ml: 2 }}>
              <Avatar sx={{ width: 40, height: 40 }}>
                {profile?.name? profile?.name?.toString().substring(0, 2).toUpperCase(): "D"}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuToggle}
        onClick={handleMenuToggle}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 8px 24px rgba(149, 157, 165, 0.2))",
            mt: 1.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => dispatch(push("/app/profile"))}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "none",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <LogoBox>
          <Logo height={45} />
        </LogoBox>
        <List>
          {Menus.map((item, index) => {
            if (!Can(item.act, item.feat)) {
              return null;
            }

// This const isActive ensures that the parent menu gets highlighted only if either:
// The parent path matches the current path.
// Any of its children have an active path.

const isActive = 
location.pathname === item.path || 
(item.children && item.children.some(child => location.pathname === child.path));



            const isExpanded = expandedMenus[item.name] || isActive;

            if (Can(item.act, item.feat)) {
              return (
                <React.Fragment key={index}>
                  {/* Render the parent menu item */}

                  <NavItem
                    button
                    active={isActive ? "true" : "false"}  // ✅ Use the updated `isActive`
                    onClick={() => {
                      if (item.children) {
                        handleToggle(item.name); // ✅ Toggle expand state
                      } else {
                        history.push(item.path);
                      }
                    }}
                    selected={pathname.includes(item.path)} // ✅ Fix: Ensure selected state works
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                    {/* Show expand/collapse icon */}
                    {item.children &&
                      (isExpanded ? <ExpandLess /> : <ExpandMore />)}
                  </NavItem>

                  {/* Check if the item has children and render them */}
                  {item.children && (
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.children.map((child, childIndex) => {
                          if (!Can(child.act, child.feat)) {
                            return null;
                          }

                          const isChildActive =
                            location.pathname === child.path;

                          return (
                            <NavItem
                              key={`${index}-${childIndex}`}
                              onClick={() => history.push(child.path)}
                              selected={isChildActive}
                              style={{ paddingLeft: "2rem" }} // Add indentation for child items
                            >
                              <ListItemIcon>{child.icon}</ListItemIcon>
                              <ListItemText primary={child.name} />
                            </NavItem>
                          );
                        })}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
              );
            }

            return <div key={index} />;
          })}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
