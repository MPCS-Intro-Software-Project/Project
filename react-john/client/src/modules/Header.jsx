import React from 'react'
import { BrowserRouter, Link as RouterLink } from "react-router-dom";
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Logo from '../images/FIFA_Logo.png'

export default function Header({role, handleLogoutClick}) {
  const fifa_logo = (
    <div className="fifa-logo">
      <a href="index.html">
        <img src={Logo} style={{ maxHeight: 50, width: "auto", backgroundColor: "inherit"}} />
      </a>
    </div>
  )

  const login_button =
    role === 0 ? (
      <Button style={{
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
      }}
      {...{
        key: "Login",
        color: "inherit",
        to: "/login",
        component: RouterLink,
      }}
    > Login </Button>
    ) : (
      <b></b>
    );

  const logout_button =
    role === 0 ? (
      <b></b>
    ) : (
      <Button style={{
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
      }}
      onClick={() => {handleLogoutClick}}
      {...{
        color: "inherit",
      }}
    > Logout </Button>
    );

  const displayDesktop = () => {
    return (
      <Toolbar style=
      {{ 
        display: "flex",
        justifyContent: "space-between",
      }}>
      {fifa_logo}
      <div>
        {login_button}
        {logout_button}
      </div>
      </Toolbar>
    )
  }

  return (
    <header id="header">
        <AppBar sx={{
          margin: "auto",
          paddingLeft: "120px", 
          bgcolor: "#42a5f5",
          paddingRight: "80px"}}>
          {displayDesktop()}
        </AppBar>
    </header>
  )
}
