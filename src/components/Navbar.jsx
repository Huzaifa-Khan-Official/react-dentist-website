import React from 'react'
import loaderGif from "../assets/loaderGif.png";
import { Link, Navigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { toast } from 'react-toastify';

function Navbar() {
    const LogoutBtn = () => {
        signOut(auth).then(async () => {
            toast.success("You are not allowed to visit this site.");
            window.location.reload();
        });
    }
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src="loaderGif" alt="" />
                        Dentist Website
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-lg-0">
                            <li className="nav-item">
                                <Link to={"/"} className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/dashboard"} className="nav-link">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/clinic-expences"} className="nav-link">Clinic Expences</Link>
                            </li>
                            <li className="nav-item">
                                <button className='nav-link' onClick={LogoutBtn}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar