import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import App from '../App'
import Dashboard from '../Pages/Dashboard'
import ClinicExpences from '../Pages/ClinicExpences'
import Login from '../Pages/Login'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'
import { toast } from 'react-toastify'
import Loader from '../Context/Context'

export default function Router() {
    const [isUser, setIsUser] = useState(false);
    const [loader, setLoader] = useState(false);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setIsUser(true);
            // if (user.email !== "m.huzaifakhan2004@gmail.com") {
            //     signOut(auth).then(async () => {
            //         toast.success("You are not allowed to visit this site.")
            //     });
            // } else {
            //     setIsUser(true);
            // }
        }
    });

    return (
        <>
            <BrowserRouter>
                <Loader.Provider value={[loader, setLoader]}>
                    <Routes>
                        <Route path='/' element={isUser ? <App /> : <Navigate to="/login" />} />
                        <Route path='/dashboard' element={isUser ? <Dashboard /> : <Navigate to="/login" />} />
                        <Route path='/clinic-expences' element={isUser ? <ClinicExpences /> : <Navigate to="/login" />} />
                        <Route path="/login" element={isUser ? <Navigate to="/" /> : <Login />} />
                    </Routes>
                </Loader.Provider>
            </BrowserRouter>
        </>
    )
}