import React from 'react';
import { BannerTop, Header } from '../components'; 
import '../assets/css/homepage.css';

function Homepage(props) {
    return (
        <div>
        <BannerTop></BannerTop>
        <Header></Header>
        </div>
    );
}

export default Homepage;