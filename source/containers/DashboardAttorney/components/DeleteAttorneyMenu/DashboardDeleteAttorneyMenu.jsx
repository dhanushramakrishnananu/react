import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { nextStep, prevStep } from '../../../DashboardBase/actions.es6';
import {
    searchAttorneyDetails,
    insertAttorney,
    setSelectedAttorney,
    updateAttorneyByPatientID,
    cleardata,
    changeAdjuster,
    getAttorneyPostGroup,
    postToGroupAttorney,
    setConfirmAttorney
} from './actions.es6';
import DashboardDeleteAttorneyStep2 from './DashboardDeleteAttorneyStep2/DashboardDeleteAttorneyStep2.jsx';
import DashboardDeleteAttorneyStep1 from './DashboardDeleteAttorneyStep1/DashboardDeleteAttorneyStep1.jsx';
import DashboardDeleteAttorneyStep3 from './DashboardDeleteAttorneyStep3/DashboardDeleteAttorneyStep3.jsx';
import Popup from '../../../../components/Popup/Popup.jsx';
import './DashboardDeleteAttorneyMenu.scss';
import {showSideListMenu,GetPatientsByAttorney,deleteAttorney,GetPatientsbyAttorneyID } from "../../actions.es6";
import _ from 'lodash';
import notifications from '../../../../notifications.jsx';
import cookies from '../../../../cookies.es6';
import CloseIcon from '../../../../assets/icons/CloseIconblack.jsx';

const BUTTON_CLASS = 'adds-buttons-block_next-btn';

class DashboardDeleteAttorneyMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDelete: false,
            isDeleteReplace:false
        };
        this._onStep1Handler = this._onStep1Handler.bind(this);
        this._onStep2Handler = this._onStep2Handler.bind(this);
        this._onStep3Handler = this._onStep3Handler.bind(this);
        this._onBackHandler = this._onBackHandler.bind(this);
        this._onStep2SearchHandler = this._onStep2SearchHandler.bind(this);
        this._canceldata = this._canceldata.bind(this);
        this._onStep3popupHandler=this._onStep3popupHandler.bind(this);
        this.deleteAttorney=this.deleteAttorney.bind(this);
        this._onStep5Handler = this._onStep5Handler.bind(this);
        this._onStep5popupHandler=this._onStep5popupHandler.bind(this);
        this.deleteAndReplaceAttorney=this.deleteAndReplaceAttorney.bind(this);
        this._onStep4Handler=this._onStep4Handler.bind(this);
        this._onStep4SearchHandler=this._onStep4SearchHandler.bind(this);
        this._onBackstep5Handler=this._onBackstep5Handler.bind(this);
    }   
     _canceldata() {     
        this.props.onCleardata();
        this.props.onHideSideListMenu();
    }

    _onStep1Handler() {
        let formData = this.step1.getFormData();
        this.props.onSearchAttorneyDetails(formData);
        this.props.onNextStep();
    }

    _onStep2Handler() {      
        this.props.onGetPatientsbyAttorneyID(this.props.selectedAttorney.AttorneyID);       
        this.props.onNextStep();
    }

    _onStep2SearchHandler() {
        let formData = this.step2.getFormData();
        this.props.onSearchAttorneyDetails(formData);
    }
    _onStep4SearchHandler() {
        let formData = this.step4.getFormData();
        this.props.onSearchAttorneyDetails(formData);
    }
    _onStep3Handler() {
        this.setState({
            isDelete: true
        });     
    }
    _onStep3popupHandler() {      
        this.setState({
            isDelete: false
        });     
    }
    deleteAttorney()
    {
        this.props.onDeleteAttorney(this.props.selectedAttorney.AttorneyID,0)
        this.props.onCleardata();
        this.props.onHideSideListMenu();
    }
    deleteAndReplaceAttorney()
    {
        this.props.onDeleteAttorney(this.props.selectedAttorney.AttorneyID,this.props.selectedReplaceAttorney.AttorneyID)
        this.props.onCleardata();
        this.props.onHideSideListMenu();
    }
    _onBackHandler() {
        this.props.onPrevStep();       
        this.props.onSetSelectedAttorney({});       
    }
    _onBackstep5Handler() {
        this.props.onPrevStep();       
        this.props.onSetReplaceAttorney({});       
    }
    _onStep4Handler() {
       if(this.props.selectedReplaceAttorney.AttorneyID!==this.props.selectedAttorney.AttorneyID)
       {
            this.props.onGetPatientsbyAttorneyID(this.props.selectedReplaceAttorney.AttorneyID);       
            this.props.onNextStep();
       }
       else
       {
           notifications.showWarning("Select different attorney to replace, can not replace with the same.");
       }
    }
    _onStep5Handler() {      
        this.setState({
            isDeleteReplace: true
        });     
    }
    _onStep5popupHandler() {      
        this.setState({
            isDeleteReplace: false
        });     
    }
    changeAdjuster = () => {
        this.props.onChangeAdjuster(1);
    };
    render() {
        const { attorneyList,onPrevStep,isEdit,
            patientsMasterData, selectedStep,onSelectPatients,
            onHideSideListMenu, selectedAttorney,
            searchFields, attorneyListLoading,
            onSetSelectedAttorney,canceldata,onCleardata,            
            patientId, onInsertPostToGroupAttorney,deleteattorneyForm,
            selectedReplaceAttorney,onNextStep,onSetReplaceAttorney,
            PatientList, onGetPatientsbyAttorneyID} = this.props;
        
        this.stepsList = [
            <DashboardDeleteAttorneyStep1
            onHideSideListMenu={onHideSideListMenu}
            ref={step => this.step1 = step}
            searchFields={searchFields}
            />,            
            <DashboardDeleteAttorneyStep2
            patientsMasterData={patientsMasterData}
            attorneyList={attorneyList}
            searchFields={searchFields}
            attorneyListLoading={attorneyListLoading}
            onSetSelectedAttorney={onSetSelectedAttorney}
            ref={step => this.step2 = step}
            />,
            <DashboardDeleteAttorneyStep3
            attorneyListLoading={attorneyListLoading}
            PatientList={PatientList}
            selectedAttorney={selectedAttorney}
            searchFields={searchFields}
            ref={step => this.step3 = step}
            />,
            <DashboardDeleteAttorneyStep2
            patientsMasterData={patientsMasterData}
            attorneyList={attorneyList}
            searchFields={searchFields}
            attorneyListLoading={attorneyListLoading}
            onSetSelectedAttorney={onSetSelectedAttorney}
            ref={step => this.step4 = step}
            onSetReplaceAttorney={onSetReplaceAttorney}
            isDeleteConfirm={true}
            />,
            <DashboardDeleteAttorneyStep3  
            attorneyListLoading={attorneyListLoading}
            searchFields={searchFields}
            PatientList={PatientList}
            ref={step => this.step5 = step}
            isReplaceConfirm={true}
            selectedReplaceAttorney={selectedReplaceAttorney}
            selectedAttorney={selectedAttorney}
            />
        ];
        const msg=this.state.isDelete?'Are you sure, you want to delete the attorney '+selectedAttorney.AttFirstName+' '+ selectedAttorney.AttLastName +' without replacing with another attorney?':'';
        const msg1=this.state.isDeleteReplace?'Are you sure, you want to delete the attorney '+selectedAttorney.AttFirstName+' '+ selectedAttorney.AttLastName +' and replace with '+ selectedReplaceAttorney.AttFirstName+' '+ selectedReplaceAttorney.AttLastName+'?':'';        
        return (            
            <div className="dashboard-insurance_menu dashboard-insurance_add-insurance">
            {this.state.isDelete &&
                <Popup   message={msg}               
                onCLose={() => this._onStep3popupHandler()}
                onOk={() => this.deleteAttorney()}                
                yesLabel='Yes'
                noLabel='No'/>
            }
            {this.state.isDeleteReplace &&
                <Popup   message={msg1}
                onCLose={() => this._onStep5popupHandler()}
                onOk={() => this.deleteAndReplaceAttorney()} 
                noLabel='No'
                yesLabel='Yes'/>
            }
            <div>
                <div>
                    <div className="dashboard-side-list-menu_header">
                        Delete Attorney(Step {selectedStep}/5)
                        <button className="closeicn" onClick={this._canceldata}>
                            <CloseIcon/>
                        </button>
                    </div>
                </div>
                <div className="dashboard-side-list-menu_content">
                    <div className="side-list-content">
                       {this.stepsList[selectedStep-1]}
                        <div className='adds-buttons-block'>
                            {selectedStep === 1  &&
                                <button className='adds-buttons-block_cancel-btn' onClick={this._canceldata}>
                                    Cancel
                                </button>
                            }
                            {selectedStep === 1 &&
                                <button className={BUTTON_CLASS} onClick={this._onStep1Handler}>
                                    Search
                                </button>
                            }
                            {selectedStep === 2 &&
                                <button className='adds-buttons-block_cancel-btn' onClick={this._onBackHandler}>
                                    Back
                                </button>
                            }
                            {selectedStep === 2 && _.isEmpty(selectedAttorney) &&
                                <button className={BUTTON_CLASS} onClick={this._onStep2SearchHandler}>
                                    Search
                                </button>
                            }
                            {selectedStep === 2 && !_.isEmpty(selectedAttorney) &&
                                <button className={BUTTON_CLASS} onClick={this._onStep2Handler}>
                                    Next
                                </button>
                            }
                            {selectedStep === 3 &&
                                <button className='adds-buttons-block_cancel-btn' onClick={this._onBackHandler}>
                                    Back
                                </button>
                            }
                            {selectedStep === 3 &&
                                <button className={BUTTON_CLASS} onClick={this._onStep3Handler.bind(this)}>
                                    Delete
                                </button>
                            }
                            {selectedStep === 3 &&
                                <button className='adds-buttons-block_delete-btn' ref="btn1" onClick={onNextStep}>
                                    Delete & Replace
                                </button>
                            }
                            {selectedStep === 4 &&
                                <button className={BUTTON_CLASS} onClick={this._onStep4SearchHandler}>
                                    Search
                                </button>
                            }
                            {selectedStep === 4 && !_.isEmpty(selectedReplaceAttorney) &&
                                <button className='adds-buttons-block_nxt-btn' onClick={this._onStep4Handler}>
                                    Next
                                </button>
                            }
                            {selectedStep === 5 &&
                                <button className='adds-buttons-block_cancel-btn' onClick={this._onBackstep5Handler}>
                                    Back
                                </button>
                            }
                            {selectedStep === 5 &&
                                 <button className={BUTTON_CLASS} onClick={this._onStep5Handler.bind(this)}>
                                     Confirm
                                 </button>
                            }
                            {selectedStep === 5 && 
                                <button className='adds-buttons-block_delete-btn' onClick={this._onStep3Handler.bind(this)}>
                                    Delete
                                </button>
                            }
                        </div>
                    </div>
                </div>
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
        attorneyList: state.attorneyReducer.attorneyList,
        selectedAttorney: state.attorneyReducer.selectedAttorney,
        searchFields: state.attorneyReducer.searchFields,
        attorneyListLoading: state.attorneyReducer.attorneyListLoading,
        PatientList: state.attorneyReducer.PatientsByAttorneyID,
        selectedReplaceAttorney:state.attorneyReducer.selectedConfirmAttorney
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
        onSearchAttorneyDetails: (data) => {
            if((data.FirstName?data.FirstName.trim().length>0 : data.FirstName)|| (data.LastName?data.LastName.trim().length>0 : data.LastName)|| (data.Firm?data.Firm.trim().length>0:data.Firm)) {
               dispatch(searchAttorneyDetails(data));
            } else {
                notifications.showWarning('Please enter atleast one search criteria.');
            }
        },
        onSetSelectedAttorney: (data) => {
            dispatch(setSelectedAttorney(data));
        },
        onShowSideListMenu: (menuName) => {
            dispatch(showSideListMenu(menuName));
        },
        onCleardata: ()=>{
            dispatch(cleardata());
        },
        onSelectPatients:(data)=>{ 
            dispatch(GetPatientsByAttorney(data));
        },
        onDeleteAttorney:(aid,rid)=>{
            dispatch(deleteAttorney(aid,rid));
        },
        onSetReplaceAttorney:(data)=>
        {
            dispatch(setConfirmAttorney(data));
        },
        onGetPatientsbyAttorneyID:(id)=>{
            dispatch(GetPatientsbyAttorneyID(id));
        }
    }
       
};
DashboardDeleteAttorneyMenu= reduxForm({
    form: 'deleteattorneyForm'
})(DashboardDeleteAttorneyMenu);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardDeleteAttorneyMenu);
