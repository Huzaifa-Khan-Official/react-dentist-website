import React from 'react';
import { useForm } from "react-hook-form"

export default function AddClinicExpense() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => console.log(data);

    
    return (
        <div className='px-5 py-4'>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                Add Expense
            </button>

            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
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
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* register your input into the hook by invoking the "register" function */}
                                <input defaultValue="test" {...register("example")} />

                                {/* include validation with required or other standard HTML validation rules */}
                                <input {...register("exampleRequired", { required: true })} />
                                {/* errors will return when field validation fails  */}
                                {errors.exampleRequired && <span>This field is required</span>}

                                <input type="submit" />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary">
                                Add Expense
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
