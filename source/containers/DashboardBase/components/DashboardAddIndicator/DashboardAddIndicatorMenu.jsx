import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import AddIndicatorStep1 from './Components/AddIndicatorStep1/AddIndicatorStep.jsx';
import cookies from '../../../../cookies.es6';
import notifications from '../../../../notifications.jsx';
import './DashboardAddIndicatorMenu.scss';
import { getPatientDropDownData,updateIndicator } from './actions.es6';


class DashboardAddIndicatorMenu extends React.Component {   
    componentDidMount() {
        const { onGetPatientDropDownData, editIndicatorItem, isEdit, initialize} = this.props;        
        onGetPatientDropDownData();
        if(isEdit && editIndicatorItem) {             
            initialize(editIndicatorItem);       
        }
    } 
    render() {
        const { onHideSideListMenu, indicatorTypes, handleSubmit, onSaveIndicator, patientinfo, editIndicatorItem, isEdit} = this.props;
      
        const steps = [
            <AddIndicatorStep1                
            indicatorTypes={indicatorTypes} 
            editIndicatorItem={editIndicatorItem}
            isEdit={isEdit}
            />
          
        ];
        return (
           
            <form className="side-list-content add-document" onSubmit={handleSubmit(values => onSaveIndicator(_.extend(values),this,isEdit))} encType="multipart/form-data">
              { steps[0]}
                <div className="adds-buttons-block">
                  
                    <button className="adds-buttons-block_cancel-btn" onClick={onHideSideListMenu} type="button">
                        Cancel
                    </button>                   
                    <button className="adds-buttons-block_next-btn" ref="btn" type="submit">
                        Save
                    </button>
                    
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        addIndicatorForm: state.form.addIndicatorForm,
        indicatorTypes:state.patientDetailsReducer.indicatorTypes,
        patientinfo: state.patientDetailsReducer.patientDetails.PatientNotesDocsModel.PatientInfo, 
        editIndicatorItem:state.homeReducer.editIndicatorItem     
    };
};
const mapDispatchToProps = dispatch => {
    return {      
        onGetPatientDropDownData: () => {
            dispatch(getPatientDropDownData());
        },
        onSaveIndicator:(data,that,isEdit)=>{
            let type=that.props.indicatorTypes.filter(o=> o.Description === data.IndicatorType);
            if(type.length==0 && !data.Reason)
            {
                notifications.showWarning('Following are required fields: \n Type and Reason'); 
            }
            else if(type.length==0)
            {
                notifications.showWarning('Following are required fields: \n Type');  
            }
            else if(!data.Reason)
            {
                notifications.showWarning('Following are required fields: \n Reason');
            }
            else {
                let flag=true;
                if(type[0].CheckMRN)
                {              
                    if(_.isEmpty(that.props.patientinfo.MPNumber))
                    {
                        flag=false;
                    }
                }
                let indicator={
                    'IndicatorID':that.props.isEdit?that.props.editIndicatorItem.IndicatorID:0,
                    'Reason':data.Reason,
                    'PatientID':that.props.patientId,
                    'IndicatorTypeID':type[0].PITypeID,
                    'IndicatorType':data.IndicatorType, 
                    'CreatedDate':moment().format('MM/DD/YYYY'),
                    'EID':cookies.get('EmployeeId')
                };
                if(flag===true)
                {
                    dispatch(updateIndicator(indicator,isEdit));
                }
                else
                {
                    notifications.showWarning('Indicator Type cannot be addded since MRN number is missing. Please add MRN number first before adding Indicator Type.');
                }
                that.props.onHideSideListMenu();
            }
        }
    };
};

DashboardAddIndicatorMenu = reduxForm({
    form: 'addIndicatorForm'
})(DashboardAddIndicatorMenu);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardAddIndicatorMenu);