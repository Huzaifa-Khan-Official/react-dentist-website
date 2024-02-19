import React from 'react';
import { FaGooglePlus } from "react-icons/fa6";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../config/firebase';
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {

    const provider = new GoogleAuthProvider();

    const loginBtn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
            }).catch((error) => {
                toast.error(error.message);
            });
    }

    return (
        <div>
            <div className="headingDiv d-flex justify-content-center">
                <h1>Login</h1>
            </div>
            <div className="loginBtnDiv d-flex justify-content-center">
                <button onClick={loginBtn}><FaGooglePlus /> continue with Google</button>
            </div>

            <ToastContainer autoClose={2000}/>
        </div>
    )
}