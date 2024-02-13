import React from 'react'
import Modal from './Modal'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { array, number, object, string } from 'yup'

const addPatientValidation = object().shape(
  {
    name: string().required("Patient name is required."),
    totalAmount: number().required("Total amount is required."),
    workList: array().required("Please select atleast one treatment.")
  }
)

function AddPatient({ addPatientBtn, workList }) {
  return (
    <div>
      <Modal>
        <Formik
          validationSchema={addPatientValidation}
          initialValues={{
            name: "",
            workList: [],
            totalAmount: ""
          }}

          onSubmit={(values, { resetForm }) => {
            addPatientBtn(values);
            resetForm();
          }}

        >
          <Form>
            <div className="inputDiv mt-3">
              <label htmlFor="name" className='form-label'>Patient Name:</label>
              <Field name="name" className="form-control" />
              <ErrorMessage name='name'/>
            </div>
            <div className="inputDiv mt-3">
              <label className='form-label'>Treatment List:</label>
              <div role="group" aria-labelledby="checkbox-group" className='checkboxGroup'>
                {
                  workList.map((value) => {
                    return (
                      <label className="form-check-label" key={value.id}>
                        <Field type="checkbox" name="workList" value={value.work} className="form-check-input" />
                        {value.work}
                      </label>
                    )
                  })
                }
                <ErrorMessage name='workList'/>
              </div>
            </div>
            <div className="inputDiv mt-3">
              <label htmlFor="totalAmount" className='form-label'>Total Amount:</label>
              <Field type="number" name="totalAmount" className="form-control" />
              <ErrorMessage name='totalAmount'/>
            </div>


            <div className="modal-footer mt-4">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary">
                Add Patient
              </button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>
  )
}

export default AddPatient