import React from 'react'
import { BrowserRouter, Link as RouterLink } from "react-router-dom";
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Logo from '../images/FIFA_Logo.png'
import { Container } from '@mui/system';

const headersData = [
  {
    label: "Tournaments",
    href: "/tournaments",
  },
  {
    label: "Matches",
    href: "/matches",
  },
  {
    label: "Teams",
    href: "/teams",
  },
  {
    label: "Contact",
    href: "/contact",
  },
]

function Header() {
  const fifa_logo = (
    <div className="fifa-logo">
      <a href="index.html">
        <img src={Logo} style={{ maxHeight: 30 }}/>
      </a>
    </div>
  )

  const getNavButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button style={{
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
      <Toolbar style=
      {{ 
        display: "flex",
        justifyContent: "space-between",
      }}>
      {fifa_logo}
      <div>{getNavButtons()}</div>
      </Toolbar>
    )
  }

  return (
    <header id="header">
        <AppBar sx={{
          margin: "auto",
          bgcolor: "#42a5f5", 
          paddingLeft: "120px", 
          paddingRight: "80px"}}>
          {displayDesktop()}
        </AppBar>
    </header>
  )
}

export default Header