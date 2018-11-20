import React from 'react';

import PersonIcon from '../../../../assets/icons/PersonIcon.jsx';

import './DashboardPersonInfo.scss';

class DashboardPersonInfo extends React.Component {
    render() {
        const { personName, personDesc, personInfo } = this.props;
        return (
            <div className="dashboard-person-info">
                <div className="dashboard-person-info_row dashboard-person-info_row_title">
                    <div className="dashboard-person-info_row_key">
                        <div className="dashboard-person-info_image">
                            <PersonIcon />
                        </div>
                    </div>
                    <div className="dashboard-person-info_row_value">
                        <div className="dashboard-person-info_att-info">
                            <span>{personName}</span>
                            <span>{personDesc}</span>
                        </div>
                    </div>
                </div>
                {personInfo.map((infoItem, i) =>
                    <div key={i} className="dashboard-person-info_row">
                        <div className="dashboard-person-info_row_key">
                            {infoItem.key}
                        </div>
                        <div className="dashboard-person-info_row_value">
                            {infoItem.value}
                        </div>
                    </div>)}
            </div>
        );
    }
}

export default DashboardPersonInfo;