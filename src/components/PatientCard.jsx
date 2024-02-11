import { deleteDoc, doc } from 'firebase/firestore'
import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa6'
import { db } from '../config/firebase'
import { toast } from 'react-toastify'

function PatientCard({ patient, index, collectionName, uptatedPatient }) {


    const deletePatient = async (id) => {
        try {
            toast.success("Patient deleted successfully!");
            await deleteDoc(doc(db, collectionName, id));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <tr key={patient.id}>
            <th scope="row">{index + 1}</th>
            <td className='tableData'>{patient.name}</td>
            <td className='WLtableData'>{patient.workList.join(", ")}</td>
            <td className='tableData'>{patient.totalAmount}</td>
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
}

export default PatientCard