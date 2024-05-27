import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import Input from '@mui/joy/Input';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import ClearIcon from '@mui/icons-material/Clear';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { imageDb } from '../../../firebase';
import Textarea from '@mui/joy/Textarea';



import Box from '@mui/material/Box';
import JoyButton from '@mui/joy/Button'; // Import Button từ mui/joy với biệt danh JoyButton
import { flatMap } from 'lodash';
import axios from 'axios';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



export default function Create() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [isShowModalAddBoard, setIsShowModalAddBoard] = useState(false)
    // const userId = Number(localStorage.getItem("UserId"))
    const queryString = window.location.search;
    const nav= useNavigate()

    const params = new URLSearchParams(queryString);
    const userId = params.get('userId');
    const [workspaces, setWorkspace] = useState([])
    const [workspaceId, setWorkspaceId] = useState(null)
    const [boardname, setBoardname] = useState("")
    const [workspacename,setWorkspacename]= useState("")

    const [openModal, setOpenModal] = React.useState(false);
    const [imgBack, setImgBack] = useState(null)
    const [boardbackground, setBoardBackground] = useState("")
    const [workspaceDetail, setWorkspaceDetail]= useState("")
    const handleOpenModal = () => {
        
        
        setOpenModal(true);
       
       
    }
    useEffect(() => {
        if (imgBack) {
            handleUpload();
        }
    }, [imgBack]);
    const handleUpload = () => {

        const imageRef = ref(imageDb, `images/${v4()}`)
        uploadBytes(imageRef, imgBack).then((snapshot) => {

            getDownloadURL(snapshot.ref).then((imgBack) => {
                setBoardBackground(imgBack)
                
            })
        })
    }



    const handleCloseModal = () =>{ setOpenModal(false);handleClose() }


    useEffect(() => {
        axios.get(`http://localhost:3001/users/find-user-by-id/${userId}`).then(res => {

            if (res.data) {
                console.log("workspace:", res.data.workspaces)
                setWorkspace(res.data.workspaces)
            }
        })

    }, [])




    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setIsShowModalAddBoard(false)

    };

    const handleChange = (event) => {


        setWorkspaceId(event.target.value)
    }


    const handleClose = () => {
        setAnchorEl(null);


    };
    const handelCreateWorkspace=()=>{
        axios.post("http://localhost:3001/workspace/create-workspace", { workspacename, userId ,workspaceDetail}).then(res => {
            if (res.data) {
                // let newBoardId = res.data.boardId; // Đây là giá trị mới bạn muốn thay thế
                const newUrl=`/Home/Users/?userId=${userId}`
                
                nav(newUrl)
                window.location.reload()
                

            }
        }).catch(error => {
            console.log("create board failed")
        })


    }
    const handleShowModalAddBoard = () => {
        setIsShowModalAddBoard(true)
        handleClose()
    }
    const handleCreateBoard = () => {
        axios.post("http://localhost:3001/board/create-board", { boardname, workspaceId ,boardbackground}).then(res => {
            if (res.data) {
                let newBoardId = res.data.boardId; // Đây là giá trị mới bạn muốn thay thế
                const newUrl =  `/Page/?userId=${userId}&workspaceId=${workspaceId}&boardId=${res.data.boardId}`;
                
                nav(newUrl)
                window.location.reload()

            }
        }).catch(error => {
            console.log("create board failed")
        })
    }


    return (
        <>

            <Box sx={{ position: "relative" }}>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{ color: "black", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif", fontSize: "17px" }}
                >
                    Tạo

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
                    <MenuItem onClick={handleShowModalAddBoard} sx={{ marginBottom: "20px" }}> <DashboardIcon sx={{ marginRight: "5px" }} />Bảng công việc</MenuItem>

                    <MenuItem onClick={handleOpenModal}><PeopleOutlineIcon sx={{ marginRight: "5px" }} />Dự án</MenuItem>
                    <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="Box">
                                <Box>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <span style={{ textAlign: "center", width: "100%" }}>Tạo dự án</span>
                                    </Box>
                                    <Box sx={{width:"70%", marginTop:"40px", display:"flex", flexDirection:"column", gap:5}}>

                                        <FormControl>
                                            <FormLabel>Tên dự án</FormLabel>
                                            <Input placeholder="Nhập tên dự án" onChange={(e)=> setWorkspacename(e.target.value)} />

                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Mô tả</FormLabel>
                                            {/* <Input sx={{height:"200px"}} onChange={(e)=> setWorkspaceDetail(e.target.value)}/> */}
                                            <Textarea sx={{height:"200px"}} onChange={(e)=> setWorkspaceDetail(e.target.value)}></Textarea>
                                        </FormControl>

                                    </Box>
                                    <Box sx={{marginTop:"20px"}}>
                                    <JoyButton type='submit' sx={{ width: "270px" }} onClick={handelCreateWorkspace}>Tạo</JoyButton>

                                    </Box>

                                </Box>
                            </Typography>

                        </Box>
                    </Modal>
                    {/* <MenuItem onClick={handleClose}><PeopleOutlineIcon sx={{ marginRight: "5px" }} />Workspace</MenuItem> */}


                </Menu>



            </Box>
            <Box sx={{ height: "fit-content", width: "300px", marginTop: "470px", position: "absolute", marginLeft: "400px", backgroundColor: "hsla(260, 80%, 94.1%, 0.9)", display: isShowModalAddBoard ? "block" : "none" ,zIndex:1 }}>
                <Box sx={{ marginLeft: "15px", marginRight: "15px" }}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif", fontSize: "17px", width: "250px", textAlign: "center" }}>  Tạo bảng</span>

                        <ClearIcon onClick={(e) => setIsShowModalAddBoard(false)} />
                    </Box>
                    {boardbackground ?
                        <Box sx={{display:"flex", justifyContent:"center", marginTop:"15px"}}>
                        <img style={{with:"70px", height:"70px"}} src={boardbackground}></img>
                        </Box>
                        :
                        null
                    }
                    <Box sx={{marginTop:"30px"}}>

                    <FormControl>
                            <FormLabel>Ảnh nền</FormLabel>
                            <input type='file' onChange={(e) => { setImgBack(e.target.files[0]) }} style={{ display: "none" }} />
                            <Button sx={{height:"30px", width:"270px"}}variant="contained" onClick={() => { document.querySelector('input[type="file"]').click(); }}>Tải lên từ máy tính</Button>
                        </FormControl>

                    </Box>
                    <Box sx={{ marginTop: "15px" }}>
                        <FormControl>
                            <FormLabel>Tên bảng</FormLabel>
                            <Input placeholder="Nhập tên bảng" onChange={(e) => setBoardname(e.target.value)} />

                        </FormControl>
                    </Box>

                    <Box sx={{ marginTop: "15px" }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Dự án</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={workspaceId}
                                label="Dự án"
                                onChange={handleChange}
                            >
                                {workspaces && workspaces.length > 0 && workspaces.map((workspace) => (
                                    <MenuItem value={workspace.workspaceId}>{workspace.workspacename}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ marginTop: "15px", width: "270px", marginRight: "15px", marginBottom: "30px" }}>
                        <JoyButton type='submit' sx={{ width: "270px" }} onClick={handleCreateBoard}>Tạo</JoyButton>
                    </Box>

                </Box>



            </Box>

            {/* <Box sx={{ width: "800px", height: "400px", position: "absolute", backgroundColor: "pink", marginLeft: "500px", marginTop: "800px", zIndex: 1 }}>

               
            </Box> */}

        </>

    );
}