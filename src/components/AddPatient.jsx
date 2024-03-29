import React, { useState } from 'react'
import Modal from './Modal'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { array, number, object, string } from 'yup'
import PreReceivedForm from './PreReceivedForm';



const addPatientValidation = object().shape(
  {
    name: string().required(<p className='mb-0 mt-1 text-danger'>Patient name is required.</p>),
    totalAmount: number().required(<p className='mb-0 mt-1 text-danger'>Total amount is required.</p>),
    workList: array().required("Please select atleast one treatment.")
  }
)

function AddPatient({ addPatientBtn, workList }) {
  let [isPreReceived, setIsPreReceived] = useState(false);


  return (
    <div>
      <Modal>
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={(e) => setIsPreReceived(e.target.checked)} checked={isPreReceived ? true : false}/>
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault" >Pre Received Amount?</label>
        </div>

        {
          isPreReceived ? <PreReceivedForm workList={workList} setIsPreReceived={setIsPreReceived}/> :
            <Formik
              validationSchema={addPatientValidation}
              initialValues={
                {
                  name: "",
                  workList: [],
                  totalAmount: "",
                }
              }

              onSubmit={(values, { resetForm }) => {
                addPatientBtn(values);
                resetForm();
              }}

            >
              <Form>
                <div className="inputDiv mt-3">
                  <label htmlFor="name" className='form-label'>Patient Name:</label>
                  <Field name="name" className="form-control" placeholder="Enter patient name..." />
                  <ErrorMessage name='name' />
                </div>
                <div className="inputDiv mt-3">
                  <label className='form-label'>Treatment List:</label>
                  <div role="group" aria-labelledby="checkbox-group" className='checkboxGroup'>
                    {
                      !workList.length ? <p className='mb-0'>No treatment list found!</p>
                        : workList.map((value) => {
                          return (
                            <label className="form-check-label" key={value.id}>
                              <Field type="checkbox" name="workList" value={value.work} className="form-check-input" />
                              {value.work}
                            </label>
                          )
                        })
                    }
                    <ErrorMessage name='workList' />
                  </div>
                </div>
                <div className="inputDiv mt-3">
                  <label htmlFor="totalAmount" className='form-label'>Total Amount:</label>
                  <Field type="number" name="totalAmount" className="form-control" placeholder="Enter total amount..." />
                  <ErrorMessage name='totalAmount' />
                </div>

                <div className="modal-footer mt-4">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary">
                    Add Patient
                  </button>
                </div>
              </Form>
            </Formik>
        }
      </Modal>
    </div>
  )
}

export default AddPatient