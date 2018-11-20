import React from 'react';
import Collapsible from 'react-collapsible';
import { Link } from 'react-router';

import RefreshIcon from '../../../../assets/icons/RefreshIcon.jsx';
import SettingIcon from '../../../../assets/icons/SettingIcon.jsx';
import CaretIcon from '../../../../assets/icons/CaretIcon.jsx';
import Loading from '../../../../components/LoadingComponent/Loading.jsx';

import './DashboardGroupedPatientsList.scss';

class DashboardGroupedPatientsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            initialload:true
        };

        this.onToggleAccordion = this.onToggleAccordion.bind(this);
    }

    onToggleAccordion() {
        const { open } = this.state;
        const { getGroupAccountDetails } = this.props;

        if (!open) {
            getGroupAccountDetails();
        }

        this.setState({
            open: !open,
            initialload:false
        });
    }

    groupHeader() {
        const { groupacct: {PatientName,GroupNameCount}, getGroupAccountDetails } = this.props;
        return (
            <div className="dashboard-grouped-patients-lists_header">
                <div className="dashboard-grouped-patients-lists_header-left" onClick={this.onToggleAccordion}>
                    {PatientName}
                </div>
                <div className="dashboard-grouped-patients-lists_header-right">
                    <div className="dashboard-grouped-patients-lists_header-right_count">
                        {GroupNameCount}
                    </div>
                    <button onClick={getGroupAccountDetails}>
                        <RefreshIcon />
                    </button>
                    <button>
                        <SettingIcon />
                    </button>
                    <button className="dashboard-grouped-patients-lists_header-caret-button" onClick={this.onToggleAccordion}>
                        <CaretIcon />
                    </button>
                </div>
            </div>
        );
    }

    render() {
        const { open, initialload } = this.state;
        const { groupacct: {patients}, mainPatientId,firstElement  } = this.props;
        return (
            <div className="dashboard-grouped-patients-lists">
                <Collapsible trigger={this.groupHeader()} handleTriggerClick={() => {}} open={(firstElement === 0 && initialload)?true:open}>
                    {patients &&
                    <ul>
                        {patients.map(patient =>
                            <li key={patient.PatientID}>
                                {/*<Link to={`/patients/${mainPatientId}/group-accounts/${patient.PatientID}`}  activeClassName="dashboard-grouped-patients-lists_link_active">
                                    <div className="dashboard-grouped-patients-lists_link-inner">
                                        {patient.PatientID}  -  {patient.Status}
                                    </div>
                                </Link>*/}
                                <Link   activeClassName="dashboard-grouped-patients-lists_link_active">
                                    <div className="dashboard-grouped-patients-lists_link-inner">
                                       <div className='dashboard-grouped-patients-lists_id'> {patient.PatientID} </div> 
                                       <div className='dashboard-grouped-patients-lists_status'> {patient.Status}</div>
                                    </div>
                                </Link>
                            </li>
                        )}
                    </ul> ||
                    <Loading />
                    }
                </Collapsible>
            </div>
        );
    }
}

export default DashboardGroupedPatientsList;