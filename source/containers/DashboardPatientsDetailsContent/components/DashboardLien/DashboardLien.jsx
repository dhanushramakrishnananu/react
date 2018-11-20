import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import DashboardCardComponent from '../DashboardCardComponent/DashboardCardComponent.jsx';

import './DashboardLien.scss';

class DashboardLien extends React.Component {
    render() {
        const { index, moveCard, lienList } = this.props;

        return (
            <DashboardCardComponent title="Lien" flex="1" index={index} moveCard={moveCard}>
                <div className="dashboard-lien">
                    {lienList.map((lienItem, i) =>
                        <div key={i} className="dashboard-lien_item">
                            <div className="dashboard-lien_item_date">
                                {lienItem.LienStatus}
                                <br/>
                                <span>
                                    {moment(lienItem.Created).format('MM/DD/YYYY')}
                                </span>
                            </div>
                            <div className="dashboard-lien_item_text">
                                {lienItem.LienType}
                            </div>
                            <div className="dashboard-lien_item_num">
                                {lienItem.LienAmount}
                            </div>
                        </div>
                    )}
                </div>
            </DashboardCardComponent>
        );
    }
}

const mapStateToProps = state => {
    return {
        lienList: state.patientDetailsReducer.patientDetails.PatientLienModel.LienList
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardLien);