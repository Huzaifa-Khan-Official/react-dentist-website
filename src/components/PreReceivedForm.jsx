import { addDoc, collection } from 'firebase/firestore';
import moment from 'moment';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../config/firebase';
import { PatternFormat } from 'react-number-format';

export default function PreReceivedForm({ workList, setIsPreReceived }) {
    // State variables for form inputs and calculations
    const [patientName, setPatientName] = useState('');
    const [contactNo, setContactNo] = useState("");
    const [selectedTreatments, setSelectedTreatments] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [receivedAmount, setReceivedAmount] = useState(0);
    const [preReceivedAmount, setPreReceivedAmount] = useState(0);
    const [balanceAmount, setBalanceAmount] = useState(0);


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

    // Function to handle pre received amount change
    const handlePreReceivedAmountChange = (event) => {
        const preReceived = event.target.value;
        setPreReceivedAmount(preReceived);
        const balance = totalAmount - receivedAmount - preReceived;
        setBalanceAmount(balance);
    };

    // Function to handle form submission
    const handleFormSubmit = async () => {
        if (!patientName || !totalAmount || !receivedAmount || !preReceivedAmount || !balanceAmount || !selectedTreatments || !contactNo) {
            toast.error("Please fill all the fields!");
        } else {
            try {
                window.$('#exampleModal').modal('hide');
                setIsPreReceived(false);
                // toast.success("Patient added successfully!");

                // const patientsRef = collection(db, "preReceivedPatients");

                // const patientTime = moment(time).format('Do MMMM YYYY, h:mm:ss a');
                // const patientData = {
                //     name: patientName,
                //     contactNo: contactNo,
                //     workList: selectedTreatments,
                //     totalAmount: totalAmount,
                //     receivedAmount: receivedAmount,
                //     preReceivedAmount: preReceivedAmount,
                //     balanceAmount: balanceAmount,
                //     patientTime: patientTime,
                //     date: date  
                // }
                // await addDoc(patientsRef, patientData);

                // Here you can process the form submission, e.g., send data to backend
                // Reset form fields after submission if needed
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
                <PatternFormat className="form-control" format="03 (###) #######" allowEmptyFormatting mask="_" onChange={(e) => setContactNo(e.target.value)}  value={contactNo}/>
            </div>

            <div className="inputDiv mt-3">
                <label className='form-label'>Treatment List:</label>
                <div role="group" aria-labelledby="checkbox-group" className='checkboxGroup'>
                    {!workList.length ? (
                        <p className='mb-0'>No treatment list found!</p>
                    ) : (
                        workList.map((value) => (
                            <label className="form-check-label" key={value.id}>
                                <input
                                    type="checkbox"
                                    name="workList"
                                    value={value.work}
                                    className="form-check-input"
                                    onChange={handleCheckboxChange}
                                />
                                {value.work}
                            </label>
                        ))
                    )}
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
                    onChange={handlePreReceivedAmountChange}
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
                    Add Patient
                </button>
            </div>
        </div>
    );
}
