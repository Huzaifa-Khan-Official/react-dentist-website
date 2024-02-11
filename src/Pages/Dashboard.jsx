import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { FaCirclePlus, FaTrash } from 'react-icons/fa6'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ToastContainer, toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';

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
                <h3>
                    Work List:
                    <span>
                        <button className="addWorkBtn"
                            style={{ display: addWork || uptWork ? "none" : "block" }}
                            onClick={() => setaddWork(true)}
                        >
                            Add Work
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
                                Add Work
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
                                Update Work
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


                <div className="table-responsive" style={{ display: workList.length > 0 ? "block" : "none" }}>
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
                                                    <FaEdit className='iconClass'
                                                        onClick={() => updateWork(value.id, value.work)}
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
            <ToastContainer autoClose={1000} />
        </div>
    )
}