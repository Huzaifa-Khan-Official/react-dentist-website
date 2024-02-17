import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import AddClinicExpense from '../components/AddClinicExpense'
import { collection, doc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import ExpenseRender from '../components/ExpenseRender';

export default function ClinicExpences() {
    let [workerList, setWorkerList] = useState([]);
    let [allData, setAllData] = useState([]);
    let [daysArr, setDaysArr] = useState([]);
    let [isExpenseAdded, setIsExpenseAdded] = useState(false);



    const time = new Date;
    const date = moment(time).format("Do MMMM YYYY");
    const month = moment(time).format("MMMM YYYY");

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


    const getDays = () => {
        const q = collection(db, `${month}/`);

        onSnapshot(q, (snapshot) => {
            const daysList = snapshot.docs.map((doc) => {
                return doc.id
            });

            setDaysArr(daysList.reverse());
        })
    };


    const getAllData = async () => {
        let data = [];

        await Promise.all(
            daysArr.map(async (v) => {
                const patientsRef = collection(db, `${month}/${v}/dailyExpenseData/`);
                const q = query(patientsRef);

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    data.push({
                        id: doc.id,
                        date: v,
                        ...doc.data()
                    });
                });

            })

        );

        setAllData(data);
    };

    useEffect(() => {
        getWorkers();
        getDays();
    }, []);

    useEffect(() => {
        getAllData();
    }, [daysArr, isExpenseAdded]);

    return (
        <div>
            <Navbar />


            <AddClinicExpense workerList={workerList} setIsExpenseAdded={setIsExpenseAdded} isExpenseAdded={isExpenseAdded} />
            <ExpenseRender allData={allData} isExpenseAdded={isExpenseAdded}/>

            <ToastContainer autoClose={1500} />
        </div>
    )
}
