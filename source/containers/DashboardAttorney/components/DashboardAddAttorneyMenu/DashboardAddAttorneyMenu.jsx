import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { map } from 'lodash';
import { connect } from 'react-redux';
import _ from 'lodash';

import {saveAttorney} from '../../actions.es6'
import notifications from '../../../../notifications.jsx';
import cookies from '../../../../cookies.es6';
import './DashboardAddAttorneyMenu.scss';

class DashboardAddAttorneyMenu extends React.Component {
    constructor(props) {
        super(props); 

         this.onSaveAttorney=this.onSaveAttorney.bind(this);
         this.onCheckInput=this.onCheckInput.bind(this);
         this.onCheckextInput=this.onCheckextInput.bind(this);
     }
     componentDidMount() {
        const { patientId, initialize, selectMainAttorney, isEdit } = this.props;       
        if(isEdit && selectMainAttorney) {
            if(selectMainAttorney.Mobile.length<=10)
            {                
                selectMainAttorney.Mobile = selectMainAttorney.Mobile.replace(/(\d{3})(\d{3})(\d{4})/, '($1) -$2-$3');
            }
            initialize(selectMainAttorney);
        }
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
    onCheckextInput(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length <= 5) {
            e.target.value=onlyNums;
        }
    }
     onSaveAttorney()
     {
         const {attorneyForm,onSaveAttorney,onHideSideListMenu,selectMainAttorney,isEdit,Search,attorneyList}=this.props;
         if(attorneyForm.values)
         {
             if(attorneyForm.values.AttFirstName &&  attorneyForm.values.AttLastName)
             {
                let error='';
                 if(attorneyForm.values.Mobile ||  attorneyForm.values.Phone || attorneyForm.values.Fax || attorneyForm.values.Email || attorneyForm.values.PhoneExt)
                 {                    
                    error+= attorneyForm.values.Mobile? attorneyForm.values.Mobile.length<10?'\n Cell Phone ':'':'';
                    error+= attorneyForm.values.Phone? attorneyForm.values.Phone.length<10?'\n Phone ':'':'';
                    error+= attorneyForm.values.Fax? attorneyForm.values.Fax.length<10?'\n Fax ':'':'';
                    error+=attorneyForm.values.PhoneExt? attorneyForm.values.PhoneExt.length<5?'\n Ext':'':'';
                    if(attorneyForm.values.Email)
                    {
                        var atpos = attorneyForm.values.Email.indexOf("@");
                        var dotpos = attorneyForm.values.Email.lastIndexOf(".");
                        if (atpos<1 || dotpos<atpos+2 || dotpos+2>=attorneyForm.values.Email.length) {
                           error+="\n Email"
                        }
                    }
                 }
                 if(error.trim().length>0)
                 {
                     notifications.showWarning("Following Fields format is not correct"+error);
                 }
                 else
                 {
                    let mobile='';
                     if(attorneyForm.values.Mobile)
                     {
                        mobile=attorneyForm.values.Mobile.replace(') -','');
                        mobile=mobile.replace('(','');
                        mobile=mobile.replace('-','');
                     }
                    let attorney={
                         'Address' : attorneyForm.values.Address ?attorneyForm.values.Address: "",
                         'AttFirm' : attorneyForm.values.AttFirm ?attorneyForm.values.AttFirm: "",
                         'AttFirstName' : attorneyForm.values.AttFirstName,
                         'AttLastName' : attorneyForm.values.AttLastName,
                         'AttName' : attorneyForm.values.AttFirstName + " " + attorneyForm.values.AttLastName,
                         'AttorneyID' :isEdit?selectMainAttorney.AttorneyID: 0,
                         'City' : attorneyForm.values.City ?attorneyForm.values.City: "",
                         'Country' : attorneyForm.values.Country ?attorneyForm.values.Country :'USA',
                         'Email' : attorneyForm.values.Email ?attorneyForm.values.Email: "",
                         'Fax' : attorneyForm.values.Fax ?attorneyForm.values.Fax: "",
                         'Mobile' : mobile,
                         'Phone' : attorneyForm.values.Phone ?attorneyForm.values.Phone: "",
                         'PhoneExt' : attorneyForm.values.PhoneExt ?attorneyForm.values.PhoneExt: "",
                         'State' : attorneyForm.values.State ?attorneyForm.values.State: "",
                         'Zip' : attorneyForm.values.Zip ?attorneyForm.values.Zip: "",
                         'EID' : cookies.get('EmployeeId')
                     };
                     if(isEdit)
                     {
                         if(attorneyList.length===1)
                         {
                            Search.FName=attorneyForm.values.AttFirstName;
                            Search.LName=attorneyForm.values.AttLastName;
                            Search.Firm=attorneyForm.values.AttFirm ?attorneyForm.values.AttFirm: ""
                         }
                     }
                     onSaveAttorney(attorney,Search);
                     onHideSideListMenu();
                 }
                
            }
            else
            {
                notifications.showWarning("First name and Last name are mandatory fields.")
            }
         }
         else
         {
             notifications.showWarning("First name and Last name are mandatory fields.")
         }
     }
    render() {
        const { onHideSideListMenu,stateData, onSaveAttorney, attorneyForm, selectMainAttorney ,isEdit,attorneyList} = this.props;
        const countryValue = attorneyForm ? attorneyForm.values? attorneyForm.values.Country? attorneyForm.values.Country: 'USA':'USA':'USA';
        return (
            <div className="dashboard-insurance_menu dashboard-insurance_add-insurance">
                <div>
                    <div className="dashboard-side-list-menu_header">
                       {isEdit?'Edit Attorney':'Add Attorney'} 
                    </div>
                    <div className="dashboard-side-list-menu_content">
                        <div className="side-list-content">
                            <ul className="add-list add-patient-menu">
                                <li>
                                    <div className="add-list_key">
                                        First Name<span className="add-list_required"> *</span>
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="AttFirstName" component="input" type="text" />
                                    </div>
                                </li>
                                <li className="margin-bottom">
                                    <div className="add-list_key">
                                        Last Name<span className="add-list_required"> *</span>
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="AttLastName" component="input" type="text" />
                                    </div>
                                </li>
                                <li>
                                    <div className="add-list_key">
                                        Firm
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="AttFirm" component="input" type="text" />
                                    </div>
                                </li>
                                <li>
                                    <div className="add-list_key">
                                        Address
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="Address" component="textarea" type="text"/>
                                    </div>
                                </li>
                                <li className="margin-bottom">
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
                                            <option value="USA">USA</option>
                                            <option value="Canada">Canada</option>
                                        </Field>
                                        
                                    </div>
                                </li>
                                <li>
                                    <div className="add-list_key">
                                        State
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="State" component="select">
                                         <option />
                                         {
                                            _.filter(stateData, {Country: countryValue}).map(state =>
                                                <option key={state.StateName} value={state.StateCode}>{state.StateName}</option>
                                            )
                                         }</Field>
                                    </div>
                                </li>
                                <li>
                                    <div className="add-list_key">
                                       Zip
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="Zip" component="input" type="number" />
                                    </div>
                                </li>
                                <li>
                                    <div className="add-list_key">
                                        Phone No
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="Phone" component="input" maxLength="10"  onInput={this.onCheckInput} type="text"/> 
                                    </div>
                                </li>                               
                                <li>
                                    <div className="add-list_key">
                                        Ext
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="PhoneExt" component="input" maxLength="5" onInput={this.onCheckextInput} type="text" />
                                    </div>
                                </li>
                                <li>
                                    <div className="add-list_key">
                                        Fax No
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="Fax" component="input" maxLength="10" onInput={this.onCheckInput} type="text" />
                                    </div>
                                </li>
                                <li>
                                    <div className="add-list_key">
                                        Cell Phone
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="Mobile" component="input" maxLength="10" onInput={this.onCheckInput} type="text" />
                                    </div>
                                </li>
                                <li>
                                    <div className="add-list_key">
                                        Email
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="Email" component="input" type="text"/>
                                    </div>
                                </li>
                            </ul>
                            <div className="adds-buttons-block">
                                <button className="adds-buttons-block_cancel-btn" onClick={onHideSideListMenu}>
                                    Cancel
                                </button>
                                <button className="adds-buttons-block_next-btn" onClick={this.onSaveAttorney}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {       
        attorneyForm:state.form.attorneyForm,
        selectMainAttorney: state.attorneyReducer.selectMainAttorney,
        attorneyList: state.attorneyReducer.attorneyMainList
    };
};

const mapDispatchToProps = dispatch => {
    return {       
        onSaveAttorney: (data,search) => {
            dispatch(saveAttorney(data,search));
        }
    };
};

DashboardAddAttorneyMenu= reduxForm({
    form: 'attorneyForm'
})(DashboardAddAttorneyMenu);

export default connect(
mapStateToProps,
mapDispatchToProps
)(DashboardAddAttorneyMenu);
