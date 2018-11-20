import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getIndexPageInfo, getLatestAnnouncements } from './actions.es6';
import Loading from '../../components/LoadingComponent/Loading.jsx';


import './DashboardIndex.scss';

class DashboardIndex extends React.Component {
    componentDidMount() {
        this.props.onGetIndexPageInfo();
        this.props.onGetLatestAnnouncements();
    }

    render() {
        const { indexPageInfo, latestAnnouncements } = this.props;
        const stat = [
            {id: 'accounts', counts: indexPageInfo.AccountsWorkedCount, percents: indexPageInfo.TotalAccountsPerc, cardName: 'Accounts worked'},
            {id: 'notes', counts: indexPageInfo.NotesCount, percents: indexPageInfo.TotalNotesPerc, cardName: 'Notes entered'},
            {id: 'documents', counts: indexPageInfo.DocUploaded, cardName: 'Documents uploaded'}
        ];
        return (
            <div className="dashboard-index">
                <div className="dashboard-index_statistics">
                    {stat.map(statVal =>
                        <div key={statVal.id} className="dashboard-index_statistic-block" id={'dashboard-index_statistic-block-' + statVal.id}>
                            {!_.isEmpty(indexPageInfo) && <div>
                                <div className="dashboard-index_statistic-block-top">
                                    <span className="dashboard-index_statistic-count">{statVal.counts}</span>
                                    <span className="dashboard-index_statistic-percents">{statVal.percents}%</span>
                                </div>
                                <div className="dashboard-index_statistic-block-bottom">
                                    {statVal.cardName}
                                </div>
                            </div> || <Loading />}
                        </div>
                    )}
                </div>
                <div className="dashboard-index_announcements-wrapper">
                    <div className="dashboard-index_announcements-header">
                        Latest Announcements
                    </div>
                    <div className="dashboard-index_announcements">
                        {latestAnnouncements.map(latestAnnouncement =>
                            <div className="dashboard-index_announcement-block" key={latestAnnouncement.ID}>
                                <p className="dashboard-index_announcement-title">
                                    {latestAnnouncement.Header}
                                </p>
                                <p className="dashboard-index_announcement-text">
                                    {latestAnnouncement.Description}
                                </p>
                            </div>
                        ) || <Loading />}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        indexPageInfo: state.indexPageReducer.indexPageInfo,
        latestAnnouncements: state.indexPageReducer.latestAnnouncements
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetIndexPageInfo: () => {
            dispatch(getIndexPageInfo());
        },
        onGetLatestAnnouncements: () => {
            dispatch(getLatestAnnouncements());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardIndex);