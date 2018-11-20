import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

import '../../DashboardAddInsuranceMenu.scss';
import cookies from '../../../../../../cookies.es6';
import FormBuilder from '../../../../../../components/FormBuilder/FormBuilder.jsx';
import { formStep3Config } from './formStep3Config.es6';
import { combineArrayAndObjectValues } from '../../../../../../components/FormBuilder/FormBuilderHelpers.es6';

class DashboardAddInsuranceStep3 extends React.Component {
    getFormData = () => {
        const additionalFormData = {
            PatientID: 0,
            MainID: 0,
            InsID: 0,
            Company: '',
            Address: '',
            City: '',
            State: '',
            Zip: '',
            ClaimNo: '',
            Adjuster: '',
            Phno: '',
            TypeCoverage: '',
            InsCoverage: 0,
            PolicyLimits: '',
            Comment: '',
            FaxNo: '',
            Status: '',
            ExpectedRecovery: 0.0,
            AdjustedAmount: 0.0,
            PolicyHolderName: '',
            PolicyNumber: '',
            ImplantCost: 0.0,
            TempInsurance: '',
            Verified: 0,
            ModifiedBy: cookies.get('EmployeeId'),
            SelectedGroupArr: null,
            prevMainID: 0,
            SettlementDate: '',
            BilledDate: ''
        };

        if(this.props.editInsuranceItem.ClaimNo && this.form3.state.ClaimNo) {
            additionalFormData.ClaimNo = this.form3.state.ClaimNo;
        } else if(this.props.editInsuranceItem.ClaimNo) {
            additionalFormData.ClaimNo = this.props.editInsuranceItem.ClaimNo;
        }
        for (const field in this.form3.state) {
            if(!this.form3.state[field]) {
                this.props.editInsuranceItem[field] = '';
            }
        }

        const formData = _.extend(this.props.selectedInsurance, this.form3.state);

        if (formData.Status && !_.isString(formData.Status)) {
            formData.Status = '';
        }
        if(!formData.Status) {
            if(_.isEmpty(this.props.editInsuranceItem)) {
                formData.Status = 'Open';
            } else {
                formData.Status = this.props.editInsuranceItem.prevStatus;
            }
        }
        const form3state = _.merge(additionalFormData, formData);
        delete form3state.Update1;
        if (form3state.Verified) {
            form3state.Verified = 1;
        } else {
            form3state.Verified = 0;
        }
        if (!_.isString(form3state.Status)) {
            form3state.Status = '';
        }
        const typeCoverageValue = _.filter(this.props.typeCoverage, (value) => {
            return form3state.TypeCoverage == value.InsCoverageID;
        });
        form3state.TypeCoverage = typeCoverageValue.length !== 0 && typeCoverageValue[0].Coverage;
        form3state.InsCoverage = typeCoverageValue.length !== 0 && typeCoverageValue[0].InsCoverageID;

        return form3state;
    };

    formatPhoneNumber = (number) => {
        if(number) {
            number = number.replace(/-/g, '');
            number = number.replace('(', '');
            number = number.replace(')', '');
            return '(' + number.substr(0, 3) + ')-' + number.substr(3, 3) + '-' + number.substr(6, 4);
        }
        return '';
    };

