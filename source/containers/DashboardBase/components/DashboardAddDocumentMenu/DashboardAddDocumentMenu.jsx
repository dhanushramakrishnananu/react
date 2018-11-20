import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import _ from 'lodash';

import './DashboardAddDocumentMenu.scss';

import { prevStep } from '../../../DashboardBase/actions.es6';
import { getGroupedPatients } from '../BulkSelectPatients/actions.es6';
import { getDocumentMasterData, addDocument, clearSelectedGroup } from './actions.es6';

import LoadingComponent from '../../../../components/LoadingComponent/Loading.jsx';
import notifications from '../../../../notifications.jsx';
import AddDocumentStepI from './components/AddDocumentStepI/AddDocumentStepI.jsx';
import BulkSelectPatients from '../BulkSelectPatients/BulkSelectPatients.jsx';


class DashboardAddDocumentMenu extends React.Component {
    componentDidMount() {
        const { patientId, onGetGroupedPatients, onGetDocumentMasterData } = this.props;
        onGetGroupedPatients(patientId);
        onGetDocumentMasterData(patientId);
    }
    render() {
        const { patientId, onHideSideListMenu, selectedStep, onPrevStep, groupedPatients, documentMasterData, handleSubmit, onFormSubmit, initials, selectedGroupedPatients,onCancel } = this.props;

        const steps = [
            <AddDocumentStepI
                documentMasterData={documentMasterData}
                patientId={patientId}
            />,
            <BulkSelectPatients
                patientId={patientId}
                type="Documents"
            />
        ];

        const additionalFormData = {
            PatientID: patientId,
            DocId: 0,
            AmountIcon: 0,
            PatientCount: 0,
            ExpRecovery: 0.0,
            IndexedBy: initials,
            Corrected: 0,
            CreatedBy: 0,
            Amount: 0.0,
            TotalPages: 0,
            InsIDs: '',
            AttorneyID: 0,
            PatientGroupIDs: selectedGroupedPatients.join(', '),
            PageCount: 0
        };

        return (
            <form className="side-list-content add-document" onSubmit={handleSubmit(values => onFormSubmit(_.extend(additionalFormData, values),selectedStep==1 && !_.isEmpty(groupedPatients),selectedStep,this))} encType="multipart/form-data">
                {_.isEmpty(documentMasterData) && <LoadingComponent/> || steps[selectedStep - 1]}
                {selectedStep === 1 &&
                <div className="adds-buttons-block">
                    <button className="adds-buttons-block_cancel-btn" onClick={onCancel} type="button">
                        Cancel
                    </button>
                    {!groupedPatients.length &&
                    <button className="adds-buttons-block_next-btn" ref="btn1" type="submit" >
                        Save
                    </button>
                    ||
                    <button className="adds-buttons-block_next-btn" ref="btn1" type="submit" >
                        Next
                    </button>
                    }
                </div>
                }
                {selectedStep === 2 &&
                <div className="adds-buttons-block">
                    <button className="adds-buttons-block_cancel-btn" onClick={onPrevStep} type="button">
                        Back
                    </button>
                     {/* <button className="adds-buttons-block_cancel-btn" onClick={onHideSideListMenu} type="button">
                        Cancel
                    </button> */}
                    <button className="adds-buttons-block_next-btn" ref="btn2" type="submit">
                        Save
                    </button>
                </div>
                }
               
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        addDocumentForm: state.form.addDocumentForm,
        selectedStep: state.homeReducer.selectedStep,
        groupedPatients: state.patientDetailsReducer.groupedPatients,       
        documentMasterData: state.patientDetailsReducer.documentMasterData,
        initials: state.authReducer.currentUser.Initials,
        selectedGroupedPatients: state.patientDetailsReducer.selectedGroupedPatients
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onPrevStep: () => {
            dispatch(prevStep());
        },
        onGetGroupedPatients: (patientId) => {
            dispatch(getGroupedPatients(patientId));
        },
        onGetDocumentMasterData: (patientId) => {
            dispatch(getDocumentMasterData(patientId));
        },
        onFormSubmit: (values, hasNextStep, selectedStep,that) => { 
            if(!values.Type && !values.fileContent)
            {
                notifications.showWarning('Please select a file to upload.'); 
            }
            else if(!values.Type)
            {
                notifications.showWarning('Following are required fields: \n Type.');  
            }
            else if(!values.fileContent || !values.renameDocument)
            {
                notifications.showWarning('Please select a file to upload.Document name cannot be null');
            }           
            else
            {
                if(selectedStep===1)           
                {
                    values.PatientGroupIDs=values.PatientID;                    
                    that.refs.btn1.setAttribute("disabled", "disabled");
                    dispatch(addDocument(values, hasNextStep));
                }
                if(selectedStep===2)
                {
                    hasNextStep=false;                   
                    if(values.PatientGroupIDs.trim().length===0)
                    {
                        notifications.showWarning('Please select any accounts to save document.'); 
                    }
                    else
                    {
                        that.refs.btn2.setAttribute("disabled", "disabled");
                        if(! _.includes(values.PatientGroupIDs,values.PatientID))
                        {
                            values.PatientGroupIDs=values.PatientGroupIDs+','+values.PatientID;
                        }                       
                        dispatch(addDocument(values, hasNextStep));
                    }
                   
                }
              
            }
        },
        onCancel:()=>
        {
            dispatch(clearSelectedGroup());
        }

    };
};

DashboardAddDocumentMenu = reduxForm({
    form: 'addDocumentForm'
})(DashboardAddDocumentMenu);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardAddDocumentMenu);