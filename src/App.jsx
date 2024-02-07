import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { db } from "./config/firebase"
import { addDoc, collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { IoSearchCircleSharp } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";
import AddPatient from './components/AddPatient';
import PatientCard from './components/PatientCard';
import PatientNotAdded from './components/PatientNotAdded';
import UpdatePatient from './components/UpdatePatient';
import UpdateModal from './components/UpdateModal';

function App() {
  const [patients, setPatients] = useState([]);
  let [uptPatient, setuptPatient] = useState("");


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

  const filteredPatients = (e) => {
    const value = e.target.value;

    const patientsRef = collection(db, date);
    const q = query(patientsRef, orderBy("patientTime", "desc"));

    onSnapshot(q, (snapshot) => {
      const patientLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });

      const filteredData = patientLists.filter((patient) => patient.name.toLowerCase().includes(value.toLowerCase()));

      setPatients(filteredData);
      return filteredData;
    })
  }

  const uptatedPatient = (patient) => {
    setuptPatient(patient);
  }

  return (
    <div>
      <Navbar />
      <UpdatePatient uptPatient={uptPatient} />
      <div className="headingDiv">
        <h1>Patient Details</h1>
      </div>
      <div className="searchDiv d-flex justify-content-center m-auto">
        <IoSearchCircleSharp className="searchIcon" />
        <input type="text" className='form-control searchInput' onChange={filteredPatients} />
        <button className="addPatientBtn" data-bs-toggle="modal"
          data-bs-target="#exampleModal">
          <FaCirclePlus className='addPatientIcon'
          />
        </button>
      </div>

      <AddPatient addPatientBtn={addPatientBtn} />
      <div className="contentDiv">
        {patients.length == 0 ? <PatientNotAdded /> : (
          <div className="table-responsive" style={{ display: patients.length > 0 ? "block" : "none" }}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">S No.</th>
                  <th scope="col">Patient Name</th>
                  <th scope="col">Work List</th>
                  <th scope="col">Total Amount</th>
                  <th scope="col">Edit/Delete</th>
                </tr>
              </thead>

              <tbody>
                {patients.map((patient, i) => {
                  return (
                    <PatientCard key={patient.id} patient={patient} index={i} collectionName={date} uptatedPatient={uptatedPatient} />
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default App