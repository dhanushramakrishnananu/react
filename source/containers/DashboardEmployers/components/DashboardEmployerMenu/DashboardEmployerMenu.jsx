import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import notifications from '../../../../notifications.jsx';

import './DashboardEmployerMenu.scss';
import './constants.es6';
import { showSideListMenu, hideSideListMenu, saveEmployee } from '../../actions.es6';
class DashboardEmployerMenu extends React.Component {
      constructor(props) {
          super(props);       
          this.state = {
             isSave: true
          }; 
          this.searchstring = '';
          this.onCheckInput = this.onCheckInput.bind(this);
          this.onCheckNumber = this.onCheckNumber.bind(this);
          this.onCheckPhone = this.onCheckPhone.bind(this);
          this.onChangestate=this.onChangestate.bind(this);
      }
           
        
         
      onChangestate(e)
        {
         this.setState({isSave:false})
        }
      onCheckNumber(e) {
         this.setState({isSave:false})
         const onlyNums = e.target.value.replace(/[^0-9]/g, '');
         if (onlyNums.length < 5) {
            e.target.value=onlyNums;
         } else if (onlyNums.length === 5) {
            const number = onlyNums.replace(/(\d{3})(\d{3})(\d{4})/, '($1) -$2-$3');
            e.target.value=number;
        } 
      }
     
