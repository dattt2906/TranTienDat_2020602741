import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // const UserId= Number(localStorage.getItem("UserId"))
  const queryString = window.location.search;

    const params = new URLSearchParams(queryString);
    const userId = params.get('userId');
    const[userInfoId,setUserInfoId]= useState(null)
    
  const [imgAvatar, setImgAvatar]=useState("")
  const nav=useNavigate()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfile=()=>{
    nav(`/User-Info/?${userInfoId}`)
  }
  const handleLogout=()=>{
    localStorage.clear()
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(()=>{

    axios.get(`http://localhost:3001/users/find-userinfo-by-userId/${userId}`).then(res=>{
      setUserInfoId(res.data.userInforId)
      setImgAvatar(res.data.avatarImg)
    })

  },[])

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32}} src={imgAvatar}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfile}>
          <Avatar /> Hồ sơ
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem> */}
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Thêm một tài khoản khác
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
        </Link>
        
      </Menu>
    </>
  );
}