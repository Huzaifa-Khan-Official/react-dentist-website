import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import AddClinicExpense from '../components/AddClinicExpense'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';

export default function ClinicExpences() {
    let [workerList, setWorkerList] = useState([]);
    let [allData, setAllData] = useState([]);
    const time = new Date;
    const date = moment(time).format("Do MMMM YYYY");
    const month = moment(time).format("MMMM YYYY");

    useEffect(() => {
        const getWorkers = async () => {
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
                toast.error(error.message);
            }
        };

        const getDailyExpense = () => {
            try {
                const  q = collection(db, month);

                const allData = [];
                onSnapshot(q, (data) => {
                    data.docChanges().forEach((singleData) => {
                        const data = singleData.doc.data().dailyExpenseData;
                        if (data) {
                            allData.push(data);
                        }
                    });
                });
                setAllData(allData);
                return allData;

            } catch (error) {
                toast.error(error.message);
            }
        }

        getDailyExpense();

        getWorkers();
    }, []);


    console.log(allData);
    return (
        <div>
            <Navbar />


            <AddClinicExpense workerList={workerList} />

            <ToastContainer autoClose={1500} />
        </div>
    )
}
