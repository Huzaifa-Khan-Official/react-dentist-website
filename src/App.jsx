import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { db } from "./config/firebase"
import { collection, onSnapshot } from "firebase/firestore";
import { IoSearchCircleSharp } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";

function App() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const getPatients = async () => {
      try {

        const patientsRef = collection(db, "/patientDetails");

        await onSnapshot(patientsRef, (snapshot) => {
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

  console.log(patients);


  return (
    <div>
      <Navbar />
      <div className="headingDiv">
        <h1>Patient Details</h1>
      </div>
      <div className="searchDiv d-flex justify-content-center m-auto">
        <IoSearchCircleSharp className="searchIcon" />
        <input type="text" className='form-control searchInput' />
        <button className="addPatientBtn">
          <FaCirclePlus className='addPatientIcon' />
        </button>
      </div>

      <div className="contentDiv">
        {/* <div className="table-responsive"> */}
          {patients.map((patient) => {
            <div key={patient.id}>Hello</div>

          })}
        {/* </div> */}
      </div>
    </div>
  )
}

export default App