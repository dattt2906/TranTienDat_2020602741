import { useEffect, useState } from "react";
import Header from "../header/header";
import { Box } from "@mui/material";
import axios from "axios";
import Workspace from "./workspace";

const UserWorkspace = () => {
    const [workspaces, setWorkspaces] = useState([])
    // const [boards, setBoards] = useState([])
    // const userId = Number(localStorage.getItem("UserId"))
    const queryString = window.location.search;

    const params = new URLSearchParams(queryString);
    const userId = params.get('userId');

    useEffect(() => {
        axios.get(`http://localhost:3001/users/find-user-by-id/${userId}`).then(res => {

            if (res.data) {
                console.log("workspace:", res.data.workspaces)
                setWorkspaces(res.data.workspaces)
            }
        })

    }, [])

    return (
        <>
            <Box sx={{ overflowY: "unset" }}>
                <Header />

                <Box sx={{ display: "flex", marginTop: "50px", justifyContent: "center" }}>

                    <Box sx={{ overflow: "auto", width: "100%", height: "700px", marginRight: "300px", marginLeft: "300px" }}>


                        <Box sx={{ fontSize: "24px", fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif", marginTop: "20px", marginLeft: "20px", marginBottom: "20px", marginRight: "20px" }}>

                            Dự án của bạn
                            <Box sx={{ marginTop: "50px", display: "flex", flexDirection: "column", gap: 5 }}>
                                <Box sx={{ height: "100px", width: "270px", cursor: "pointer", backgroundColor: "gray", marginTop: "20px", marginLeft: "50px", marginBottom: "20px", display: "flex", alignItems: "center" }}>

                                    <span style={{ color: "white",padding:"70px"}}> Tạo dự án </span>

                                </Box>
                                {workspaces && workspaces.length > 0 && workspaces.map((workspace) => (


                                    <Workspace
                                        key={workspace.id}
                                        workspace={workspace}

                                    />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

        </>
    )
}
export default UserWorkspace;