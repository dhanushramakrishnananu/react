import React from 'react';
import { connect } from 'react-redux';

import './DashboardEmployers.scss';

import LoadingComponent from '../../components/LoadingComponent/Loading.jsx';

import classNames from 'classnames';
import AddIcon from '../../assets/icons/AddIcon.jsx';
import EditIcon from '../../assets/icons/EditIcon.jsx';
import DashboardEmployerMenu from './components/DashboardEmployerMenu/DashboardEmployerMenu.jsx';

import { showSideListMenu, hideSideListMenu, searchEmployee,editEmployer,selectEmployee, clearData } from './actions.es6';
import { getMasterDataForPatient } from '../DashboardHome/actions.es6';
import notifications from '../../notifications.jsx';
class DashboardEmployers extends React.Component {
 constructor(props) {
        super(props);    
          this.state = {
            searchstring :'',
            Total:0
        };   
         this.onCheckInput = this.onCheckInput.bind(this);
        this.onSearchEmployee=this.onSearchEmployee.bind(this);
        this.onEditEmploye=this.onEditEmploye.bind(this);
        this.selectEmployee=this.selectEmployee.bind(this);
        this.onEditEmploye=this.onEditEmploye.bind(this);
         this.onClear=this.onClear.bind(this);
         
    }
     componentDidMount() {
       const { onGetMasterDataForPatient,onHideSideListMenu,onClearData}= this.props;
        onGetMasterDataForPatient();
        onHideSideListMenu(null);
        onClearData();
    }

    onCheckInput(e) {

        this.setState({searchstring:e.target.value})      
    }
    onClear(e) {
          const { onClearData }= this.props;
    
        this.setState({searchstring:""}) 
             onClearData()
    }
    selectEmployee(value) {
        const { onSelectEmployee ,EmployeeList,patientsMasterData} = this.props;
         var selecteddata='';
          patientsMasterData.States.map(function(curntobj)
      {
      if(curntobj.StateName==value.State)
      {        selecteddata={
            StateCode:curntobj.StateCode}

      }

      })
       
         _.extend(value,selecteddata)
        var data={selectedemploye:value,
        list:EmployeeList}
        this.setState({currentID:value});
        onSelectEmployee(data)
    }
   
    onSearchEmployee(e) {
     const { onSearchEmployee } = this.props;
       if(this.state.searchstring!==null && this.state.searchstring.trim().length>0)
        onSearchEmployee(this.state.searchstring)   
        else
           notifications.showWarning('Please enter search field')
             
    }
    onEditEmploye(value)
    {    const {
         selectedEmploye,onEditEmployer } = this.props;
         onEditEmployer(value,selectedEmploye)
    }
   
   
    render() {
    
        const { sideListMenu, onShowSideListMenu, onHideSideListMenu, EmployeeList, employeelistloading,onSearchEmployee,patientsMasterData,onEditEmploye,selectedEmploye } = this.props;
      
        return (
            <div className="dashboard-employee-wrapper">
                 {sideListMenu === 'addEmployerMenu' && <DashboardEmployerMenu onHideSideListMenu={onHideSideListMenu} patientsMasterData={patientsMasterData} searchstring={this.state.searchstring}/>}
                 {sideListMenu === 'editEmployerMenu' && <DashboardEmployerMenu onHideSideListMenu={onHideSideListMenu} patientsMasterData={patientsMasterData} searchstring={this.state.searchstring} />}
                <div className="dashboard-employee">
                    <div>
                    <div className="dashboard-employee_title">
                       Employers
                    </div>
                    <div className="dashboard-employee_titlecounter">
                       {EmployeeList.length>0?EmployeeList.length:this.state.Total}
                    </div>
                    </div>
                    <div className="dashboard-employee_header-tools">
                        <button onClick={() => onShowSideListMenu('addEmployerMenu')}>
                            <AddIcon />
                        </button>
                        <button onClick={() =>this. onEditEmploye('editEmployerMenu')}  disabled={selectedEmploye==null||selectedEmploye.length==0}
                          >
                          <EditIcon/>
                        </button>
                        
                    </div>
                    <div className="dashboard-employee_options">
                        
                        <div className="dashboard-employee_option">
                            <label htmlFor="dashboard-employee_search">Employer Name:</label>
                            <input type="text" name="dashboard-employee_select" className="dashboard-employee_search"  
                            value={this.state.searchstring}
                            onChange={this.onCheckInput} />
                            
                            <button className="dashboard-employee_button" value='Search' onClick={() => this.onSearchEmployee()}>
                            <i className="fa fa-search"></i> 
                            
                            Search
                            </button>
                           
                            <button  className="dashboard-employee_buttoncl" value='Clear' onClick={() => this.onClear()}>
                            <i className="fa fa-close"></i> 
                            clear
                            </button>
                            
                        </div>
                        

                    </div>
                    <table className="dashboard-employee_table">
                        <thead>
                            <tr className="dashboard-employee_table-head-row">
                                
                                <th className="dashboard-employee_table-head">Employer Name</th>
                                <th className="dashboard-employee_table-head">Address</th>
                                <th className="dashboard-employee_table-head">City</th>
                                
                                <th className="dashboard-employee_table-head">State</th>
                                
                                <th className="dashboard-employee_table-head">ZipCode</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeelistloading &&
                            <tr>
                                <td colSpan="6">
                                    <LoadingComponent />
                                </td>
                            </tr>
                        ||
                        EmployeeList.map(employee =>
                            <tr key={employee.EmployerId} className={selectedEmploye!=null && employee.EmployerId==selectedEmploye.EmployerId?'dashboard-employee_table-head-row_active':'dashboard-employee_table-head-row'} onClick={() =>this.selectEmployee(employee)} onDoubleClick={()=>this. onEditEmploye('editEmployerMenu')}>
                                
                                
                                <td className="dashboard-employee_table-cell">{employee.EmployerName}</td>
                                <td className="dashboard-employee_table-cell">{employee.Address}</td>
                                 <td className="dashboard-employee_table-cell">{employee.City}</td>
                                <td className="dashboard-employee_table-cell">{employee.State}</td>
                                <td className="dashboard-employee_table-cell">{employee.ZipCode}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        sideListMenu: state.employeeReducer.sideListMenu,
        employeelistloading: state.employeeReducer.employeelistloading,
        EmployeeList:state.employeeReducer.EmployeeList,
        patientsMasterData:state.patientDetailsReducer.patientsMasterData,
        selectedEmploye:state.employeeReducer.selectedEmploye

    };
};

const mapDispatchToProps = dispatch => {
    return {
        onShowSideListMenu: (menuName) => {
            dispatch(showSideListMenu(menuName));
        },
        onHideSideListMenu: (menuName) => {
            dispatch(hideSideListMenu(menuName));
        },
        onSearchEmployee: (searchstring) => {           
          
                dispatch(searchEmployee(searchstring));
                
            
        } ,
        onEditEmployer:(menuName, data) => {
               dispatch(editEmployer(menuName, data));
           },
           onSelectEmployee:(data) => {
               dispatch(selectEmployee(data));
           },
           onGetMasterDataForPatient:()=> {
               dispatch(getMasterDataForPatient());
           },
           onClearData:()=> {
               dispatch(clearData());
           }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardEmployers);
