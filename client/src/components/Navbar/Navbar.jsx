import React from "react";
import { Link } from "react-router-dom";
// import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import InputBase from '@material-ui/core/InputBase';
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
// import MenuIcon from "@material-ui/icons/Menu";
// import SearchIcon from '@material-ui/icons/Search';
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import MailIcon from '@material-ui/icons/Mail';
// import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import LogoMin from "../../images/logoMin.png";
import SchoolIcon from "@material-ui/icons/School";
import HomeIcon from "@material-ui/icons/Home";
// import HomeWorkIcon from "@material-ui/icons/HomeWork";
// import SearchIcon from "@material-ui/icons/Search";
// import CastForEducationIcon from "@material-ui/icons/CastForEducation";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import GradeIcon from "@material-ui/icons/Grade";
// import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import DescriptionIcon from "@material-ui/icons/Description";
import Tooltip from '@material-ui/core/Tooltip';

const stylin = {
  padding: "10px",
}

const style = {
  background:
    "linear-gradient(254deg, rgba(66,66,66,1) 0%, rgba(97,219,251,1) 100%)",
};
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [open, setOpen] = React.useState(false);

  
  // const handleProfileMenuOpen = (event) => {
    //   setAnchorEl(event.currentTarget);
    // };
    
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
    
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
    
    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };
    
    const menuId = "primary-search-account-menu";
    const renderMenu = (
      <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
    anchorEl={mobileMoreAnchorEl}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    id={mobileMenuId}
    keepMounted
    transformOrigin={{ vertical: "top", horizontal: "right" }}
    open={isMobileMenuOpen}
    onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton
          color="inherit"
          className={
            window.location.pathname === "/" ||
            window.location.pathname === "/home"
            ? "active"
            : ""
          }
          >
          <Badge color="secondary">
            <Link to="/">
              <HomeIcon />
            </Link>
          </Badge>
        </IconButton>
        <Link to="/">
          <p>Home</p>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton
          color="inherit"
          className={
            window.location.pathname === "/" ||
            window.location.pathname === "/search"
              ? "active"
              : ""
          }
        >
          <Badge color="secondary">
            <Link to="/search">
              <FindInPageIcon />
            </Link>
          </Badge>
        </IconButton>
        <Link to="/search">
          <p>Search</p>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton
          color="inherit"
          onClick={`nav-item
                            ${
                              window.location.pathname === "/assignmentsTeacher"
                                ? "active"
                                : ""
                            }
                            `}
        >
          <Badge color="secondary">
            <Link to="/dashboardTeacher">
              <NoteAddIcon />
            </Link>
          </Badge>
        </IconButton>
        <Link to="/dashboardTeacher">
          <p>Teacher Dashboard</p>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton
          color="inherit"
          className={`nav-item
              ${
                window.location.pathname === "/assignmentsStudent"
                  ? "active"
                  : ""
              }
                            `}
        >
          <Badge color="secondary">
            <Link to="/dashboardStudent">
              <SchoolIcon />
            </Link>
          </Badge>
        </IconButton>
        <Link to="/dashboardStudent">
          <p>Student Dashboard</p>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton
          color="inherit"
          className={`nav-item
            ${window.location.pathname === "/grades" ? "active" : ""}
                          `}
        >
          <Badge color="secondary">
            <Link to="/grades">
              <GradeIcon />
            </Link>
          </Badge>
        </IconButton>
        <Link to="/grades">
          <p>Gradebook</p>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton
          color="inherit"
          className={`nav-item
          ${window.location.pathname === "/logout" ? "active" : ""}
                        `}
        >
          <Badge color="secondary">
            <Link to="/logout">
              <DescriptionIcon />
            </Link>
          </Badge>
        </IconButton>
        <Link to="/logout">
          <p>Logout</p>
        </Link>
      </MenuItem>
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <AppBar style={style} position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
            <img
              edge="start"
              src={LogoMin}
              alt="react"
              className="img-fluid logo"
              height="67px"
              width="225px"
            />
          <Typography className={classes.title} variant="h6" noWrap style={stylin}>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              color="inherit"
              className={
                window.location.pathname === "/" ||
                window.location.pathname === "/home"
                  ? "active"
                  : ""
              }
            >
               <Tooltip placement="bottom" title="Home">
              <Badge color="primary" style={stylin}>
                <Link to="/">
                  <HomeIcon />
                </Link>
              </Badge>
              </Tooltip>
            </IconButton>

            <IconButton
              color="inherit"
              className={
                window.location.pathname === "/" ||
                window.location.pathname === "/search"
                  ? "active"
                  : ""
              }
            >
      
  <Tooltip placement="bottom" title="Search">
<Badge color="secondary" style={stylin}>
                <Link to="/search">
                  <FindInPageIcon />
                </Link>
              </Badge>
              </Tooltip>
            </IconButton>
            <IconButton
              color="inherit"
              className={`nav-item
                            ${
                              window.location.pathname === "/assignmentsTeacher"
                                ? "active"
                                : ""
                            }
                            `}
            >
    <Tooltip placement="bottom" title="Teacher DashBoard">
<Badge color="secondary" style={stylin}>
                <Link to="/dashboardTeacher">
                  <NoteAddIcon />
                </Link>
              </Badge>
              </Tooltip>
            </IconButton>
            <IconButton
              color="inherit"
              className={`nav-item
              ${
                window.location.pathname === "/assignmentsStudent"
                  ? "active"
                  : ""
              }
                            `}
            >
              <Tooltip placement="bottom" title="Student DashBoard">
              <Badge color="secondary" style={stylin}>
                <Link to="/dashboardStudent">
                  <SchoolIcon />
                </Link>
              </Badge>
              </Tooltip>
            </IconButton>

            <IconButton
              color="inherit"
              className={`nav-item
              ${window.location.pathname === "/grades" ? "active" : ""}
                            `}
            >
              <Tooltip placement="bottom" title="Grades">
              <Badge color="secondary" style={stylin}>
                <Link to="/grades">
                  <GradeIcon />
                </Link>
              </Badge>
              </Tooltip>
            </IconButton>
            <IconButton
              color="inherit"
              className={`nav-item
              ${window.location.pathname === "/logout" ? "active" : ""}
                            `}
            >
              <Tooltip placement="bottom" title="Logout">
              <Badge color="secondary" style={stylin}>
                <Link to="/logout">
                  <DescriptionIcon />
                </Link>
              </Badge>
              </Tooltip>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              // onClick={handleProfileMenuOpen}
              color="inherit"
            >
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}



