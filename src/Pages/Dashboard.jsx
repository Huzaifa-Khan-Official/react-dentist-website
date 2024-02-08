import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { FaCirclePlus } from 'react-icons/fa6'
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ToastContainer, toast } from 'react-toastify';

export default function Dashboard() {
    let [addWork, setaddWork] = useState(false);
    let [workValue, setworkValue] = useState("");
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
                            style={{ display: addWork ? "none" : "block" }}
                            onClick={() => setaddWork(true)}
                        >
                            Add Work
                        </button>
                        <button
                            className="addWorkBtn"
                            style={{ display: addWork ? "block" : "none" }}
                            onClick={addWorkBtn}
                        >
                            Add Work
                        </button>
                    </span>
                </h3>
                <div className="workInputDiv mt-4 mb-4 w-50" style={{ display: addWork ? "block" : "none" }}>
                    <input type="text" className='form-control' placeholder='Enter work here...' value={workValue} onChange={(e) => setworkValue(e.target.value)}
                        onKeyUp={AddInputKeyPress}
                    />
                </div>
                <div className="workNotFoundDiv mt-4"
                    style={{ display: workList.length == 0 ? "block" : "none" }}
                >
                    <h3>No work is added yet.</h3>
                </div>
                <ol className='workList'>
                    {
                        workList.map((value) => {
                            return (
                                <li key={value.id}>
                                    {value.work}
                                </li>
                            )
                        })

                    }
                </ol>
            </div>
            <ToastContainer autoClose={2000} />
        </div>
    )
}