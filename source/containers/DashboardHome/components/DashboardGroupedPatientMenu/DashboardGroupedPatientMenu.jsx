import React from 'react';
import { connect } from 'react-redux';
import { getGroupAccountDetails } from './actions.es6';
import './DashboardGroupedPatientMenu.scss';
import PatientsGroupIcon from '../../../../assets/icons/PatientsGroupIcon.jsx';
import CaretIcon from '../../../../assets/icons/CaretIcon.jsx';
import DashboardGroupedPatientsList from '../DashboardGroupedPatientsList/DashboardGroupedPatientsList';


class DashboardGroupedPatientMenu extends React.Component {   
    render() {
        const { patientId, totalGroupedPatientCount, groupedPatients, onGetGroupAccountDetails } = this.props;
        return (
            <div className="dashboard-groupedpatients">
                <div className="dashboard-groupedpatients_header">
                    <div className="dashboard-groupedpatients_header-left">
                         <PatientsGroupIcon />
                        <h3>Grouped Accounts({totalGroupedPatientCount})</h3>
                    </div>
                    <div className="dashboard-groupedpatients_header-right">
                        <CaretIcon />
                    </div>
                </div>
                <div className="dashboard-groupedpatients_groupedpatients">
                    {groupedPatients.map((groupacct, j) =>
                        <DashboardGroupedPatientsList
                            key={j}
                            firstElement={j}
                            groupacct={groupacct}
                            getGroupAccountDetails={() => onGetGroupAccountDetails(patientId,groupacct)}
                            mainPatientId ={patientId}
                        />)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
         totalGroupedPatientCount:state.patientDetailsReducer.patientDetails.PatientNotesDocsModel.TotalGroupedPatientCount,
         groupedPatients: state.patientDetailsReducer.patientDetails.PatientNotesDocsModel.GroupedPatients
    };
};

const mapDispatchToProps = dispatch => {
    return {        
        onGetGroupAccountDetails: (PatientId,groupacct) => {
            dispatch(getGroupAccountDetails(PatientId,groupacct));
        }       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardGroupedPatientMenu);