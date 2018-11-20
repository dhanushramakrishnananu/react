import React from 'react';

import Loading from '../../../../components/LoadingComponent/Loading.jsx';
import CaretIcon from '../../../../assets/icons/CaretIcon.jsx';

import './DashboardPatientsTimelineHistory.scss';

class DashboardPatientsTimeline extends React.Component {
    render() {
        const { historyLoading, timelineHistory} = this.props;
        return (
            <div className="dashboard-timeline-history">
                <div className="dashboard-timeline-history_header">
                    <h2 className="dashboard-timeline-history_header-title"> History</h2>
                    <button className="dashboard-timeline-history_header-hide-button" onClick={this.props.triggerHistoryBlock}>
                        <CaretIcon />
                    </button>
                </div>
                <div className="dashboard-timeline-history_note-title-block">
                    <h3>Note History</h3>
                    <h4>ID: {timelineHistory[0] && timelineHistory[0].NoteID}</h4>
                </div>
                {historyLoading &&
                <Loading/>
                ||
                <div className="dashboard-timeline-history_content">
                    {timelineHistory &&
                    <ul>
                        {timelineHistory.map((timelineItem, index) =>
                            <li key={index}>
                                <h4>{timelineItem.Date}</h4>
                                <p>
                                    <b>Note: </b>
                                    {timelineItem.Note}
                                </p>
                            </li>
                        )}
                    </ul>
                    }
                </div>
                }
            </div>
        );
    }
}
export default DashboardPatientsTimeline;