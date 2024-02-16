import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import { db } from '../config/firebase';
import moment from 'moment';

export default function AddClinicExpense({ workerList, setAddExpense }) {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            workerName: 'byDefault',
            workerVage: ''
        }
    });

    const time = new Date;


    const addClinicExpense = async (data) => {
        window.$('#addClinicExpenseModal').modal('hide');
        try {
            toast.success("Expense added successfully!");

            const date = moment(time).format("Do MMMM YYYY");
            const month = moment(time).format("MMMM YYYY");


            const formatedTime = moment(time).format("Do MMMM YYYY, h:mm:ss a");

            await updateDoc(doc(db, month, date), {
                dailyExpenseData: {
                    workerName: data.workerName,
                    workerVage: data.workerVage,
                    time: formatedTime
                }
            });       
        } catch (error) {
            toast.error("Something went wrong. Please try later!");
        }
        reset();
    }

    return (
        <div className='px-5 py-4'>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#addClinicExpenseModal"
            >
                Add Expense
            </button>

            <div
                className="modal fade"
                id="addClinicExpenseModal"
                tabIndex={-1}
                aria-labelledby="addClinicExpenseModal"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addClinicExpenseModal">
                                Add Expense
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit(addClinicExpense)}>


                                <div className="mb-3">
                                    <label className='form-label'>Select Worker:</label>
                                    <select className="form-select" aria-label="Default select example"
                                        {
                                        ...register("workerName", { required: true })
                                        }
                                    >
                                        <option disabled value={"byDefault"}>Open this select menu</option>
                                        {
                                            workerList.map((v) => {
                                                const workerDetail = `${v.worker} / ${v.type}`;
                                                return (
                                                    <option value={workerDetail} key={v.id}>{v.worker} / {v.type}</option>
                                                )
                                            })
                                        }
                                    </select>

                                    {errors.workerName && <span>This field is required</span>}
                                </div>

                                <div className="mb-3">
                                    <label className='form-label'>Amount:</label>
                                    <input type="text" className='form-control'
                                        placeholder='Enter daily vage of worker...'
                                        {
                                        ...register("workerVage", { required: true })
                                        }
                                    />
                                    {errors.workerVage && <p className='errorPara'>This field is required</p>}
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Add Expense
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
