import React from 'react';
import { connect } from 'react-redux';

import './DashboardAttorney.scss';

import LoadingComponent from '../../components/LoadingComponent/Loading.jsx';
import ExcelTypeIcon from '../../assets/icons/DocTypes/ExcelTypeIcon.jsx';
import AddIcon from '../../assets/icons/AddIcon.jsx';
import EditIcon from '../../assets/icons/EditIcon.jsx';
import DeleteIcon from '../../assets/icons/DeleteIcon.jsx';
import DashboardAddAttorneyMenu from './components/DashboardAddAttorneyMenu/DashboardAddAttorneyMenu.jsx';
import DashboardDeleteAttorneyMenu from './components/DeleteAttorneyMenu/DashboardDeleteAttorneyMenu.jsx';
import { showSideListMenu, hideSideListMenu, getTeamList, getAttorneyList,getStateData, selectAttorney, GetPatientsByAttorney } from './actions.es6';


class DashboardAttorney extends React.Component {
     constructor(props) {
        super(props);   
         this.state = {
             Teamid: 0,
             Fname: '',
             Lname: '',
             Firm: '',
             isPatientsListVisible:false            
         };
        
         this.SearchAttorney=this.SearchAttorney.bind(this);
         this.clearAttorney=this.clearAttorney.bind(this);
         this.setTeamId=this.setTeamId.bind(this);
         this.setFirstName=this.setFirstName.bind(this);
         this.setLastName=this.setLastName.bind(this);
         this.setFirm=this.setFirm.bind(this);
         this.setVisibility=this.setVisibility.bind(this);
         this.gridDoubleclick=this.gridDoubleclick.bind(this);
    }

    componentDidMount() {
        const { onGetTeamList, onGetState } = this.props;
        onGetTeamList();
        onGetState();
    }

    SearchAttorney()
    {
         const { onGetAttorneyList } = this.props;
         let attoreny={
             'Type':1,
             'FName':this.state.Fname,
             'LName':this.state.Lname,
             'Team':this.state.Teamid=="All"?0:this.state.Teamid,
             'Firm':this.state.Firm,
             'ID':0
         };
         onGetAttorneyList(attoreny);
    }
    clearAttorney()
    {
        this.setState({
            Teamid: 0,
            Fname: '',
            Lname: '',
            Firm: '',            
        });
    }
    setTeamId(e)
    {
        this.setState({Teamid:e.target.value});
    }
    setFirstName(e)
    {
        this.setState({Fname:e.target.value});
    }
    setLastName(e)
    {
        this.setState({Lname:e.target.value});
    }
    setFirm(e)
    {
        this.setState({Firm:e.target.value});
    }
    setVisibility()
    {
        this.setState({isPatientsListVisible:false});
    }
    gridDoubleclick(data)
    {
        this.setState({isPatientsListVisible:true});
        let model={
            ID: data.AttorneyID,
            Firm: data.AttFirm,
            Type: 2,
            FName: this.state.Fname,
            Team: this.state.Teamid,
            LName: this.state.Lname,
        };
        this.props.onSelectPatients(model);
    }
    render() {
        const { sideListMenu, stateData, onShowSideListMenu, onHideSideListMenu, teamList, teamListLoading, onGetAttorneyList, attorneyListLoading, attorneyList, selectMainAttorney, onSelectAttorney, onSelectPatients, PatientList} = this.props;
        let attoreny={
            Type:1,
            FName:this.state.Fname,
            LName:this.state.Lname,
            Team:this.state.Teamid,
            Firm:this.state.Firm,
            ID:0
        };
        return (
            <div className="dashboard-attorney-wrapper">             
             {sideListMenu === 'addAttorneyMenu' && <DashboardAddAttorneyMenu onHideSideListMenu={onHideSideListMenu} stateData={stateData}/>}
             {sideListMenu === 'editAttorneyMenu' && <DashboardAddAttorneyMenu onHideSideListMenu={onHideSideListMenu} stateData={stateData} selectedAttorney={selectMainAttorney} isEdit={true} Search={attoreny}/>}
             {sideListMenu === 'deleteAttorneyMenu' && <DashboardDeleteAttorneyMenu onHideSideListMenu={onHideSideListMenu} stateData={stateData} selectedAttorney={selectMainAttorney} isEdit={true} Search={attoreny}/>}
              {! this.state.isPatientsListVisible &&  <div className="dashboard-attorney">
                    <div>
                        <div className="dashboard-attorney_title">
                            Attorney
                        </div>
                        <div className="dashboard-attorney_titlecounter">
                            {attorneyList.length>0?attorneyList.length:0}
                        </div>
                    </div>
                    <div className="dashboard-attorney_header-tools">
                        <button onClick={() => onShowSideListMenu('addAttorneyMenu')}>
                            <AddIcon />
                        </button>
                        <button onClick={() => onShowSideListMenu('editAttorneyMenu')}  disabled={selectMainAttorney==null||selectMainAttorney.length==0}>
                            <EditIcon />
                        </button>
                        <button  onClick={() => onShowSideListMenu('deleteAttorneyMenu')}>
                            <DeleteIcon />
                        </button>
                    </div>
                    <div className="dashboard-attorney_options">
                        <div className="dashboard-attorney_optiont">
                            <label htmlFor="dashboard-attorney_select">Team:</label>
                            <select name="dashboard-attorney_select" className="dashboard-attorney_txtinputf" value={this.state.Teamid} onChange={this.setTeamId}  >
                                <option>Select</option>
                                <option value="All">All</option>
                                {!teamListLoading && teamList.map(team =>
                                    <option key={team.TeamID} value={team.TeamID}>{team.TeamID}</option>
                                )}
                            </select>
                        </div>
                        <div className="dashboard-attorney_option">
                            <label htmlFor="dashboard-attorney_search">First Name:</label>
                            <input type="text" className="dashboard-attorney_txtinput" name="dashboard-attorney_select" value={this.state.Fname} onChange={this.setFirstName} />
                        </div>
                        <div className="dashboard-attorney_option">
                            <label htmlFor="dashboard-attorney_search">Last Name:</label>
                            <input type="text" className="dashboard-attorney_txtinput" name="dashboard-attorney_select" value={this.state.Lname} onChange={this.setLastName} />
                        </div>
                        <div className="dashboard-attorney_option">
                            <label htmlFor="dashboard-attorney_search">Firm:</label>
                            <input type="text" className="dashboard-attorney_txtinput" name="dashboard-attorney_select" value={this.state.Firm} onChange={this.setFirm} />
                        </div> 
                        <div className="dashboard-attorney_gobtn">
                            <button  onClick={()=>this.SearchAttorney()}> Go</button> 
                        </div>
                        <div className="dashboard-attorney_clearbtn">                           
                            <button onClick={() => this.clearAttorney()}> Clear</button>
                        </div>
                    </div>
                    <table className="dashboard-attorney_table">
                        <thead>
                            <tr className="dashboard-attorney_table-head-row">                               
                                <th className="dashboard-attorney_table-head">First Name</th>
                                <th className="dashboard-attorney_table-head">Last Name</th>
                                <th className="dashboard-attorney_table-head">Firm</th>                                
                                <th className="dashboard-attorney_table-head">Address</th>
                                <th className="dashboard-attorney_table-head">City</th>
                                <th className="dashboard-attorney_table-head">State</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attorneyListLoading &&
                            <tr>
                                <td colSpan="6">
                                    <LoadingComponent />
                                </td>
                            </tr>
                        ||
                        attorneyList.map(attorney =>
                            <tr key={attorney.AttorneyID} className={selectMainAttorney!=null && attorney.AttorneyID==selectMainAttorney.AttorneyID?'dashboard-attorney_table-head_active':'dashboard-attorney_table-head'} onClick={() =>onSelectAttorney(attorney)} onDoubleClick={()=>this.gridDoubleclick(attorney)}>                                                      
                                <td className="dashboard-attorney_table-cell">{attorney.AttFirstName}</td>
                                <td className="dashboard-attorney_table-cell">{attorney.AttLastName}</td>
                                <td className="dashboard-attorney_table-cell">{attorney.AttFirm}</td>
                                <td className="dashboard-attorney_table-cell">{attorney.Address}</td>
                                <td className="dashboard-attorney_table-cell">{attorney.City}</td>
                                <td className="dashboard-attorney_table-cell">{attorney.State}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
              }
              { this.state.isPatientsListVisible && <div className="dashboard-attorney">                   
                    <div className="dashboard-attorney_options">
                        <div className="dashboard-attorney_firmbtn">
                            <button  onClick={()=>this.setVisibility()}>Firm :  {selectMainAttorney.AttFirm} </button> 
                        </div> 
                    </div>
                    <table className="dashboard-attorney_table">
                        <thead>
                            <tr className="dashboard-attorney_table-head-row"> 
                                <th className="dashboard-attorney_table-head">Patient ID</th>
                                <th className="dashboard-attorney_table-head">Name</th>
                                <th className="dashboard-attorney_table-head">Ref</th>                                
                                <th className="dashboard-attorney_table-head">AcctNumber</th>
                                <th className="dashboard-attorney_table-head">Attorney</th>
                                <th className="dashboard-attorney_table-head">Status</th>
                                <th className="dashboard-attorney_table-head">Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attorneyListLoading &&
                            <tr>
                                <td colSpan="6">
                                    <LoadingComponent/>
                                </td>
                            </tr>
                        ||
                        PatientList.map(patient =>
                            <tr key={patient.PatientId}>
                                <td className="dashboard-attorney_table-cell">{patient.PatientId}</td>
                                <td className="dashboard-attorney_table-cell">{patient.Name}</td>
                                <td className="dashboard-attorney_table-cell">{patient.Ref}</td>
                                <td className="dashboard-attorney_table-cell">{patient.AccountNo}</td>
                                <td className="dashboard-attorney_table-cell">{patient.Attorney}</td>
                                <td className="dashboard-attorney_table-cell">{patient.Status}</td>
                                <td className="dashboard-attorney_table-cell">{patient.Balance}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
              }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {       
        teamList: state.insuranceReducer.teamList,
        teamListLoading: state.insuranceReducer.teamListLoading,
        attorneyList: state.attorneyReducer.attorneyMainList,
        attorneyListLoading: state.attorneyReducer.attorneyMainListLoading,
        sideListMenu: state.attorneyReducer.sideListMenu,
        stateData: state.atFaultReducer.atFaultStateData,
        selectMainAttorney: state.attorneyReducer.selectMainAttorney,
        PatientList: state.attorneyReducer.PatientList
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
        onGetTeamList: () => {
            dispatch(getTeamList());
        },
        onGetAttorneyList: (data) => {
            dispatch(getAttorneyList(data));
        },
        onGetState: () => {
            dispatch(getStateData());
        },
        onSelectAttorney:(data)=>{
            dispatch(selectAttorney(data));
        },
        onSelectPatients:(data)=>{
            dispatch(GetPatientsByAttorney(data));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardAttorney);