     onCheckPhone(e) {
        this.setState({isSave:false})
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 10) {
            e.target.value=onlyNums;
        } else if (onlyNums.length === 10) {
            const number = onlyNums.replace(/(\d{3})(\d{3})(\d{4})/, '($1) -$2-$3');
            e.target.value=number;
        } 
    }
    onCheckInput() {
        const { onEmployeeSave,currentUser,selectedEmploye } = this.props;
        var datavalues={
        EmployerId:selectedEmploye!=null?selectedEmploye.EmployerId:0,
        EID:currentUser.Eid,
        searchstring:this.props.searchstring}
        let data=this.props.employerForm.values;
         const errors = {};
            let mandatory='';
            const formaterrors = {};
            let formatrequired='';
            if (!data.EmployerName) {
                errors.EmployerName = 'Required';
                mandatory = mandatory+'\n EmployerName';
            }
           if (data.ZipCode) {
              if(data.ZipCode.trim().length!=5)
               { formaterrors.ZipCode = 'Required';
                formatrequired = formatrequired+'\n ZipCode';}
            }
            if (data.PhoneNumber) {
              if(data.PhoneNumber.trim().length!=10)
               { var expr=/(\d{3})-\d{3}/
               if(!expr.test(data.PhoneNumber))
                {formaterrors.PhoneNumber = 'Required';
                formatrequired = formatrequired+'\n PhoneNumber';}
                }
            }
            if (data.FaxNumber) {
              if(data.FaxNumber.trim().length!=10)
               { var expr=/(\d{3})-\d{3}/
               if(!expr.test(data.FaxNumber))
               {formaterrors.FaxNumber = 'Required';
                formatrequired = formatrequired+'\n FaxNumber';}}
            }
             if (data.PhoneExt) {
              if(data.PhoneExt.trim().length!=5)
               { 
               formaterrors.PhoneExt = 'Required';
                formatrequired = formatrequired+'\n PhoneExt';}
            }
            if(_.isEmpty(errors)&&_.isEmpty(formaterrors)) {
            this.setState({isSave:true})
            

            onEmployeeSave( _.extend(this.props.employerForm.values, datavalues))
               
            } else {
            if(!_.isEmpty(errors)&&!_.isEmpty(formaterrors))
                notifications.showWarning('Following are required fields:\n '+mandatory+'\n'+
                '\n Following fields are not in required format:\n ' + formatrequired);
              else if(!_.isEmpty(errors))  
              notifications.showWarning('Following are required fields:\n '+mandatory);
              else
              notifications.showWarning(
                'Following fields are not in required format:\n ' + formatrequired);
            } 

       
             
    }
    render() {
        const { onHideSideListMenu,patientsMasterData,selectedEmploye } = this.props;
        return (
            <div className="dashboard-employer_menu dashboard-employer_add-employer">
                <div>
                    <div className="dashboard-employer_menu_header">
                        {selectedEmploye==null||selectedEmploye.length==0?"Add Employer":"Edit Employer"}
                    </div>
                    <div className="dashboard-side-list-menu_content">
                        <div className="side-list-content">
                            <ul className="add-list add-patient-menu">
                                <li>
                                    <div className="add-list_key">
                                        Employer
                                        <span className="add-list_required"> *</span>
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="EmployerName" component="input" onInput={this.onChangestate} type="text" />
                                    </div>
                                </li>
                                
                                <li>
                                    <div className="add-list_key">
                                        Address
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="Address" component="textarea" onInput={this.onChangestate} />
                                    </div>
                                </li>
                                 <li >
                                    <div className="add-list_key">
                                        City
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="City" component="input" type="text" onInput={this.onChangestate} />
                                    </div>
                                </li>
                                <li>
                                  <div className="add-list_key">
                                        State
                                  </div>
                                  <div className="add-list_value">
                                   <Field name="State" component="select" onChange={this.onChangestate}  >
                                    <option/>
                                    {patientsMasterData.States.map(state =>
                                     <option key={state.StateCode} value={state.StateCode}>{state.StateName}</option>
                                     )}
                                    </Field>
                                   </div>
                                </li>

                           
                                <li >
                                    <div className="add-list_key">
                                        Zip
                                    </div>
                                    <div className="add-list_value">
                                     <Field name="ZipCode" onInput={this.onCheckNumber} maxLength="5" pattern="\d*" component="input" type="text" />
                                    </div>
                                </li>
                                <li>
                                    <div className="add-list_key">
                                        PhoneNumber
                                    </div>
                                    <div className="add-list_value">
                                        
                                        <Field name="PhoneNumber" onInput={this.onCheckPhone} maxLength="10" pattern="\d*" component="input" type="text" />
                                    </div>
                                 
                                </li>
                                <li>
                               
                                    <div className="add-list_key">
                                        Ext
                                    </div>
                                    <div className="add-list_value">
                                       
                                         <Field name="PhoneExt" onInput={this.onCheckNumber} maxLength="5" pattern="\d*" component="input" type="text" />
                                    </div>
                                </li>
                                <li>
                                    <div className="add-list_key">
                                        Fax No
                                    </div>
                                    <div className="add-list_value">
                                        
                                          <Field name="FaxNumber" onInput={this.onCheckPhone} maxLength="10" pattern="\d*" component="input" type="text" />
                                    </div>
                                </li>
                             
                                
                            </ul>
                            <div className="adds-buttons-block">
                                <button className="adds-buttons-block_cancel-btn" onClick={onHideSideListMenu}>
                                    Cancel
                                </button>
                                <button className="adds-buttons-block_next-btn" type="button" disabled={this.state.isSave} onClick={() => this.onCheckInput()}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
const selectedEmploye=state.employeeReducer.selectedEmploye;
     return {
        currentUser:state.authReducer.currentUser,
        selectedEmploye:selectedEmploye,
        patientsMasterData:state.patientDetailsReducer.patientsMasterData,
        initialValues: {
          ZipCode:selectedEmploye==null?"":selectedEmploye.ZipCode,
          Address:selectedEmploye==null?"":selectedEmploye.Address,
          City:selectedEmploye==null?"":selectedEmploye.City,
          EID:selectedEmploye==null?"":selectedEmploye.EID,
          EmployerId:selectedEmploye==null?"":selectedEmploye.EmployerId,
          EmployerName:selectedEmploye==null?"":selectedEmploye.EmployerName,
          FaxNumber:selectedEmploye==null?"":selectedEmploye.FaxNumber,
          PhoneExt:selectedEmploye==null?"":selectedEmploye.PhoneExt,
          PhoneNumber:selectedEmploye==null?"":selectedEmploye.PhoneNumber,
          State:selectedEmploye.StateCode
   
        },
        employerForm: state.form.employerForm,
        
    }
};

const mapDispatchToProps = dispatch => {
    return {
       
        onEmployeeSave: (data) => { 
            dispatch(saveEmployee(data)); 
                            
        }
    };
};





DashboardEmployerMenu= reduxForm({
    form: 'employerForm',
    enableReinitialize:true
})(DashboardEmployerMenu);

export default connect(
    mapStateToProps,
    mapDispatchToProps

    

)(DashboardEmployerMenu);