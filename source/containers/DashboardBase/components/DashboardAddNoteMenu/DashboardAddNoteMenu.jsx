import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import moment from 'moment';
import Popup from '../../../../components/Popup/Popup.jsx';
import { prevStep } from '../../actions.es6';
import { getMasterDataForNote, insertPostToNote, addNote, getGroupedPatientsForNotesPostToGroup, hideEditNoteOpenNoteMessage } from './actions.es6';
import { getGroupedPatients } from '../BulkSelectPatients/actions.es6';

import LoadingComponent from '../../../../components/LoadingComponent/Loading.jsx';

import AddNoteStepI from './components/AddNoteStepI/AddNoteStepI.jsx';
import BulkSelectPatients from '../BulkSelectPatients/BulkSelectPatients.jsx';

import './DashboardAddNoteMenu.scss';
import notifications from '../../../../notifications.jsx';

class DashboardAddNoteMenu extends React.Component {
constructor(props) {
        super(props);
        this.handlenotespopClose=this.handlenotespopClose.bind(this);
    }
    componentDidMount() {
        const { patientId, onGetMasterDataForNote, onGetNotesGroupedPatients, onGetGroupedPatients, editNoteItemData, isEdit, onGetGroupedPatientsForNotesPostToGroup, initialize, isOpenNote, editOpenNoteItemData} = this.props;
        onGetMasterDataForNote(patientId);
        onGetGroupedPatients(patientId);
        let selectedNote = editNoteItemData;
        if(isOpenNote)
            selectedNote = editOpenNoteItemData;
        else
            selectedNote = editNoteItemData;
        if(isEdit && selectedNote) {
            onGetGroupedPatientsForNotesPostToGroup(selectedNote.NoteId,patientId);   
            initialize(selectedNote);       
        }
        else
        {
            initialize({Followup: moment().weekday() === 5 ? moment().add(3, 'day'): (moment().weekday() === 6 ? moment().add(2, 'day'): moment().add(1, 'day'))});
        }
    }
    handlenotespopClose()
    {
        const { onHideEditNoteOpenNoteMessage} = this.props;
        onHideEditNoteOpenNoteMessage();
        this.refs.btn1.removeAttribute("disabled");
    }

