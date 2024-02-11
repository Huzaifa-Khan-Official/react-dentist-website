import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { db } from '../config/firebase';
import moment from 'moment';

export default function MonthWiseTotal() {
    const time = new Date;

    useEffect(() => {

        const getYearData = () => {
            const year = moment(time).format("YYYY");
            const q = collection(db, year);

            onSnapshot(q, (snapshot) => {
                const allData = snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                });

                console.log(allData);
            })
        }

        getYearData()
    }, [])

    return (
        <div style={{ padding: "0 20px" }}>
            <h1>2024</h1>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                        >
                            February
                        </button>
                    </h2>
                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            Hello
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
