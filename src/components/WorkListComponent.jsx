import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa6'
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';

export default function WorkListComponent({ addWork, uptWork, setaddWork, addWorkBtn, setUptWork, uptWorkBtn, workValue, setworkValue, uptWorkValue, setUpWorkValue, uptWorkId, setUptWorkId, workList }) {

    const AddInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            addWorkBtn();
        }
    };

    const uptInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            uptWorkBtn();
        }
    };

    const deleteWork = async (id) => {
        toast.success("Work deleted successfully!");
        await deleteDoc(doc(db, "workList", id));
    }

    const updateWork = (id, workValue) => {
        setUptWork(true);
        setUptWorkId(id)
        setUpWorkValue(workValue);
    }


    return (

        <div className="treatmentListDiv mt-4">
            <h3>
                Treatment List:
                <span>
                    <button className="addWorkBtn"
                        style={{ display: addWork || uptWork ? "none" : "block" }}
                        onClick={() => setaddWork(true)}
                    >
                        Add Treatment
                    </button>
                    <div className="btnsDiv d-flex gap-2">
                        <button
                            className="addWorkBtn"
                            style={{ display: addWork ? "block" : "none" }}
                            onClick={() => setaddWork(false)}
                        >
                            X
                        </button>
                        <button
                            className="addWorkBtn"
                            style={{ display: addWork ? "block" : "none" }}
                            onClick={addWorkBtn}
                        >
                            Add Treatment
                        </button>
                        <button
                            className="addWorkBtn"
                            style={{ display: uptWork ? "block" : "none" }}
                            onClick={() => setUptWork(false)}
                        >
                            X
                        </button>
                        <button
                            className="addWorkBtn"
                            style={{ display: uptWork ? "block" : "none" }}
                            onClick={uptWorkBtn}
                        >
                            Update Treatment
                        </button>
                    </div>
                </span>
            </h3>
            <div className="workInputDiv mt-4 mb-4" style={{ display: addWork ? "block" : "none" }}>
                <input type="text" className='form-control' placeholder='Enter work here...' value={workValue} onChange={(e) => setworkValue(e.target.value)}
                    onKeyUp={AddInputKeyPress}
                />
            </div>
            <div className="workInputDiv mt-4 mb-4" style={{ display: uptWork ? "block" : "none" }}>
                <input type="text" className='form-control' placeholder='Update work here...' value={uptWorkValue} onChange={(e) => setUpWorkValue(e.target.value)}
                    onKeyUp={uptInputKeyPress}
                />
                <input type="text" value={uptWorkId} style={{ display: "none" }} onChange={(e) => setUptWorkId(e.target.value)} />
            </div>
            <div className="workNotFoundDiv mt-4"
                style={{ display: workList.length == 0 ? "block" : "none" }}
            >
                <h3>No work is added yet.</h3>
            </div>


            <div className="table-responsive mt-4" style={{ display: workList.length > 0 ? "block" : "none" }}>
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">S No.</th>
                            <th scope="col">Treatment Name</th>
                            <th scope="col">Edit/Delete</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            workList.map((value, i) => {
                                return (
                                    <tr key={value.id}>
                                        <th scope="row">{i + 1}</th>
                                        <td>
                                            {value.work}
                                        </td>
                                        <td className='tableData'>
                                            <div className="iconsDiv">
                                                <FaTrash className='iconClass' onClick={() => deleteWork(value.id)}
                                                />
                                                <FaEdit className='iconClass' onClick={() => updateWork(value.id, value.work)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
