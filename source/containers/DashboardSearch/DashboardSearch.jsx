import React from 'react';
import { connect } from 'react-redux';
import './DashboardSearch.scss';
import LoadingComponent from '../../components/LoadingComponent/Loading.jsx';
import classNames from 'classnames';
import DashboardSearchMenu from './components/DashboardSearchMenu/DashboardSearchMenu.jsx';
import { showSideListMenu, hideSideListMenu } from './actions.es6';
import { getMasterDataForPatient } from '../DashboardHome/actions.es6';
import notifications from '../../notifications.jsx';
class DashboardSearch extends React.Component {
 constructor(props) {
        super(props);  
          this.state = {
            Total:0
        };   
          
    }
     componentDidMount() {
     const { onShowSideListMenu,onGetMasterDataForPatient }= this.props;
      onShowSideListMenu('SearchMenu')
      onGetMasterDataForPatient();
    }

   
   
   
    render() {
    
        const { sideListMenu, onShowSideListMenu, onHideSideListMenu, SearchList, searchlistloading,patientsMasterData} = this.props;
      
        return (
            <div className="dashboard-search-wrapper">
                 {sideListMenu === 'SearchMenu' && <DashboardSearchMenu  patientsMasterData={patientsMasterData}
       />}
                 
                <div className="dashboard-search">
                <div>
                    <div className="dashboard-search_title">
                       Search Results
                    </div>
                    <div className="dashboard-search_titlecounter">
                       {SearchList.length>0?SearchList.length:this.state.Total}
                    </div>
                    </div>
                    
                    <div className="dashboard-search_tabbody">
                    <table className="dashboard-search_table">
                        <thead>
                            <tr className="dashboard-search_table-head-row">
                                
                                <th className="dashboard-search_table-head">Patient ID</th>
                                <th className="dashboard-search_table-head">Acc No</th>
                                <th className="dashboard-search_table-head">Last Name</th>
                                 <th className="dashboard-search_table-head">First Name</th>
                                <th className="dashboard-search_table-head">Birth Date</th>
                                <th className="dashboard-search_table-head">Admit Date</th>
                                <th className="dashboard-search_table-head">Guar Last</th>
                                <th className="dashboard-search_table-head">Guar First</th>
                                <th className="dashboard-search_table-head">SSN </th>
                                <th className="dashboard-search_table-head">Home Phone</th>
                                <th className="dashboard-search_table-head">Cell Phone</th>
                                <th className="dashboard-search_table-head">Ins Claim No</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchlistloading &&
                            <tr>
                                <td colSpan="12" >
                                    <LoadingComponent />
                                </td>
                            </tr>
                        ||
                        SearchList.map(Item =>
                            <tr  className='dashboard-search_table-head-row'>
                                
                                
                                <td className="dashboard-search_table-cell">{Item.MedPayID}</td>
                                <td className="dashboard-search_table-cell">{Item.ACCNo}</td>
                                <td className="dashboard-search_table-cell">{Item.PLastName}</td>
                                <td className="dashboard-search_table-cell">{Item.PFirstName}</td>
                                <td className="dashboard-search_table-cell">{Item.BirthDate}</td>
                                
                                <td className="dashboard-search_table-cell">{Item.AdmitDate}</td>
                                <td className="dashboard-search_table-cell">{Item.GLastName}</td>
                                <td className="dashboard-search_table-cell">{Item.GFirstName}</td>
                                <td className="dashboard-search_table-cell">{Item.SSN}</td>
                                <td className="dashboard-search_table-cell">{Item.HomePhone}</td>
                                <td className="dashboard-search_table-cell">{Item.CellPhone}</td>
                                <td className="dashboard-search_table-cell">{Item.ClaimNO}</td>
                            </tr>
                            
                        )}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        sideListMenu: state.searchReducer.sideListMenu,
        SearchList:state.searchReducer.SearchList,
         patientsMasterData:state.patientDetailsReducer.patientsMasterData,
       searchlistloading:state.searchReducer.searchlistloading
       

    };
};

const mapDispatchToProps = dispatch => {
    return {
        onShowSideListMenu: (menuName) => {
            dispatch(showSideListMenu(menuName));
        },
       onGetMasterDataForPatient:()=> {
               dispatch(getMasterDataForPatient());
           }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardSearch);
