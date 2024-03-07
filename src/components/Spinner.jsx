import React, { useContext, useState } from 'react'
import Loader from '../Context/Context';

export default function Spinner() {
    const [loader, setLoader] = useContext(Loader);

    if(loader) {
        document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    } else {
        document.getElementsByTagName("body")[0].style.overflowY = "scroll";
    }

    return (
        <div style={{display: loader ? "flex" : "none"}} className='spinnerDiv justify-content-center align-items-center'>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}