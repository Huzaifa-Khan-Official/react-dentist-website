import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../config/firebase';
import moment from 'moment';
import Loader from '../Context/Context';

export default function MonthWiseTotal() {
    const [loader, setLoader] = useContext(Loader);

    let [allData, setAllData] = useState([]);
    let [daysArr, setDaysArr] = useState([]);

    const time = new Date;
    const date = moment(time).format("Do MMMM YYYY");
    const month = moment(time).format("MMMM YYYY");


    const getDays = () => {
        const q = collection(db, month);

        onSnapshot(q, (snapshot) => {
            const daysList = snapshot.docs.map((doc) => {
                if (doc.id != "total") {
                    return doc.id
                }
            });

            daysList.push(date);
            setDaysArr(daysList.reverse());
        })
    };

    const fetchData = async () => {

        const newData = [];


        await Promise.all(
            daysArr.map(async (v) => {
                const patientsRef = collection(db, `${month}/${v}/patients/`);
                const q = query(patientsRef, orderBy("patientTime"));

                const querySnapshot = await getDocs(q);
                let totalAmount = 0;
                querySnapshot.forEach((doc) => {
                    totalAmount += doc.data().totalAmount;
                });
                newData.push({ v, totalAmount });
                setAllData([...newData]);
            })

        );

        setAllData(newData);
    };

    useEffect(() => {
        fetchData();
        getDays();
    }, []);

    useEffect(() => {
        fetchData();
    }, [daysArr]);

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
                                                if (v.v) {
                                                    return (
                                                        <tr key={i}>
                                                            <th scope="row">{i + 1}</th>
                                                            <td className='monthWiseDate'>{v.v}</td>
                                                            <td className='tableData'>{v.totalAmount}</td>
                                                        </tr>

                                                    )
                                                }
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
