import { deleteDoc, doc } from 'firebase/firestore'
import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa6'
import { db } from '../config/firebase'
import UpdatePatient from './UpdatePatient'

function PatientCard({ patient, index, collectionName, uptatedPatient }) {


    const deletePatient = async (id) => {
        try {
            await deleteDoc(doc(db, collectionName, id));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <tr key={patient.id}>
            <th scope="row">{index + 1}</th>
            <td>{patient.name}</td>
            <td>{patient.workList.join(", ")}</td>
            <td>{patient.totalAmount}</td>
            <td>
                <div className="iconsDiv">
                    <FaTrash className='iconClass' onClick={() => deletePatient(patient.id)} />
                    <FaEdit className='iconClass' onClick={() => uptatedPatient(patient)} 
                    data-bs-toggle="modal" data-bs-target="#updateModal"     
                    />
                </div>
            </td>
        </tr>
    )
}

export default PatientCard