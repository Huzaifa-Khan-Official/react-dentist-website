import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { db } from "./config/firebase"
import { addDoc, collection, onSnapshot, query, orderBy, setDoc, doc, getDocs } from "firebase/firestore";
import { IoSearchCircleSharp } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";
import AddPatient from './components/AddPatient';
import PatientCard from './components/PatientCard';
import PatientNotAdded from './components/PatientNotAdded';
import UpdatePatient from './components/UpdatePatient';
import UpdateModal from './components/UpdateModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import PreReceivedDataRender from './components/PreReceivedDataRender';

function App() {
  const [patients, setPatients] = useState([]);
  let [uptPatient, setuptPatient] = useState("");
  let [collectionName, setcollectionName] = useState("");
  let [grandTotal, setgrandTotal] = useState(0);
  let [workList, setworkList] = useState([]);
  let [daysArr, setDaysArr] = useState([]);
  let [isDaysArr, setIsDaysArr] = useState(false);
  let [patientAdded, setPatientAdded] = useState(false);
  const [filtering, setFiltering] = useState(false);
  let [filteredArr, setFilteredArr] = useState([]);

  const time = new Date;
  const date = moment(time).format("Do MMMM YYYY");
  const month = moment(time).format("MMMM YYYY");

  const getDays = () => {
    const q = collection(db, `${month}/`);

    onSnapshot(q, (snapshot) => {
      const daysList = snapshot.docs.map((doc) => {
        return doc.id
      });

      setDaysArr(daysList.reverse());
    })
  }

  const addPatientBtn = async (patient) => {
    window.$('#exampleModal').modal('hide');
    try {
      toast.success("Patient added successfully!");

      const patientsRef = collection(db, `${month}/${date}/patients/`);

      const patientTime = time.toLocaleString();
      const patientData = {
        name: patient.name,
        workList: patient.workList,
        totalAmount: patient.totalAmount,
        patientTime: patientTime
      }
      await addDoc(patientsRef, patientData);
      setPatientAdded(!patientAdded);
    } catch (error) {
    }
  }

  const getWorks = async () => {
    try {
      const workListRef = collection(db, "workList");
      const q = query(workListRef, orderBy("time", "desc"));

      onSnapshot(q, (snapshot) => {
        const workListArr = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          };
        });
        setworkList(workListArr);
        return workListArr;
      })

    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {

    getWorks();

    getDays();

  }, []);

  useEffect(() => {
    getAllData();
  }, [daysArr, isDaysArr, patientAdded])

  useEffect(() => {
    setgrandTotal(0);
    patients.map((patient) => {
      setgrandTotal(preValue => +preValue + +patient.totalAmount);
    })
  }, [patients]);

  useEffect(() => {
    const daysTotalAmount = async () => {
      if (grandTotal > 0) {
        const date = moment(time).format("Do MMMM YYYY")
        await setDoc(doc(db, moment(time).format("MMMM YYYY"), date), {
          date: date,
          total: grandTotal
        });
      }
    }

    daysTotalAmount()
  }, [grandTotal])

  const uptatedPatient = (patient, collectionName) => {
    setuptPatient(patient);
    setcollectionName(collectionName);
  }

  const getAllData = async () => {

    if (daysArr) {
      setIsDaysArr(true);
    }

    let data = [];

    await Promise.all(
      daysArr.map(async (v) => {
        const patientsRef = collection(db, `${month}/${v}/patients/`);
        const q = query(patientsRef, orderBy("patientTime", "desc"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            date: v,
            ...doc.data()
          });
        });

      })

    );
    setPatients(data);
  };

  const filteredPatients = async (e) => {
    const value = e.target.value;
    if (!value) {
      setFiltering(false);
    } else {
      setFiltering(true);
    }

    let filteredData = [];

    await Promise.all(
      daysArr.map(async (v) => {
        const patientsRef = collection(db, `${month}/${v}/patients/`);
        const q = query(patientsRef, orderBy("patientTime", "desc"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const patientData = {
            id: doc.id,
            date: v,
            ...doc.data()
          };
          if (patientData.name.toLowerCase().includes(value.toLowerCase())) {
            filteredData.push(patientData);
          }
        });
      })
    );

    setFilteredArr(filteredData);
  };

  return (
    <div>
      <Navbar />
      <UpdatePatient uptPatient={uptPatient} collectionName={collectionName} workList={workList} getAllData={getAllData} />
      <div className="headingDiv">
        <h1>Patient Details</h1>
      </div>
      <div className="searchDiv d-flex justify-content-center m-auto">
        <IoSearchCircleSharp className="searchIcon" />
        <input type="text" className='form-control searchInput' placeholder='Search patient...' onChange={filteredPatients} />
        <button className="addPatientBtn" data-bs-toggle="modal"
          data-bs-target="#exampleModal">
          <FaCirclePlus className='addPatientIcon'
          />
        </button>
      </div>

      <AddPatient addPatientBtn={addPatientBtn} workList={workList} />
      <div className="contentDiv px-lg-5 px-3">
        {patients.length == 0 ? <PatientNotAdded /> : (
          <div className="table-responsive" style={{ display: patients.length > 0 ? "block" : "none" }}>
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope='col' colSpan={4}>Total Amount:</th>
                  <th>{grandTotal}</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th scope="col">S No.</th>
                  <th scope="col">Patient Name</th>
                  <th scope="col">Treatment List</th>
                  <th scope="col">Total Amount</th>
                  <th scope="col">Edit/Delete</th>
                </tr>
              </thead>

              <tbody>
                {
                  filtering ?
                    filteredArr.map((patient, i) => {
                      return (
                        <PatientCard key={patient.id} patient={patient} index={i} collectionName={`${month}/${patient.date}/patients/`} uptatedPatient={uptatedPatient} getAllData={getAllData} />
                      )
                    }) :
                    patients.map((patient, i) => {
                      return (
                        <PatientCard key={patient.id} patient={patient} index={i} collectionName={`${month}/${patient.date}/patients/`} uptatedPatient={uptatedPatient} getAllData={getAllData} />
                      )
                    })
                }
              </tbody>
            </table>
          </div>
        )}
      </div>
      <PreReceivedDataRender />
      <ToastContainer autoClose={1000} />
    </div>
  )
}

export default App