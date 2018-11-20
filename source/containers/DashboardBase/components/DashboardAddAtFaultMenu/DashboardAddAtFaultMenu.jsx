import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import _ from 'lodash';

import { getStateData, addAtFault, insertPostToGroup } from './actions.es6';
import { getGroupedPatients } from '../BulkSelectPatients/actions.es6';

import LoadingComponent from '../../../../components/LoadingComponent/Loading.jsx';
import AddAtFaultStepI from './components/AddAtFaultStepI/AddAtFaultStepI.jsx';
import notifications from '../../../../notifications.jsx';
import './DashboardAddAtFaultMenu.scss';
import BulkSelectPatients from '../BulkSelectPatients/BulkSelectPatients.jsx';
import cookies from '../../../../cookies.es6';

class DashboardAddAtFaultMenu extends React.Component {
    constructor(props) {
        super(props);
        this.onSaveClick = this.onSaveClick.bind(this);
       
    }
    componentDidMount() {
        const { patientId, onGetGroupedPatients, onGetState, initialize, editItemData, isEdit } = this.props;
        onGetGroupedPatients(patientId);
        onGetState();
        if(isEdit && editItemData) {
            initialize(editItemData);
        }
    }
    onSaveClick(values, hasNextStep) {
        const { onFormSubmit} = this.props;
        let mandatory='';
        let notValid='';
        let errormessage = '';
        if((values.FirstName.trim().length==0 && values.LastName.trim().length==0) && values.BusinessName.trim().length==0)
        {
            mandatory=mandatory+'\n (First Name && Last Name) or Business Name Required';
        }
        else if((values.FirstName.trim().length==0 && !values.LastName.trim().length==0) && values.BusinessName.trim().length==0)
        {
            mandatory=mandatory+'\n (First Name && Last Name) or Business Name Required';
        }
        else if((!values.FirstName.trim().length==0 && values.LastName.trim().length==0) && values.BusinessName.trim().length==0)
        {
            mandatory=mandatory+'\n (First Name && Last Name) or Business Name Required';
        }
        
        if(values.Address.trim().length==0)
        {
            mandatory=mandatory+'\n Address1';
        }
        if(values.City.trim().length==0)
        {
            mandatory=mandatory+'\n City';
        }
        if(values.State.trim().length==0)
        {
            mandatory=mandatory+'\n State';
        }       
        if(values.Zip.trim().length>0 && values.Zip.trim().length<5)
        {
            mandatory=mandatory+'\n valid Zip';
        }       
        
        // if(values.HomePhone || values.MobilePhone || values.WorkPhone) {
        //     const customFields = ['HomePhone', 'MobilePhone', 'WorkPhone'];
        //     customFields.forEach(field => {
        //         if (values[field] && values[field].length !== 15) {
        //             notValid= notValid + `\n ${field}`;
        //         }
        //     });
        // }else {
        //     mandatory=mandatory+'\n HomePhone/MobilePhone/WorkPhone';
        // }
        if(mandatory.length>0 && notValid.length>0) {
            errormessage = 'Following are required fields:\n'+mandatory + '\n \n Following fields are not valid format :\n' +notValid;
        } else if(mandatory.length>0){
            errormessage = 'Following are required fields:\n'+mandatory ;
        } else if(notValid.length>0){
            errormessage = 'Following fields are not valid format :\n'+notValid ;
        }

        if(errormessage.length===0) {
            this.refs.btn1.setAttribute("disabled", "disabled");
            onFormSubmit(values,hasNextStep);
        }
        else
        {
            notifications.showWarning(errormessage);
        }
    }
    render() {
        const { onHideSideListMenu, handleSubmit, atFaultLoading, atFaultStateData, onFormSubmit, patientId, anyTouched, editItemData, groupedPatients, isEdit , selectedStep, newAtFaultId, selectedGroupedPatients, onPostToGroupSubmit} = this.props;

        const additionalFormData = {
            PatientID: patientId,
            AtFaultID: 0,
            EID: cookies.get('EmployeeId'),
            FirstName: '',
            MiddleName: '',
            LastName: '',
            BusinessName: '',
            Address: '',
            Address2: '',
            City: '',
            State: '',
            Zip: '',
            HomePhone: '',
            MobilePhone: '',
            WorkPhone: ''
        };
        const steps = [
            <AddAtFaultStepI 
            atFaultStateData={atFaultStateData} 
            editItemData={editItemData} 
            />,
            <BulkSelectPatients
                type={isEdit ? 'Edit AtFault' :'Add AtFault'}
                patientId={patientId}
            />
        ];

        return (
            <form className="side-list-content add-note" onSubmit={handleSubmit(value => this.onSaveClick( _.extend(additionalFormData, value),Boolean(groupedPatients.length)))}>
             {steps[selectedStep - 1]}    
             {selectedStep === 1 &&
                <div className="adds-buttons-block">
                    <button className="adds-buttons-block_cancel-btn" onClick={onHideSideListMenu} type="button">
                        Cancel
                    </button>
                    {!groupedPatients.length &&
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
                    {/* <button className="adds-buttons-block_cancel-btn" onClick={onPrevStep} type="button">
                        Back
                    </button> */}
                     <button className="adds-buttons-block_cancel-btn" onClick={onHideSideListMenu} type="button">
                        Cancel
                    </button>
                    <button className="adds-buttons-block_next-btn" ref="btn2" onClick={() => onPostToGroupSubmit(selectedGroupedPatients, newAtFaultId,isEdit,this)} type="button" >
                        Post
                    </button>
                </div>
                }
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        atFaultLoading: state.atFaultReducer.atFaultLoading,
        atFaultStateData: state.atFaultReducer.atFaultStateData,
        atFaults: state.patientDetailsReducer.patientDetails.PatientAgedAcctAndAtFaultModel.AtFaults,
        editItemData: state.homeReducer.editItemData,
        groupedPatients: state.patientDetailsReducer.groupedPatients,
        selectedStep: state.homeReducer.selectedStep,
        newAtFaultId:state.atFaultReducer.newAtFaultId,
        selectedGroupedPatients: state.patientDetailsReducer.selectedGroupedPatients,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFormSubmit: (values,hasNextStep) => {            
            dispatch(addAtFault(values,hasNextStep));
        },
        onGetGroupedPatients: patientId => {
            dispatch(getGroupedPatients(patientId));
        },
        onGetState: () => {
            dispatch(getStateData());
        },
        onPostToGroupSubmit:(selectedPatients, newAtFaultId,isEdit,that)=>
        {
            let atflt={
                'AtFaultID' : newAtFaultId,
                'EID' : cookies.get('EmployeeId'),
                'GroupIDs' :selectedPatients.join(', ')
            };
            if(selectedPatients.length > 0) {
                that.refs.btn2.setAttribute("disabled", "disabled");
                dispatch(insertPostToGroup(atflt,isEdit));
            } else {
                notifications.showWarning('Please select one item or cancel post atfault to group.');
            }
           
        }
    };
};

DashboardAddAtFaultMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardAddAtFaultMenu);

function validate(values) {
    const errors={};
    if (!values['FirstName'] && !values['LastName'] && !values['BusinessName']) {
        errors['BusinessName'] = 'Required';
        errors['FirstName'] = 'Required';
        errors['LastName'] = 'Required';
    } else {
        if (!values['FirstName'] && !values['LastName']) {
            if (!values['BusinessName']) {
                errors['BusinessName'] = '';
            }
        } else {
            if(!values['FirstName']) {
                errors['FirstName'] = 'Required';
            }
            if(!values['LastName']) {
                errors['LastName'] = 'Required';
            }    
        }
        if (!values['BusinessName']) {
           
            if(!values['FirstName']) {
                errors['FirstName'] = 'Required';
            }
            if(!values['LastName']) {
                errors['LastName'] = 'Required';
            }
           
        }
        else
        {
            errors['FirstName'] = '';
            errors['LastName'] = '';
        }
    }
    const requiredFields = ['Address', 'City', 'State', 'Zip'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
    });
    const customFields = ['HomePhone', 'MobilePhone', 'WorkPhone'];
    if(_.isEmpty(errors)) {            
        customFields.forEach(field =>{
            if(values[field] && values[field].length !== 10 ) {
                errors[field] = 'Required';
            }
        });
        //}
    }
    return errors;
}

export default reduxForm({
    form: 'addAtFaultMenu'    
})(DashboardAddAtFaultMenu);