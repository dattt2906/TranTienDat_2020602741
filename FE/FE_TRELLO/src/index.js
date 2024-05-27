import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './component/login/login';
import Register from './component/login/register';
import ForgotPass from './component/login/forgotPass';
import EmailForgot from './component/login/EmailForgot';
import UserInfor from './component/user/userInfor';
import ChangePassWord from './component/changePassword/changepassword';

import App from './App';
import "./index.css"
import reportWebVitals from './reportWebVitals';
import UserWorkspace from './component/userworkspace/userWorkspace';
import WorkspaceArea from './component/workspace-area/workspace-area';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    // <App />
  // </React.StrictMode>
  <BrowserRouter>
  <Routes>

    <Route path='/' element={<Login />}></Route>
    <Route path='Page' element={<App />}></Route>
    <Route path='Register' element={<Register />}></Route>
    <Route path='Retype-password' element={<ForgotPass/>}></Route>
    <Route path='Input-email' element={<EmailForgot/>}></Route>
    <Route path='User-Info/' element={<UserInfor/>}></Route>
    <Route path='Change-password/User/' element={<ChangePassWord/>}></Route>
    <Route path='Home/Users' element={<UserWorkspace/>}></Route>
    <Route path='WorkspaceArea' element={<WorkspaceArea />}></Route>

  </Routes>
  
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
