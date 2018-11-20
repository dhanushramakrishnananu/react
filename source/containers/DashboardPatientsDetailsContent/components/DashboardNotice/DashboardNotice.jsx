import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import DashboardCardComponent from '../DashboardCardComponent/DashboardCardComponent.jsx';

import './DashboardNotice.scss';

class DashboardNotice extends React.Component {
    render() {
        const { index, moveCard, noticeList } = this.props;

        return (
            <DashboardCardComponent title="Notice" flex="1" index={index} moveCard={moveCard}>
                <div className="dashboard-notice">
                    {noticeList.map((noticeItem, i) =>
                        <div key={i} className="dashboard-notice_item">
                            <div className="dashboard-notice_item_date">
                                ID: {noticeItem.NID}
                                <br/>
                                <span>
                                    {moment(noticeItem.DateMailed).format('DD/MM/YYYY')}
                                </span>
                            </div>
                            <div className="dashboard-notice_item_text">
                                {noticeItem.NoticeType} – {noticeItem.Notice} {noticeItem.Notice2}
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
        noticeList: state.patientDetailsReducer.patientDetails.PatientLienModel.LienNoticeList
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardNotice);