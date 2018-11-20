import React from 'react';
import { connect } from 'react-redux';

import './DashboardInsurance.scss';

import LoadingComponent from '../../components/LoadingComponent/Loading.jsx';
import DashboardInsuranceMenu from './components/DashboardInsuranceMenu/DashboardInsuranceMenu.jsx';
import ExcelTypeIcon from '../../assets/icons/DocTypes/ExcelTypeIcon.jsx';
import AddIcon from '../../assets/icons/AddIcon.jsx';
import EditIcon from '../../assets/icons/EditIcon.jsx';
import DeleteIcon from '../../assets/icons/DeleteIcon.jsx';
import Popup from '../../components/Popup/Popup.jsx';
import { showSideListMenu, hideSideListMenu, getTeamList, getInsuranceList, searchInputChange, selectInsuranceData,deleteInsurancebyID,selectAdjuster,getPatientDetails } from './actions.es6';
import InsuranceDeleteStep1 from './components/DashboardInsuranceMenu/InsuranceDeleteStep1.jsx';
import { searchPatient} from '../DashboardBase/actions.es6';

class DashboardInsurance extends React.Component {
 constructor(props) {
          super(props);    
           this.state = {
            searchstring :false,
            isDoubleclick:false,
            heading:'',
            total:0
        }; 
       
         this.selectAdjuster= this.selectAdjuster.bind(this);
        this.onPatientDetails=this.onPatientDetails.bind(this);
        this.headingchange=this.headingchange.bind(this);
         
    }
   
   
    selectAdjuster(val,e)
    { const { onSelectAdjuster,onGetAdjuster} = this.props;
       
     onSelectAdjuster(val);
     onGetAdjuster(val);
    }
    
    headingchange()
    {
    this.setState({isDoubleclick:false})
    }
   
    onPatientDetails(val,e)
    {const{selectedTeam,onGetPatientDetails}=this.props;
    var team={
    team:selectedTeam
    }
    this.setState({
            isDoubleclick: true,
            heading:val.Adjuster+' - '+val.InsuranceCo+' - '+val.AdjusterPhoneNo+' - '
        });
     _.extend(val, team)
    
    onGetPatientDetails(val)

    }
 statusClose() {
        this.setState({
            isDoubleclick: false
        });
       
    }
    componentDidMount() {
        const { onGetTeamList, onGetInsuranceList } = this.props;
        onGetTeamList();
        onGetInsuranceList(0);
    }


    render() {
        const { sideListMenu, onShowSideListMenu, onHideSideListMenu, teamList, teamListLoading, insuranceList, insuranceListLoading, onSearchInputChange, searchInputValue, onGetInsuranceList ,Adjusterdetail,AdjusterID,claimlist,claimlistloading,openPatientTab} = this.props;
        return (
            <div className="dashboard-insurance-wrapper">
                {sideListMenu === 'addInsuranceMenu' && <DashboardInsuranceMenu onHideSideListMenu={onHideSideListMenu}/>}
                {sideListMenu === 'editInsuranceMenu' && <DashboardInsuranceMenu onHideSideListMenu={onHideSideListMenu}/>}
                {sideListMenu === 'deleteInsuranceMenu' && <InsuranceDeleteStep1 onHideSideListMenu={onHideSideListMenu}/>} 
                <div className="dashboard-insurance">
                <div>
                    <div className="dashboard-insurance_title" onClick={()=>this.headingchange()}>
                        {!this.state.isDoubleclick?'Insurance':this.state.heading}
                    </div>
                    {!this.state.isDoubleclick &&
                    <div className="dashboard-search_titlecounter">
                       {insuranceList.length>0?insuranceList.length:this.state.Total}
                    </div>
                    }
                    </div>
                    {!this.state.isDoubleclick &&
                    <div className="dashboard-insurance_header-tools">
                        <button onClick={() => onShowSideListMenu('addInsuranceMenu')}>
                            <AddIcon />
                        </button>
                        <button onClick={() => onShowSideListMenu('editInsuranceMenu')}>
                            <EditIcon  />
                        </button>
                        <button onClick={() => onShowSideListMenu('deleteInsuranceMenu')}>
                            <DeleteIcon />
                        </button>
                    </div>
                    }
                     <div className={this.state.isDoubleclick?"dashboard-insurance_options_hide":"dashboard-insurance_options"}>
                        <div className="dashboard-insurance_option">
                            <label htmlFor="dashboard-insurance_select">Team:</label>
                            <select name="dashboard-insurance_select" onChange={(e) => onGetInsuranceList(e.target.value)} className="dashboard-insurance_select">
                                <option value="0">All</option>
                                {!teamListLoading && teamList.map(team =>
                                    <option key={team.TeamID} value={team.TeamID}>{team.TeamID}</option>
                                )}
                            </select>
                        </div>
                        <div className="dashboard-insurance_option">
                            <label htmlFor="dashboard-insurance_search">Search:</label>
                            <input type="text" name="dashboard-insurance_select" className="dashboard-insurance_search" onChange={onSearchInputChange} value={searchInputValue} />
                        </div>
                        <div className="dashboard-insurance_excel">
                            <ExcelTypeIcon /> Excel
                        </div>

                    </div>
                    {!this.state.isDoubleclick &&
                    <table className="dashboard-insurance_table">
                        <thead>
                            <tr className="dashboard-insurance_table-head-row">
                                <th className="dashboard-insurance_table-head"><input type="checkbox"/></th>
                                <th className="dashboard-insurance_table-head">Adjuster</th>
                                <th className="dashboard-insurance_table-head">Insurance Co</th>
                                <th className="dashboard-insurance_table-head">Claims</th>
                            </tr>
                        </thead>
                        <tbody>
                            {insuranceListLoading &&
                            <tr>
                                <td colSpan="4">
                                    <LoadingComponent />
                                </td>
                            </tr>
                        ||
                        insuranceList.map(insurance =>
                            <tr key={insurance.MainID} className="dashboard-insurance_table-row"  className={AdjusterID!=null && insurance.MainID==AdjusterID?'dashboard-insurance_table-row_active':'dashboard-insurance_table-row'}onClick={() =>this.selectAdjuster(insurance.MainID)} onDoubleClick={()=>this. onPatientDetails(insurance)}>
                                <td className="dashboard-insurance_table-cell"><input type="checkbox"/></td>

                                <td className="dashboard-insurance_table-cell">{insurance.Adjuster}</td>
                                <td className="dashboard-insurance_table-cell">{insurance.InsuranceCo}</td>
                                <td className="dashboard-insurance_table-cell">{insurance.ClaimCount}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>}
                     {this.state.isDoubleclick &&
                        <table className="dashboard-insurance_table">
                        <thead>
                            <tr className="dashboard-insurance_table-head-row">
                                <th className="dashboard-insurance_table-head">PatientID</th>
                                <th className="dashboard-insurance_table-head">Patient Name</th>
                                <th className="dashboard-insurance_table-head">Claim Number</th>
                                 <th className="dashboard-insurance_table-head">Refferred By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {claimlistloading &&
                            <tr>
                                <td colSpan="4">
                                    <LoadingComponent />
                                </td>
                            </tr>
                        ||
                        claimlist.map(claim =>
                            <tr key={claim.PatientID} className="dashboard-insurance_table-row"  className={'dashboard-insurance_table-row'} onDoubleClick={()=>openPatientTab(claim.PatientID)} >
                                <td className="dashboard-insurance_table-cell">{claim.PatientID}</td>
                                <td className="dashboard-insurance_table-cell">{claim.PatientName}</td>
                                <td className="dashboard-insurance_table-cell">{claim.No}</td>
                                <td className="dashboard-insurance_table-cell">{claim.ReferredBy}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>                      
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        sideListMenu: state.insuranceReducer.sideListMenu,
        teamList: state.insuranceReducer.teamList,
        teamListLoading: state.insuranceReducer.teamListLoading,
        insuranceList: state.insuranceReducer.insuranceList,
        insuranceListLoading: state.insuranceReducer.insuranceListLoading,
        searchInputValue: state.insuranceReducer.searchInputValue,
        Adjusterdetail:state.insuranceReducer.Adjusterdetail,
        selectedTeam:state.insuranceReducer.selectedTeam,
        AdjusterID:state.insuranceReducer.AdjusterID,
        claimlist:state.insuranceReducer.claimlist,
        claimlistloading:state.insuranceReducer.claimlistloading
        
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
        onGetInsuranceList: (teamId) => {
            dispatch(getInsuranceList(teamId));
        },
        onSearchInputChange: (e) => {
            dispatch(searchInputChange(e.target.value));
        },
        onSelectAdjuster:(data)=>{
        dispatch(selectInsuranceData(data));
        },
        onDeleteAdjuster:(data)=>{
        dispatch(deleteInsurancebyID(data));
        },
        onGetAdjuster:(data)=>{
        dispatch(selectAdjuster(data));
        },
        onGetPatientDetails:(data)=>{
        dispatch(getPatientDetails(data));
        },
        openPatientTab:(patientid)=>{
         dispatch(searchPatient(patientid));
        }

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardInsurance);
