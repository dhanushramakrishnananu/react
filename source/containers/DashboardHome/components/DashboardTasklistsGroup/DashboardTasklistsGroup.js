import React from 'react';
import Collapsible from 'react-collapsible';
import { Link } from 'react-router';

import RefreshIcon from '../../../../assets/icons/RefreshIcon.jsx';
import SettingIcon from '../../../../assets/icons/SettingIcon.jsx';
import CaretIcon from '../../../../assets/icons/CaretIcon.jsx';
import Loading from '../../../../components/LoadingComponent/Loading.jsx';

import './DashboardTasklistsGroup.scss';

class DashboardTasklistsGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.onToggleAccordion = this.onToggleAccordion.bind(this);
    }

    onToggleAccordion() {
        const { open } = this.state;
        const { getTaskListDetails } = this.props;

        if (!open) {
            getTaskListDetails();
        }

        this.setState({
            open: !open
        });
    }

    groupHeader() {
        const { taskList: {Description}, getTaskListDetails } = this.props;
        return (
            <div className="dashboard-tasklists-group_header">
                <div className="dashboard-tasklists-group_header-left" onClick={this.onToggleAccordion}>
                    {Description}
                </div>
                <div className="dashboard-tasklists-group_header-right">
                    <div className="dashboard-tasklists-group_header-right_count">
                        12
                    </div>
                    <button onClick={getTaskListDetails}>
                        <RefreshIcon />
                    </button>
                    <button>
                        <SettingIcon />
                    </button>
                    <button className="dashboard-tasklists-group_header-caret-button" onClick={this.onToggleAccordion}>
                        <CaretIcon />
                    </button>
                </div>
            </div>
        );
    }

    render() {
        const { open } = this.state;
        const { taskList: {patients} } = this.props;
        return (
            <div className="dashboard-tasklists-group">
                <Collapsible trigger={this.groupHeader()} handleTriggerClick={() => {}} open={open}>
                    {patients &&
                    <ul>
                        {patients.map(patient =>
                            <li key={patient.PatientID}>
                                <Link to={`/patients/${patient.PatientID}`} activeClassName="dashboard-tasklists-group_link_active">
                                    <div className="dashboard-tasklists-group_link-inner">
                                        {patient.Name || patient.PatientName || patient.PatientID}
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

export default DashboardTasklistsGroup;