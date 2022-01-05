import React from 'react';
import { Link } from 'react-router-dom';
const Nav = () => {
    return (
        <div className='container-fluid '>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">Signup</Link>
                </li>
            </ul>
        </div>
    );
};

export default Nav;