// import React from "react";
// import "./Navbar.css";
// import LogoMin from "../../images/logoMin.png";
// import { Link } from "react-router-dom";
// import { makeStyles } from '@material-ui/core/styles';
// import SvgIcon from '@material-ui/core/SvgIcon';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// // import { Fade } from '@material-ui/core';
// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > svg': {
//       margin: theme.spacing(2),
//     },
//   },
// }));
// console.log(useStyles)

// function HomeIcon(props) {
//   return (
//     <SvgIcon {...props}>
//       <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
//     </SvgIcon>
//   );
// }

// const Navbar = () => {
//   const notTiny = useMediaQuery('(min-width:600px)');
//   // useState expanded and setExpanded onClick
//   // circle back putas
//     return (
//       <React.Fragment>
//       <div className="navbar-fixed col-md-8">
//         <nav
//           className="nav-wrapper" /*"navbar navbar-expand-md navbar-dark sticky-top"*/
//           >
//           <Link to="/" className="brand-logo left" /*"navbar-brand"*/>
//             <img
//               src={LogoMin}
//               alt="react"
//               className="img-fluid logo"
//               height="67px"
//               width="220px"
//               />
//           </Link>
//           {/* The below a tag is the code that renders the hamburger menu when the size of the screen is minimized */}
//           <a
//             href="/"
//             data-target="mobile-demo"
//             className="sidenav-trigger right hide-on-med-and-up"
//             >
//             <i className="material-icons">menu</i>
//           </a>
//           <ul className="navbar-nav right hide-on-sml-and-down" /*"navbar-nav"*/>
// <li id="li-nav"
//   className={
//     window.location.pathname === "/" ||
//     window.location.pathname === "/home"
//     ? "active"
//     : ""
//   }
// >
//   <Link to="/"><HomeIcon /></Link>
// </li>
//             <li id="li-nav"
//   className={
//     window.location.pathname === "/" ||
//     window.location.pathname === "/search"
//     ? "active"
//     : ""
//   }
// >
//   <Link to="/search">Search</Link>
//             </li>
//             <li
//               className={`nav-item
//                             ${
//                               window.location.pathname === "/assignments"
//                                 ? "active"
//                                 : ""
//                               }
//                             `}
//                             >
//               <Link to="/assignments">Assignments</Link>
//             </li>
//             <li
//               className={`nav-item
//                             ${
//                               window.location.pathname === "/assignmentsTeacher"
//                               ? "active"
//                               : ""
//                             }
//                             `}
//                             >
//               <Link to="/dashboardTeacher">Teacher</Link>
//             </li>
//             <li
//               className={`nav-item
//               ${
//                               window.location.pathname === "/assignmentsStudent"
//                               ? "active"
//                               : ""
//                             }
//                             `}
//             >
//               <Link to="/dashboardStudent">Student</Link>
//             </li>
// <li
//   className={window.location.pathname === "/grades" ? "active" : ""}
//   >
//   <Link to="/grades">Grades</Link>
// </li>
// <li
//   className={
//     window.location.pathname === "/syllabus" ? "active" : ""
//   }
//   >
//   <Link to="/syllabus">Syllabi</Link>
// </li>
//           </ul>
//         </nav>
//       </div>
//     </React.Fragment>
//   );
// };

// export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
// import SvgIcon from '@material-ui/core/SvgIcon';
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import InputBase from '@material-ui/core/InputBase';
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
// import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from "@material-ui/icons/AccountCircle";
// import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from "@material-ui/icons/Notifications";
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



const style = {
  background: 'linear-gradient(254deg, rgba(66,66,66,1) 0%, rgba(97,219,251,1) 100%)',
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
    },
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

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
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
      <MenuItem>
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
            <HomeIcon />
          </Badge>
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem>
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
            <FindInPageIcon />
          </Badge>
        </IconButton>
        <p>Search</p>
      </MenuItem>
      <MenuItem>
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
            <NoteAddIcon />
          </Badge>
        </IconButton>
        <p>DashBoardTeacher</p>
      </MenuItem>
      <MenuItem>
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
            <SchoolIcon />
          </Badge>
        </IconButton>
        <p>DashBoardStudent</p>
      </MenuItem>

      <MenuItem>
        <IconButton
          color="inherit"
          className={`nav-item
            ${window.location.pathname === "/grades" ? "active" : ""}
                          `}
        >
          <Badge color="secondary">
            <GradeIcon />
          </Badge>
        </IconButton>
        <p>GradeBook</p>
      </MenuItem>

      <MenuItem>
        <IconButton
          color="inherit"
          className={`nav-item
          ${window.location.pathname === "/syllabus" ? "active" : ""}
                        `}
        >
          <Badge color="secondary">
            <DescriptionIcon />
          </Badge>
        </IconButton>
        <p>Syllabus</p>
      </MenuItem>

      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar style={style} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <img
              src={LogoMin}
              alt="react"
              className="img-fluid logo"
              height="67px"
              width="220px"
            />
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
              <Badge color="primary">
                <Link to="/">
                  <HomeIcon />
                </Link>
              </Badge>
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
              <Badge color="secondary">
                <Link to="/search">
                  <FindInPageIcon />
                </Link>
              </Badge>
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
              <Badge color="secondary">
                <Link to="/dashboardTeacher">
                  <NoteAddIcon />
                </Link>
              </Badge>
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
              <Badge color="secondary">
                <Link to="/dashboardStudent">
                  <SchoolIcon />
                </Link>
              </Badge>
            </IconButton>

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
            <IconButton
              color="inherit"
              className={`nav-item
              ${window.location.pathname === "/syllabus" ? "active" : ""}
                            `}
            >
              <Badge color="secondary">
                <Link to="/syllabus">
                  <DescriptionIcon />
                </Link>
              </Badge>
            </IconButton>

            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={2} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
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
