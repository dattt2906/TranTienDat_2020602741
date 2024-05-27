import { Link } from "react-router-dom";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';



const Register = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [verifiEmail, setVerifiEmail] = useState("")
    const navigate = useNavigate()

    const handleRegis = async () => {
        await axios.post("http://localhost:3001/auth/regis", { email, password }).then(res => {
            if (res.data.regis_token) {
                // axios.post("http://localhost:3001/mailer/send-email")
                setVerifiEmail("Dang Ki thanh cong. Vui long kiem tra mail de xac nhan")
                setError("")

            }
        }).catch(error => {

            setError(error.response.data.message)
            setVerifiEmail("")

        })

    }



    return (
        <>
            
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Fira Sans,Droid Sans,Helvetica Neue,sans-serif" }}>
               
                <Box sx={{ marginTop: "50px", display: "flex", alignItems: "center", gap: 2 }}>
                    <img src="trelloicon.png" style={{ width: "50px", height: "50px" }}></img>
                    <span style={{ fontSize: "25px", fontFamily: "var(--font-family-text,'Charlie Text',sans-serif)" }}>Trello</span>
                </Box>
                <Box sx={{ marginTop: "40px" }}>
                    <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif", fontWeight: "bold", fontSize: "20px" }}>Đăng kí để tiếp tục</span>
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
                    <TextField type="text" id="outlined-basic" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
                    <TextField type="password" id="outlined-basic" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} />
                </Box>

        
                <Box sx={{ width: "fit-content", marginTop: "20px" }}>
  

                    <Button sx={{ width: "400px" }} variant="contained" onClick={handleRegis}>Đăng kí</Button>


                </Box>
                <Box
                    sx={{
                        width: "400px", display: "flex", justifyContent: "center", marginTop: "15px"
                    }}
                >

                    <Link to={"/"}>Bạn đã có tài khoản trello? Đăng nhập</Link>

                </Box>
                {/* </div> */}
                {error ?
                    <div>
                        {error}
                    </div> : null

                }
                {verifiEmail ?
                    <div style={{ color: "red" }}>
                        {verifiEmail}
                    </div> : null

                }
            </Box>

           





        </>
    )

}


export default Register;