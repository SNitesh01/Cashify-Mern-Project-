import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Logo from "../../assets/logo-white.png";
import Products from '../../screens/product/Products';


function Nabar() {

  const mystyle = ({
        width: "60px",
        height:"60px",
        display: "flex",
        gap:"10px"

  })

    return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <img src={Logo} style={mystyle} alt="logo" /> 
              Cashify
           
         
          </IconButton>
          
          <Button color="inherit">Login</Button>
          <Button color="inherit">Register</Button>
          <Button color="inherit">Services</Button>
          <Button color="inherit">About</Button>
        </Toolbar>
      </AppBar>
    
  

        <h1>Welcome to user interface</h1>
        <Products/>
    </div>
  )
}

export default Nabar