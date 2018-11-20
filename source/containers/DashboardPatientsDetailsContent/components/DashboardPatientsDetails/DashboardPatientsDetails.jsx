import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Popup from '../../../../components/Popup/Popup.jsx';
import moment from 'moment';
import cookies from '../../../../cookies.es6';

import DashboardCardComponent from '../DashboardCardComponent/DashboardCardComponent.jsx';
import DashboardPatientsDetailsInfo from '../DashboardPatientsDetailsInfo/DashboardPatientsDetailsInfo.jsx';
import DashboardPatientsDetailsForm from '../DashboardPatientsDetailsForm/DashboardPatientsDetailsForm.jsx';
import notifications from '../../../../notifications.jsx';
import './DashboardPatientsDetails.scss';
import { formFields } from './constants.es6';
import { updatePatientDetails, togglePatientForm, getTimelyFiling, deletePatient, showNotesPopUpOpened } from './actions.es6';
import { showSideListMenu, hideSideListMenu } from '../../../DashboardBase/actions.es6';
import { getGroupedPatients } from '../../../DashboardBase/components/BulkSelectPatients/actions.es6';

class DashboardPatientsDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false,
            RefName: '',
            isPopUpOpened: false,
            isStatusChanged: false,
            isAmountChanged: false,
            amountChangeText:'',
            issaveclick:false,
            NotesPopUpOpened:false
        };

        this.onExpandToggle = this.onExpandToggle.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this._onSetRefName = this._onSetRefName.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onSave = this.onSave.bind(this);
        this.statusClose = this.statusClose.bind(this);
        this.getPatientidFromGroup=this.getPatientidFromGroup.bind(this);
        this.amountpopupClose = this.amountpopupClose.bind(this);
        this.onnoteSave = this.onnoteSave.bind(this);
        this.handlenotespopClose=this.handlenotespopClose.bind(this);
         this.resetAmountChangeText = this.resetAmountChangeText.bind(this);
    }
    componentDidMount() {
        const {onGetGroupedPatients, patientInfo, GroupAcctOpenNotes, showNotesPopUpOpened, onShowNotesPopUpOpened } = this.props;
        
        onGetGroupedPatients(patientInfo.PatientID); 
        if(GroupAcctOpenNotes.length>0 && !showNotesPopUpOpened)
        {this.setState({NotesPopUpOpened:true});
        
        }          
    }
    _onSetRefName(RefName) {
        this.setState({RefName});
    }

    onExpandToggle(value) {
        this.setState({
            isExpanded: value,
            issaveclick:false
        });
    }
    handleOpen() {
        this.setState({isPopUpOpened: true});
    }
    handleClose() {
        this.setState({isPopUpOpened: false,
            isStatusChanged: false,
            issaveclick:false
        });
    }
    amountpopupClose(){
        this.setState({
            isAmountChanged: false,
            issaveclick:false,
            amountChangeText:''
        });
    }
    handlenotespopClose()
    {        
    this.setState({
            NotesPopUpOpened:false
        });
    
    }

    
    onSaveClick() {
        const { onUpdatePatientDetails, patientDetailsForm, patientInfo} = this.props;
        let mandatory='';
        let notValid='';
        let errormessage = '';
         this.setState({
            issaveclick: true
        });
        if(patientDetailsForm.values.ReferredBy===0) {
            mandatory=mandatory+'\n Provider';
        } if(patientDetailsForm.values.FirstName.trim().length===0) {
            mandatory=mandatory+'\n First Name';
        } if(patientDetailsForm.values.LastName.trim().length===0) {
            mandatory=mandatory+'\n Last Name';
        } if(patientDetailsForm.values.SSN.length>=1 && patientDetailsForm.values.SSN.length<9) {
            notValid=notValid+'\n SSN';
        } if(patientDetailsForm.values.HomePhone.trim().length>=1 && patientDetailsForm.values.HomePhone.trim().length<10) {
            notValid=notValid+'\n Home Phone';
        } if(patientDetailsForm.values.WorkPhone.trim().length>=1 && patientDetailsForm.values.WorkPhone.trim().length<10) {
            notValid=notValid+'\n Work Phone';
        } if(patientDetailsForm.values.AltPhone1.trim().length>=1 && patientDetailsForm.values.AltPhone1.trim().length<10) {
            notValid=notValid+'\n Alt Phone1 ';
        } if(patientDetailsForm.values.AltPhone2.trim().length>=1 && patientDetailsForm.values.AltPhone2.trim().length<10) {
            notValid=notValid+'\n Alt Phone2';
        } if(patientDetailsForm.values.AltPhone3.trim().length>=1 && patientDetailsForm.values.AltPhone3.trim().length<10) {
            notValid=notValid+'\n Alt Phone3';
        } if(patientDetailsForm.values.AltPhone4.trim().length>=1 && patientDetailsForm.values.AltPhone4.trim().length<10) {
            notValid=notValid+'\n Alt Phone4';
        } if(patientDetailsForm.values.AltPhone5.trim().length>=1 && patientDetailsForm.values.AltPhone5.trim().length<10) {
            notValid=notValid+'\n Alt Phone5';
        } if(patientDetailsForm.values.MobilePhone.trim().length>=1 && patientDetailsForm.values.MobilePhone.trim().length<10) {
            notValid=notValid+'\n MobilePhone';
        } if(patientDetailsForm.values.RelativePhone.trim().length>=1 && patientDetailsForm.values.RelativePhone.trim().length<10) {
            notValid=notValid+'\n RelativePhone';
        } if(patientDetailsForm.values.BilledPrimary===true) {
            mandatory=patientDetailsForm.values.BilledInsDate?mandatory: mandatory+'\n BilledInsDate';
        } if(patientDetailsForm.values.Timely1===0) {
            mandatory=mandatory+'\n Timely1';
        } if(mandatory.length>0 && notValid.length>0) {
            errormessage = 'Following are required fields:\n'+mandatory + '\n \n Following fields are not valid format :\n' +notValid;
        } else if(mandatory.length>0){
            errormessage = 'Following are required fields:\n'+mandatory ;
        } else if(notValid.length>0){
            errormessage = 'Following fields are not valid format :\n'+notValid ;
        }
        if(errormessage.length===0) {
            
            if(parseInt(patientInfo.CurrentBal, 10)!==parseInt(patientDetailsForm.values.CurrentBal, 10))
            {
                this.state.isAmountChanged=true;
                this.state.amountChangeText=this.state.amountChangeText+ 'Current Balance: Pervious value '+patientInfo.CurrentBal+' new value '+patientDetailsForm.values.CurrentBal+'\n';
                
            }
            if(parseInt(patientInfo.TotalCharges, 10)!==parseInt(patientDetailsForm.values.TotalCharges, 10))
            {
                this.state.isAmountChanged=true;
                this.state.amountChangeText= this.state.amountChangeText+ 'Total Charges: Pervious value '+patientInfo.TotalCharges+' new value '+patientDetailsForm.values.TotalCharges;
            }
            const newStatus=patientDetailsForm.values.StatusChangedFlag===1?patientDetailsForm.values.Status.substring(0, 1):'0'
            if (this.props.groupedPatients.length !== 0 && (newStatus !== "0" && newStatus !== "5" && newStatus !== "6")) 
            {
                this.state.isStatusChanged=true;
            }           
            if(this.state.isStatusChanged===false && this.state.isAmountChanged===false) {
                onUpdatePatientDetails(patientDetailsForm.values, this.state.RefName);                
            }
           
        } else {
            this.setState({
                issaveclick: false
            });
            notifications.showWarning(errormessage);
        }
    }

    onSave()
    {
        const { onUpdatePatientDetails, patientDetailsForm } = this.props;       

        this.props.groupedPatients.map((item,i)=>
        this.getPatientidFromGroup(item,i)
        );
        patientDetailsForm.values.GroupPatientIDS = patientDetailsForm.values.GroupPatientIDS.substring(0, patientDetailsForm.values.GroupPatientIDS.length - 1);
        onUpdatePatientDetails(patientDetailsForm.values, this.state.RefName);
        this.setState({
            isStatusChanged: false,
            issaveclick:false
        });
    }
    onnoteSave()
    {
        const { onUpdatePatientDetails, patientDetailsForm, patientInfo } = this.props;       
        this.setState({
            isAmountChanged: false,
            issaveclick:false
        });
        patientDetailsForm.values.NoteModelVO={
            'NoteId':0,
            'FrmList':false,
            'Note':'',
            'EnteredDate':moment().format('MM/DD/YYYY'),
            'PatientId':patientInfo.PatientID,
            'Followup':moment().format('MM/DD/YYYY'),
            'Completed':true,
            'Action':this.state.amountChangeText,
            'TeamID':0,
            'Priority':'ADR - Administrative Request',
            'providerID':patientInfo.ReferredBy,
            'GroupNoteIDS':'',
            'EID':cookies.get('EmployeeId'),
            'LeadingNoteID':0,
            'NoteResultID':0,
            'ModifiedBy':cookies.get('EmployeeId'),
            'EnteredBy':cookies.get('Initials')
        };
       
        if(this.state.isStatusChanged===false) {
        onUpdatePatientDetails(patientDetailsForm.values, this.state.RefName);
        }
        this.state.amountChangeText='';
    }
    statusClose() {
        const { onUpdatePatientDetails, patientDetailsForm } = this.props;
        this.setState({
            isStatusChanged: false,
            issaveclick:false
        });
        onUpdatePatientDetails(patientDetailsForm.values, this.state.RefName);
    }

    getPatientidFromGroup(item,i)
    {
        const { onUpdatePatientDetails, patientDetailsForm } = this.props;
        patientDetailsForm.values.GroupPatientIDS= patientDetailsForm.values.GroupPatientIDS + item.PatientId + ','
        patientDetailsForm.values.groupStatusChange=1;
        
    }
    resetAmountChangeText(e) {
        const newValue = e.target.value;
        this.setState({
            amountChangeText: newValue
        });
    }
    render() {
        const { patientInfo, index, moveCard, showPatientForm, onTogglePatientForm, patientsMasterData, onGetTimelyFiling, patientDetailsForm, timelyData, onDeletePatient, onOpenDeletePopUp, onHideSideListMenu, onGetGroupedPatients, groupedPatients, GroupAcctOpenNotes, onShowNotesPopUpOpened  } = this.props;
        const { isExpanded } = this.state;
        console.log(patientInfo);
        const formInitialDate = _.pickBy(patientInfo, (field, key) => formFields.indexOf(key) !== -1 && field !== '0001-01-01T00:00:00');
        let deletemsg = '';
        let name = '';
        name = patientInfo && ( patientInfo.PatientID ? patientInfo.FirstName+ ' ' + patientInfo.LastName : patientInfo.PatientID);
        deletemsg= 'Are you sure, Do you want to  delete ' + name +'?';

        const openNoteMessageContent = GroupAcctOpenNotes && GroupAcctOpenNotes.map((noteItem, i) =><div key={i}><div>{noteItem.PatientID} : {noteItem.PatientName}</div></div>);

        return (
            <DashboardCardComponent
                title="Patient details"
                flex="2"
                noadded
                index={index}
                deleteItem={() => onDeletePatient(patientInfo.PatientID)}
                deleteItemId={patientInfo.PatientID}
                moveCard={moveCard}
                openDeletePopUp={this.handleOpen}
                onExpandToggle={this.onExpandToggle}
                onEditClick={(value) => onTogglePatientForm(value)}
                onSaveClick={this.state.issaveclick?null:this.onSaveClick}
                isExpanded={isExpanded}
                isEditing={showPatientForm}
            >
                <div className={!this.state.isExpanded ? 'dashboard-patients-details' : 'dashboard-patients-details dashboard-patients-details-expanded'}>
                {this.state.isPopUpOpened &&
                    <Popup   message={deletemsg}
                        onCLose={() => this.handleClose()}
                        onOk={() => onDeletePatient(patientInfo.PatientID, this)} 
                        noLabel='No'
                        yesLabel='Yes'/>
                }                   
                {this.state.NotesPopUpOpened &&
                    <Popup  message={openNoteMessageContent}
                            onOk={() => onShowNotesPopUpOpened(true, this)}                            
                            yesLabel='Ok'
                            onlyOkVisible={true}
                            hasNotes= {true}
                            hasTitle = {true}
                            title='Reminder'/>
                    }
                    {this.state.isStatusChanged &&
                        <Popup   message='Do you want to update the Status change to all the Grouped Accounts?'
                        onCLose={() => this.statusClose()}
                        onOk={() => {this.onSave()}} 
                        noLabel='No'
                        yesLabel='Yes'/>                       
                    }
                    {this.state.isAmountChanged &&
                        <Popup   message={
                                        <div>
                                            <div className="dialogdiv">Action:</div>
                                            <div className="divcontent">
                                                <textarea className="textareaborder" type="text" value={this.state.amountChangeText}
                                                onChange={this.resetAmountChangeText}/>
                                            </div>
                                       </div>}
                        onCLose={() => this.amountpopupClose()}
                        onOk={() => {this.onnoteSave()}} 
                        noLabel='Cancel'
                        yesLabel='Save'
                        hasTitle = {true}
                        title='Add Note'/>
                       
                    }
                    {!showPatientForm ?
                        <DashboardPatientsDetailsInfo patientInfo={patientInfo} timelyData={timelyData} patientsMasterData={patientsMasterData}/> :
                        <DashboardPatientsDetailsForm
                            patientInfo={patientInfo}
                            timelyData={timelyData}
                            initialValues={formInitialDate}
                            patientsMasterData={patientsMasterData}
                            onGetTimelyFiling={onGetTimelyFiling}
                            patientDetailsForm={patientDetailsForm}
                            setRefName={this._onSetRefName}
                        />
                    }
                </div>
            </DashboardCardComponent>
        );
    }
}

