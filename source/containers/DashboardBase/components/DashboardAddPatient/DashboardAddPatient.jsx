import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import _ from 'lodash';

import { nextStep, prevStep } from '../../../DashboardBase/actions.es6';

import { getTimelyFiling, saveNewPatient } from '../../../DashboardHome/actions.es6';

import AddPatientStepI from './components/AddPatientStepI/AddPatientStepI.jsx';
import AddPatientStepII from './components/AddPatientStepII/AddPatientStepII.jsx';
import AddPatientStepIII from './components/AddPatientStepIII/AddPatientStepIII.jsx';
import AddPatientStepIV from './components/AddPatientStepIV/AddPatientStepIV.jsx';
import AddPatientStepV from './components/AddPatientStepV/AddPatientStepV.jsx';

import './DashboardAddPatient.scss';

let isForm1Valid = false;
let isForm2Valid = false;
let isForm3Valid = false;

class DashboardAddPatient extends React.Component {
    render() {
        const { onHideSideListMenu, selectedStep, onPrevStep, onNextStep, patientsMasterData, timelyData,
            addPatientForm, onGetTimelyFiling, onSavePatient } = this.props;
        const disable=selectedStep===1&&isForm1Valid===true?true:selectedStep===3&&isForm3Valid===true?true:selectedStep===2?true:selectedStep===4?true:false;
        this.stepsList = [
            <AddPatientStepI patientsMasterData={patientsMasterData} addPatientForm={addPatientForm} onGetTimelyFiling={onGetTimelyFiling} />,
            <AddPatientStepII patientsMasterData={patientsMasterData} addPatientForm={addPatientForm} />,
            <AddPatientStepIII patientsMasterData={patientsMasterData} />,
            <AddPatientStepIV patientsMasterData={patientsMasterData} addPatientForm={addPatientForm} />,
            <AddPatientStepV patientsMasterData={patientsMasterData} timelyData={timelyData} addPatientForm={addPatientForm} />
        ];

        return (
            <form className="side-list-content add-patient">
                {this.stepsList[selectedStep - 1]}
                <div className="adds-buttons-block">
                    {selectedStep === 1 &&
                    <button className="adds-buttons-block_cancel-btn" onClick={onHideSideListMenu} type="button">
                        Cancel
                    </button>
                    ||
                    <button className="adds-buttons-block_cancel-btn" onClick={onPrevStep} type="button">
                        Back
                    </button>
                    }
                    {selectedStep !== 5 &&
                    <button className="adds-buttons-block_next-btn" onClick={onNextStep} type="button" disabled={!disable}>
                        Next
                    </button>
                    ||
                    <button className="adds-buttons-block_next-btn" ref="btn" type="button" disabled={!isForm2Valid} onClick={() => {
                        onSavePatient(this.props.addPatientForm.values,this);                        
                    }}>
                        Save
                    </button>
                    }
                </div>
            </form>
        );
    }
}

const validate = values => {
    const errors = {};
    const errorsall = {};
    isForm1Valid = false;
    isForm2Valid = false;
    isForm3Valid = false;    
    if (!values.FirstName) {
        errors.FirstName = 'Required';
        errorsall.FirstName = 'Required';
    }
    if (!values.LastName) {
        errors.LastName = 'Required';
        errorsall.LastName = 'Required';
    }
    if (!values.ReferredBy || values.ReferredBy==="0") {        
        errors.ReferredBy = 'Required';
        errorsall.ReferredBy = 'Required';
    }
    if (values.SSN) {
        if(values.SSN.length!==9) {
            errors.SSN = 'Required';
            errorsall.SSN = 'Required';
        }
    }
    const errors1 = {};
    if (!values.FinClass|| values.FinClass==="0") {
        errors1.FinClass = 'Required';
        errorsall.FinClass = 'Required';
    }
    if (!values.Timely1 || values.Timely1==="0") {
        errors1.Timely1 = 'Required';
        errorsall.Timely1 = 'Required';
    }
    if(values.BilledPrimary) {
        if(!values.BilledInsDate) {
            errors1.BilledInsDate='Required';
            errorsall.BilledInsDate = 'Required';
        }
    }
    const errors2 = {};
    if(values.HomePhone) {
        if(values.HomePhone.length<10) {
            errors2.HomePhone='Required';
            errorsall.HomePhone = 'Required';
        }
    }
    if(values.WorkPhone) {
        if(values.WorkPhone.length<10) {
            errors2.WorkPhone='Required';
            errorsall.WorkPhone = 'Required';
        }
    }
    if(values.MobilePhone) {
        if(values.MobilePhone.length<10) {
            errors2.MobilePhone='Required';
            errorsall.MobilePhone = 'Required';
        }
    }
    if(values.RelativePhone) {
        if(values.RelativePhone.length<10) {
            errors2.RelativePhone='Required';
            errorsall.RelativePhone = 'Required';
        }
    }
    if(values.AltPhone1) {
        if(values.AltPhone1.length<10) {
            errors2.AltPhone1='Required';
            errorsall.AltPhone1 = 'Required';
        }
    }
    if(values.AltPhone2) {
        if(values.AltPhone2.length<10) {
            errors2.AltPhone2='Required';
            errorsall.AltPhone2 = 'Required';
        }
    }
    if(values.AltPhone3) {
        if(values.AltPhone3.length<10) {
            errors2.AltPhone3='Required';
            errorsall.AltPhone3 = 'Required';
        }
    }
    if(values.AltPhone4) {
        if(values.AltPhone4.length<10) {
            errors2.AltPhone4='Required';
            errorsall.AltPhone4 = 'Required';
        }
    }
    if(values.AltPhone5) {
        if(values.AltPhone5.length<10) {
            errors2.AltPhone5='Required';
            errorsall.AltPhone5 = 'Required';
        }
    }
    if(_.isEmpty(errors)) {
        isForm1Valid = true;
        if(_.isEmpty(errors1)) {
            isForm2Valid = true;
        }
        if(_.isEmpty(errors2)) {
            isForm3Valid=true;
        }
        return errorsall;
    } 
};


const mapStateToProps = state => {
    const patientsMasterData = state.patientDetailsReducer.patientsMasterData;
    const timelyData = state.patientDetailsReducer.timelyData;
    const healthInsPriority = _.isEmpty(patientsMasterData) ? null : patientsMasterData.HealthInsurancePriority[2].HealthInsPriority;
    const Country = _.isEmpty(patientsMasterData) ? null : patientsMasterData.Countries[0].CountryName;

    return {
        addPatientForm: state.form.addPatientForm,
        selectedStep: state.homeReducer.selectedStep,
        patientsMasterData: patientsMasterData,
        timelyData: timelyData,
        initialValues: {
            Country: Country,
            HealthInsPriority: healthInsPriority,
            DateRec: moment().format('MM/DD/YYYY')
        }
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onNextStep: () => {
            dispatch(nextStep());
        },
        onPrevStep: () => {
            dispatch(prevStep());
        },
        onGetTimelyFiling: (refId) => {
            dispatch(getTimelyFiling(refId));
        },
        onSavePatient: (data,that) => { 
            that.refs.btn.setAttribute("disabled", "disabled");
            dispatch(saveNewPatient(data));                  
        }
    };
};

DashboardAddPatient = reduxForm({
    form: 'addPatientForm',
    validate
})(DashboardAddPatient);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardAddPatient);