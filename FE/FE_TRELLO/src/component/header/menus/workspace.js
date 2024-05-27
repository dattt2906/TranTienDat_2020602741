import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Workspaces() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const[workspaces, setWorkspaces] = useState([])
  const nav= useNavigate()
  // const userId= Number(localStorage.getItem("UserId"))
  const queryString = window.location.search;
    
  const params = new URLSearchParams(queryString);
  const userId = params.get('userId');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeWorkspace=(workspaceId)=>{

    const newUrl = `/WorkspaceArea/?userId=${userId}&workspaceId=${workspaceId}`;
    nav(newUrl)
    window.location.reload()
    
}

  useEffect(() => {
    axios.get(`http://localhost:3001/users/find-user-by-id/${userId}`).then(res => {

        if (res.data) {
            setWorkspaces(res.data.workspaces)
        }
    })

}, [])

  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{color:"black", fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif", fontSize:"17px"}}
      >
        Dự án
        <KeyboardArrowDownIcon/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
         {workspaces && workspaces.length > 0 && workspaces.map((workspace) => (
        <MenuItem onClick={()=>handleChangeWorkspace(workspace.workspaceId)}>{workspace.workspacename}</MenuItem>
      ))}
      </Menu>
      </Box>
  );
}