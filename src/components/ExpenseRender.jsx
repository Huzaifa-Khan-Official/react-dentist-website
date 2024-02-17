import React, { useEffect, useState } from 'react'

export default function ExpenseRender({ allData, isExpenseAdded }) {
    let [expenseTotal, setExpenseTotal] = useState(0);

    const getExpenseTotal = () => {
        setExpenseTotal(0);
        allData.map((v) => {
            setExpenseTotal(preValue => +preValue + +v.workerVage);
        })
    };

    useEffect(() => {
        getExpenseTotal()
    }, [allData]);

    return (
        <div className='px-lg-5 px-3'>
            {allData.length == 0 ? <h4>Expense Not found</h4> : (
                <div className="table-responsive" style={{ display: allData.length > 0 ? "block" : "none" }}>
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope='col' colSpan="3">Monthly Expense Total:</th>
                                <th>{expenseTotal}</th>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                                <th scope="col">S No.</th>
                                <th scope="col">Worker Detail</th>
                                <th scope="col">Total Amount</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                allData.map((v, i) => {
                                    return (
                                        <tr key={i}>
                                            <th scope="row">{i + 1}</th>
                                            <td className='workerNameData'>{v.workerName}</td>
                                            <td className='tableData'>{v.workerVage}</td>
                                            <td className='workerTimeData'>{v.time}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}