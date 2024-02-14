import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa6'
import { toast } from 'react-toastify';
import { db } from '../config/firebase';

export default function WorkerList() {
    let [addWorker, setAddWorker] = useState(false);
    let [uptWorker, setUptWorker] = useState(false);
    let [workerValue, setWorkerValue] = useState("");
    let [workerType, setWorkerType] = useState("");
    let [uptWorkerValue, setUptWorkerValue] = useState("");
    let [uptWorkerId, setUptWorkerId] = useState("");
    let [uptWorkerType, setUptWorkerType] = useState("");
    let [workerList, setWorkerList] = useState([]);


    useEffect(() => {
        const getWorks = async () => {
            try {
                const workerListRef = collection(db, "workerList");
                const q = query(workerListRef, orderBy("time", "desc"));

                onSnapshot(q, (snapshot) => {
                    const workerListArr = snapshot.docs.map((doc) => {
                        return {
                            id: doc.id,
                            ...doc.data()
                        };
                    });
                    setWorkerList(workerListArr);
                    return workerListArr;
                })

            } catch (error) {
                console.log(error.message);
            }
        }

        getWorks();
    }, [])


    const addWorkerBtn = async () => {
        setAddWorker(false);
        if (!(workerValue == "" || workerType == "")) {

            try {
                toast.success("Worker added successfully!");

                const workerListRef = collection(db, "workerList");

                const time = new Date;
                const formatedTime = moment(time).format("Do MMMM YYYY, h:mm:ss a");

                const workerData = {
                    worker: workerValue,
                    type: workerType,
                    time: formatedTime
                }
                await addDoc(workerListRef, workerData);
            } catch (error) {
            }
            setWorkerValue("");
            setWorkerType("");
        } else {
            toast.error("Please fill all input fields.")
        }
    };


    const AddWorkerInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            addWorkerBtn();
        }
    };

    const uptInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            uptWorkerBtn();
        }
    };

    const deleteWorker = async (id) => {
        toast.success("Work deleted successfully!");
        await deleteDoc(doc(db, "workerList", id));
    };


    const updateWorker = (id, worker, type) => {
        setUptWorker(true);
        setUptWorkerId(id);
        setUptWorkerValue(worker);
        setUptWorkerType(type);
    };


    const uptWorkerBtn = async () => {
        if (uptWorkerValue == "" || uptWorkerType == "") {
            toast.error("Couldn't update an empty input!.");
            setUptWorker(false);
        } else {
            setUptWorker(false);
            toast.success("Worker updated successfully!")
            const workerRef = doc(db, "workerList", uptWorkerId);

            const time = new Date;
            const formatedTime = moment(time).format("Do MMMM YYYY, h:mm:ss a");

            await updateDoc(workerRef, {
                worker: uptWorkerValue,
                type: uptWorkerType,
                time: formatedTime
            });
        }
    }

    return (
        <div className="workerListDiv">
            <h3>
                Clinic Workers:
                <span>
                    <button className="addWorkBtn"
                        style={{ display: addWorker || uptWorker ? "none" : "block" }}
                        onClick={() => setAddWorker(true)}
                    >
                        Add Worker
                    </button>


                    <div className="btnsDiv d-flex gap-2">
                        <button
                            className="addWorkBtn"
                            style={{ display: addWorker ? "block" : "none" }}
                            onClick={() => setAddWorker(false)}
                        >
                            X
                        </button>
                        <button
                            className="addWorkBtn"
                            style={{ display: addWorker ? "block" : "none" }}
                            onClick={addWorkerBtn}
                        >
                            Add Worker
                        </button>
                        <button
                            className="addWorkBtn"
                            style={{ display: uptWorker ? "block" : "none" }}
                            onClick={() => setUptWorker(false)}
                        >
                            X
                        </button>
                        <button
                            className="addWorkBtn"
                            style={{ display: uptWorker ? "block" : "none" }}
                            onClick={uptWorkerBtn}
                        >
                            Update Worker
                        </button>
                    </div>



                </span>
            </h3>


            <div className="workerInputDiv">
                <div className="workInputDiv mt-4 mb-4" style={{ display: addWorker ? "block" : "none" }}>
                    <div className='mb-3'>
                        <label className='form-label'>Worker Name:</label>
                        <input type="text" className='form-control' placeholder='Enter worker name...' value={workerValue} onChange={(e) => setWorkerValue(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Working Type:</label>
                        <input type="text" className='form-control' placeholder='Enter working type...' value={workerType} onChange={(e) => setWorkerType(e.target.value)}
                            onKeyUp={AddWorkerInputKeyPress}
                        />
                    </div>
                </div>
                <div className="workInputDiv mt-4 mb-4" style={{ display: uptWorker ? "block" : "none" }}>
                    <div className='mb-3'>
                        <input type="text" className='form-control' placeholder='Update work name...' value={uptWorkerValue} onChange={(e) => setUptWorkerValue(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Working Type:</label>
                        <input type="text" className='form-control' placeholder='Enter working type...' value={uptWorkerType} onChange={(e) => setUptWorkerType(e.target.value)}
                            onKeyUp={uptInputKeyPress}
                        />
                    </div>

                    <input type="text" value={uptWorkerId} style={{ display: "none" }} onChange={(e) => setUptWorkerId(e.target.value)} />
                </div>
            </div>

            <div className="workNotFoundDiv mt-4"
                style={{ display: workerList.length == 0 ? "block" : "none" }}
            >
                <h5>No worker is added yet.</h5>
            </div>

            <div className="table-responsive mt-4" style={{ display: workerList.length ? "block" : "none" }}>
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
                        {
                            workerList.map((v, i) => {
                                return (

                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{v.worker}</td>
                                        <td>{v.type}</td>
                                        <td className='tableData'>
                                            <div className="iconsDiv">
                                                <FaTrash className='iconClass' onClick={() => deleteWorker(v.id)}
                                                />
                                                <FaEdit className='iconClass'
                                                    onClick={() => updateWorker(v.id, v.worker, v.type)}
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