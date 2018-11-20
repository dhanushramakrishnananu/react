import React from 'react';

import FormBuilder from '../../../../../components/FormBuilder/FormBuilder.jsx';

import { combineArraysValues } from '../../../../../components/FormBuilder/FormBuilderHelpers.es6'

// test
const valuesList = [
    {name: 'InsuranceCo', val: 'InsuranceCo 1'},
    {name: 'Adjuster', val: 'Adjuster 1'},
    {name: 'Address', val: 'Address 1'},
    {name: 'City', val: 'City 1'},
    {name: 'State', val: 'State 1'},
    {name: 'Zip', val: 'Zip 1'},
    {name: 'AdjusterPhoneNo', val: 'AdjusterPhoneNo 1'},
    {name: 'ClaimNo', val: 'ClaimNo 1'}
]

const formConfig = [
    {name: 'InsuranceCo', text: 'Insurance Co', type: 'label'},
    {name: 'Adjuster', text: 'Adjuster', type: 'label'},
    {name: 'Address', text: 'Address', type: 'label'},
    {name: 'City', text: 'City', type: 'label'},
    {name: 'State', text: 'State', type: 'label'},
    {name: 'Zip', text: 'Zip', type: 'label'},
    {name: 'AdjusterPhoneNo', text: 'Adjuster Phone No', type: 'label'},
    //{name: 'Adjuster Phone No'},

    {name: 'ClaimNo', text: 'Claim No', type: 'textfield', isRequired: true },
    {name: 'TypeOfCoverage', text: 'Type Of Coverage', type: 'selectbox', isRequired: true },
    {name: 'PolicyLimits', text: 'Policy Limits', type: 'textfield', value: 123},
    {name: 'ExpectedRecovery', text: 'Expected Recovery', type: 'textfield', value: '321'},
    {name: 'PolicyHeader', text: 'Policy Header', type: 'textfield', value: undefined},
    {name: 'AdjustedAmount', text: 'Adjusted Amount', type: 'textfield'},
    {name: 'PolicyNumber', text: 'Policy Number', type: 'textfield'},
    {name: 'Verified', text: 'Verified', type: 'checkbox'},
    {name: 'Status', text: 'Status', type: 'selectbox'},
    {name: 'SettlementDate', text: 'Settlement Date', type: 'datepicker'},
    {name: 'BilledDate', text: 'Billed Date', type: 'datepicker'},
    {name: 'Comment', text: 'Comment', type: 'textarea'}
];

class AddInsuranceFormStep3 extends React.Component {

    getFormData = (event) => {
        let formData = this.form.state;
        console.log(this.form.state)
    };

    render() {

        let configList = combineArraysValues({
            configArr: formConfig,
            valuesArr: valuesList,
            configField: 'name',
            valuesField: 'name'
        });


        return(
            <div className='side-list-content'>
                <button onClick={this.getFormData}>Get State</button>

                <FormBuilder
                    ref={ ( form ) => this.form = form}
                    config={configList}
                    //config={formConfig}
                />
            </div>
        );
    }
}

export default AddInsuranceFormStep3;
