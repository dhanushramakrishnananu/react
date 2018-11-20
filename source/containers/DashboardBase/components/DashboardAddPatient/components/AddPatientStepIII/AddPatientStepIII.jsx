import React from 'react';
import { Field } from 'redux-form';

class AddPatientStepIII extends React.Component {
    constructor(props) {
        super(props);
        this.onCheckInput = this.onCheckInput.bind(this);
    }
    onCheckInput(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 10) {
            e.target.value=onlyNums;
        } else if (onlyNums.length === 10) {
            const number = onlyNums.replace(/(\d{3})(\d{3})(\d{4})/, '($1) -$2-$3');
            e.target.value=number;
        } 
    }
renderField = ({input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <div className="add-list_key">{label}</div>
        <div className="add-list_value">
            <input {...input} type={type} />
            {touched &&
            ((error && <span color='red'>*</span>) ||
                (warning && <span>*</span>))}
        </div>
    </div>
);
render() {
    return (
        <ul className="add-list add-patient add-patient-menu_step-three">
            <li>
                <div className="add-list_key">
                    Patient - Deceased
                </div>
                <div className="add-list_check">
                    <Field name="PatientDeceased" id="PatientDeceased" component="input" type="checkbox" />
                    <label htmlFor="PatientDeceased" />
                </div>
            </li>
            <li>
                <div className="add-list_key">
                    Intent to Pursue
                </div>
                <div className="add-list_check">
                    <Field name="IntentToPurse" id="IntentToPurse" component="input" type="checkbox" />
                    <label htmlFor="IntentToPurse" />
                </div>
            </li>
            <li className="margin-bottom">
                <div className="add-list_key">
                    No Lien
                </div>
                <div className="add-list_check">
                    <Field name="NoLien" id="NoLien" component="input" type="checkbox" />
                    <label htmlFor="NoLien" />
                </div>
            </li>
            <li>
                <div className="add-list_key">
                    Home Phone
                </div>
                <div className="add-list_value">
                    <Field name="HomePhone" onInput={this.onCheckInput} maxLength="10" pattern="\d*" component="input" type="text" />
                </div>
                <div className="add-list_check">
                    <Field name="HomePhoneDisabled" id="HomePhoneDisabled" component="input" type="checkbox" />
                    <label htmlFor="HomePhoneDisabled" />
                </div>
            </li>
            <li>
                <div className="add-list_key">
                    Work Phone
                </div>
                <div className="add-list_value">
                    <Field name="WorkPhone" onInput={this.onCheckInput} maxLength="10" pattern="\d*" component="input" type="text" />
                </div>
                <div className="add-list_check">
                    <Field name="WorkPhoneDisabled" id="WorkPhoneDisabled" component="input" type="checkbox" />
                    <label htmlFor="WorkPhoneDisabled" />
                </div>
            </li>
            <li>
                <div className="add-list_key">
                    Mobile Phone
                </div>
                <div className="add-list_value">
                    <Field name="MobilePhone" onInput={this.onCheckInput} maxLength="10" pattern="\d*" component="input" type="text" />
                </div>
                <div className="add-list_check">
                    <Field name="MobilePhoneDisabled" id="MobilePhoneDisabled" component="input" type="checkbox" />
                    <label htmlFor="MobilePhoneDisabled" />
                </div>
            </li>
            <li className="margin-bottom">
                <div className="add-list_key">
                    Relative Phone
                </div>
                <div className="add-list_value">
                    <Field name="RelativePhone" onInput={this.onCheckInput} maxLength="10" pattern="\d*" component="input" type="text" />
                </div>
                <div className="add-list_check">
                    <Field name="RelativePhoneDisabled" id="RelativePhoneDisabled" component="input" type="checkbox" />
                    <label htmlFor="RelativePhoneDisabled" />
                </div>
            </li>
            <li>
                <div className="add-list_key">
                    ALT Phone1
                </div>
                <div className="add-list_value">
                    <Field name="AltPhone1" onInput={this.onCheckInput} maxLength="10" pattern="\d*" component="input" type="text" />
                </div>
                <div className="add-list_check">
                    <Field name="AltPhone1Disabled" id="AltPhone1Disabled" component="input" type="checkbox" />
                    <label htmlFor="AltPhone1Disabled" />
                </div>
            </li>
            <li>
                <div className="add-list_key">
                    ALT Phone2
                </div>
                <div className="add-list_value">
                    <Field name="AltPhone2" id="AltPhone2" onInput={this.onCheckInput} maxLength="10" pattern="\d*" component="input" type="text" />
                </div>
                <div className="add-list_check">
                    <Field name="AltPhone2Disabled" id="AltPhone2Disabled" component="input" type="checkbox" />
                    <label htmlFor="AltPhone2Disabled" />
                </div>
            </li>
            <li>
                <div className="add-list_key">
                    ALT Phone3
                </div>
                <div className="add-list_value">
                    <Field name="AltPhone3" onInput={this.onCheckInput} maxLength="10" pattern="\d*" component="input" type="text" />
                </div>
                <div className="add-list_check">
                    <Field name="AltPhone3Disabled" id="AltPhone3Disabled" component="input" type="checkbox" />
                    <label htmlFor="AltPhone3Disabled" />
                </div>
            </li>
            <li>
                <div className="add-list_key">
                    ALT Phone4
                </div>
                <div className="add-list_value">
                    <Field name="AltPhone4" onInput={this.onCheckInput} maxLength="10" pattern="\d*" component="input" type="text" />
                </div>
                <div className="add-list_check">
                    <Field name="AltPhone4Disabled" id="AltPhone4Disabled" component="input" type="checkbox" />
                    <label htmlFor="AltPhone4Disabled" />
                </div>
            </li>
            <li>
                <div className="add-list_key">
                    ALT Phone5
                </div>
                <div className="add-list_value">
                    <Field name="AltPhone5" onInput={this.onCheckInput} maxLength="10" pattern="\d*" component="input" type="text" />
                </div>
                <div className="add-list_check">
                    <Field name="AltPhone5Disabled" id="AltPhone5Disabled" component="input" type="checkbox" />
                    <label htmlFor="AltPhone5Disabled" />
                </div>
            </li>
        </ul>
    );
}
}

export default AddPatientStepIII;