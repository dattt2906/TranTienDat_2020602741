

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePassWord = () => {
    const [password, setPassword] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [retypePassword, setRetypePassword] = useState("")
    const [error, setError] = useState("")
    // const userId = Number(localStorage.getItem("UserId"))
    const userIdUrl=window.location.search
    const userId= Number(userIdUrl.replace("?",""))
    const [avatarImg,setAvatarImg]=useState("")
    const nav= useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:3001/users/find-user-by-id/${userId}`).then(res => {

            if (res.data) {
              setPassword(res.data.password)
            }
            
        })

    }, [password])

    useEffect(() => {

        axios.get(`http://localhost:3001/users/find-userinfo-by-userId/${userId}`).then(res => {

            if (res.data) {
                setAvatarImg(res.data.avatarImg)
            }
        })

    }, [])





    const changePassword = () => {
       
        if(oldPassword!==password){

            setError("Mat khau luc dau khong chinh xac ")

        }
        else{

        if (oldPassword === newPassword) {
            setError("Mat khau moi khong duoc trung voi mat khau cu")

        }
        else {
            if (newPassword !== retypePassword) {
                setError("Mat khau nhap lai khong chinh xac")
            }

            else {
              
                axios.put(`http://localhost:3001/auth/update-user-password/${userId}`, { password:newPassword }).then(res => {

                    if (res.data) {
                        setError("")
                        nav("/")
                       

                       
                    }
                }).catch(error => {

                    setError(error.response.data.message)
                })
            }
        }
    }




    }







    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <Box sx={{ display: "flex", alignItems: "center", marginTop: "50px" }}>

                    <img style={{ width: "150px", height: "150px", borderRadius: "50%" }} src={avatarImg}></img>

                </Box>

                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '400px' },
                        marginTop: "70px"

                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        <TextField id="outlined-basic" label="Password" type='password' variant="outlined" onChange={(e)=>setOldPassword(e.target.value)} />
                        <TextField id="outlined-basic" label="New password" type='password' variant="outlined" onChange={(e)=>setNewPassword(e.target.value)} />
                        <TextField id="outlined-basic" label="Retype new password" type='password' variant="outlined" onChange={(e)=>setRetypePassword(e.target.value)} />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", width: "400px", paddingTop: "50px" }}>

                        <Button sx={{ width: "fit-content" }} variant="contained" onClick={changePassword}>Confirm</Button>
                        <Link to={`/User-Info/?${userId}`}>
                            <Button sx={{ width: "fit-content" }} variant="contained">Back to user proflie</Button>
                        </Link>




                    </Box>

                </Box>



            </Box>
            {error ?
                <Box sx={{color:"red", textAlign:"center", fontSize:"20px", marginTop:"20px"}}>
                    {error}
                </Box> : null

            }


        </>
    )
}
export default ChangePassWord