    render() {
        const { onHideSideListMenu, selectedStep, onPrevStep, notesMasterData, change, groupedPatients, handleSubmit,
            onFormSubmit, initials, newNoteId, onInsertPostToNote, selectedGroupedPatients, patientId, addNoteForm, patientinfo, editNoteItemData, isEdit, notesGroupedPatients, showEditNoteOpenNoteMessage, isOpenNote, editOpenNoteItemData } = this.props;
      
        const additionalFormData = {
            NoteId: 0,
            LeadingNoteID: 0,
            Exported: 0,
            TeamID: 0,
            providerID: 0,
            Mode: 0,
            PostToGroup: 0,
            ModifiedBy: 0,
            NoteResultID: -1,
            EnteredBy: initials,
            PatientID: patientId
        };
        let selectedNote = editNoteItemData;

        if(isOpenNote)
            selectedNote = editOpenNoteItemData;
        else
            selectedNote = editNoteItemData;
        const steps = [
            <AddNoteStepI
                notesMasterData={notesMasterData}
                change={change}
                addNoteForm={addNoteForm}
                patientinfo={patientinfo}
                editNoteItemData={selectedNote}
                isEdit={isEdit}
            />,
            <BulkSelectPatients
                type={isEdit ? 'Edit Note' :'Add Note'}
                patientId={patientId}
            />
        ];
        const PatientStatus = patientinfo.Status;
        let status = 1;
        if (PatientStatus.indexOf("5 ")>-1 || PatientStatus.indexOf("5.")>-1 ||PatientStatus.indexOf("6 ")> -1 || PatientStatus.indexOf("6.")>-1) {
                status = 0;
        }
        const groupedPatientlist = (isEdit && selectedNote) ? notesGroupedPatients : groupedPatients ;
        return (
            <form className="side-list-content add-note" onSubmit={handleSubmit(values => onFormSubmit(_.extend(additionalFormData, values), Boolean(groupedPatientlist.length),status,this))}>

                {_.isEmpty(notesMasterData) && <LoadingComponent/> || steps[selectedStep - 1]}

                {selectedStep === 1 &&
                <div className="adds-buttons-block">
                    <button className="adds-buttons-block_cancel-btn" onClick={onHideSideListMenu} type="button">
                        Cancel
                    </button>
                    {!groupedPatientlist.length &&
                    <button className="adds-buttons-block_next-btn" ref="btn1" type="submit" >
                        Save
                    </button>
                    ||
                    <button className="adds-buttons-block_next-btn" ref="btn1" type="submit" >
                        Save & Next
                    </button>
                    }
                </div>
                }
                {selectedStep === 2 &&
                <div className="adds-buttons-block">
                     <button className="adds-buttons-block_cancel-btn" onClick={onHideSideListMenu} type="button">
                        Cancel
                    </button>
                    <button className="adds-buttons-block_next-btn" ref="btn2" type="button" onClick={() => onInsertPostToNote(selectedGroupedPatients, newNoteId,patientId,isEdit,this)}>
                        Post
                    </button>
                </div>
                }
                {showEditNoteOpenNoteMessage && 
                        <Popup  message='There needs to be at least one open note for this account.'
                            onOk={() => this.handlenotespopClose()}                            
                            yesLabel='Ok'
                            onlyOkVisible={true}
                            hasTitle = {true}
                            title='Reminder'/>
                }
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        addNoteForm: state.form.addNoteForm,
        selectedStep: state.homeReducer.selectedStep,
        notesMasterData: state.patientDetailsReducer.notesMasterData,
        notesGroupedPatients: state.patientDetailsReducer.notesGroupedPatients,
        groupedPatients: state.patientDetailsReducer.groupedPatients,
        initials: state.authReducer.currentUser.Initials,
        newNoteId: state.patientDetailsReducer.newNoteId,
        patientinfo: state.patientDetailsReducer.patientDetails.PatientNotesDocsModel.PatientInfo,
        selectedGroupedPatients: state.patientDetailsReducer.selectedGroupedPatients,
        editNoteItemData : state.homeReducer.editNoteItemData,
        showEditNoteOpenNoteMessage : state.patientDetailsReducer.showEditNoteOpenNoteMessage,
        editOpenNoteItemData: state.homeReducer.editOpenNoteItemData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFormSubmit: (values, hasNextStep, status, that) => {            
            const errors = {};
            let mandatory='';
            if (!values.Note) {
                errors.Note = 'Required';
                mandatory = mandatory+'\n Note';
            }
            if (!values.Priority) {
                errors.Priority = 'Required';
                mandatory = mandatory+'\n Priority';
            }           
            if(values.Priority === 'Insurance Update') {
                if (!values.SecPriority) {
                    errors.SecPriority = 'Required';
                     mandatory = mandatory+'\n RE';
                }
            }  
            if (values.NoteResultID === -1) {
                errors.NoteResultID = 'Required';
                mandatory = mandatory+'\n Acc Advanced';
            }
            if(_.isEmpty(errors)) {
                that.refs.btn1.setAttribute("disabled", "disabled");
                dispatch(addNote(values,hasNextStep,status));
            } else {
                notifications.showWarning('Following are required fields:\n '+mandatory);
            }                
            
        },
        onPrevStep: () => {
            dispatch(prevStep());
        },
        onGetMasterDataForNote: patientId => {
            dispatch(getMasterDataForNote(patientId));
        },        
        onGetGroupedPatients: patientId => {
            dispatch(getGroupedPatients(patientId));
        },
        onGetGroupedPatientsForNotesPostToGroup: (patientId, NoteID) => {
            dispatch(getGroupedPatientsForNotesPostToGroup(patientId, NoteID))
        },
        onInsertPostToNote: (selectedPatients, newNoteId,patientId,isEdit,that) => {           
            if(selectedPatients.length > 0) {
                that.refs.btn2.setAttribute("disabled", "disabled");
                dispatch(insertPostToNote({
                    selectedGroupArr: selectedPatients,
                    NoteID: newNoteId
                },patientId,isEdit));
            } else {
                notifications.showWarning('Please select one item or cancel post note to group.');
            }
        },
        onHideEditNoteOpenNoteMessage:() => {
            dispatch(hideEditNoteOpenNoteMessage());
        },
    };
};

DashboardAddNoteMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardAddNoteMenu);

export default reduxForm({
    form: 'addNoteForm',    
})(DashboardAddNoteMenu);