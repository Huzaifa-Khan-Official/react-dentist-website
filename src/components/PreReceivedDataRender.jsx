import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../config/firebase';
import { IoSearchCircleSharp } from 'react-icons/io5';
import PatientNotAdded from './PatientNotAdded';
import PreReceivedPateintCard from './PreReceivedPateintCard';

export default function PreReceivedDataRender() {
    const [preReceivedData, setPreReceivedData] = useState([]);


    const getPreReceivedPatientData = () => {
        try {
            const preReceivedCollection = collection(db, "preReceivedPatients");

            const q = query(preReceivedCollection, orderBy("patientTime"));


            onSnapshot(q, (snapshot) => {
                const preRecPatientList = snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                })

                setPreReceivedData(preRecPatientList.reverse());
            })
        } catch (error) {
            toast.error("Something went wrong. Please try later!");
        }
    };

    const filterPreReceivedPatientData = (e) => {
        const value = e.target.value;

        const preReceivedCollection = collection(db, "preReceivedPatients");

        const q = query(preReceivedCollection, orderBy("patientTime"));


        onSnapshot(q, (snapshot) => {
            const preRecPatientList = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })

            const filteredPreReceivedPatient = preRecPatientList.filter((patient) => patient.name.toLowerCase().includes(value.toLowerCase()));


            setPreReceivedData(filteredPreReceivedPatient.reverse());
        })
    }

    useEffect(() => {
        getPreReceivedPatientData();
    }, []);

    return (
        <div className='px-lg-5 px-4 py-4'>
            <h1>Pre Received Patient Details:</h1>

            <div className="searchDiv d-flex justify-content-center m-auto mt-4">
                <IoSearchCircleSharp className="searchIcon" />
                <input type="text" className='form-control searchInput me-5' placeholder='Search patient...'
                    onChange={filterPreReceivedPatientData}
                />
            </div>


            <div className="contentDiv px-3">
                {preReceivedData.length == 0 ? <PatientNotAdded /> : (
                    <div className="table-responsive" style={{ display: preReceivedData.length > 0 ? "block" : "none" }}>
                        <table className="table table-hover table-bordered">
                            {/* <thead>
                                <tr>
                                    <th scope='col' colSpan={4}>Total Amount:</th>
                                    <th>{grandTotal}</th>
                                </tr>
                            </thead> */}
                            <thead>
                                <tr>
                                    <th scope="col">S No.</th>
                                    <th scope="col">Patient Name</th>
                                    <th scope="col">Contact No.</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Treatment List</th>
                                    <th scope="col">Received Amount</th>
                                    <th scope="col">Total Amount</th>
                                    <th scope="col">Balance Amount</th>
                                    <th scope="col">Edit/Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    preReceivedData.map((patient, i) => {
                                        return (
                                            <PreReceivedPateintCard key={patient.id} patient={patient} index={i} />
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}