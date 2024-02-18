import React from 'react'

function UptPreRecPatientModal({ children }) {
    return (
        <>
            <div>

                <div
                    className="modal fade"
                    id="uptPreRecModal"
                    tabIndex={-1}
                    aria-labelledby="uptPreRecModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="uptPreRecModalLabel">
                                    Update Modal
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UptPreRecPatientModal;