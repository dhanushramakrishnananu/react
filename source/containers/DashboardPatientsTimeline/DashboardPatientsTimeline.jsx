import React from 'react';
import { connect } from 'react-redux';

import { VerticalTimeline } from 'react-vertical-timeline-component';

import { getTimeline, getTimelineItemData, getTimelineHistory } from './actions.es6';

import DashboardPatientsTimelineLiveItem from './components/DashboardPatientsTimelineLiveItem/DashboardPatientsTimelineLiveItem.jsx';
import DashboardPatientsTimelineHistory from './components/DashboardPatientsTimelineHistory/DashboardPatientsTimelineHistory.jsx';

import './DashboardPatientsTimeline.scss';

class DashboardPatientsTimeline extends React.Component {
    constructor(props) {
        super(props);

        this.triggerHistoryBlock= this.triggerHistoryBlock.bind(this);
        this.state = {
            active: true
        };
    }

    componentDidMount() {
        const { params, onGetTimeline } = this.props;

        onGetTimeline(params.patientId);
    }

    triggerHistoryBlock(actionId, relatedActionId) {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
        this.props.onGetTimelineHistory(actionId, relatedActionId);
        console.log(actionId, relatedActionId);
    }

    render() {
        const { timeline, timelineItemData, onGetTimelineItemData, timelineHistory, historyLoading, params} = this.props;
        console.log(timeline);
        return (
            <div className="dashboard-timeline">
                <div className="dashboard-timeline_wrapper">
                    <div className="dashboard-timeline_timeline-block">
                        <h2 className="dashboard-timeline_title">Timeline</h2>
                        <VerticalTimeline>
                            {timeline.map((itemLiveDetail, i) =>
                                <DashboardPatientsTimelineLiveItem
                                    key={i}
                                    triggerHistoryBlock={this.triggerHistoryBlock}
                                    onGetTimelineItemData={onGetTimelineItemData}
                                    itemLiveDetail={itemLiveDetail}
                                    timelineItemData={timelineItemData}
                                    patientId={params.patientId}
                                />
                            )}
                        </VerticalTimeline>
                    </div>
                    <div className={this.state.active ? 'dashboard-timeline_hidden-history': 'dashboard-timeline_showed-history'} >
                        <DashboardPatientsTimelineHistory
                            historyLoading={historyLoading}
                            timelineHistory={timelineHistory}
                            triggerHistoryBlock={this.triggerHistoryBlock}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        historyLoading: state.patientDetailsReducer.historyLoading,
        timelineHistory: state.patientDetailsReducer.timelineHistory,
        timeline: state.patientDetailsReducer.timeline
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetTimeline: (patientId) => {
            dispatch(getTimeline(patientId));
        },
        onGetTimelineItemData: (actionId, relatedActionId, patientId) => {
            dispatch(getTimelineItemData(actionId, relatedActionId, patientId));
        },
        onGetTimelineHistory: (actionId, relatedActionId) => {
            dispatch(getTimelineHistory(actionId, relatedActionId));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardPatientsTimeline);