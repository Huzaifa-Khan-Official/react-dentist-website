import React, { useEffect, useState } from 'react';
import UpdateModal from './UpdateModal';

function UpdatePatient({ uptPatient }) {
    let patientworklist = uptPatient?.workList || [];
    let workarr = ["Work 1", "Work 2", "Work 3"];

    return (
        <div>
            <UpdateModal>
                <div className="inputDiv mt-3">
                    <label htmlFor="name" className='form-label'>Patient Name:</label>
                    <input type="text" className="form-control" value={uptPatient.name} />
                </div>
                <div className="inputDiv mt-3">
                    <div role="group" aria-labelledby="checkbox-group" className='checkboxGroup'>
                        {/* Check if patientworklist is defined before mapping over it */}
                        {workarr.map((singlework, index) => (
                            <label className="form-check-label" key={index}>
                                <input
                                    type="checkbox"
                                    name="workList"
                                    value={singlework}
                                    className="form-check-input"
                                    checked={patientworklist.includes(singlework)}
                                />
                                {singlework}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="inputDiv mt-3">
                    <label htmlFor="totalAmount" className='form-label'>Total Amount:</label>
                    <input type="number" className="form-control" value={uptPatient.totalAmount} />
                </div>
                <div className="modal-footer mt-4">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary">
                        Update Patient
                    </button>
                </div>
            </UpdateModal>
        </div>
    );
}

export default UpdatePatient;