import React from 'react';
import { Field } from 'redux-form';
import _ from 'lodash';

import Datepicker from '../../../../../../components/Datepicker/Datepicker.jsx';

class AddPatientStepI extends React.Component {
    customField = ({ input, type, meta: { touched, error, warning } }) => (
        <div className="add-list_input-wrapper">
            <input className={touched && error ? 'add-list_input add-list_input-invalid' : 'add-list_input'} {...input} type={type}/>
            {touched && ((error && <span className="add-list_error">{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    );
    render() {
        const { patientsMasterData, addPatientForm, onGetTimelyFiling } = this.props;
        const countryValue = addPatientForm ? addPatientForm.values.Country : null;

        return (
            <ul className="add-list add-patient-menu">
                <li>
                    <div className="add-list_key">
                        Referred By<span className="add-list_required"> *</span>
                    </div>
                    <div className="add-list_value">
                        <Field
                            name="ReferredBy"
                            component="select"
                            onChange={e => onGetTimelyFiling(e.target.value)}>
                            <option value="0">Select</option>
                            {patientsMasterData.ReferredBy.map(referredObj =>
                                <option key={referredObj.RefID} value={referredObj.RefID}>{referredObj.RefName}</option>
                            )}
                        </Field>
                    </div>
                </li>
                <li >
                    <div className="add-list_key">
                        Account #
                    </div>
                    <div className="add-list_value">
                        <Field
                            name="ProviderAcct"
                            component="input"
                            type="text" />
                    </div>
                </li>
                <li className="margin-bottom">
                    <div className="add-list_key">
                        Episode ID
                    </div>
                    <div className="add-list_value">
                        <Field 
                            name="EpisodeId" 
                            component="input" 
                            type="text" />
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        First Name<span className="add-list_required"> *</span>
                    </div>
                    <div className="add-list_value">
                        <Field
                            name="FirstName"
                            component={this.customField}
                            type="text"
                        />
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Middle Name
                    </div>
                    <div className="add-list_value">
                        <Field
                            name="MiddleName"
                            component="input"
                            type="text" />
                    </div>
                </li>
                <li className="margin-bottom">
                    <div className="add-list_key">
                        Last Name<span className="add-list_required"> *</span>
                    </div>
                    <div className="add-list_value">
                        <Field
                            name="LastName"
                            component={this.customField}
                            type="text" />
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Address
                    </div>
                    <div className="add-list_value">
                        <Field name="Address" component="input" type="text" />
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        City
                    </div>
                    <div className="add-list_value">
                        <Field name="City" component="input" type="text" />
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Country
                    </div>
                    <div className="add-list_value">
                        <Field name="Country" component="select">                       
                            {patientsMasterData.Countries.map(country =>
                                <option key={country.CountryName} value={country.CountryName}>{country.CountryName}</option>
                            )}
                        </Field>
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        State
                    </div>
                    <div className="add-list_value">
                        <Field name="State" component="select">
                            <option value="0">Select</option>
                            {_.filter(patientsMasterData.States, {Country: countryValue}).map(state =>
                                <option key={state.StateName} value={state.StateName}>{state.StateName}</option>
                            )}
                        </Field>
                    </div>
                </li>
                <li className="margin-bottom">
                    <div className="add-list_key">
                        Zip
                    </div>
                    <div className="add-list_value">
                        <Field name="Zip" component="input" type="text" />
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Birth Date
                    </div>
                    <div className="add-list_value">
                        <Field name="BirthDate" component={Datepicker} />
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        SS No
                    </div>
                    <div className="add-list_value">
                        <Field name="SSN" component="input" type="number" />
                    </div>
                </li>
            </ul>
        );
    }
}

export default AddPatientStepI;