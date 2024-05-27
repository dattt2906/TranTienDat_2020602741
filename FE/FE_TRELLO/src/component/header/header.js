import { useState } from "react"

import axios from "axios";
import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import Workspaces from "./menus/workspace";
import Recents from "./menus/recent";
import Starred from "./menus/starred";
import Search from "./menus/search";
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ImageAvatars from "./menus/avartar";
import Create from "./menus/create";
import Button from '@mui/material/Button';
import Logo from "./menus/logo";


import AppsIcon from '@mui/icons-material/Apps';
import Teamplates from "./menus/teamplate";
const Header = () => {
    const [displayName, setDisplayName] = useState("");
  


    // axios.get(`http://localhost:3001/users/find-user-by-id/${userId}`).then(res => {
    //     if (res.data) {
    //         setDisplayName(res.data.username)

    //     }


    // })
    const clear = () => {

        localStorage.clear();
    }
    const showSetting=()=>{

        var content = document.querySelector(".modal-settings");
        if (content) {
            content.style.display = "block";
        }
    }

    return (
    
    
    <>
    <Box sx={{height:"70px", display:"flex", justifyContent:"space-between"}}>
        <Box sx={{display:"flex", alignItems:"center", flexDirection:"row", height:"70px",gap:2,marginLeft:"20px"}}>
        <AppsIcon/>
        

        <Logo />
        <Workspaces/>
        <Recents/>
        
        <Create/>
        
        
        </Box>
        <Box sx={{display:"flex", alignItems:"center", gap:2, marginRight:"20px"}}>

        <Search/>
        <NotificationsIcon/>
        <HelpOutlineIcon/>
        <ImageAvatars/>



        </Box>
       

        
    



    </Box>
    
    </>
       
    )
}
export default Header