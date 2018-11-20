import React from 'react';
import '../DashboardDeleteAttorneyMenu.scss';

class DashboardDeleteAttorneyStep3 extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { searchFields, attorneyListLoading ,PatientList, selectedAttorney, isReplaceConfirm, selectedReplaceAttorney} = this.props;       

        return (
            <div className='add-attorney-step2-wrapper'>
            {!isReplaceConfirm &&
                <div>
                    <div className='headerdiv'>
                        Attorney selected for delete: {selectedAttorney.AttFirstName+' '+ selectedAttorney.AttLastName }              
                    </div>
                    <div className='headerdiv'>
                        All patients related to {selectedAttorney.AttName}
                    </div>
                </div>
            }
            {isReplaceConfirm &&
                <div>
                    <div className='headerdiv'>
                        Attorney selected for delete: {selectedAttorney.AttFirstName+' '+ selectedAttorney.AttLastName }              
                    </div>
                    <div className='headerdiv'>
                        Attorney selected for replace: {selectedReplaceAttorney.AttFirstName+' '+ selectedReplaceAttorney.AttLastName } 
                    </div>
                    <div className='headerdiv'>
                        All patients related to {selectedReplaceAttorney.AttFirstName+' '+ selectedReplaceAttorney.AttLastName } 
                    </div>
                </div>
            }
                <div className='delete-attorney_table-wrapper'>
                    <table className='delete-attorney_table'>
                        <thead className='delete-attorney_table-row' >
                            <tr>
                                <th className='delete-attorney_table-head'>Patient Id</th>
                                <th className='delete-attorney_table-head'>Patient Name</th>
                                {/* <th className='delete-attorney_table-head'>Referred By</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {attorneyListLoading &&
                            <tr>
                                <td colSpan='6'>
                                    <LoadingComponent/>
                                </td>
                            </tr>
                           ||
                           PatientList.attyPatients && PatientList.attyPatients.map(patient =>
                               <tr className='delete-attorney_table-row' key={patient.PatientID}>                                                      
                                   <td className="delete-attorney_table-cell_patientID">{patient.PatientID}</td>
                                   <td className="delete-attorney_table-cell">{patient.PatientName}</td>                                   
                               </tr>)
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}
export default DashboardDeleteAttorneyStep3;