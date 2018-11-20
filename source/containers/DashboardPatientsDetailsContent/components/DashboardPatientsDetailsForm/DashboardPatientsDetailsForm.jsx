import React from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import classNames from 'classnames';

import Datepicker from '../../../../components/Datepicker/Datepicker.jsx';
import Checkbox from '../../../../components/Checkbox/Checkbox.jsx';

import './DashboardPatientsDetailsForm.scss';

class DashboardPatientsDetailsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            billedHealthSelected: this.props.patientDetailsForm? this.props.patientDetailsForm.values.BilledPrimary: this.props.patientInfo.BilledPrimary,
            TotalCharges: Number(this.props.patientDetailsForm? this.props.patientDetailsForm.values.TotalCharges: this.props.patientInfo.TotalCharges).toFixed(2),
            CurrentBal: Number(this.props.patientDetailsForm? this.props.patientDetailsForm.values.CurrentBal: this.props.patientInfo.CurrentBal).toFixed(2)
        };
        this.onCheckInput = this.onCheckInput.bind(this);
        this.onCheckSSNInput = this.onCheckSSNInput.bind(this);
        this.onCheckDecimalInput = this.onCheckDecimalInput.bind(this);
        this.setBilledInsDateVisibility = this.setBilledInsDateVisibility.bind(this); 
        this.onReferredByChange = this.onReferredByChange.bind(this);
    }
    componentWillReceiveProps() {
        this.props.onGetTimelyFiling(this.props.patientDetailsForm? this.props.patientDetailsForm.values.ReferredBy: this.props.patientInfo.ReferredBy);
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
    onCheckSSNInput(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 9) {
            e.target.value=onlyNums;
        } else if (onlyNums.length === 9) {
            const number = onlyNums.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3');
            e.target.value=number;
        } 
    }
    
    onCheckDecimalInput(e) {
        const onlyNums = e.target.value.replace(/[^0-9]+\\.?[0-9]*/g, '');
        //const dec = onlyNums.replace(/(\\d+)(\\.)?(\\d+)?/, '');
        e.target.value=onlyNums;       
    }
    setBilledInsDateVisibility(e) {        
        if(e.target.checked === true) {
            this.setState({ billedHealthSelected: e.target.checked });
            this.props.patientDetailsForm.values['HealthInsPrioirty'] = 1;
        } else{
            this.setState({ billedHealthSelected: e.target.checked });
            this.props.patientDetailsForm.values['HealthInsPrioirty'] = 2;
        }
    }
    onReferredByChange(e) {
        const RefID = parseInt(e.target.value);
        const item = _.find(this.props.patientsMasterData.ReferredBy, {RefID});
        this.props.setRefName(item.RefName);
        this.props.patientDetailsForm.values.Timely1 = 0;
        this.props.patientDetailsForm.values.Timely2 = 0;
        this.props.patientInfo.Timely1 = 0;
        this.props.patientInfo.Timely2 = 0;
        this.props.patientDetailsForm.values.Timely1Desc = 'Not Available';
        this.props.patientDetailsForm.values.Timely2Desc = 'Not Available';
        this.props.patientInfo.Timely1Desc = 'Not Available';
        this.props.patientInfo.Timely2Desc = 'Not Available';
        this.props.onGetTimelyFiling(e.target.value);
    }
    render() {
        const { patientsMasterData, patientDetailsForm, patientInfo, timelyData} = this.props;
        const { billedHealthSelected } = this.state;
        const countryValue = patientDetailsForm ? patientDetailsForm.values.Country : null;        
        let TotalCharges = 0;
        let CurrentBal = 0;
        if(patientDetailsForm) {
            patientDetailsForm.values.EmployerID = patientInfo.EmployerID;
            patientDetailsForm.values.BilledPrimary=billedHealthSelected;
        }
        const formClass = classNames({
            'dashboard-patients-details': true,
            'mva-accident': patientDetailsForm && parseInt(patientDetailsForm.values.AccdntType, 10) === 1
        });
        const MVAVisibility=patientDetailsForm && parseInt(patientDetailsForm.values.AccdntType, 10) === 1? true: (patientDetailsForm && parseInt(patientDetailsForm.values.AccdntType, 10) !== 1)? false:patientInfo.AccdntType===1? true:false;
        //const healthinsprio=patientDetailsForm && patientDetailsForm.values.BilledPrimary?patientDetailsForm.values['HealthInsPrioirty'] = 1 :patientDetailsForm? patientDetailsForm.values['HealthInsPrioirty'] = patientInfo.HealthInsPrioirty:patientInfo.HealthInsPrioirty;        
        if(patientDetailsForm) {
            if(patientDetailsForm.values.MiscRef.trim().length===0) {
                patientDetailsForm.values.MiscRef='';
            }
            if(patientDetailsForm.values.MiddleName.trim().length===0) {
                patientDetailsForm.values.MiddleName='';
            }
        } else {
            if(patientInfo.MiscRef.trim().length===0) {
                patientInfo.MiscRef='';
            }
            if(patientInfo.MiddleName.trim().length===0) {
                patientInfo.MiddleName='';
            }
        }

        const statuschange=patientDetailsForm && patientDetailsForm.values.Status===patientInfo.Status?patientDetailsForm.values.StatusChangedFlag=0:patientDetailsForm?patientDetailsForm.values.StatusChangedFlag=1:0;
        
        const stmsg=patientDetailsForm && statuschange===1? patientDetailsForm.values.StatusNote='status changed from ' + patientInfo.Status + ' to ' + patientDetailsForm.values.Status + ' and returned date ' + patientInfo.ReturnDate + ' removed.':'';

        const oldstatus=stmsg.length>0? patientDetailsForm.values.OldStatus=patientInfo.Status.substring(0, 1):'';
            
        return (
            <div className={formClass}>
                <div className="dashboard-patients-details_group-top">
                    <div className="dashboard-patients-details_group">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Referred By">
                                Referred By <span className="dashboard-patients-details_row_required"> *</span>
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="ReferredBy" component="select" onChange={this.onReferredByChange}>
                                    {patientsMasterData.ReferredBy.map(referredObj =>
                                        <option key={referredObj.RefID} value={referredObj.RefID}>{referredObj.RefName}</option>
                                    )}
                                </Field>
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Account #">
                                Account #
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="ProviderAcct" component="input" type="text" />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Episode ID">
                                Episode ID
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="EpisodeId" component="input" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-patients-details_group">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="First Name">
                                First Name <span className="dashboard-patients-details_row_required"> *</span>
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="FirstName" component="input" type="text" />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Middle Name">
                                Middle Name
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="MiddleName" component="input" type="text" />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Last Name">
                                Last Name <span className="dashboard-patients-details_row_required"> *</span>
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="LastName" component="input" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-patients-details_group">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Address">
                                Address
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="Address" component="input" type="text" />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="City">
                                City
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="City" component="input" type="text" />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Country">
                                Country
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="Country" component="select">
                                    <option value=""/>
                                    {patientsMasterData.Countries.map(country =>
                                        <option key={country.CountryName} value={country.CountryName}>{country.CountryName}</option>
                                    )}
                                </Field>
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="State">
                                State
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="State" component="select">
                                    <option value=""/>
                                    {_.filter(patientsMasterData.States, {Country: countryValue}).map(state =>
                                        <option key={state.StateName} value={state.StateCode}>{state.StateName}</option>
                                    )}
                                </Field>
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Zip">
                                Zip
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="Zip" component="input" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-patients-details_group">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Birth Date">
                                Birth Date
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="BirthDate" component={Datepicker} />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="SS #">
                                SS #
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="SSN" component="input" onInput={this.onCheckSSNInput} maxLength="9" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-patients-details_group not-expand">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Phone">
                                Phone
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="MobilePhone" component="input" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-patients-details_group">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Patient ID">
                                Patient ID
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="PatientID" component="input" type="text" disabled={true}/>
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Status">
                                Status
                            </div>
                            <div className="dashboard-patients-details_row_value" title={oldstatus}>
                                <Field name="Status" component="select">
                                    {patientsMasterData.PatientStatus.map(status =>
                                        <option key={status.StatN} value={status.Status}>{status.Status}</option>
                                    )}
                                </Field>
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Verified">
                                Verified
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="IsVerify" component={Checkbox} />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="MRN">
                                MRN
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="MPNumber" component="input" type="text" />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Guarantor First Name">
                                Guarantor First Name
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="GuarFirstName" component="input" type="text" />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Guarantor Last Name">
                                Guarantor Last Name
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="GuarLastName" component="input" type="text" />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Medicaid #">
                                Medicaid #
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="MedicaidNo" component="input" type="text" />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Medicare #">
                                Medicare #
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="MedicareNo" component="input" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-patients-details_group not-expand">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Admit Date">
                                Admit Date
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="AdmitDate" component={Datepicker} />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Discharge Date">
                                Discharge Date
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="DischargeDate" component={Datepicker} />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key">
                                Misc Ref
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="MiscRef" component="input" type="text" />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Date Recorded">
                                Date Recorded
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="DateRec" component={Datepicker} />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Total Charges $">
                                Total Charges $
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="TotalCharges" component="input" type="text" value={TotalCharges}/>
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Current Balance $">
                                Current Balance $
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="CurrentBal" component="input" type="text" value={CurrentBal}/>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-patients-details_group expand-only">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Employer">
                                Employer
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.EmployerName}>
                                <Field name="EmployerName" component="input" value={patientInfo.EmployerName} type="text" disabled />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Address">
                                Address
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.EAddress}>
                                <Field name="EAddress" component="input" value={patientInfo.EAddress} type="text" disabled />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="City">
                                City
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.ECity}>
                                <Field name="ECity" component="input" value={patientInfo.ECity} type="text" disabled />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="State">
                                State
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.EState}>
                                <Field name="EState" component="input" value={patientInfo.EState} type="text" disabled />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Zip">
                                Zip
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.EZip}>
                                <Field name="EZip" component="input" value={patientInfo.EZip} type="text" disabled />
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-patients-details_group expand-only">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Que">
                                Que
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                {patientInfo.Que}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Patient - Deceased">
                                Patient - Deceased
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="PatientDeceased" component={Checkbox} />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Intent to Pursue">
                                Intent to Pursue
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="IntentToPurse" component={Checkbox} />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="No Lien">
                                No Lien
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="NoLien" component={Checkbox} />
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-patients-details_group expand-only">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Home Phone">
                                Home Phone
                            </div>
                            <div className="dashboard-patients-details_row_value checkbox-row">
                                <Field name="HomePhone" onInput={this.onCheckInput} maxLength="10" pattern="\d*" component="input" type="text" />
                                <Field name="HomePhoneDisabled" component={Checkbox} />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Work Phone">
                                Work Phone
                            </div>
                            <div className="dashboard-patients-details_row_value checkbox-row">
                                <Field name="WorkPhone" component="input" onInput={this.onCheckInput} maxLength="10" type="text" />
                                <Field name="WorkPhoneDisabled" component={Checkbox} />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Mobile Phone">
                                Mobile Phone
                            </div>
                            <div className="dashboard-patients-details_row_value checkbox-row">
                                <Field name="MobilePhone" maxLength="10" onInput={this.onCheckInput} component="input" type="text" />
                                <Field name="MobilePhoneDisabled" component={Checkbox} />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Relative Phone">
                                Relative Phone
                            </div>
                            <div className="dashboard-patients-details_row_value checkbox-row">
                                <Field name="RelativePhone" onInput={this.onCheckInput} maxLength="10" component="input" type="text" />
                                <Field name="RelativePhoneDisabled" component={Checkbox} />
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-patients-details_group expand-only">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="ALt Phone1">
                                ALt Phone1
                            </div>
                            <div className="dashboard-patients-details_row_value checkbox-row">
                                <Field name="AltPhone1" onInput={this.onCheckInput} maxLength="10" component="input" type="text" />
                                <Field name="AltPhone1Disabled" component={Checkbox} />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="ALt Phone2">
                                ALt Phone2
                            </div>
                            <div className="dashboard-patients-details_row_value checkbox-row">
                                <Field name="AltPhone2" onInput={this.onCheckInput} maxLength="10" component="input" type="text" />
                                <Field name="AltPhone2Disabled" component={Checkbox} />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="ALt Phone3">
                                ALt Phone3
                            </div>
                            <div className="dashboard-patients-details_row_value checkbox-row">
                                <Field name="AltPhone3" onInput={this.onCheckInput} maxLength="10" component="input" type="text" />
                                <Field name="AltPhone3Disabled" component={Checkbox} />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="ALt Phone4">
                                ALt Phone4
                            </div>
                            <div className="dashboard-patients-details_row_value checkbox-row">
                                <Field name="AltPhone4" onInput={this.onCheckInput} maxLength="10" component="input" type="text" />
                                <Field name="AltPhone4Disabled" component={Checkbox} />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="ALt Phone5">
                                ALt Phone5
                            </div>
                            <div className="dashboard-patients-details_row_value checkbox-row">
                                <Field name="AltPhone5" onInput={this.onCheckInput} maxLength="10" component="input" type="text" />
                                <Field name="AltPhone5Disabled" component={Checkbox} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard-patients-details_group-bottom expand-only">
                    <div className="dashboard-patients-details_group">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Admit Date">
                                Admit Date
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="AdmitDate" component={Datepicker} />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Discharge Date">
                                Discharge Date
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="DischargeDate" component={Datepicker} />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Misc Ref">
                                Misc Ref
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="MiscRef" component="input" type="text" />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Date Recorded">
                                Date Recorded
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="DateRec" component={Datepicker} />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Total Charges $">
                                Total Charges $
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="TotalCharges" onInput={this.onCheckDecimalInput} value={TotalCharges} component="input" type="text" />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Current Balance $">
                                Current Balance $
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="CurrentBal" onInput={this.onCheckDecimalInput} component="input" type="text" value={CurrentBal}/>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-patients-details_group">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Date Billed">
                                Date Billed
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="BilledDate" component={Datepicker} />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Date Identified">
                                Date Identified
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="DateIdentified" component={Datepicker} />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Accident Date">
                                Accident Date
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="AccidentDate" component={Datepicker} />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Date Returned">
                                Date Returned
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="ReturnDate" component={Datepicker} />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Return Code">
                                Return Code
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="ReturnCode" component="select">
                                    <option value="" />
                                    {patientsMasterData.ReturnCodes.map(code =>
                                        <option key={code.ReturnCode} value={code.ReturnCode}>{code.ReturnDesc}</option>
                                    )}
                                </Field>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-patients-details_group">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Fin Class">
                                Fin Class <span className="dashboard-patients-details_row_required"> *</span>
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="FinClass" component="select">
                                    {patientsMasterData.FinClass.map(finClass =>
                                        <option key={finClass.FCID} value={finClass.FC}>{finClass.FC}</option>
                                    )}
                                </Field>
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Primary Ins">
                                Primary Ins
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="HealthIns1" component="input" type="text" />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Secondary Ins">
                                Secondary Ins
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="HealthIns2" component="input" type="text" />
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Secondary Ins">
                                Billed Health {billedHealthSelected && <span className="dashboard-patients-details_row_required"> *</span>}
                            </div>
                            <div className="dashboard-patients-details_row_value checkbox-row-reverse">
                                <Checkbox
                                    input={{
                                        name: 'BilledPrimary',
                                        onChange: this.setBilledInsDateVisibility,
                                        value: billedHealthSelected,
                                        checked: billedHealthSelected ? 'checked': null
                                    }}/>
                                {billedHealthSelected && <Field name="BilledInsDate" component={Datepicker}/> }
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Health Ins Priority">
                                Health Ins Priority
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="HealthInsPrioirty" component="select" disabled={billedHealthSelected}>
                                    {!billedHealthSelected && <option value="" />}
                                    {(billedHealthSelected ? _.filter(patientsMasterData.HealthInsurancePriority, {HID: 1}) : patientsMasterData.HealthInsurancePriority).map(healthInsurancePriorityObj =>
                                        <option key={healthInsurancePriorityObj.HID} value={healthInsurancePriorityObj.HID}>{healthInsurancePriorityObj.HealthInsPriority}</option>
                                    )}
                                </Field>
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Timely Filling 1">
                                Timely Filling 1 <span className="dashboard-patients-details_row_required"> *</span>
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="Timely1" component="select">
                                    <option value="Select" />
                                    {timelyData.map((timelyDataObj, i) =>
                                        <option key={i} value={timelyDataObj.TFID}>{timelyDataObj.Insurance}</option>
                                    )}
                                </Field>
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Timely Filling 2">
                                Timely Filling 2
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="Timely2" component="select">
                                    <option value="Select" />
                                    {timelyData.map(timelyDataObj =>
                                        <option key={timelyDataObj.TFID} value={timelyDataObj.TFID}>{timelyDataObj.Insurance}</option>
                                    )}
                                </Field>
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Accident Classification">
                                Accident Classification
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="AccdntType" component="select">
                                    {patientsMasterData.AccidentClassification.map(accClass =>
                                        <option key={accClass.AccidentTypeID} value={accClass.AccidentTypeID}>{accClass.AccidentDesc}</option>
                                    )}
                                </Field>
                            </div>
                        </div>
                        {MVAVisibility &&
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Accident Classification">
                                MVA Type
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="MVAType" component="select">
                                    <option value="Select"/>
                                    <option value="Single">Single</option>
                                    <option value="Multiple">Multiple</option>
                                    <option value="None">None</option>
                                </Field>
                            </div>
                        </div>
                        }
                        {MVAVisibility &&
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Accident Classification">
                                Occupant
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                <Field name="Occupant" component="select">
                                    <option value="Select"/>
                                    <option value="Driver">Driver</option>
                                    <option value="Passenger">Passenger</option>
                                    <option value="Pedestrian">Pedestrian</option>
                                    <option value="None">None</option>
                                </Field>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'patientDetailsForm'
})(DashboardPatientsDetailsForm);
