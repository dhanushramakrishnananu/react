import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import moment from 'moment';

import { showSideListMenu } from './actions.es6';


import PlusIcon from '../../../../assets/icons/PlusIcon.jsx';
import EditPatientIcon from '../../../../assets/icons/EditPatientIcon.jsx';
import CloseIcon from '../../../../assets/icons/CloseIcon.jsx';
import DetailsIcon from '../../../../assets/icons/DetailsIcon.jsx';
import TimeLineIcon from '../../../../assets/icons/TimeLineIcon.jsx';
import PatientsGroupIcon from '../../../../assets/icons/PatientsGroupIcon.jsx';
import UserCrossIcon from '../../../../assets/icons/UserCrossIcon.jsx';
import UserSolidIcon from '../../../../assets/icons/UserSolidIcon.jsx';
import { Link } from 'react-router';

import './DashboardPatientsHeader.scss';

class DashboardPatientsHeader extends React.Component {
    render() {
        const {
            patientInfo,
            sideListMenu,
            onShowSideListMenu,
            location,
            RefName,
            BirthDate,
            timelyData,
            totalGroupedPatientCount,
            params } = this.props;

        const additionButtonClass = classNames({
            'dashboard-patients-header_add': true,
            'dashboard-patients-header_add-active': sideListMenu === 'additionMenu'
        });
        const actionButtonClass = classNames({
            'dashboard-patients-header_edit': true,
            'dashboard-patients-header_edit-active': sideListMenu === 'actionMenu'
        });
         let timely1=[];
        timely1= timelyData.filter(item =>
            item.TFID===parseInt(patientInfo.Timely1, 10));       
        const timelyDesc1=timely1.length>0?timely1[0].Insurance:patientInfo.Timely1Desc;
        let BackgroundClassName = 'dashboard-patients-header-main dashboard-patients-header-normalcolor';

        if(patientInfo.MiscRefWakeFlag === 1) {
            BackgroundClassName = 'dashboard-patients-header-main dashboard-patients-header-miscRefcolor';
        } else if(patientInfo.MiscRefBalFlag === 1) {
            BackgroundClassName = 'dashboard-patients-header-main dashboard-patients-header-miscRefBalcolor';
        } else if(patientInfo.Status !== null && patientInfo.Status.trim() !== '') {
            if(patientInfo.Status.startsWith('1 ') || patientInfo.Status.startsWith('1.')) {
                BackgroundClassName = 'dashboard-patients-header-main dashboard-patients-header-status1color'; 
            } else if(patientInfo.Status.startsWith('2 ') || patientInfo.Status.startsWith('2.')) {
                BackgroundClassName = 'dashboard-patients-header-main dashboard-patients-header-status2color';
            } else if(patientInfo.Status.startsWith('3 ') || patientInfo.Status.startsWith('3.')) {
                BackgroundClassName = 'dashboard-patients-header-main dashboard-patients-header-status3color';
            } else if(patientInfo.Status.startsWith('5 ') || patientInfo.Status.startsWith('5.')) {
                BackgroundClassName = 'dashboard-patients-header-main dashboard-patients-header-status5color';
            } else {
                BackgroundClassName = 'dashboard-patients-header-main dashboard-patients-header-otherstatuscolor';
            }
        } else {
            BackgroundClassName = 'dashboard-patients-header-main dashboard-patients-header-otherstatuscolor'; 
        }
        let Provider = '';
        if (RefName) {
            Provider = RefName;
        } else {
            Provider = patientInfo.Provider;
        }

        let DOBwithAge = '';
        if (BirthDate) {
            let birthDateMoment = moment(BirthDate);
            let todayTime = moment();
            let duration = moment.duration(todayTime.diff(BirthDate));
            let yearsNumber = parseInt(duration.asYears());

            DOBwithAge = `${birthDateMoment.format('MM/DD/YYYY')}, ${yearsNumber} years`;
        } else {
            DOBwithAge = patientInfo.DOBwithAge;
        }
        return (
            <div className="dashboard-patients-header">
                <div className={BackgroundClassName}>
                    <div className="row">
                        <div className="column1">
                            <div className="dashboard-patients-header_patient-name-block">
                                <div><h3 title={patientInfo.LastName + ' ' + patientInfo.FirstName}>{patientInfo.LastName}, {patientInfo.FirstName}</h3></div>
                                <div>{DOBwithAge}</div>
                                <div>{patientInfo.AccidentDesc}</div>
                            </div>
                        </div>
                        <div className="column2" >
                            <div key="Patient" className="dashboard-patients-header_details-block_row">
                                <div className="dashboard-patients-header_details-block_row_key columnnarrow" title="Patient">
                                   Patient
                                </div>
                                <div className="dashboard-patients-header_details-block_row_value" title={patientInfo.PatientID}>
                                    {patientInfo.PatientID}
                                </div>
                            </div>
                            <div key="Account" className="dashboard-patients-header_details-block_row">
                                <div className="dashboard-patients-header_details-block_row_key columnnarrow" title="Account">
                                   Account
                                </div>
                                <div className="dashboard-patients-header_details-block_row_value" title={patientInfo.ProviderAcct}>
                                    {patientInfo.ProviderAcct}
                                </div>
                            </div>
                            <div key="Hospital" className="dashboard-patients-header_details-block_row">
                                <div className="dashboard-patients-header_details-block_row_key columnnarrow" title="Hospital">
                                   Hospital
                                </div>
                                <div className="dashboard-patients-header_details-block_row_value" title={Provider}>
                                    {Provider}
                                </div>
                            </div>
                        </div>
                        <div className="column3">
                            <div key="AccountCharges" className="dashboard-patients-header_details-block_row">
                                <div className="dashboard-patients-header_details-block_row_key columnnwide" title="Account Charges">
                                   Account Charges
                                </div>
                                <div className="dashboard-patients-header_details-block_row_value" title={patientInfo.TotalCharges}>
                                   $ {Number(patientInfo.TotalCharges).toFixed(2)}
                                </div>
                            </div>
                            <div key="AccountBalance" className="dashboard-patients-header_details-block_row">
                                <div className="dashboard-patients-header_details-block_row_key columnnwide" title="Account Balance">
                                   Account Balance
                                </div>
                                <div className="dashboard-patients-header_details-block_row_value" title={patientInfo.CurrentBal}>
                                    $ {Number(patientInfo.CurrentBal).toFixed(2)}
                                </div>
                            </div>
                            <div key="TotalBalance" className="dashboard-patients-header_details-block_row">
                                <div className="dashboard-patients-header_details-block_row_key columnnwide" title="Total Balance">
                                   Total Balance
                                </div>
                                <div className="dashboard-patients-header_details-block_row_value" title={patientInfo.AccBal}>
                                    {patientInfo.PatientCount > 1? `${patientInfo.AccBal} (${patientInfo.PatientCount})` : patientInfo.AccBal}
                                </div>
                            </div>
                        </div>
                        <div className="column4" >
                            <div key="Status" className="dashboard-patients-header_details-block_row">
                                <div className="dashboard-patients-header_details-block_row_key columnnsmall" title="Status">
                                   Status
                                </div>
                                <div className="dashboard-patients-header_details-block_row_value" title={patientInfo.Status}>
                                    {patientInfo.Status}
                                </div>
                            </div>
                            <div key="Que" className="dashboard-patients-header_details-block_row">
                                <div className="dashboard-patients-header_details-block_row_key columnnsmall" title="Que">
                                   Que
                                </div>
                                <div className="dashboard-patients-header_details-block_row_value" title={patientInfo.Que}>
                                    {patientInfo.Que}
                                </div>
                            </div>
                             <div key="Timely" className="dashboard-patients-header_details-block_row">
                                <div className="dashboard-patients-header_details-block_row_key columnnsmall" title="Timely">
                                   Timely
                                </div>
                                <div className="dashboard-patients-header_details-block_row_value" title={timelyDesc1}>
                                    {timelyDesc1}
                                </div>
                            </div>
                        </div>
                    </div>              
                </div>
                <div  className="optionsDiv">
                    <button className={additionButtonClass} onClick={() => onShowSideListMenu('additionMenu')}>
                        <PlusIcon />
                    </button>
                    <button className={actionButtonClass} onClick={() => onShowSideListMenu('actionMenu')}>
                        <EditPatientIcon />
                    </button>
                    {patientInfo.PatientDeceased &&
                    <button className="dashboard-patients-header_deceasedbutton" title="Deceased Patient" >
                        <UserCrossIcon/>
                    </button>}
                </div>
                <div className="dashboard-patients-header_extras">
                    <div className="dashboard-patients-header_extras_switch">                    
                        { location.pathname.includes('timeline') &&
                        <Link to={`/patients/${patientInfo.PatientID}/`} className="dashboard-patients-header_extras_switch_button dashboard-patients-header_extras_switch_detail">
                            <DetailsIcon/>
                            <span>Details</span>
                        </Link>
                        ||
                        <Link to={`/patients/${patientInfo.PatientID}/timeline`} className="dashboard-patients-header_extras_switch_button dashboard-patients-header_extras_switch_timeline">
                            <TimeLineIcon/>
                            <span>Timeline</span>
                        </Link>
                        }
                    </div>
                    <div className="dashboard-patients-header_extras_switch">                    
                        { location.pathname.includes('group-accounts') &&
                        <Link to={`/patients/${patientInfo.PatientID}/`} className="dashboard-patients-header_extras_switch_button dashboard-patients-header_extras_switch_detail">
                            <UserSolidIcon/>
                            <span>Main Patient</span>
                        </Link>
                        ||
                         <Link to={totalGroupedPatientCount !==0 ? `/patients/${patientInfo.PatientID}/group-accounts`:``} className="dashboard-patients-header_extras_group dashboard-patients-header_extras_switch_button">
                        <PatientsGroupIcon />
                        <span>Group accts ({totalGroupedPatientCount})</span>
                    </Link>
                        }
                    </div>
                   
                </div>
                <button className="dashboard-patients-header_close">
                    <CloseIcon />
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        sideListMenu: state.homeReducer.sideListMenu,
        patientDetails: state.patientDetailsReducer.patientDetails,
        RefName: state.patientDetailsReducer.RefName,
        BirthDate: state.patientDetailsReducer.BirthDate,
        timelyData: state.patientDetailsReducer.timelyData,
        totalGroupedPatientCount: state.patientDetailsReducer.patientDetails.PatientNotesDocsModel.TotalGroupedPatientCount
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onShowSideListMenu: (menuName) => {
            dispatch(showSideListMenu(menuName));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardPatientsHeader);