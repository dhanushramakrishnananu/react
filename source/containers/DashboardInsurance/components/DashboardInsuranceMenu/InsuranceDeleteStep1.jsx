import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import './DashboardInsuranceMenu.scss';
import { showSideListMenu, hideSideListMenu,searchInsuranceDetails,getPatientsForDelete,getPatientDetailsForReplace,resetData,deleteInsurancebyID} from '../../actions.es6';
import notifications from '../../../../notifications.jsx';
import LoadingComponent from '../../../../components/LoadingComponent/Loading.jsx';
import Popup from '../../../../components/Popup/Popup.jsx';
import CloseIcon from '../../../../assets/icons/CloseIconblack.jsx';
class InsuranceDeleteStep1 extends React.Component {
    constructor(props) {
          super(props);       
           this.state = {
             isSave: true,
             loadtable:false,
             renderpatient:false,
             isDeleteConfirmOpened:false,
             isDeleteReplace:false,
             popupmessage:'',
             nextbutton:false,
             step:'1',
             searchbutton:true,
             cancelbutton:true,
             backbutton:false,
             isReplaceDeleteConfirmOpened:false

          };
           this.searchAdjuster=this.searchAdjuster.bind(this);
           this.onClaimDetails=this.onClaimDetails.bind(this);
           this.backAdjuster=this.backAdjuster.bind(this);
           this.deleteAdjuster=this.deleteAdjuster.bind(this);
           this.handleClose=this.handleClose.bind(this);
           this.deleteReplaceAdjuster=this.deleteReplaceAdjuster.bind(this);
           this.clearData=this.clearData.bind(this);
           this.submitdelete=this.submitdelete.bind(this);
           this.nextbuttonclick=this.nextbuttonclick.bind(this);
           this.ReplceAdjuster=this.ReplceAdjuster.bind(this);
           this.submitdeleteReplace=this.submitdeleteReplace.bind(this);
          
        }   
    searchAdjuster()
    {   
        const { onSearchInsuranceDetails} = this.props;
            
             var formvalues=this.props.InsuranceDeleteStep1.values;
             if(formvalues!=undefined)
            {
             
            if(this.state.isDeleteReplace)
              {this.setState({loadtable:true,
                nextbutton:true,
                step:'4',
                backbutton:false,
                searchbutton:true,
                cancelbutton:false})
                }
                else
                {
                onSearchInsuranceDetails(this.props.InsuranceDeleteStep1.values)
               this.setState({
                loadtable:true,
                nextbutton:false,
                step:'2',
                backbutton:true,
                searchbutton:true,
                cancelbutton:false
            })
                }
             }
            else
            notifications.showWarning('SearchField cant be empty')
               

    }
    nextbuttonclick()
    {const{AdjusterDelete,AdjusterReplace}=this.props;
    if(AdjusterDelete!=undefined||AdjusterDelete!=null)
     { if(AdjusterReplace!=null)

      { if(AdjusterReplace.InsID!=AdjusterDelete.InsID)
          {
           this.setState({ renderpatient:true,
      step:'5'})}
          
        else
         notifications.showWarning('Please select another insurance to replace') 

      }
      else
      {this.setState({ renderpatient:true,
      step:'3'})}
          
    }}
    onClaimDetails(val,e)
    {   
        if(!this.state.isDeleteReplace){
            this.setState({nextbutton:true,
            searchbutton:false
            })
        }
        else{
            this.setState({nextbutton:true,
            searchbutton:true
            })
        }
     
        const { onGetPatientsForDelete,onGetPatientsForReplace} = this.props;
            if(this.state.isDeleteReplace){
                onGetPatientsForReplace(val)
     
            }
            else
                onGetPatientsForDelete(val)
      
    }
   
    
    handleClose = () => {
            this.setState({isDeleteConfirmOpened: false,
            isReplaceDeleteConfirmOpened:false});
    }
    backAdjuster()
    {
        this.setState({
            renderpatient:false,
            step:'2'
        })
    }
    deleteAdjuster()
    {
        
            var msg="Are you sure, Do you want to delete this Adjuster without Replacing it ?";
        this.setState({isDeleteConfirmOpened:true,
        popupmessage:msg})
    }
    ReplceAdjuster()
    {
        const {AdjusterDelete,AdjusterReplace} = this.props;
           var msg="Are you sure,you want to delete the insuarance "+AdjusterDelete.Adjuster +" and replace with "+AdjusterReplace.Adjuster+"?";
           this.setState({isReplaceDeleteConfirmOpened:true,
        popupmessage:msg})
           
       
    }
    deleteReplaceAdjuster()
    {
        this.setState({isDeleteReplace:true,
        renderpatient:false,
        nextbutton:true,
        backbutton:false,
        searchbutton:true,
        step:'4'})
    }
    clearData()
    {    
        const {reset,onClearAllData}=this.props;
       this.setState({isDeleteReplace:false,
        nextbutton:false,
        step:1,
        cancelbutton:true,
        searchbutton:true,
        backbutton:false});
        onClearAllData();

          
    }
    submitdelete()
    {   
        const {AdjusterDelete,AdjusterReplace,onDeleteAdjuster,onReplaceAdjuster,onHideSideListMenu} = this.props;
      
        var data={
        DeleteinsID:AdjusterDelete.InsID,
        ReplaceinsID:0
        }
        
           onDeleteAdjuster(data);
           this.props.onHideSideListMenu();
          
    }
     submitdeleteReplace()
    {   
        const {AdjusterDelete,AdjusterReplace,onDeleteAdjuster,onReplaceAdjuster,onHideSideListMenu} = this.props;
        
        var data={
        DeleteinsID:AdjusterDelete.InsID,
        ReplaceinsID:AdjusterReplace.InsID
        }
        
        
           onDeleteAdjuster(data);
           this.props.onHideSideListMenu();
          
    }
    renderpatient()
    { 
        const { patientlistloading,patientlist,onHideSideListMenu,AdjusterDelete,AdjusterReplace} = this.props;
            return(
                <div className="dashboard-side-list-menu_content">
                    <div className="side-list-content">
                        <span className='spanhead'>Insurance selected for delete is:<span className='spanhead'>{AdjusterDelete.Adjuster}</span> </span>
                        <span className='spanhead'>All patients related to <span className='spanhead'>{AdjusterDelete.Adjuster}</span> </span>

                       { AdjusterReplace!=null && <span className='spanhead'>Insurance selected for Replace is:<span className='spanhead'>{AdjusterReplace.Adjuster} </span></span>}
                    <div className='searchtablelist'>
                    <table className="dashboard-insurance_table">
                        <thead>
                           <tr className="dashboard-insurance_table-head-row">
                                <th className="dashboard-insurance_table-head">Patient ID</th>
                                <th className="dashboard-insurance_table-head">Patient Name</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                         {patientlistloading &&
                            <tr>
                                <td colSpan="4">
                                    <LoadingComponent />
                                </td>
                            </tr>
                        ||
                           
                         patientlist.map(claim =>
                            <tr  className="dashboard-insurance_table-row"  className={'dashboard-insurance_table-row'} >
                                <td className="dashboard-insurance_table-cell">{claim.PatientID}</td>
                                <td className="dashboard-insurance_table-cell">{claim.PatientName}</td>
                                
                            </tr>
                        
                        )}
                        </tbody>
                    </table>
                   
                    </div>
                      <div className="adds-buttons-block">
                               <button className="adds-buttons-block_cancel-btn" onClick={()=>
                                this.backAdjuster()}>
                                    Back
                               </button>
                                 
                                
                                

                               { this.state.isDeleteReplace &&<button className="adds-buttons-block_next-btn" onClick={() =>this.ReplceAdjuster()} >
                                    Confirm
                                </button>}
                                <button className={this.state.isDeleteReplace?"adds-buttons-block_delete-btn":"adds-buttons-block_next-btn"} onClick={() => this.deleteAdjuster()} >
                                    Delete
                                </button>
                                {!this.state.isDeleteReplace && <button className="adds-buttons-block_delete-btn" onClick={() =>this.deleteReplaceAdjuster()} >
                                    Delete & Replace
                                </button>}
                               
                            </div>
                    </div>
                     {this.state.isDeleteConfirmOpened &&
                        <Popup   message={this.state.popupmessage}
                         onCLose={() => this.handleClose()}
                         
                         onOk={() => this.submitdelete()}
                        noLabel='No'
                        yesLabel='Yes'/> }
                        {this.state.isReplaceDeleteConfirmOpened &&
                        <Popup   message={this.state.popupmessage}
                         onCLose={() => this.handleClose()}
                         
                         onOk={() => this.submitdeleteReplace()}
                        noLabel='No'
                        yesLabel='Yes'/> }

                    </div>
                    );
    }
    renderAdjuster()
    {const { onHideSideListMenu,insuranceSearchListLoading,insuranceSearchList,patientlist,AdjusterDelete,AdjusterReplace} = this.props;
    
    return(
<div className="dashboard-side-list-menu_content">

                        <div className="side-list-content">
                            <ul className="add-list add-patient-menu">
                                <li>
                                    <div className="add-list_key">
                                        Adjuster Name
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="Adjuster"  component="input" type="text" />
                                    </div>
                                </li>
                                <li className="margin-bottom">
                                    <div className="add-list_key">
                                       Insurance Company
                                    </div>
                                    <div className="add-list_value">
                                        <Field name="Company" component="input" type="text" />
                                    </div>
                                </li>
                               
                               
                               
                            </ul>
                            
                             {this.state.loadtable &&
                             <div className='searchtablelist'>
                    <table className="dashboard-insurance_table">
                        <thead>
                            <tr className="dashboard-insurance_table-head-row">
                                <th className="dashboard-insurance_table-head">Adjuster</th>
                                <th className="dashboard-insurance_table-head">Company</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                         {!this.state.isDeleteReplace?insuranceSearchListLoading &&
                            <tr>
                                <td colSpan="4">
                                    <LoadingComponent />
                                </td>
                            </tr>
                        ||
                          
                        insuranceSearchList.map(insurance =>
                            <tr key={insurance.InsID} className={AdjusterDelete!=null && AdjusterDelete.InsID==insurance.InsID?"dashboard-insurance_table-row_active":"dashboard-insurance_table-row"} onClick={()=>this.onClaimDetails(insurance)} onDoubleClick={()=>this.onClaimDetails(insurance)}>
                                <td className="dashboard-insurance_table-cell">{insurance.Adjuster}</td>
                                <td className="dashboard-insurance_table-cell">{insurance.Company}</td>
                              
                            </tr>)
                      
                           :
                           insuranceSearchListLoading &&
                            <tr>
                                <td colSpan="4">
                                    <LoadingComponent />
                                </td>
                            </tr>
                        ||
                          
                        insuranceSearchList.map(insurance =>
                            <tr key={insurance.InsID} className={AdjusterReplace!=null && AdjusterReplace.InsID==insurance.InsID?"dashboard-insurance_table-row_active":"dashboard-insurance_table-row"} onClick={()=>this.onClaimDetails(insurance)} onDoubleClick={()=>this.onClaimDetails(insurance)}>
                                <td className="dashboard-insurance_table-cell">{insurance.Adjuster}</td>
                                <td className="dashboard-insurance_table-cell">{insurance.Company}</td>
                              
                            </tr>)
                      
                           
                  

                        }
                        </tbody>
                    </table>
                    {this.state.step=='2' && <span className='spanhead'>Select the insurance you want to delete and click next</span>}
                    </div>}

                
                            <div className="adds-buttons-block">
                               
                                
                                {this.state.cancelbutton && <button className="adds-buttons-block_cancel-btn" onClick={onHideSideListMenu}>
                                    Cancel
                                </button>}
                                {this.state.backbutton && <button className="adds-buttons-block_cancel-btn" onClick={()=>this.clearData()}>
                                    Back
                                </button>}

                                {this.state.searchbutton && <button className="adds-buttons-block_next-btn" onClick={() =>this.searchAdjuster()} >
                                    Search
                                </button>}
                                 {this.state.nextbutton && <button className={this.state.nextbutton && this.state.searchbutton?"adds-buttons-block_nxt-btn":"adds-buttons-block_next-btn"}onClick={() => this.nextbuttonclick()} >
                                    Next
                                </button>}
                            </div>
                        </div>
                    </div>

    );

    }
    render() {
     
   const { onHideSideListMenu,insuranceSearchListLoading,insuranceSearchList} = this.props;
        return (
            <div className="dashboard-insurance_menu dashboard-insurance_add-insurance">
                <div>
                    <div className="dashboard-insurance_menu_header">
                        Delete Insurance(Step{this.state.step}/5)
                           
                                 <button className="closeicn" onClick={onHideSideListMenu}>
                            <CloseIcon/>
                        </button>
                    </div>

                    {this.state.renderpatient?this.renderpatient():this.renderAdjuster()}
                   
                </div>
            </div>
        );
    }
}
    const mapStateToProps = state => {
   return {
        InsuranceDeleteStep1: state.form.InsuranceDeleteStep1,
        insuranceSearchList:state.insuranceReducer.insuranceSearchList,
        currentUser:state.authReducer.currentUser,
        insuranceSearchListLoading:state.insuranceReducer.insuranceSearchListLoading,
        patientlist:state.insuranceReducer.patientlist,
        patientlistloading:state.insuranceReducer.patientlistloading,
        AdjusterDelete:state.insuranceReducer.AdjusterDelete,
        AdjusterReplace:state.insuranceReducer.AdjusterReplace
        }
       
    };

const mapDispatchToProps = dispatch => {
    return {
       
        onSearchInsuranceDetails:(data)=>{
        dispatch(searchInsuranceDetails(data));
        },
        onGetPatientsForDelete:(data)=>{
        dispatch(getPatientsForDelete(data));
        },
        onGetPatientsForReplace:(data)=>{
        dispatch(getPatientDetailsForReplace(data));
        },
        onClearAllData:()=> {
        dispatch(resetData());
        },
        onDeleteAdjuster:(data)=> {
        dispatch(deleteInsurancebyID(data));
        }
        
       
    };
};





InsuranceDeleteStep1= reduxForm({
    form: 'InsuranceDeleteStep1',
   enableReinitialize:true
})(InsuranceDeleteStep1);

export default connect(
    mapStateToProps,
    mapDispatchToProps

    

)(InsuranceDeleteStep1);