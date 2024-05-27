import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

export default function Logo() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const nav= useNavigate()
  const queryString = window.location.search;

    const params = new URLSearchParams(queryString);
    const userId = params.get('userId');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    const newUrl=`/Home/Users/?userId=${userId}`
    
    nav(newUrl)

  };


  return (
    <Box>
      <Button
        
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{color:"black", fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif", display:"flex", alignItems:"center", flexDirection:"row", height:"70px",gap:2,marginLeft:"5px"}}
      >
         <img style={{width:"30px", height:"30px"}} src="https://firebasestorage.googleapis.com/v0/b/uploadimage-b250d.appspot.com/o/images%2Ftrelloicon.png?alt=media&token=232e7e9f-005a-41f9-8f37-65341e296fbb"></img>
        <span style={{ fontSize:"20px", fontWeight:'bold', fontFamily:""}}>Trello</span>
     
      </Button>
      
      </Box>
  );
}