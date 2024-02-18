import { deleteDoc, doc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa6'
import { db } from '../config/firebase'
import { toast } from 'react-toastify'


export default function PreReceivedPateintCard({ patient, index, collectionName, uptatedPatient, getAllData }) {
    
    const deletePatient = async (id) => {
        try {
            await deleteDoc(doc(db, collectionName, id));
            toast.success("Patient deleted successfully!");
            getAllData();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <tr key={patient.id}>
            <th scope="row">{index + 1}</th>
            <td className='workerNameData'>{patient.name}</td>
            <td className='workerNameData'>{patient.contactNo}</td>
            <td className='workerTimeData'>{patient.date}</td>
            <td className='WLtableData'>{patient.workList.join(", ")}</td>
            <td className='workerNameData'>{+patient.receivedAmount + +patient.preReceivedAmount}</td>
            <td className='workerNameData'>{patient.totalAmount}</td>
            <td className='workerNameData'>{patient.balanceAmount}</td>
            <td className='tableData'>
                <div className="iconsDiv">
                    <FaTrash className='iconClass' onClick={() => deletePatient(patient.id)} />
                    <FaEdit className='iconClass' onClick={() => uptatedPatient(patient, collectionName)}
                        data-bs-toggle="modal" data-bs-target="#updateModal"
                    />
                </div>
            </td>
        </tr>
    )
};