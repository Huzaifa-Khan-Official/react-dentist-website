import React, { useEffect, useState } from 'react';
import UpdateModal from './UpdateModal';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';

function UpdatePatient({ uptPatient, collectionName, workList, getAllData }) {
    let [patientName, setpatientName] = useState("");
    let [patientTA, setpatientTA] = useState(0);
    let [patientWL, setpatientWL] = useState([]);

    useEffect(() => {
        setpatientName(uptPatient?.name);
        setpatientTA(uptPatient?.totalAmount);
        setpatientWL(uptPatient?.workList || []);
    }, [uptPatient]);

    let workarr = ["Work 1", "Work 2", "Work 3"];

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setpatientWL(prevState => [...prevState, value]);
        } else {
            setpatientWL(prevState => prevState.filter(item => item !== value));
        }
    };

    const updatePatientfoo = async () => {
        window.$('#updateModal').modal('hide');
        if (!patientName || !patientTA) {
            toast.error("Can not update empty fields!")
            setpatientName(uptPatient?.name);
            setpatientTA(uptPatient?.totalAmount);
        } else {
            toast.success("Patient updated successfully!");
            const patientRef = doc(db, collectionName, uptPatient.id);

            const time = new Date;
            const patientTime = time.toLocaleString();

            await updateDoc(patientRef, {
                name: patientName,
                workList: patientWL,
                totalAmount: patientTA,
                patientTime: patientTime
            });
            setpatientName("");
            setpatientTA(0);
            getAllData();
        }
    };

    return (
        <div>
            <UpdateModal>
                <div className="inputDiv mt-3">
                    <label htmlFor="name" className='form-label'>Patient Name:</label>
                    <input type="text" className="form-control" value={patientName} onChange={(e) => setpatientName(e.target.value)} placeholder='Updated patient name...' />
                </div>
                <div className="inputDiv mt-3">
                    <label className='form-label'>Treatment List:</label>
                    <div role="group" aria-labelledby="checkbox-group" className='checkboxGroup'>
                        {
                            !workList.length ? <p className='mb-0'>Treatment list not found!</p> :
                                workList.map((singlework) => (
                                    <label className="form-check-label" key={singlework.id}>
                                        <input
                                            type="checkbox"
                                            name="workList"
                                            value={singlework.work}
                                            className="form-check-input updatecheckbox"
                                            checked={patientWL.includes(singlework.work)}
                                            onChange={handleCheckboxChange}
                                        />
                                        {singlework.work}
                                    </label>
                                ))}
                    </div>
                </div>
                <div className="inputDiv mt-3">
                    <label htmlFor="totalAmount" className='form-label'>Total Amount:</label>
                    <input type="number" className="form-control" value={patientTA} onChange={(e) => setpatientTA(e.target.value)} placeholder="Updated total amount..." />
                </div>
                <div className="modal-footer mt-4">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" onClick={updatePatientfoo}>
                        Update Patient
                    </button>
                </div>
            </UpdateModal>
        </div>
    );
}

export default UpdatePatient;
