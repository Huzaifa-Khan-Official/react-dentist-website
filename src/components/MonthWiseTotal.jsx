import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase';
import moment from 'moment';

export default function MonthWiseTotal() {
    let [allData, setAllData] = useState([]);
    const time = new Date;

    // useEffect(() => {

    //     const getYearData = () => {
    //         const month = moment(time).format("MMMM YYYY");
    //         const q = collection(db, month);

    //         let allData = [];
    //         onSnapshot(q, (data) => {
    //             data.docChanges().forEach((singleData) => {
    //                 const date = singleData.doc.id;
    //                 const q = query(collection(db, `${month}/${date}/patients`), orderBy("patientTime"));
    //                 const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //                     querySnapshot.forEach((doc) => {
    //                         console.log(doc.data().totalAmount);
    //                         console.log(date);
    //                         // allData.push(doc.data());
    //                     });
    //                 });

    //                 // allData.push(singleData.doc.data());
    //             });

    //             // const dayList = data.docs.map((doc) => {
    //             //     console.log(doc.id);
    //             // })
    //         });

    //         setAllData(allData);
    //         return allData;
    //     }

    //     getYearData()
    // }, [])


    useEffect(() => {
        const fetchData = async () => {
            const month = moment().format("MMMM YYYY");
            const q = collection(db, month);

            const newData = [];

            const unsubscribeSnapshot = onSnapshot(q, (data) => {
                data.docChanges().forEach(async (singleData) => {
                    const date = singleData.doc.id;
                    if (!(date == "total")) {
                        const patientsQ = query(collection(db, `${month}/${date}/patients`), orderBy("patientTime"));
                        const unsubscribePatients = onSnapshot(patientsQ, (querySnapshot) => {
                            let totalAmount = 0;
                            querySnapshot.forEach((doc) => {
                                totalAmount += doc.data().totalAmount;
                            });
                            newData.push({ date, totalAmount });
                            setAllData([...newData]); // Update state here or after the loop finishes
                        });
                    }

                });
            });
            setAllData(newData);
        };

        fetchData();
    }, []);

    return (
        <div className='px-md-5 px-4' style={{ display: allData.length > 1 ? "block" : "none" }}>
            <h1>
                {moment(time).format("YYYY")}
            </h1>
            <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseOne"
                            aria-expanded="true"
                            aria-controls="panelsStayOpen-collapseOne"
                        >
                            {moment(time).format("MMMM YYYY")}
                        </button>
                    </h2>
                    <div
                        id="panelsStayOpen-collapseOne"
                        className="accordion-collapse collapse show"
                    >
                        <div className="accordion-body">
                            <div className="table-responsive" style={{ display: allData.length > 0 ? "block" : "none" }}>
                                <table className="table table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">S. No.</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Total Amount</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            allData.map((v, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <th scope="row">{i + 1}</th>
                                                        <td className='monthWiseDate'>{v.date}</td>
                                                        <td className='tableData'>{v.totalAmount}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
