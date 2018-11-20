import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import moment from 'moment';

import CloseIcon from '../../../../assets/icons/CloseIcon.jsx';
import DetailsIcon from '../../../../assets/icons/DetailsIcon.jsx';
import TimeLineIcon from '../../../../assets/icons/TimeLineIcon.jsx';
import UserSolidIcon from '../../../../assets/icons/UserSolidIcon.jsx';
import { Link } from 'react-router';

import './DashboardGroupedPatientsHeader.scss';

class DashboardGroupedPatientsHeader extends React.Component {
    render() {
        const { selectedMainGroupedPatient,selectedMainGroupedPatientCharges, params, location } = this.props
        let BackgroundClassName = 'dashboard-group-patients-header-main dashboard-group-patients-header-normalcolor';
      
        return (
            <div className="dashboard-group-patients-header">
                <div className={BackgroundClassName}>
                    <div className="row">
                        <div className="dashboard-group-patients-header_column1">
                            <div className="dashboard-group-patients-header_patient-name-block">
                                <div><h3 title={selectedMainGroupedPatient.PatientName}>{selectedMainGroupedPatient.PatientName} ({selectedMainGroupedPatient.GroupNameCount})</h3></div>
                            </div>
                        </div>
                        <div className="dashboard-group-patients-header_column2">
                            <div key="AccountCharges" className="dashboard-group-patients-header_details-block_row">
                                <div className="dashboard-group-patients-header_details-block_row_key columnnwide" title="Group Charges">
                                   Group Charges
                                </div>
                                <div className="dashboard-group-patients-header_details-block_row_value" title={selectedMainGroupedPatientCharges.GroupCharges}>
                                   $ {Number(selectedMainGroupedPatientCharges.GroupCharges).toFixed(2)}
                                </div>
                            </div>
                            <div key="AccountBalance" className="dashboard-group-patients-header_details-block_row">
                                <div className="dashboard-group-patients-header_details-block_row_key dashboard-group-patients-header_columnnwide" title="Group Balance">
                                   Group Balance
                                </div>
                                <div className="dashboard-group-patients-header_details-block_row_value" title={selectedMainGroupedPatientCharges.GroupBalance}>
                                    $ {Number(selectedMainGroupedPatientCharges.GroupCharges).toFixed(2)}
                                </div>
                            </div>
                            <div key="TotalBalance" className="dashboard-group-patients-header_details-block_row">
                                <div className="dashboard-group-patients-header_details-block_row_key columnnwide" title="Total Balance">
                                   Total Balance
                                </div>
                                <div className="dashboard-group-patients-header_details-block_row_value" title={selectedMainGroupedPatientCharges.TotalBalance}>
                                    {selectedMainGroupedPatientCharges.TotalBalance}
                                </div>
                            </div>
                        </div>
                        
                    </div>              
                </div>               
                <div className="dashboard-group-patients-header_extras">
                    <div className="dashboard-group-patients-header_extras_switch">                    
                        { location.pathname.includes('timeline') &&
                        <Link to={`/patients/${params.patientId}/`} className="dashboard-group-patients-header_extras_switch_button dashboard-group-patients-header_extras_switch_detail">
                            <DetailsIcon/>
                            <span>Details</span>
                        </Link>
                        ||
                        <Link to={`/patients/${params.patientId}/timeline`} className="dashboard-group-patients-header_extras_switch_button dashboard-group-patients-header_extras_switch_timeline">
                            <TimeLineIcon/>
                            <span>Timeline</span>
                        </Link>
                        }
                    </div>
                    <div className="dashboard-group-patients-header_extras_switch">                    
                        { location.pathname.includes('group-accounts') &&
                        <Link to={`/patients/${params.mainpatientId?params.mainpatientId:params.patientId}/`} className="dashboard-group-patients-header_extras_switch_button dashboard-group-patients-header_extras_switch_detail">
                            <UserSolidIcon/>
                            <span>Main Patient</span>
                        </Link>
                        }
                    </div>
                   
                </div>
                <button className="dashboard-group-patients-header_close">
                    <CloseIcon />
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedMainGroupedPatientCharges: state.patientDetailsReducer.selectedMainGroupedPatientCharges,
        selectedMainGroupedPatient: state.patientDetailsReducer.selectedMainGroupedPatient,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardGroupedPatientsHeader);