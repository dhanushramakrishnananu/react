import React from 'react';
import { connect } from 'react-redux';

import Checkbox from '../../../../components/Checkbox/Checkbox.jsx';
import { selectAllPatients, selectCurrentPatientAccount, selectGroupedPatient } from './actions.es6';

class BulkSelectPatients extends React.Component {
    render() {
        const { groupedPatients, notesGroupedPatients, onSelectAllPatients, onSelectCurrentPatientAccount, onSelectPatient, selectedGroupedPatients, patientId, type, attorneyGroupedPatients} = this.props;

        const patientList =  type ==='Edit Note'?notesGroupedPatients:(type ==='Edit Attorney'?attorneyGroupedPatients:groupedPatients);
        const thisAccountSelected = selectedGroupedPatients[0] === patientId && selectedGroupedPatients.length === 1;
        if(type=="Documents")
        {
            if(!thisAccountSelected)
            {
                const selectedPatientIndex = selectedGroupedPatients.indexOf(patientId);
                if (selectedPatientIndex !== -1) {
                    selectedGroupedPatients.splice(selectedPatientIndex, 1);
                }
            }
        }
        var allSelected = false;
        if(selectedGroupedPatients.length === 1 && patientList.length === 1)
        {
            if(selectedGroupedPatients[0] === patientList[0].PatientId)
                allSelected = true;
            else
                allSelected = false;
        }
        else if(selectedGroupedPatients.length === patientList.length && patientList.length !== 0)
            allSelected = true;
         //const allSelected = selectedGroupedPatients.length === patientList.length && patientList.length !== 0;

        return (
            <ul className="add-list add-note-menu">
            <div className="add-list_cols-check flex-1" style={{'float': 'left',paddingLeft:18}}>
                        <Checkbox
                            input={{
                                name: 'selectAll',
                                onChange: e => onSelectAllPatients(type),
                                value: allSelected
                            }}
                        />
                        <label htmlFor="SelectAll">Select All</label>
                    </div>
                    
                    {type==="Documents" && <div className="add-list_cols-check">
                        <Checkbox
                            input={{
                                name: 'thisAccOnly',
                                onChange: () => onSelectCurrentPatientAccount(patientId),
                                value: thisAccountSelected
                            }}
                        />
                        <label htmlFor="ThisAccOnly">This Account Only</label>
                    </div>}
                <li>
                    <ul className="add-list_patients-list">
                        {patientList.map((patient, index) =>
                            <li key={index}>
                                <div className="block block-check">
                                    <Checkbox
                                        input={{
                                            name: patient.PatientId,
                                            onChange: () => onSelectPatient(patient.PatientId),
                                            value: selectedGroupedPatients.indexOf(patient.PatientId) !== -1
                                        }}
                                    />
                                </div>
                                <div className="block block-id" title={patient.PatientId}>{patient.PatientId}</div>
                                <div className="block block-name" title={patient.PatientName}>{patient.PatientName}</div>
                                <div className="block block-status" title={patient.Status}>{patient.Status}</div>
                            </li>
                        )}
                    </ul>
                </li>
            </ul>
        );
    }
}

const mapStateToProps = state => {
    return {
        groupedPatients: state.patientDetailsReducer.groupedPatients,
        notesGroupedPatients: state.patientDetailsReducer.notesGroupedPatients,
        selectedGroupedPatients: state.patientDetailsReducer.selectedGroupedPatients,
        attorneyGroupedPatients: state.patientDetailsReducer.attorneyGroupedPatients
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSelectAllPatients: type => {
            dispatch(selectAllPatients(type));
        },
        onSelectCurrentPatientAccount: patientId => {
            dispatch(selectCurrentPatientAccount(patientId));
        },
        onSelectPatient: patientId => {
            dispatch(selectGroupedPatient(patientId));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BulkSelectPatients);