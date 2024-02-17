import React from 'react'

export default function PreReceivedForm({ workList }) {
    return (
        <div>
            <div className="mb-3 mt-3">
                <label className='form-label'>
                    Patient Name:
                </label>
                <input type="text" className="form-control" placeholder="Enter patient name..." />
            </div>

            <div className="inputDiv mt-3">
                <label className='form-label'>Treatment List:</label>
                <div role="group" aria-labelledby="checkbox-group" className='checkboxGroup'>
                    {
                        !workList.length ? <p className='mb-0'>No treatment list found!</p>
                            : workList.map((value) => {
                                return (
                                    <label className="form-check-label" key={value.id}>
                                        <input type="checkbox" name="workList" value={value.work} className="form-check-input" />
                                        {value.work}
                                    </label>
                                )
                            })
                    }
                </div>
            </div>

            <div className="mt-3">
                <label className='form-label'>
                    Total Amount:
                </label>
                <input type="number" className='form-control'
                    placeholder="Enter total amount..."
                />
            </div>

            <div className="mt-3">
                <label className='form-label'>
                    Received Amount:
                </label>
                <input type="number" className='form-control'
                    placeholder="Enter received amount..."
                />
            </div>


            <div className="mt-3">
                <label className='form-label'>
                    Pre Received Amount:
                </label>
                <input type="number" className='form-control'
                    placeholder="Enter pre received amount..."
                />
            </div>

            <div className="mt-3">
                <label className='form-label'>
                    Balance Amount:
                </label>
                <input type="number" className='form-control'
                    placeholder="Enter balance amount..."
                />
            </div>

            <div className="modal-footer mt-4">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button className="btn btn-primary"
                >
                    Add Patient
                </button>
            </div>
        </div>
    )
}