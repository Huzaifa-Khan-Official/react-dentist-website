import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { FaCirclePlus, FaTrash } from 'react-icons/fa6'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ToastContainer, toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';
import MonthWiseTotal from '../components/MonthWiseTotal';
import WorkListComponent from '../components/WorkListComponent';

export default function Dashboard() {
    let [addWork, setaddWork] = useState(false);
    let [uptWork, setUptWork] = useState(false);
    let [workValue, setworkValue] = useState("");
    let [uptWorkValue, setUpWorkValue] = useState("");
    let [uptWorkId, setUptWorkId] = useState("");
    let [workList, setworkList] = useState([]);

    useEffect(() => {
        const getWorks = async () => {
            try {
                const workListRef = collection(db, "workList");
                const q = query(workListRef, orderBy("time", "desc"));

                onSnapshot(q, (snapshot) => {
                    const workListArr = snapshot.docs.map((doc) => {
                        return {
                            id: doc.id,
                            ...doc.data()
                        };
                    });
                    setworkList(workListArr);
                    return workListArr;
                })

            } catch (error) {
                console.log(error.message);
            }
        }

        getWorks();
    }, [])

    const addWorkBtn = async () => {
        setaddWork(false);

        try {
            toast.success("Work added successfully!");

            const workListRef = collection(db, "workList");

            const time = new Date;
            const formatedTime = time.toLocaleString();

            const workData = {
                work: workValue,
                time: formatedTime
            }
            await addDoc(workListRef, workData);
        } catch (error) {
        }
        setworkValue("");
    };

    const uptWorkBtn = async () => {
        if (uptWorkValue == "") {
            toast.error("Couldn't update an empty input!.")
        } else {
            setUptWork(false);
            toast.success("Work updated successfully!")
            const workRef = doc(db, "workList", uptWorkId);

            const time = new Date;
            const formatedTime = time.toLocaleString();

            await updateDoc(workRef, {
                work: uptWorkValue,
                time: formatedTime
            });

        }
    }

    return (
        <div className='dashboardDiv'>
            <Navbar />
            <div className="headingDiv">
                <h1>Dashboard</h1>
            </div>
            <div className="workListDiv">
                <div className="workerListDiv">
                    <h3>
                        Clinic Workers:
                    </h3>

                    <div className="table-responsive" style={{ display: workList.length > 0 ? "block" : "none" }}>
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">S No.</th>
                                    <th scope="col">Worker Name</th>
                                    <th scope="col">Working Type</th>
                                    <th scope="col">Edit/Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Huzaifa</td>
                                    <td>Dentist</td>
                                    <td className='tableData'>
                                        <div className="iconsDiv">
                                            <FaTrash className='iconClass'
                                            />
                                            <FaEdit className='iconClass'

                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Huzaifa</td>
                                    <td>Dentist</td>
                                    <td className='tableData'>
                                        <div className="iconsDiv">
                                            <FaTrash className='iconClass'
                                            />
                                            <FaEdit className='iconClass'

                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Huzaifa</td>
                                    <td>Dentist</td>
                                    <td className='tableData'>
                                        <div className="iconsDiv">
                                            <FaTrash className='iconClass'
                                            />
                                            <FaEdit className='iconClass'

                                            />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>


                <WorkListComponent addWork={addWork} uptWork={uptWork} setaddWork={setaddWork} addWorkBtn={addWorkBtn} setUptWork={setUptWork} uptWorkBtn={uptWorkBtn} workValue={workValue} setworkValue={setworkValue} uptWorkValue={uptWorkValue} setUpWorkValue={setUpWorkValue} uptWorkId={uptWorkId} setUptWorkId={setUptWorkId} workList={workList} />

            </div>

            <MonthWiseTotal />
            <ToastContainer autoClose={1000} />
        </div>
    )
}