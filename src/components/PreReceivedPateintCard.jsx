import { deleteDoc, doc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa6'
import { db } from '../config/firebase'
import { toast } from 'react-toastify'


export default function PreReceivedPateintCard({ patient, index, uptPreRecPatient }) {

    const deletePatient = async (id) => {
        try {
            await deleteDoc(doc(db, "preReceivedPatients", id));
            toast.success("Patient deleted successfully!");
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <tr key={patient.id}>
            <th scope="row">{index + 1}</th>
            <td className='workerNameData'>{patient.name}</td>
            <td className='workerNameData'>{patient.contactNo}</td>
            <td className='preReceivedDateData'>{patient.date}</td>
            <td className='WLtableData'>{patient.workList.join(", ")}</td>
            <td className='workerNameData'>{+patient.receivedAmount + +patient.preReceivedAmount}</td>
            <td className='workerNameData'>{patient.totalAmount}</td>
            <td className='workerNameData'>{patient.balanceAmount}</td>
            <td className='tableData'>
                <div className="iconsDiv">
                    <FaTrash className='iconClass' onClick={() => deletePatient(patient.id)} />
                    <FaEdit className='iconClass'
                        onClick={() => uptPreRecPatient(patient)}
                        data-bs-toggle="modal" data-bs-target="#uptPreRecModal"
                    />
                </div>
            </td>
        </tr>
    )
};