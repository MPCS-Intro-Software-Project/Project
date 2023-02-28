import React from "react";
import { BrowserRouter, Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
//import "./Header.css";

function Header({ role, onLogoutClick }) {
  let headersData = [];
  if (role === 0) {
    headersData.push(["Log In", "/login"]);
  } else {
    headersData.push(["Modify Data", "/add"]);
    if (role === 1) {
      headersData.push(["Add Credential", "/add_credential"]);
    }
    headersData.push(["Log Out", ""]);
  }
  console.log(headersData);
  const fifa_logo = (
    <div className="fifa-logo">
      <a href="index.html">
        <img src="img/logos/FIFA_Logo.png" style={{ maxWidth: 70 }} />
      </a>
    </div>
  );
  const getNavButtons = () => {
    return headersData.map((data) => {
      const label = data[0],
        href = data[1];
      if (href === "") {
        return (
          <Button
            style={{
              fontFamily: "Open Sans, sans-serif",
              fontWeight: 700,
              size: "18px",
              marginLeft: "38px",
            }}
            {...{
              key: label,
              color: "inherit",
              component: RouterLink,
            }}
            onClick={onLogoutClick}
          >
            {label}
          </Button>
        );
      }
      return (
        <Button
          style={{
            fontFamily: "Open Sans, sans-serif",
            fontWeight: 700,
            size: "18px",
            marginLeft: "38px",
          }}
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
          }}
        >
          {label}
        </Button>
      );
    });
  };
  const displayDesktop = () => {
    return (
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {fifa_logo}
        <div>{getNavButtons()}</div>
      </Toolbar>
    );
  };
  return (
    <header id="header">
      <AppBar
        sx={{
          bgcolor: "#42a5f5",
          paddingLeft: "120px",
          paddingRight: "80px",
        }}
      >
        {displayDesktop()}
      </AppBar>
    </header>
  );
}
export default Header;
