import React from 'react';
import { Link } from 'react-router-dom';

import "./Header.css"

export const Header = () => {
    return(
        <div id="header">
            <center>
                <Link to='/'>Top</Link>
                <h1>Super Discount Bros.</h1>
            </center>
        </div>
    )
}