import React from 'react'
import Modal from './Modal'
import { Field, Form, Formik } from 'formik'

function AddAndpdatePatient({ addPatientBtn }) {
  return (
    <div>
      <Modal addPatientBtn={addPatientBtn}>

        <Formik
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
            </div>
            <div className="inputDiv mt-3">
              <div role="group" aria-labelledby="checkbox-group" className='checkboxGroup'>
                <label className="form-check-label">
                  <Field type="checkbox" name="workList" value="Work 1" className="form-check-input" />
                  Work 1
                </label>
                <label className="form-check-label">
                  <Field type="checkbox" name="workList" value="Work 2" className="form-check-input" />
                  Work 2
                </label>
                <label className="form-check-label">
                  <Field type="checkbox" name="workList" value="Work 3" className="form-check-input" />
                  Work 3
                </label>
              </div>
            </div>
            <div className="inputDiv mt-3">
              <label htmlFor="totalAmount" className='form-label'>Total Amount:</label>
              <Field type="number" name="totalAmount" className="form-control" />
            </div>


            <div className="modal-footer mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary" onClick={addPatientBtn}>
                {/* {isUpdate ? "Update" : "Add"}  */}
                Add Patient
              </button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>
  )
}

export default AddAndpdatePatient