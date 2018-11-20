import React from 'react';
import './DashboardGroupActs.scss';
import { connect } from 'react-redux';
import { getGroupAccountDetails } from './actions.es6';
import GroupAccountsTableRow from './GroupAccountsTableRow.jsx';

class DashboardGroupActs extends React.Component {
    
    componentDidMount() {
        const { groupedPatients, onGetGroupAccountDetails, params } = this.props;
        if(groupedPatients) {
            onGetGroupAccountDetails(params.patientId,groupedPatients[0]);
        }
    }
    render() {
        const { selectedMainGroupedPatientInsurance, selectedGroupedPatientInsuranceCoList} = this.props;
        return(
            <div className="dashboard-group-acts">
                <div className="dashboard-group-acts_header-title">
                       Grouped Accounts     
                </div>
                {selectedGroupedPatientInsuranceCoList.length !== 0 && <div className='dashboard-group-acts_table-wrapper'>
                    <table className='dashboard-group-acts_table'>
                        <thead className='dashboard-group-acts_table-row' colSpan={4}>
                            <tr>
                                <th className='dashboard-group-acts_table-head'>Account#</th>
                                {selectedGroupedPatientInsuranceCoList.map((item, i) =>
                                 <th key={i} className='dashboard-group-acts_table-head'>{item.InsuranceCo}
                                 <div>
                                     <div className='dashboard-group-acts_table-value'>  MP </div>
                                     <div className='dashboard-group-acts_table-value'>  LI </div>
                                     <div className='dashboard-group-acts_table-value'>  UM </div>
                                 </div>
                                 </th>
                                )
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {selectedMainGroupedPatientInsurance.map((item, j) =>
                                <GroupAccountsTableRow
                                    key={j}
                                    AccountID={item.AccountID}
                                    item={item}
                                />
                            )
                            }
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
        selectedMainGroupedPatientInsurance: state.patientDetailsReducer.selectedMainGroupedPatientInsurance,
        selectedGroupedPatientInsuranceCoList: state.patientDetailsReducer.selectedGroupedPatientInsuranceCoList,
        groupedPatients: state.patientDetailsReducer.patientDetails.PatientNotesDocsModel.GroupedPatients
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onGetGroupAccountDetails: (PatientId,groupacct) => {
            dispatch(getGroupAccountDetails(PatientId,groupacct));
        } 
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardGroupActs); 