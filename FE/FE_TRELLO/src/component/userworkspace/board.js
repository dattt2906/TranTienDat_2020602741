import { Box } from "@mui/material";
import axios from "axios";
import React,{ useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import io, { Socket } from 'socket.io-client';



const Board = (props) => {
    const { board } = props
    const nav = useNavigate()
    const queryString = window.location.search;
    // const [socket, setSocket]= useState(null)

    // const connectSocket = async() => {
    //     const newSocket = await io("http://localhost:8001");
    //     setSocket(newSocket);
    //     newSocket.emit("join-room",board.boardId.toString())

    //     // localStorage.setItem("Socket-Join-Room", JSON.stringify(newSocket))
    //     console.log(newSocket)

    // };

    
    
  const params = new URLSearchParams(queryString);
  const userId = params.get('userId');
    
    const handleClick = async () => {
        // connectSocket()

        await axios.get(`http://localhost:3001/board/find-board-by-id/${board.boardId}`).then(res => {

            if (res.data) {
                const url = `/Page/?userId=${userId}&workspaceId=${res.data.workspace.workspaceId}&boardId=${board.boardId}`;

                // Chuyển hướng đến URL mới
                nav(url)

            }

        })


        
    }

    return (

        <>  
     
            <Box onClick={handleClick} sx={{height: "100px", width:"270px", backgroundColor: "aliceblue", backgroundImage:`url(${board.boardbackground})`,backgroundSize: "cover",cursor: "pointer", marginTop:"20px", marginLeft:"50px", marginBottom:"20px", borderRadius:"10px"}}>

               <span style={{fontWeight:"bold",color:"white", paddingLeft:"10px"}}> {board.boardname} </span>

            </Box>
           </>
    )
}
export default Board;