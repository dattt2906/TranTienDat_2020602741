import "./container.css"
import Sidebar from "./sidebar/sidebar"
import Navbar from "./navbar/navbar"
import Content from "./content/content"
import Column from "./content/column"
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import ReactDOM from 'react-dom';

const Container = () => {


    return (

        <>
            <div className="container">
                <Sidebar></Sidebar>
                <div className="main-content">
                    <Navbar></Navbar>
                    <Content>
                    </Content>
                </div>
            </div>



        </>

    )
}
export default Container