
import axios from "axios";

import { Link } from "react-router-dom";
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const EmailForgot = () => {
    const [email, setEmail] = useState("")
    const [emailCheck, setEmailCheck] = useState("")
    const [error, setError]= useState("")

    const forgotPassword = async () => {

        await axios.post("http://localhost:3001/auth/forget-pass", { email }).then(res => {
            if (res.data) {
                setEmailCheck("Vui long kiem tra mail de lay lai mat khau")
                setError("")
            }
        }).catch(error=>{
            setError("Khong tim thay tai khoan email da dang ki")
            setEmailCheck("")
        })


    }

    return (
        <>
            {/* <div className="forgot-password">Forgot Password
                <div className="input-email"><input placeholder="Enter Email" onChange={(e) => setUserName(e.target.value)}></input></div>
                <div className="btn-confirm">

                    <div className="confirm"><button onClick={forgotPassword}>Confirm</button></div>

                    <Link to={"/"}>
                        <div className="back-login"><button >Back</button></div>
                    </Link>
                </div>
                {emailCheck ?
                    <div style={{ color: "red" }}>
                        {emailCheck}
                    </div> : null

                }

            </div> */}
             {/* <div className="login-content"> */}
             <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Fira Sans,Droid Sans,Helvetica Neue,sans-serif" }}>
                {/* <h1 className="header-login">Trello Login</h1> */}

                {/* <div className="userName-input">UserName <input className="user" type="text" name="username" onChange={(e) => setUsername(e.target.value)}></input></div>
                <div className="password-input"> Password <input className="pass" type="password" name="password" onChange={(e) => setPassword(e.target.value)}></input> </div> */}
                {/* <Link to={"/input-email"}>
                    <div style={{ marginTop: "15px" }}><a href="">Forgot password?</a></div>
                </Link> */}
                <Box sx={{ marginTop: "50px", display: "flex", alignItems: "center", gap: 2 }}>
                    <img src="trelloicon.png" style={{ width: "50px", height: "50px" }}></img>
                    <span style={{ fontSize: "25px", fontFamily: "var(--font-family-text,'Charlie Text',sans-serif)" }}>Trello</span>
                </Box>
                <Box sx={{ marginTop: "40px" }}>
                    <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif", fontWeight: "bold", fontSize: "20px" }}>Quên mật khẩu?</span>
                </Box>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '400px' },
                        display: "flex", flexDirection: "column", gap: 2, marginTop: "30px"
                    }}
                    noValidate
                    autoComplete="off"
                >
                   
                    <TextField type="text"id="outlined-basic" label="Nhập email" variant="outlined" onChange={(e) => setEmail(e.target.value)}/>
                </Box>

                {/* <div className="btn"> */}
                <Box sx={{ width: "fit-content", marginTop: "20px" }}>
                    {/* <button className="btn-login" onClick={handelLogin}>Login</button>
                    <Link to={"/register"}>
                        <button className="btn-register">Register</button>
                    </Link> */}


                    <Button sx={{ width: "400px" }} variant="contained" onClick={forgotPassword}>Gửi liên kết xác nhận</Button>


                </Box>
                <Box
                    sx={{
                        width:"400px", display:"flex" ,justifyContent:"center", marginTop:"15px"
                    }}
                    >
                    
                    <Link to={"/"}>Quay lại đăng nhập</Link>
                    
                </Box>
                {/* </div> */}
                {error ?
                    <div>
                        {error}
                    </div> : null

                }
                {emailCheck ?
                    <div>
                        {emailCheck}
                    </div> : null

                }
            </Box>

            {/* </div> */}

        </>
    )
}
export default EmailForgot;