import { Box } from "@mui/material"
import React, { useState, useEffect } from "react"
import Board from "./board"
import ClearIcon from '@mui/icons-material/Clear';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Button from '@mui/material/Button';
import JoyButton from '@mui/joy/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Input from '@mui/joy/Input';
import InputLabel from '@mui/material/InputLabel';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 } from 'uuid';
import { imageDb } from "../../firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';

const Workspace = (props) => {
    const { workspace } = props
    const Boards = workspace.boards
    const [boards, setBoards] = useState(Boards)
    const [isShowModalAddBoard, setIsShowModalAddBoard] = useState(false)
    const [boardbackground, setBoardBackground] = useState("")
    const [boardname, setBoardname] = useState("")
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const userId = params.get('userId');
    const [workspaceId, setWorkspaceId] = useState(null)
    // const [workspaces, setWorkspace] = useState([])
    const [imgBack, setImgBack] = useState(null)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const nav= useNavigate()
    
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
    const handleChange = (event) => {


        setWorkspaceId(event.target.value)
    }
    const handleShowModalAddBoard = () => {
        setIsShowModalAddBoard(true)
        handleClose()
    }
    const handleClose = () => {
        setAnchorEl(null);


    };

    useEffect(() => {

        setBoards(Boards) //moi khi cards duoc thay doi thi luu cards moi vao vi neu chi thay doi ben column thi cards se khong the biet su thay doi do
        console.log(Boards)

    }, [Boards])
    // useEffect(() => {
    //     axios.get(`http://localhost:3001/users/find-user-by-id/${userId}`).then(res => {

    //         if (res.data) {
    //             console.log("workspace:", res.data.workspaces)
    //             setWorkspace(res.data.workspaces)
    //         }
    //     })

    // }, [])

    return (

        <>
            <Box>
                <Box sx={{ marginLeft: "50px" }}>
                    {workspace.workspacename}
                </Box>

                <Box sx={{ display: "flex", gap: 3, marginTop: "20px", flexWrap: "wrap" }}>
                    <Box  onClick={handleShowModalAddBoard} sx={{ height: "100px", width: "270px", cursor: "pointer",backgroundColor:"gray", marginTop: "20px", marginLeft: "50px", marginBottom: "20px", display:"flex", alignItems:"center"}}>

                        <span style={{  color: "white", paddingLeft:"30px" }}> Tạo bảng công việc </span>

                    </Box>



                    <Box sx={{ height: "fit-content", width: "300px",marginLeft:"50px", marginTop: "20px", position: "relative", backgroundColor: "hsla(260, 80%, 94.1%, 0.9)", display: isShowModalAddBoard ? "block" : "none" ,zIndex:1 }}>
                <Box sx={{ marginLeft: "15px", marginRight: "15px" }}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif", fontSize: "17px", width: "250px", textAlign: "center" }}> Tạo bảng</span>

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
                            <input type='file'className={workspace.workspacename.replace(/\s/g, '')} onChange={(e) => { setImgBack(e.target.files[0]) }} style={{ display: "none" }} />
                            <Button sx={{height:"30px", width:"270px"}}variant="contained" onClick={() => { document.querySelector(`input[type="file"].${workspace.workspacename.replace(/\s/g, '')}`).click(); }}>Tải lên từ máy tính</Button>
                        </FormControl>

                    </Box>
                    <Box sx={{ marginTop: "15px" }}>
                        <FormControl>
                            <FormLabel>Tên bảng công việc</FormLabel>
                            <Input placeholder="Nhập tên bảng" onChange={(e) => setBoardname(e.target.value)} />

                        </FormControl>
                    </Box>

                    <Box sx={{ marginTop: "15px" }}>
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Dự án</InputLabel>
                            <Select
                                //  <InputLabel id="demo-simple-select-label">Dự án</InputLabel>
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={workspaceId}
                                label="Dự án"
                                onChange={handleChange}
                            >
                                
                                    <MenuItem value={workspace.workspaceId}>{workspace.workspacename}</MenuItem>
                                
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ marginTop: "15px", width: "270px", marginRight: "15px", marginBottom: "30px" }}>
                        <JoyButton type='submit' sx={{ width: "270px" }} onClick={handleCreateBoard}>Tạo</JoyButton>
                    </Box>

                </Box>



            </Box>

                    {boards && boards.length > 0 && boards.map((board) => (

                        <Board
                            key={board.boardId}
                            board={board}

                        />


                    ))}





                </Box>


            </Box>
        </>
    )
}
export default Workspace