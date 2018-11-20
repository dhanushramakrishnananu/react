import React from 'react';
import { connect } from 'react-redux';

import DashboardCardComponent from '../DashboardCardComponent/DashboardCardComponent.jsx';

import './DashboardPqiDocs.scss';

class DashboardPqiDocs extends React.Component {
    render() {
        const { index, moveCard, pqiDocs } = this.props;

        return (
            <DashboardCardComponent title="PQI Docs" flex="1" index={index} moveCard={moveCard} noadded noEditing>
                <div className="dashboard-pqi-docs">
                    {pqiDocs.map((pqiItem, i) =>
                        <div key={i} className="dashboard-pqi-docs_item">
                            <span>
                                {pqiItem.CreatedDate}
                            </span>
                            {pqiItem.Type}
                        </div>
                    )}
                </div>
            </DashboardCardComponent>
        );
    }
}

const mapStateToProps = state => {
    return {
        pqiDocs: state.patientDetailsReducer.patientDetails.PatientPQDocs
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardPqiDocs);