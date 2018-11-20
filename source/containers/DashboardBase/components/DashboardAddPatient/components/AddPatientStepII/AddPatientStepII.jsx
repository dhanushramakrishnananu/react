import React from 'react';
import { Field } from 'redux-form';
import _ from 'lodash';

class AddPatientStepII extends React.Component {
    render() {
        const { patientsMasterData, addPatientForm } = this.props;
        const countryValue = addPatientForm ? addPatientForm.values.Country : null;
        addPatientForm.values['Status'] = '2 - Work';
        return (
            <ul className="add-list add-patient-menu">
                <li>
                    <div className="add-list_key">
                        Status
                    </div>
                    <div className="add-list_value">
                        <Field name="Status" component="input" type="text" isEditing={false} /> 
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        MRN
                    </div>
                    <div className="add-list_value">
                        <Field name="MPNumber" component="input" type="text" />
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Guarantor First Name
                    </div>
                    <div className="add-list_value">
                        <Field name="GuarFirstName" component="input" type="text" />
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Guarantor Last Name
                    </div>
                    <div className="add-list_value">
                        <Field name="GuarLastName" component="input" type="text" />
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Medicaid Number
                    </div>
                    <div className="add-list_value">
                        <Field name="MedicaidNo" component="input" type="text" />
                    </div>
                </li>
                <li className="margin-bottom">
                    <div className="add-list_key">
                        Medicare Number
                    </div>
                    <div className="add-list_value">
                        <Field name="MedicareNo" component="input" type="text" />
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Employer
                    </div>
                    <div className="add-list_value">
                        <Field name="EmployerName" component="input" type="text" disabled />
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Address
                    </div>
                    <div className="add-list_value">
                        <Field name="EAddress" component="input" type="text" disabled />
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        City
                    </div>
                    <div className="add-list_value">
                        <Field name="ECity" component="input" type="text" disabled />
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        State
                    </div>
                    <div className="add-list_value">
                        <Field name="EState" component="select" disabled >
                            <option value="Select"/>
                            {_.filter(patientsMasterData.States, {Country: countryValue}).map(state =>
                                <option key={state.StateName} value={state.StateName}>{state.StateName}</option>
                            )}
                        </Field>
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Zip
                    </div>
                    <div className="add-list_value">
                        <Field name="EZip" component="input" type="text" disabled/>
                    </div>
                </li>
            </ul>
        );
    }
}

export default AddPatientStepII;