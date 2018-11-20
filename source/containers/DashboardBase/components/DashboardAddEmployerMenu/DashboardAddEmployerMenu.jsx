import React from 'react';
import { connect } from 'react-redux';
import { nextStep, prevStep } from '../../../DashboardBase/actions.es6';
import {
    searchEmployerDetails,
    insertEmployer,
    setSelectedEmployer,
    cleardata
} from './actions.es6';
import DashboardAddEmployerStep1 from './components/DashboardAddEmployerStep1/DashboardAddEmployerStep1.jsx';
import DashboardAddEmployerStep2 from './components/DashboardAddEmployerStep2/DashboardAddEmployerStep2.jsx';

import './DashboardAddEmployerMenu.scss';
import {showSideListMenu} from "../../actions.es6";
import _ from 'lodash';
import notifications from '../../../../notifications.jsx';

const BUTTON_CLASS = 'adds-buttons-block_next-btn';

class DashboardAddEmployerMenu extends React.Component {
    constructor(props) {
        super(props);

        this._onStep1Handler = this._onStep1Handler.bind(this);
        this._onStep2Handler = this._onStep2Handler.bind(this);
        this._onBackHandler = this._onBackHandler.bind(this);      
        this._canceldata = this._canceldata.bind(this);
    }
     _canceldata() {     
         this.props.onCleardata()
         this.props.onHideSideListMenu()
    }

    _onStep1Handler() {
        let formData = this.step1.getFormData();
        if(formData.EmployerName?formData.EmployerName.trim().length>0 : formData.EmployerName) {
            this.props.onSearchEmployerDetails(formData);
            this.props.onNextStep();
        }
        else {
            notifications.showWarning('Please enter atleast one search criteria.');
        } 
        
    }

    _onStep2Handler() {
     const { selectedEmployer, patientId, onSaveEmployer} = this.props;
        if(selectedEmployer.EmployerId) {
            onSaveEmployer(selectedEmployer, parseInt(patientId));
            this.props.onShowSideListMenu(null);
        } else {
            notifications.showWarning('Please select an Employer from the list.');
        }
    }
    _onBackHandler() {
        this.props.onPrevStep();
        this.props.searchFields.EmployerName = "";
        if(this.props.selectedStep === 2) {
            this.props.onSetSelectedEmployer({});
        }
    }
    render() {
        const { employerList, selectedStep,
            onHideSideListMenu, selectedEmployer,
            searchFields, employerListLoading,
            onSetSelectedEmployer,canceldata,onCleardata, isEdit} = this.props;
 
        this.stepsList = [
            <DashboardAddEmployerStep1
                ref={step => this.step1 = step}
                searchFields={searchFields}
            />,
            <DashboardAddEmployerStep2
                employerList={employerList}
                searchFields={searchFields}
                employerListLoading={employerListLoading}
                onSetSelectedEmployer={onSetSelectedEmployer}
                ref={step => this.step2 = step}
            />
        ];

        return (
            <div className='side-list-content add-employer'>
                {this.stepsList[selectedStep - 1]}

                <div className='adds-buttons-block'>
                    {( selectedStep === 1) && 
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
                            onClick={this._onStep1Handler} >
                            Search
                        </button>
                    }
                    {selectedStep === 2 &&
                        <button
                            className={BUTTON_CLASS}
                            onClick={this._onStep2Handler} >
                            Save
                        </button>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedStep: state.homeReducer.selectedStep,
        employerList: state.patientDetailsReducer.employerList,
        selectedEmployer: state.patientDetailsReducer.selectedEmployer,
        searchFields: state.patientDetailsReducer.searchFields,
        employerListLoading: state.patientDetailsReducer.employerListLoading
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
        onSearchEmployerDetails: (data) => {
            dispatch(searchEmployerDetails(data));
        },
        onSaveEmployer: (data,PatientID) => {            
            dispatch(insertEmployer(data,PatientID));
        },        
        onSetSelectedEmployer: (data) => {
            dispatch(setSelectedEmployer(data));
        },
        onShowSideListMenu: (menuName) => {
            dispatch(showSideListMenu(menuName));
        },
        onCleardata: ()=>{
            dispatch(cleardata());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardAddEmployerMenu);
