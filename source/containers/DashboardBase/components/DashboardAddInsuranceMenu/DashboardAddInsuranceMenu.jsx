import React from 'react';
import { connect } from 'react-redux';
import Popup from '../../../../components/Popup/Popup.jsx';

import { nextStep, prevStep } from '../../../DashboardBase/actions.es6';
import {
    searchInsuranceDetails,
    setSelectedInsurance,
    saveInsurance,
    tempSaveInsurance,
    changeAdjuster,
    editInsurance,
    getGroupAccounts,
    searchDetailsInitial,
    editCancel
} from './actions.es6';
import cookies from '../../../../cookies.es6';
import LoadingComponent from '../../../../components/LoadingComponent/Loading.jsx';
import DashboardAddInsuranceStep1 from './components/DashboardAddInsuranceStep1/DashboardAddInsuranceStep1.jsx';
import DashboardAddInsuranceStep2 from './components/DashboardAddInsuranceStep2/DashboardAddInsuranceStep2.jsx';
import DashboardAddInsuranceStep3 from './components/DashboardAddInsuranceStep3/DashboardAddInsuranceStep3.jsx';
import PostToGroup from './components/PostToGroup/PostToGroup.jsx';

import notifications from '../../../../notifications.jsx';

import './DashboardAddInsuranceMenu.scss';
import { showSideListMenu } from '../../actions.es6';
import _ from 'lodash';

const BUTTON_CLASS = 'adds-buttons-block_next-btn';

class DashboardAddInsuranceMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tempValue: true,
            isPopDialogOpen: false
        };

        this.onStep1Handler = this.onStep1Handler.bind(this);
        this.onStep2Handler = this.onStep2Handler.bind(this);
        this.onStep3Handler = this.onStep3Handler.bind(this);
        this.onBackHandler = this.onBackHandler.bind(this);
        this.onStep2SearchHandler = this.onStep2SearchHandler.bind(this);
        this.saveTempInsurance = this.saveTempInsurance.bind(this);
        this.tempSave = this.tempSave.bind(this);
        this.postGroupData = this.postGroupData.bind(this);
        this.getEditFormData = this.getEditFormData.bind(this);
        this.onNo = this.onNo.bind(this);

        const {editInsuranceItem, onGetGroupAccounts} = props;
        if(!_.isEmpty(editInsuranceItem)) {
            onGetGroupAccounts(editInsuranceItem.PatientID, editInsuranceItem.MainID, 2);
        }
    }

    componentWillMount() {
        this.props.onSetSelectedInsurance({});
        this.props.onSearchDetailsInitial();
    }

    onStep1Handler() {
        let formData = this.step1.getFormData();

        if(_.isEmpty(formData)) {
            formData = this.props.searchFields;
        }
        if(!_.isEmpty(formData)) {
            if(formData.Company || formData.Adjuster) {
                formData = _.extend(this.props.searchFields, formData);
                this.props.onSearchInsuranceDetails(formData);
                this.props.onNextStep();
            }
        }

        if(_.isEmpty(formData)) {
            notifications.showWarning('Please Provide Insurance Company or Adjuster');
        } else if(!formData.Company && !formData.Adjuster) {
            notifications.showWarning('Please Provide Insurance Company or Adjuster');
        }
    }

    onStep2Handler() {
        this.props.onNextStep();
    }

    postGroupData(formData) {
        const {selectGroup} = this.step4.getFormData();

        let selectValue = [];
        selectGroup.forEach((value) => {
            if(value.selected) {
                selectValue.push(`${value.PatientId}`);
            }
        });

        formData.selectedGroupArr = selectValue;
        if(!_.isString(formData.TypeCoverage)) {
            formData.TypeCoverage = '';
        }
        if(!_.isString(formData.Status)) {
            formData.Status = '';
        }
        formData.PrevInscoverage = formData.prevInsCoverage;
        if(selectValue.length) {
            this.props.onEditInsurance(formData, this.props.selectedStep);
            this.props.onShowSideListMenu(null);
        } else {
            notifications.showWarning('Please select at least one from above');
        }
    }

    onStep2SearchHandler() {
        let formData = this.step2.getFormData();
        formData = _.extend(this.props.searchFields, formData.state) ;
        if(formData.Company || formData.Adjuster) {
            this.props.onSearchInsuranceDetails(formData);
        } else {
            notifications.showWarning('Please Provide Insurance Company or Adjuster to search');
        }
    }

    saveTempInsurance(value) {
        if(value) {
            this.setState({
                tempValue: false
            });
        } else {
            this.setState({
                tempValue: true
            });
        }
    }

    changeAdjuster = () => {
        this.props.onChangeAdjuster(1);
    };

    getEditFormData() {
        let formData = this.step3.getFormData();
        const claimNo = formData.ClaimNo;
        const insCoverage = formData.InsCoverage;
        const typeCoverage = formData.TypeCoverage;
        const status = formData.Status;

        if(_.isEmpty(this.props.groupAccountData)) {
            for(const key in formData) {
                if(formData[key]) {
                    this.props.editInsuranceItem[key] = formData[key];
                }
            }
        }
        if(formData.ClaimNo !== claimNo) {
            this.props.editInsuranceItem.ClaimNo = claimNo;
        }

        const formFields = ['PolicyLimits', 'ExpectedRecovery', 'PolicyHolderName', 'AdjustedAmount', 'PolicyNumber', 'SettlementDate', 'BilledDate', 'Comment', 'Verified']

        formFields.forEach(field =>{
            if(formData[field]) {
                this.props.editInsuranceItem[field] = formData[field];
            }
        });

        formData = this.props.editInsuranceItem;

        if (_.isString(typeCoverage)) {
            formData.TypeCoverage = typeCoverage;
            formData.InsCoverage = insCoverage;
        } else {
            if(!_.isString(formData.TypeCoverage)) {
                const TypeCoverageValue = _.find(formData.TypeCoverage, {InsCoverageID: formData.prevInsCoverage});
                formData.TypeCoverage = TypeCoverageValue ? TypeCoverageValue.Coverage : '';
                formData.InsCoverage = TypeCoverageValue ? TypeCoverageValue.InsCoverageID : '';
            }
        }
        if (_.isString(status)) {
            formData.Status = status;
        }
        if (formData.ClaimNo !== claimNo) {
            formData.ClaimNo = claimNo;
        }
        formData.PatientID = parseInt(this.props.patientId);
        return formData;
    }

    onStep3Handler() {
        if(!_.isEmpty(this.props.editInsuranceItem)) {
            const formData = this.getEditFormData();
            if (!formData.InsCoverage) {
                const TypeCoverageValue = _.find(formData.TypeCoverage, {InsCoverageID: formData.InsCoverage});
                formData.TypeCoverage = TypeCoverageValue ? TypeCoverageValue.Coverage : '';
                formData.InsCoverage = TypeCoverageValue ? TypeCoverageValue.InsCoverage : '';
            }
            const errors = {};
            let mandatory='';
            if (!formData.ClaimNo) {
                errors.ClaimNo = 'Required';
                mandatory = mandatory+'\n Claim No';
            }
            if (!formData.TypeCoverage) {
                errors.TypeCoverage = 'Required';
                mandatory = mandatory+'\n Type of Coverage';
            } 
            if(_.isEmpty(errors)) {
                if (_.isEmpty(this.props.groupAccountData)) {
                    this.props.onEditInsurance(formData, this.props.selectedStep);
                    this.props.onShowSideListMenu(null);
                } else {
                    this.setState({isPopDialogOpen: true});
                }
            } else {
                notifications.showWarning('Following are required fields:\n '+mandatory);
            }            
        } else {
            const formData = this.step3.getFormData();
            formData.PatientID = parseInt(this.props.patientId);
            formData.MainID = formData.InsID;
            formData.InsID = 0;
            const errors = {};
            let mandatory='';
            if (!formData.ClaimNo) {
                errors.ClaimNo = 'Required';
                mandatory = mandatory+'\n Claim No';
            }
            if (!formData.TypeCoverage) {
                errors.TypeCoverage = 'Required';
                mandatory = mandatory+'\n Type of Coverage';
            } 
            if(_.isEmpty(errors)) {
                this.props.onSaveInsurance(formData);
                this.props.onShowSideListMenu(null);
            } else {
                notifications.showWarning('Following are required fields:\n '+mandatory);
            }            
        }
    }

    editCancel = () => {
        this.props.onEditCancel();
        this.props.onHideSideListMenu();
    };

    onBackHandler() {
        this.props.onPrevStep();
        this.props.searchFields.Adjuster = "";
        this.props.searchFields.Company = "";
        if(this.props.selectedStep === 3) {
            this.props.onSetSelectedInsurance({});
        }
    }

    tempSave() {
        let formData = this.step1.getFormData();
        delete formData.Adjuster;
        delete formData.Company;
        formData.PatientID = parseInt(this.props.patientId);
        formData.MainID = 0;
        formData.InsID = 0;
        formData.Verified = 0;
        formData.Isverified = false;
        formData.ModifiedBy = cookies.get('EmployeeId');
        this.props.onTempSaveInsurance(formData);
        this.props.onShowSideListMenu(null);
    }

    handleClose = () => {
        this.setState({isPopDialogOpen: false});
    };

    onNo = (formData) => {
        const editData = formData();
        this.props.onEditInsurance(editData, this.props.selectedStep);
        this.props.onShowSideListMenu(null);
    };

    onYes = (formData) => {
        this.setState({
            formData: formData(),
            isPopDialogOpen: false
        });
        this.props.onNextStep();
    };

    render() {
        const { insuranceSearchList,
            patientsMasterData, selectedStep,
            onHideSideListMenu, selectedInsurance,
            searchFields, insuranceSearchListLoading,
            onSetSelectedInsurance, typeCoverage,
            insuranceStatus, editInsuranceItem,
            groupAccountData, groupAccountLoading } = this.props;

        this.stepsList = [
            <DashboardAddInsuranceStep1
                patientsMasterData={patientsMasterData}
                ref={step => this.step1 = step}
                saveTempInsurance={this.saveTempInsurance}
                tempValue={this.state.tempValue}
                editInsuranceItem={editInsuranceItem}
            />,
            <DashboardAddInsuranceStep2
                patientsMasterData={patientsMasterData}
                insuranceList={insuranceSearchList}
                searchFields={searchFields}
                insuranceListLoading={insuranceSearchListLoading}
                onSetSelectedInsurance={onSetSelectedInsurance}
                editInsuranceItem={editInsuranceItem}
                selectedInsurance={selectedInsurance}
                ref={step => this.step2 = step}
            />,
            <DashboardAddInsuranceStep3
                patientsMasterData={patientsMasterData}
                selectedInsurance={selectedInsurance}
                typeCoverage={typeCoverage}
                insuranceStatus={insuranceStatus}
                editInsuranceItem={editInsuranceItem}
                groupAccountLoading={groupAccountLoading}
                groupAccountData={groupAccountData}
                ref={step => this.step3 = step}
                onChangeAdjuster={this.changeAdjuster}
            />,
            <PostToGroup
                patientId={parseInt(this.props.patientId)}
                formData={this.state.formData}
                groupAccountData={groupAccountData}
                groupAccountLoading={this.props.groupAccountLoading}
                ref={step => this.step4 = step}
            />
        ];

        return (
            <div className='side-list-content add-attorney insurance-menu'>
                {groupAccountLoading ? <LoadingComponent/> : this.stepsList[selectedStep - 1]}
                {
                    this.state.isPopDialogOpen && groupAccountData.length > 0 &&
                         <Popup   message='Do you want to save this changes to any of the grouped account? '
                                    onCLose={() => this.onNo(this.getEditFormData)}
                                    onOk={() => this.onYes(this.getEditFormData)} 
                                    noLabel='No'
                                    yesLabel='Yes'/>
                }

                <div className='adds-buttons-block'>
                    {
                        selectedStep === 3 && !_.isEmpty(editInsuranceItem) ?
                            <button className='adds-buttons-block_cancel-btn' onClick={this.editCancel}>
                                Cancel insert
                            </button>:
                            selectedStep === 4 && !_.isEmpty(editInsuranceItem) ?
                                <button className='adds-buttons-block_cancel-btn' onClick={onHideSideListMenu}>
                                    Cancel edit
                                </button>:
                                selectedStep === 1 &&
                            <button className='adds-buttons-block_cancel-btn' onClick={onHideSideListMenu}>
                                Cancel
                            </button>
                            ||
                            <button className='adds-buttons-block_cancel-btn' onClick={this.onBackHandler}>
                                Back
                            </button>

                    }

                    {selectedStep === 1 && this.state.tempValue &&
                        <button
                            className={BUTTON_CLASS}
                            onClick={this.onStep1Handler} >
                            Search
                        </button>
                    }

                    {selectedStep === 1 && !this.state.tempValue &&
                    <button
                        className={BUTTON_CLASS}
                        onClick={this.tempSave} >
                        Save
                    </button>
                    }

                    {selectedStep === 2 && _.isEmpty(selectedInsurance) &&
                    <button
                        className={BUTTON_CLASS}
                        onClick={this.onStep2SearchHandler} >
                        Search
                    </button>
                    }

                    {selectedStep === 2 && !_.isEmpty(selectedInsurance) &&
                        <button
                            className={BUTTON_CLASS}
                            onClick={this.onStep2Handler} >
                            Next
                        </button>
                    }
                    {selectedStep === 3 &&
                        <button
                            className={BUTTON_CLASS}
                            onClick={this.onStep3Handler} >
                            Save
                        </button>
                    }
                    {selectedStep === 4 &&
                    <button
                        className={BUTTON_CLASS}
                        onClick={() => this.postGroupData(this.state.formData)} >
                        Save
                    </button>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const patientsMasterData = state.patientDetailsReducer.patientsMasterData;
    return {
        selectedStep: state.homeReducer.selectedStep,
        patientsMasterData: patientsMasterData,
        insuranceSearchList: state.insuranceReducer.insuranceSearchList,
        selectedInsurance: state.insuranceReducer.selectedInsurance,
        updateFlag: state.insuranceReducer.updateFlag,
        searchFields: state.insuranceReducer.searchFields,
        insuranceSearchListLoading: state.insuranceReducer.insuranceSearchListLoading,
        typeCoverage: state.patientDetailsReducer.patientDetails.PatientInsuranceModel.InsuranceCoverage,
        insuranceStatus: state.patientDetailsReducer.patientDetails.PatientInsuranceModel.InsuranceStatus,
        editInsuranceItem: state.insuranceReducer.selectedInsuranceItem,
        groupAccountLoading: state.insuranceReducer.groupAccountLoading,
        groupAccountData: state.insuranceReducer.groupAccountData
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
        onSearchInsuranceDetails: (data) => {
            dispatch(searchInsuranceDetails(data));
        },
        onSaveInsurance: (data) => {
            dispatch(saveInsurance(data));
        },
        onTempSaveInsurance: (data) => {
            dispatch(tempSaveInsurance(data));
        },
        onSetSelectedInsurance: (data) => {
            dispatch(setSelectedInsurance(data));
        },
        onShowSideListMenu: (menuName) => {
            dispatch(showSideListMenu(menuName));
        },
        onEditInsurance: (data, selectedStep) => {
            dispatch(editInsurance(data, selectedStep));
        },
        onChangeAdjuster: (data) => {
            dispatch(changeAdjuster(data));
        },
        onGetGroupAccounts: (PatientId, MainId, TypeId) => {
            dispatch(getGroupAccounts(PatientId, MainId, TypeId));
        },
        onSearchDetailsInitial: () => {
            dispatch(searchDetailsInitial({}));
        },
        onEditCancel: () => {
            dispatch(editCancel());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardAddInsuranceMenu);
