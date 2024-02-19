import UptPreRecPatientModal from './UptPreRecPatientModal'
import { doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../config/firebase';
import moment from 'moment';
import { PatternFormat } from 'react-number-format';

export default function UptPreRecPatient({ updatePatient, workList }) {
    // State variables for form inputs and calculations
    const [patientName, setPatientName] = useState('');
    const [contactNo, setContactNo] = useState("");
    const [selectedTreatments, setSelectedTreatments] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [receivedAmount, setReceivedAmount] = useState(0);
    const [preReceivedAmount, setPreReceivedAmount] = useState(0);
    const [balanceAmount, setBalanceAmount] = useState(0);


    useEffect(() => {
        setPatientName(updatePatient?.name);
        setTotalAmount(updatePatient?.totalAmount);
        setContactNo(updatePatient?.contactNo);
        const preReceivedAmount = parseFloat(updatePatient?.preReceivedAmount);
        const receivedAmount = parseFloat(updatePatient?.receivedAmount)
        setPreReceivedAmount(preReceivedAmount + receivedAmount);
        setBalanceAmount(updatePatient?.balanceAmount);
        setSelectedTreatments(updatePatient?.workList || []);
    }, [updatePatient]);


    const time = new Date;
    const date = moment(time).format("Do MMMM YYYY");
    const month = moment(time).format("MMMM YYYY");

    // Function to handle checkbox change
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedTreatments([...selectedTreatments, value]);
        } else {
            setSelectedTreatments(selectedTreatments.filter(item => item !== value));
        }
    };

    // Function to handle received amount change
    const handleReceivedAmountChange = (event) => {
        const received = event.target.value;
        setReceivedAmount(received);
        const balance = totalAmount - received - preReceivedAmount;
        setBalanceAmount(balance);
    };

    // Function to handle form submission
    const handleFormSubmit = async () => {
        if (!patientName || !totalAmount || !receivedAmount || !preReceivedAmount || !selectedTreatments || !contactNo) {
            toast.error("Please fill all the fields!");
        } else {
            try {
                window.$('#uptPreRecModal').modal('hide');
                toast.success("Patient updated successfully!");

                const patientRef = doc(db, "preReceivedPatients", updatePatient.id);

                await updateDoc(patientRef, {
                    name: patientName,
                    contactNo: contactNo,
                    workList: selectedTreatments,
                    totalAmount: totalAmount,
                    receivedAmount: receivedAmount,
                    preReceivedAmount: preReceivedAmount,
                    balanceAmount: balanceAmount,
                });

                setPatientName('');
                setSelectedTreatments([]);
                setTotalAmount(0);
                setReceivedAmount(0);
                setPreReceivedAmount(0);
                setBalanceAmount(0);
            } catch (error) {
                toast.error("Something went wrong. Please try later!");
            }
        }

    };



    return (
        <div>
            <UptPreRecPatientModal>
                <div>
                    <div className="mb-3 mt-3">
                        <label className='form-label'>
                            Patient Name:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter patient name..."
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className='form-label'>
                            Contact No.
                        </label>
                        <PatternFormat className="form-control" format="03 (###) #######" allowEmptyFormatting mask="_" onChange={(e) => setContactNo(e.target.value)} value={contactNo} />
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
                                                checked={selectedTreatments.includes(singlework.work)}
                                                onChange={handleCheckboxChange}
                                            />
                                            {singlework.work}
                                        </label>
                                    ))
                            }
                        </div>
                    </div>

                    <div className="mt-3">
                        <label className='form-label'>
                            Total Amount:
                        </label>
                        <input
                            type="number"
                            className='form-control'
                            placeholder="Enter total amount..."
                            value={totalAmount}
                            onChange={(e) => setTotalAmount(e.target.value)}
                        />
                    </div>

                    <div className="mt-3">
                        <label className='form-label'>
                            Received Amount:
                        </label>
                        <input
                            type="number"
                            className='form-control'
                            placeholder="Enter received amount..."
                            value={receivedAmount}
                            onChange={handleReceivedAmountChange}
                        />
                    </div>

                    <div className="mt-3">
                        <label className='form-label'>
                            Pre Received Amount:
                        </label>
                        <input
                            type="number"
                            className='form-control'
                            placeholder="Enter pre received amount..."
                            value={preReceivedAmount}
                            readOnly
                        />
                    </div>

                    <div className="mt-3">
                        <label className='form-label'>
                            Balance Amount:
                        </label>
                        <input
                            type="number"
                            className='form-control'
                            placeholder="Enter balance amount..."
                            value={balanceAmount}
                            readOnly
                        />
                    </div>

                    <div className="modal-footer mt-4">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button className="btn btn-primary" onClick={handleFormSubmit}>
                            Update Patient
                        </button>
                    </div>
                </div>
            </UptPreRecPatientModal>
        </div>
    )
}
