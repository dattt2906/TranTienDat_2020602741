import { Link } from "react-router-dom";

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { data } from "../data";
import { useNavigate } from "react-router-dom"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';



const ForgotPass = () => {
    const [password, setNewPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [error, setError] = useState("")
    const [updateSuccess, setUpdateSucess] = useState("")

    const forget_token = window.location.search;
    const token = forget_token.replace("?", "");
    const [userId, setUserId] = useState(null)
    useEffect(() => {

        axios.post("http://localhost:3001/auth/decodeToken", { token }).then(res => {
            if (res.data) {
                setUserId(res.data.sub)
            }
        })

    }, [])



    const handleResetPass = async () => {
        if (password && retypePassword && password === retypePassword) {
            axios.put(`http://localhost:3001/auth/update-user-password/${userId}`, { password }).then(res => {
                if (res.data) {
                    setUpdateSucess("Cap nhat thanh cong. Vui long quay lai trang chu de dang nhap voi mat khau moi")
                    setError("")
                }

            }).catch(error => {
                setError(error.response.data.message)
                setUpdateSucess("")
            })
        }
        else {

            setError("mat khau nhap lai phai trung voi mat khau moi")
            setUpdateSucess("")
        }
    }
    return (
        <>
            {/* <div className="Forgot-pass">
                <h1 className="header-forgot">Retype-Passwork</h1>
                <div className="new-password">New Password<input className="new-pass" type="password" name="username" onChange={(e) => setNewPassword(e.target.value)}></input></div>
                <div className="retype-password">Retype Password<input className="retype" type="password" name="password" onChange={(e) => setRetypePassword(e.target.value)}></input> </div>

                <div className="btn-Regis">
                    <button className="btn-regis" onClick={handleResetPass}>Save</button>
                    <Link to={"/"}>
                        <button className="btn-back-login">Back Login</button>
                    </Link>
                </div>
                {error ?
                    <div>
                        {error}
                    </div> : null

                }
                {updateSuccess ?
                    <div style={{ color: "red" }}>
                        {updateSuccess}
                    </div> : null

                }

            </div> */}
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
                    <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif", fontWeight: "bold", fontSize: "20px" }}>Reset your password</span>
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
                    <TextField type="text" id="outlined-basic" label="Mật khẩu mới" variant="outlined"onChange={(e) => setNewPassword(e.target.value)} />
                    <TextField type="password"id="outlined-basic" label="Nhập lại mật khẩu mới" variant="outlined" onChange={(e) => setRetypePassword(e.target.value)}/>
                </Box>

                {/* <div className="btn"> */}
                <Box sx={{ width: "fit-content", marginTop: "20px" }}>
                    {/* <button className="btn-login" onClick={handelLogin}>Login</button>
                    <Link to={"/register"}>
                        <button className="btn-register">Register</button>
                    </Link> */}


                    <Button sx={{ width: "400px" }} variant="contained" onClick={handleResetPass}>Xác nhận</Button>


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
                {updateSuccess ?
                    <div style={{ color: "red" }}>
                        {updateSuccess}
                    </div> : null

                }
            </Box>
            

        </>
    )
}
export default ForgotPass;