const mapStateToProps = state => {
    const timelyData = state.patientDetailsReducer.timelyData;
    const patientInfo = state.patientDetailsReducer.patientDetails.PatientNotesDocsModel.PatientInfo;
    patientInfo.TotalCharges = patientInfo.TotalCharges ==""?"0.00": parseFloat(patientInfo.TotalCharges).toFixed(2);
    patientInfo.CurrentBal =patientInfo.CurrentBal==""?"0.00": parseFloat(patientInfo.CurrentBal).toFixed(2);

    return {
        patientInfo: patientInfo,
        showPatientForm: state.patientDetailsReducer.showPatientForm,
        patientsMasterData: state.patientDetailsReducer.patientsMasterData,
        patientDetailsForm: state.form.patientDetailsForm,
        timelyData: timelyData,
        groupedPatients: state.patientDetailsReducer.groupedPatients,
        GroupAcctOpenNotes: state.patientDetailsReducer.patientDetails.PatientNotesDocsModel.GroupAcctOpenNotes,
        showNotesPopUpOpened:state.patientDetailsReducer.showNotesPopUpOpened


    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetTimelyFiling: (refId) => {
            dispatch(getTimelyFiling(refId));
        },
        onUpdatePatientDetails: ( patientDetails, RefName ) => {
            dispatch(updatePatientDetails(patientDetails, RefName));
        },
        onTogglePatientForm: value => {
            dispatch(hideSideListMenu('addPatientMenu'));
            dispatch(togglePatientForm(value));
        },
        onDeletePatient: (patientId,that) => {
            dispatch(deletePatient(patientId));
            that.handleClose();
        },
        onGetGroupedPatients: patientId => {
            dispatch(getGroupedPatients(patientId));
        },
        onShowNotesPopUpOpened : (value,that) => {
            dispatch(showNotesPopUpOpened(value));
            that.handlenotespopClose()
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardPatientsDetails);