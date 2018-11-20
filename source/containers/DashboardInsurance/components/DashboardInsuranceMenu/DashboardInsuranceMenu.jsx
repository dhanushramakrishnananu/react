import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import './DashboardInsuranceMenu.scss';
import { showSideListMenu, hideSideListMenu,insertInsuranceData,getInsuranceList} from '../../actions.es6';
import notifications from '../../../../notifications.jsx';
class DashboardInsuranceMenuOld extends React.Component {
    constructor(props) {
          super(props);       
           this.state = {
             isSave: true
          };

           this.saveInsurance = this.saveInsurance.bind(this);
           this.onCheckNumber = this.onCheckNumber.bind(this);
           this.onCheckPhone = this.onCheckPhone.bind(this);
           this.onChangestate=this.onChangestate.bind(this);
          
          
      
        }   
    componentDidMount() {
        const { Adjusterdetail,initialize } = this.props;
        if(Adjusterdetail!=null)
        initialize(Adjusterdetail)
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
      onChangestate(e)
        {
         this.setState({isSave:false})
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
    componentWillReceiveProps(nextProps) {
         const { Adjusterdetail,initialize } = this.props;
       if(nextProps.Adjusterdetail!==Adjusterdetail && nextProps.Adjusterdetail!=null)
        initialize(nextProps.Adjusterdetail)

         }
    saveInsurance(e)
      {  const { Adjusterdetail,initialize,currentUser, selectedTeam
         } = this.props;
      
      var formvalues=this.props.insuranceForm.values;
      formvalues.InsuranceMainID=formvalues.InsuranceMainID?formvalues.InsuranceMainID:0;
      formvalues.AdjusterPhone=formvalues.AdjusterPhone?formvalues.AdjusterPhone:"";
      formvalues.Address=formvalues.Address?formvalues.Address:"";
      formvalues.City=formvalues.City?formvalues.City:"";
      formvalues.Country=formvalues.Country?formvalues.Country:"";
      formvalues.Zip=formvalues.Zip?formvalues.Zip:"";
      formvalues.Ext=formvalues.Ext?formvalues.Ext:"";
      formvalues.City=formvalues.City?formvalues.City:"";
      formvalues.FaxNo=formvalues.FaxNo?formvalues.FaxNo:"";
      formvalues.MailOption=formvalues.MailOption?formvalues.MailOption:"";
      formvalues.InsuranceCo=formvalues.InsuranceCo?formvalues.InsuranceCo:"";
      formvalues.Adjuster=formvalues.Adjuster?formvalues.Adjuster:"";
      formvalues.State=formvalues.State?formvalues.State:""; 
      formvalues.EID=currentUser.Eid,
      formvalues.PatientID=0
     _.extend(this.props.insuranceForm.values, formvalues)
           
      
        const { onHideSideListMenu ,onSaveinsurance,onGetInsuranceList} = this.props;
       
        

         let data=this.props.insuranceForm.values;
         const errors = {};
            let mandatory='';
            const formaterrors = {};
            let formatrequired='';
            if (!data.InsuranceCo) {
                errors.InsuranceCo = 'Required';
                mandatory = mandatory+'\n InsuranceCo';
            }
            if (!data.Adjuster) {
                errors.Adjuster = 'Required';
                mandatory = mandatory+'\n Adjuster';
            }
           if (data.Zip) {
              if(data.Zip.trim().length!=5)
               { formaterrors.Zip = 'Required';
                formatrequired = formatrequired+'\n ZipCode';}
            }
            if (data.AdjusterPhone) {
              if(data.AdjusterPhone.trim().length!=10)
               { var expr=/(\d{3})-\d{3}/
               if(!expr.test(data.AdjusterPhone))
                {formaterrors.AdjusterPhone = 'Required';
                formatrequired = formatrequired+'\n PhoneNumber';}
                }
            }
            if (data.FaxNo) {
              if(data.FaxNo.trim().length!=10)
               { var expr=/(\d{3})-\d{3}/
               if(!expr.test(data.FaxNo))
               {formaterrors.FaxNo = 'Required';
                formatrequired = formatrequired+'\n FaxNumber';}}
            }
             if (data.Ext) {
              if(data.Ext.trim().length!=5)
               { 
               formaterrors.Ext = 'Required';
                formatrequired = formatrequired+'\n PhoneExt';}
            }
            if(_.isEmpty(errors)&&_.isEmpty(formaterrors)) {
            this.setState({isSave:true})
            

             onSaveinsurance(this.props.insuranceForm.values)

               
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

       
             onGetInsuranceList(selectedTeam);
    
      }
    render() {
     
   const { onHideSideListMenu ,onSaveinsurance,Adjusterdetail} = this.props;
        return (
            <div className="dashboard-insurance_menu dashboard-insurance_add-insurance">
                <div>
                    <div className="dashboard-insurance_menu_header">
                       { Adjusterdetail!=null?'Edit Insurance':'Add Insurance'}
                    </div>
                    <div className="dashboard-side-list-menu_content">
                        <div className="side-list-content">
                            <ul className="add-list add-patient-menu">
                                <li>
                                    <div className="add-list_key">
                                        Insurance Co
                                         <span className="add-list_required"> *</span>
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="InsuranceCo" onInput={this.onChangestate} component="input" type="text" />
                                    </div>
                                </li>
                                <li >
                                    <div className="add-list_key">
                                        Adjuster
                                         <span className="add-list_required"> *</span>
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="Adjuster" onInput={this.onChangestate} component="input" type="text" />
                                    </div>
                                </li>
                                <li>
                                    <div className="add-list_key">
                                        Adjuster Pho
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="AdjusterPhone" onInput={this.onCheckPhone} maxLength="10" pattern="\d*"component="input" type="text" />
                                    </div>
                                </li>
                                <li>
                                    <div className="add-list_key">
                                        Address
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="Address" onInput={this.onChangestate} component="textarea" />
                                    </div>
                                </li>
                               
                               
                                <li>
                                    <div className="add-list_key">
                                        City
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="City" onInput={this.onChangestate} component="input" type="text" />
                                    </div>
                                </li>
                                <li>
                                    <div className="add-list_key">
                                        Country
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="Country" component="select" onChange={this.onChangestate}  >
                                   
                                            <option value="USA">USA</option>
                                            <option value="Other">Other</option>
                                        </Field>
                                    </div>
                                </li>
                                <li>
                                    <div className="add-list_key">
                                        State
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="State" component="select" onChange={this.onChangestate}  >
                                   
                                            <option value="NY">NY</option>
                                            <option value="LA">LA</option>
                                        </Field>
                                    </div>
                                </li>
                                <li >
                                    <div className="add-list_key">
                                        Zip
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="Zip" onInput={this.onCheckNumber} maxLength="5" pattern="\d*" component="input" type="text" />
                                    </div>
                                </li>
                                <li>
                                    <div className="add-list_key">
                                        Ext
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="Ext" onInput={this.onCheckNumber} maxLength="5" pattern="\d*" component="input" type="text" />
                                    </div>
                                </li>
                                <li>
                                    <div className="add-list_key">
                                        Fax No
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="FaxNo" onInput={this.onCheckPhone} maxLength="10" pattern="\d*" component="input" type="text" />
                                    </div>
                                </li>
                                <li>
                                    <div className="add-list_key">
                                        Mail Option
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="MailOption" component="select" onChange={this.onChangestate}  >
                                   
                                            <option value="1">option B</option>
                                            <option value="2">option C</option>
                                        </Field>
                                    </div>
                                </li>
                            </ul>
                            <div className="adds-buttons-block">
                                <button className="adds-buttons-block_cancel-btn" onClick={onHideSideListMenu}>
                                    Cancel
                                </button>
                                <button className="adds-buttons-block_next-btn" onClick={() => this.saveInsurance()} disabled={this.state.isSave}>
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
   return {
        insuranceForm: state.form.insuranceForm,
        Adjusterdetail:state.insuranceReducer.Adjusterdetail,
        insuranceList: state.insuranceReducer.insuranceList,
        currentUser:state.authReducer.currentUser,
         selectedTeam:state.insuranceReducer.selectedTeam

        
        
        }
       
    };

const mapDispatchToProps = dispatch => {
    return {
       
        onSaveinsurance: (data) => { 
          dispatch (insertInsuranceData(data))
                            
        },
        onGetInsuranceList: (teamId) => {
            dispatch(getInsuranceList(teamId));
        }
    };
};





DashboardInsuranceMenuOld= reduxForm({
    form: 'insuranceForm',
   enableReinitialize:true
})(DashboardInsuranceMenuOld);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardInsuranceMenuOld);