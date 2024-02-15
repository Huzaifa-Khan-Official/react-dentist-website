import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase';
import moment from 'moment';

export default function MonthWiseTotal() {
    let [allData, setAllData] = useState([]);
    const time = new Date;

    useEffect(() => {

        const getYearData = () => {
            const year = moment(time).format("MMMM YYYY");
            const q = collection(db, year);

            let allData = [];
            onSnapshot(q, (data) => {
                data.docChanges().forEach((singleData) => {
                    allData.push(singleData.doc.data());
                });
            });

            setAllData(allData);
            return allData;
        }

        getYearData()
    }, [])

    return (
        <div style={{ padding: "0 30px", display: allData.length > 1 ? "block" : "none" }}>
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
                                                        <td className='tableData'>{v.date}</td>
                                                        <td className='tableData'>{v.total}</td>
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
