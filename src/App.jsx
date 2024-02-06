import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { db } from "./config/firebase"
import { addDoc, collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { IoSearchCircleSharp } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";
import Modal from './components/Modal';
import AddAndpdatePatient from './components/AddAndpdatePatient';

function App() {
  const [patients, setPatients] = useState([]);


  const time = new Date;
  const date = time.toLocaleDateString().replace(/\//g, "-");

  const addPatientBtn = async (patient) => {
    window.$('#exampleModal').modal('hide');
    try {
      const patientsRef = collection(db, date);

      const patientTime = time.toLocaleString();
      const patientData = {
        name: patient.name,
        workList: patient.workList,
        totalAmount: patient.totalAmount,
        patientTime: patientTime
      }

      await addDoc(patientsRef, patientData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const getPatients = async () => {
      try {

        const patientsRef = collection(db, date);
        const q = query(patientsRef, orderBy("patientTime", "desc"));

        onSnapshot(q, (snapshot) => {
          const patientLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            };
          });
          setPatients(patientLists);
          return patientLists;
        })

      } catch (error) {
        console.log(error.message);
      }
    };

    getPatients();
  }, [])


  return (
    <div>
      <Navbar />
      <div className="headingDiv">
        <h1>Patient Details</h1>
      </div>
      <div className="searchDiv d-flex justify-content-center m-auto">
        <IoSearchCircleSharp className="searchIcon" />
        <input type="text" className='form-control searchInput' />
        <button className="addPatientBtn" data-bs-toggle="modal"
          data-bs-target="#exampleModal">
          <FaCirclePlus className='addPatientIcon'
          />
        </button>
      </div>

      <AddAndpdatePatient addPatientBtn={addPatientBtn} />
      <div className="contentDiv">
        <div className="table-responsive" style={{ display: patients.length > 0 ? "block" : "none" }}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">S No.</th>
                <th scope="col">Patient Name</th>
                <th scope="col">Work List</th>
                <th scope="col">Total Amount</th>
              </tr>
            </thead>

            <tbody>
              {patients.map((patient, i) => {
                return (
                  <tr key={patient.id}>
                    <th scope="row">{i + 1}</th>
                    <td>{patient.name}</td>
                    <td>{patient.workList.join(", ")}</td>
                    <td>{patient.totalAmount}</td>
                  </tr>
                )
              })}
            </tbody>

          </table>

        </div>
      </div>
    </div>
  )
}

export default App