    render() {
        const { selectedInsurance, typeCoverage, insuranceStatus, groupAccountLoading, groupAccountData} = this.props;
        let { editInsuranceItem } = this.props;
        let configList = {};

        if(!groupAccountLoading && _.isArray(groupAccountData)) {
            if(!_.isEmpty(editInsuranceItem)) {
                if(!_.isEmpty(selectedInsurance) && selectedInsurance.InsID) {
                    editInsuranceItem.prevInsID = editInsuranceItem.InsID;
                    editInsuranceItem = _.extend(editInsuranceItem, selectedInsurance);
                    editInsuranceItem.InsID = editInsuranceItem.prevInsID;
                    editInsuranceItem.MainID = selectedInsurance.InsID;
                }
                if(!editInsuranceItem.TypeCoverage) {
                    editInsuranceItem.TypeCoverage = typeCoverage;
                } else {
                    const indexTypeCoverage = _.findIndex(formStep3Config, { name : 'TypeCoverage' });
                    if(indexTypeCoverage > -1) {
                        formStep3Config[indexTypeCoverage].defaultValue = _.cloneDeep(editInsuranceItem.InsCoverage);
                    }
                    editInsuranceItem.TypeCoverage = typeCoverage;
                }
                if (!editInsuranceItem.Status) {
                    editInsuranceItem.Status = insuranceStatus;
                } else {
                    const statusTypeCoverage = _.findIndex(formStep3Config, { name : 'Status' });
                    if(statusTypeCoverage > -1) {
                        formStep3Config[statusTypeCoverage].defaultValue = _.cloneDeep(_.isString(editInsuranceItem.Status) ? editInsuranceItem.Status.trim() : _.isString(editInsuranceItem.prevStatus) ?  editInsuranceItem.prevStatus.trim() : formStep3Config[statusTypeCoverage].defaultValue);
                        if(!formStep3Config[statusTypeCoverage].defaultValue && editInsuranceItem.MainID !== 0 && editInsuranceItem.TempInsurance.trim().length === 0) {
                            formStep3Config[statusTypeCoverage].defaultValue = 'Open';
                        }
                    }
                    editInsuranceItem.Status = insuranceStatus;
                }
                if(moment(editInsuranceItem.SettlementDate).format('YYYY-MM-DDTHH-mm-ss') === '0001-01-01T00-00-00') {
                    editInsuranceItem.SettlementDate = null;
                }
                if(moment(editInsuranceItem.BilledDate).format('YYYY-MM-DDTHH-mm-ss') === '0001-01-01T00-00-00') {
                    editInsuranceItem.BilledDate = null;
                }
                if(editInsuranceItem.Verified == 1) {
                    editInsuranceItem.Verified = true;
                } else if(editInsuranceItem.Verified) {
                    editInsuranceItem.Verified = true;
                } else {
                    editInsuranceItem.Verified = false;
                }
                if(editInsuranceItem.FaxNo) {
                    editInsuranceItem.FaxNo = this.formatPhoneNumber(editInsuranceItem.FaxNo);
                }
                if(editInsuranceItem.Phno) {
                    editInsuranceItem.Phno = this.formatPhoneNumber(editInsuranceItem.Phno);
                }
                configList = combineArrayAndObjectValues({
                    configArr: formStep3Config,
                    valuesObj: editInsuranceItem,
                    configField: 'name',
                    valuesField: 'name'
                });
            }
        } else if (_.isEmpty(editInsuranceItem)) {
            formStep3Config.forEach((value) => {
                value.value = '';
                if(value.defaultValue) {
                    value.defaultValue = 0;
                }
            });
            formStep3Config.forEach((eachStep) =>{
                if(eachStep.name === 'Status') {
                    eachStep.defaultValue = 'Open';
                }
            });
            selectedInsurance.TypeCoverage = typeCoverage;
            selectedInsurance.Status = insuranceStatus;
            if(selectedInsurance.FaxNo) {
                selectedInsurance.FaxNo = this.formatPhoneNumber(selectedInsurance.FaxNo);
            }
            if(selectedInsurance.Phno) {
                selectedInsurance.Phno = this.formatPhoneNumber(selectedInsurance.Phno);
            }
            configList = combineArrayAndObjectValues({
                configArr: formStep3Config,
                valuesObj: selectedInsurance,
                configField: 'name',
                valuesField: 'name'
            });
        } else {
            return (<div></div>);
        }

        return (
            <div className="change-insurance-adjuster">
                {!_.isEmpty(editInsuranceItem) &&
                    <ul>
                        <li>
                            <button  className="change-adjuster"  onClick={this.props.onChangeAdjuster}>Change Adjuster</button>
                        </li>
                    </ul>
                }
                <FormBuilder
                    ref={ ( form3 ) => this.form3 = form3 }
                    config={configList}
                />
            </div>
        );
    }
}

export default DashboardAddInsuranceStep3;
