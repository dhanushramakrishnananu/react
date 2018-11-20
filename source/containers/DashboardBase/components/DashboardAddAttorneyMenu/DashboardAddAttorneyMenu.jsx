import React from 'react';
import { connect } from 'react-redux';
import { nextStep, prevStep } from '../../../DashboardBase/actions.es6';
import {
    searchAttorneyDetails,
    insertAttorney,
    setSelectedAttorney,
    updateAttorneyByPatientID,
    cleardata,
    changeAdjuster,
    getAttorneyPostGroup,
    postToGroupAttorney
} from './actions.es6';
import { getGroupedPatients } from '../BulkSelectPatients/actions.es6';
import DashboardAddAttorneyStep1 from './components/DashboardAddAttorneyStep1/DashboardAddAttorneyStep1.jsx';
import DashboardAddAttorneyStep2 from './components/DashboardAddAttorneyStep2/DashboardAddAttorneyStep2.jsx';
import DashboardAddAttorneyStep3 from './components/DashboardAddAttorneyStep3/DashboardAddAttorneyStep3.jsx';
import BulkSelectPatients from '../BulkSelectPatients/BulkSelectPatients.jsx';
import './DashboardAddAttorneyMenu.scss';
import {showSideListMenu} from "../../actions.es6";
import _ from 'lodash';
import notifications from '../../../../notifications.jsx';
import cookies from '../../../../cookies.es6';

const BUTTON_CLASS = 'adds-buttons-block_next-btn';

class DashboardAddAttorneyMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSave: false,
            isSaveNxt:false
        };
        this._onStep1Handler = this._onStep1Handler.bind(this);
        this._onStep2Handler = this._onStep2Handler.bind(this);
        this._onStep3Handler = this._onStep3Handler.bind(this);
        this._onBackHandler = this._onBackHandler.bind(this);
        this._onStep2SearchHandler = this._onStep2SearchHandler.bind(this);
        this._canceldata = this._canceldata.bind(this);
    }
    componentDidMount() {
        const { patientId,onGetGroupedPatients, selectedAttorney, isEdit, onGetGroupedPatientsForAttorneyPostToGroup} = this.props;
        
        if(isEdit && selectedAttorney) {
            this.setState({
                isSaveNxt: false,
                isSave:true
            });  
            onGetGroupedPatientsForAttorneyPostToGroup(selectedAttorney.AttorneyID,patientId);   
        }
        else
        {
            onGetGroupedPatients(patientId);
        }
    }
     _canceldata() {
     
     this.props.onCleardata()
     this.props.onHideSideListMenu()
        
    }

    _onStep1Handler() {
        let formData = this.step1.getFormData();

        this.props.onSearchAttorneyDetails(formData);
        this.props.onNextStep();
    }

    _onStep2Handler() {
        this.props.onNextStep();
    }

    _onStep2SearchHandler() {
        let formData = this.step2.getFormData();
        this.props.onSearchAttorneyDetails(formData);
    }

    _onStep3Handler(hasGroupedPatients,e) {
        let formData = this.step3.getFormData();
        formData.PatientID = this.props.patientId;
        this.props.updateFlag
            ?
            this.props.onEditAttorney(formData, hasGroupedPatients)
            :
            this.props.onInsertAttorney(formData, hasGroupedPatients);
    }

    _onBackHandler() {
        this.props.onPrevStep();
        this.props.searchFields.Firm = "";
        this.props.searchFields.FirstName = "";
        this.props.searchFields.LastName = "";
        this.props.onCleardata();   
        if(this.props.selectedStep === 3) {
            this.props.onSetSelectedAttorney({});
        }
    }
    changeAdjuster = () => {
        if(this.props.isEdit)
        {
            this.setState({
                isSaveNxt: true,
                isSave:false
            });  
        }
        this.props.onChangeAdjuster(1);
    };
    render() {
        const { attorneyList,
            patientsMasterData, selectedStep,
            onHideSideListMenu, selectedAttorney,
            searchFields, attorneyListLoading,
            onSetSelectedAttorney,canceldata,onCleardata, 
            isEdit, groupedPatients,selectedGroupedPatients, 
            patientId, onInsertPostToGroupAttorney, patientAtty,
            attorneyGroupedPatients} = this.props;
 
        this.stepsList = [
            <DashboardAddAttorneyStep1
                patientsMasterData={patientsMasterData}
                ref={step => this.step1 = step}
                searchFields={searchFields}
            />,
            <DashboardAddAttorneyStep2
                patientsMasterData={patientsMasterData}
                attorneyList={attorneyList}
                searchFields={searchFields}
                attorneyListLoading={attorneyListLoading}
                onSetSelectedAttorney={onSetSelectedAttorney}
                ref={step => this.step2 = step}
            />,
            <DashboardAddAttorneyStep3
                patientsMasterData={patientsMasterData}
                selectedAttorney={selectedAttorney}
                ref={step => this.step3 = step}
                onChangeAdjuster={this.changeAdjuster}
                isEdit={isEdit}
            />,
            <BulkSelectPatients
                type={isEdit ? 'Edit Attorney' :'Add Attorney'}
                patientId={patientId}
            />
        ];
        const groupedPatientlist = (isEdit && selectedAttorney) ? attorneyGroupedPatients : groupedPatients ;
        return (
            <div className='side-list-content add-attorney'>
                {this.stepsList[selectedStep - 1]}
                <div className='adds-buttons-block'>
                    {((isEdit && selectedStep === 3) || selectedStep === 1 || selectedStep === 4) && 
                        <button className='adds-buttons-block_cancel-btn' onClick={this._canceldata}>
                            Cancel
                        </button>
                    ||
                        <button className='adds-buttons-block_cancel-btn' onClick={this._onBackHandler}>
                            Back
                        </button>
                    }
                    {selectedStep === 1 &&
                        <button
                            className={BUTTON_CLASS}
                            onClick={this._onStep1Handler}>
                            Search
                        </button>
                    }
                    {selectedStep === 2 && _.isEmpty(selectedAttorney) &&
                        <button
                            className={BUTTON_CLASS}
                            onClick={this._onStep2SearchHandler} >
                            Search
                        </button>
                    }
                    {selectedStep === 2 && !_.isEmpty(selectedAttorney) &&
                        <button
                            className={BUTTON_CLASS}
                            onClick={this._onStep2Handler} >
                            Next
                        </button>
                    }
                    {!isEdit && selectedStep === 3 && groupedPatientlist.length===0 &&
                        <button className={BUTTON_CLASS}
                                onClick={this._onStep3Handler.bind(this,Boolean(groupedPatientlist.length))}>
                            Save
                        </button>
                    }
                    {!isEdit && selectedStep === 3 && groupedPatientlist.length !== 0 &&
                        <button className={BUTTON_CLASS} ref="btn1"
                                onClick={this._onStep3Handler.bind(this,Boolean(groupedPatientlist.length))}>
                            Save & Next
                        </button>
                    }
                    {isEdit && selectedStep === 3 &&  this.state.isSave &&
                        <button className={BUTTON_CLASS}
                                onClick={this._onStep3Handler.bind(this,Boolean(groupedPatientlist.length))}>
                            Save
                        </button>
                    }
                    {isEdit && selectedStep === 3 && groupedPatientlist.length === 0 &&  this.state.isSaveNxt &&
                        <button className={BUTTON_CLASS}
                        onClick={this._onStep3Handler.bind(this,Boolean(groupedPatientlist.length))}>
                        Save
                        </button>
                    }
                    {isEdit && selectedStep === 3 && groupedPatientlist.length !== 0 &&  this.state.isSaveNxt &&
                        <button className={BUTTON_CLASS} ref="btn1"
                                onClick={this._onStep3Handler.bind(this,Boolean(groupedPatientlist.length))} >
                            Save & Next
                        </button>
                    }
                    {selectedStep === 4 && 
                        <button className="adds-buttons-block_next-btn" ref="btn2" type="button" onClick={()=> onInsertPostToGroupAttorney(selectedGroupedPatients, patientAtty.AttorneyID,patientId,isEdit,this)}>
                            Post
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
        attorneyList: state.attorneyReducer.attorneyList,
        selectedAttorney: state.attorneyReducer.selectedAttorney,
        updateFlag: state.attorneyReducer.updateFlag,
        searchFields: state.attorneyReducer.searchFields,
        attorneyListLoading: state.attorneyReducer.attorneyListLoading,
        groupedPatients: state.patientDetailsReducer.groupedPatients,
        attorneyGroupedPatients: state.patientDetailsReducer.attorneyGroupedPatients,
        selectedGroupedPatients: state.patientDetailsReducer.selectedGroupedPatients,
        patientAtty: state.patientDetailsReducer.patientDetails.PatientNotesDocsModel.PatientAtty,
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
        onInsertAttorney: (data, hasNextStep) => {
            if(!data.Attention)
            {
                data.Attention='';
            }
            dispatch(insertAttorney(data,hasNextStep));
        },
        onEditAttorney: (data, hasNextStep) => {
            dispatch(updateAttorneyByPatientID(data,hasNextStep));
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
        onChangeAdjuster: (data) => {
            dispatch(changeAdjuster(data));
        },
        onGetGroupedPatients: patientId => {
            dispatch(getGroupedPatients(patientId));
        },
        onGetGroupedPatientsForAttorneyPostToGroup:(AttorneyID,PatientID) => {
            dispatch(getAttorneyPostGroup(PatientID,AttorneyID));
        },
        onInsertPostToGroupAttorney: (selectedPatients, newAttorneyID,patientId,isEdit,that) => {           
            if(selectedPatients.length > 0) {
                that.refs.btn2.setAttribute("disabled", "disabled");
                dispatch(postToGroupAttorney({
                    GroupIDs: selectedPatients.join(', '),
                    AttorneyID: newAttorneyID,
                    PatientID: parseInt(patientId), 
                    EID:Number(cookies.get('EmployeeId'))
                },isEdit));
            } else {
                notifications.showWarning('Please select one item or cancel post note to group.');
            }
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardAddAttorneyMenu);
