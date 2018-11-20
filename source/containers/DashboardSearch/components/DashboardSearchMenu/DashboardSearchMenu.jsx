import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import notifications from '../../../../notifications.jsx';
import Datepicker from '../../../../components/Datepicker/Datepicker.jsx';
import './DashboardSearchMenu.scss';
import './constants.es6';
import { showSideListMenu, hideSideListMenu, searchData,clearData } from '../../actions.es6';
import moment from 'moment';
import _ from 'lodash';

class DashboardSearchMenu extends React.Component {
constructor(props) {
        super(props);       
          
        this.onSearch=this.onSearch.bind(this);
        this.clearData=this.onClearData.bind(this);
       
        }
        onSearch()
        {  const { onSearch} = this.props;
               var datavalues={
             ServiceDate:this.props.searchForm.values.ServiceDate!=undefined?moment(this.props.searchForm.values.ServiceDate).format('MM/DD/YYYY'):'',
             BirthDate:this.props.searchForm.values.BirthDate!=undefined?moment(this.props.searchForm.values.BirthDate).format('MM/DD/YYYY'):''
             }
           onSearch( _.extend(this.props.searchForm.values, datavalues));
          
           

        }
         

        onClearData()
        { const { onClearData,reset} = this.props;
           this.props.reset();
            onClearData();
         }
        
    render() {
        const { onHideSideListMenu,patientsMasterData} = this.props;
        return (
            <div className="dashboard-search_menu dashboard-search_add-search">
                <div>
                    <div className="dashboard-search_menu_header">
                        Search
                    </div>
                    <div className="dashboard-side-list-menu_content">
                        <div className="side-list-content">
                            <ul className="add-list add-patient-menu">
                                <li>
                                    <div className="add-list_key">
                                       Patient Last Name
                                        
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="PLastName" component="input"  type="text"  />
                                    </div>
                                </li>
                                
                                <li>
                                    <div className="add-list_key">
                                        Patient First Name
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="PFirstName" component="input"  type="text"  />
                                    </div>
                                </li>
                                 <li >
                                    <div className="add-list_key">
                                        Guar Last Name
                                       
                                    </div>
                                    <div className="add-list_value">
                                        <Field name=" GLastName" component="input" type="text" />
                                    </div>
                                </li>
                                <li>
                                    <div className="add-list_key">
                                        Guar First Name
                                       
                                    </div>
                                    <div className="add-list_value">
                                  
                   
                                        <Field name="GFirstName" component="input" type="text"/>
                                    </div>
                                </li>

                                
                               
                             <li>
                                <div className="add-list_key">
                                        Phone
                                    </div>
                                    <div className="add-list_value">
                                        
                                        <Field name="Phone"  maxLength="10" pattern="\d*" component="input" type="text"/>
                                    </div>
                                 
                                </li>
                                <li>
                               
                                    <div className="add-list_key">
                                        Acct No
                                    </div>
                                    <div className="add-list_value">
                                       
                                         <Field name="ACCNO" maxLength="10" pattern="\d*" component="input" type="text"/>
                                    </div>
                                </li>
                                <li>
                               
                                    <div className="add-list_key">
                                          SSN
                                    </div>
                                    <div className="add-list_value">
                                       
                                         <Field name="SSN"  maxLength="10" pattern="\d*" component="input" type="text"  />
                                    </div>
                                </li>
                                <li>
                                    <div className="add-list_key">
                                           Ins Claim No
                                    </div>
                                    <div className="add-list_value">
                                        
                                          <Field name="ClaimNO"  maxLength="10" pattern="\d*" component="input" type="text" />
                             
                                    </div>
                                </li>
                                <li >
                                    <div className="add-list_key">
                                       MRN
                                    </div>
                                    <div className="add-list_value">
                                     <Field name="MPNumber"  maxLength="5" pattern="\d*" component="input" type="text" />
                                
                                        
                                    </div>
                                  </li>
                                  <li >
                                      <div className="add-list_key">
                                           Provider
                                      </div>
                                      <div className="add-list_value">
                                        <Field name="ReferredBy" component="select" >
                                           <option value="0">Select</option>
                                           {patientsMasterData && patientsMasterData.ReferredBy && patientsMasterData.ReferredBy.map(referredObj =>
                                            <option key={referredObj.RefID} value={referredObj.RefID}>{referredObj.RefName}</option>
                                          )}
                                        </Field>
                                        
                                       </div>
                                  </li>
                                  <li>
                                      <div className="add-list_key">
                                            Active Status
                                      </div>
                                      <div className="add-list_value">
                                       <Field name="ActiveStatus" component="select"> 
                                        <option value="0">Select</option>
                                        <option key='1' value='All'>All</option>
                                        <option key='2' value='Active'>Active</option>
                                        <option key='3' value='InActive'>InActive</option>
                                    
                                         </Field>
                                        </div>
                                  </li>
                                  <li >
                                
                                       <div className="add-list_key">
                                           Status
                                        </div>
                                        <div className="add-list_value">
                                          <Field name="Status" component="select" >
                                           <option value="0">Select</option> 
                                             {patientsMasterData && patientsMasterData.PatientStatus && patientsMasterData.PatientStatus.map(referredObj =>
                                              <option key={referredObj.Status} value={referredObj.Status}>{referredObj.Status}</option>
                                             )}
                                          </Field>
                                        
                                          </div>
                                  </li>
                                  <li >
                                          <div className="add-list_key">
                                             Adjuster
                                          </div>
                                           <div className="add-list_value">
                                              <Field name="Adjuster" maxLength="5" pattern="\d*" component="input" type="text"/> 
                                         
                                            </div>
                                  </li>
                                  <li >
                                    <div className="add-list_key">
                                       Date of Service
                                    </div>
                                    <div className="add-list_value">
                                     <Field name="ServiceDate" component={Datepicker}/>
                           
                                     </div>
                                  </li>
                  
                                  <li >
                                       <div className="add-list_key">
                                             Date of Birth
                                        </div>
                                         <div className="add-list_value">
                                              <Field name="BirthDate" component={Datepicker} />
                                
                                        
                                          </div>
                                   </li>
                            </ul>
                            <div className="adds-buttons-block">
                                <button className="adds-buttons-block_cancel-btn"onClick={()=>this.clearData()}>
                                    Clear
                                </button>
                                <button className="adds-buttons-block_next-btn" type="button" onClick={() => this.onSearch()}>
                                    Search
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
       currentUser:state.authReducer.currentUser,
        searchForm: state.form.searchForm, patientsMasterData:state.patientDetailsReducer.patientsMasterData
        
        }
    };

const mapDispatchToProps = dispatch => {
    return {
       
        onSearch: (data) => { 
             dispatch(searchData(data));
                            
        },
         onGetMasterDataForPatient:()=> {
               dispatch(getMasterDataForPatient());
           },
           onClearData:()=>{
            dispatch(clearData());
           }
    };
};





DashboardSearchMenu= reduxForm({
    form: 'searchForm'
})(DashboardSearchMenu);

export default connect(
    mapStateToProps,
    mapDispatchToProps

    

)(DashboardSearchMenu);