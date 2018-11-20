import React from 'react';

import InstitutionIcon from '../../../../assets/icons/InstitutionIcon.jsx';

import './DashboardInsuranceInfo.scss';

class DashboardInsuranceInfo extends React.Component {
    render() {
        const { details } = this.props;
        return (
            <div className="dashboard-insurance-info">
                <div className="dashboard-insurance-info_row dashboard-insurance-info_row_title">
                    <div className="dashboard-insurance-info_row_key">
                        <div className="dashboard-insurance-info_image">
                            <InstitutionIcon />
                        </div>
                    </div>
                    <div className="dashboard-insurance-info_row_value">
                        <div className="dashboard-insurance-info_att-info">
                            <span>{details && details['Insurance Co']}</span>
                            <span></span>
                        </div>
                    </div>
                </div>
                <div className="dashboard-insurance-info_row">
                    <div className="dashboard-insurance-info_row_key">
                        Adjuster
                    </div>
                    <div className="dashboard-insurance-info_row_value">
                        {details && details['Adjuster']}
                    </div>
                </div>
                <div className="dashboard-insurance-info_row">
                    <div className="dashboard-insurance-info_row_key">
                        Adjuster Phone No
                    </div>
                    <div className="dashboard-insurance-info_row_value">
                        {details && details['Adjuster Phone No']}
                    </div>
                </div>
                <div className="dashboard-insurance-info_row">
                    <div className="dashboard-insurance-info_row_key">
                        Address
                    </div>
                    <div className="dashboard-insurance-info_row_value">
                        {details && details['Address']}
                    </div>
                </div>
                <div className="dashboard-insurance-info_row">
                    <div className="dashboard-insurance-info_row_key">
                        City
                    </div>
                    <div className="dashboard-insurance-info_row_value">
                        {details && details['City']}
                    </div>
                </div>
                <div className="dashboard-insurance-info_row">
                    <div className="dashboard-insurance-info_row_key">
                        State
                    </div>
                    <div className="dashboard-insurance-info_row_value">
                        {details && details['State']}
                    </div>
                </div>
                <div className="dashboard-insurance-info_row">
                    <div className="dashboard-insurance-info_row_key">
                        Zip
                    </div>
                    <div className="dashboard-insurance-info_row_value">
                        {details && details['Zip']}
                    </div>
                </div>
                <div className="dashboard-insurance-info_row">
                    <div className="dashboard-insurance-info_row_key">
                        Ext
                    </div>
                    <div className="dashboard-insurance-info_row_value">
                        {details && details['Ext']}
                    </div>
                </div>
                <div className="dashboard-insurance-info_row">
                    <div className="dashboard-insurance-info_row_key">
                        Fax No
                    </div>
                    <div className="dashboard-insurance-info_row_value">
                        {details && details['FaxNo']}
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardInsuranceInfo;