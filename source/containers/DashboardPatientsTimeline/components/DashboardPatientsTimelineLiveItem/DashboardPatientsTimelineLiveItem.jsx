import React from 'react';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import Collapsible from 'react-collapsible';

import Loading from '../../../../components/LoadingComponent/Loading.jsx';
import ExpandIcon from '../../../../assets/icons/ExpandIcon.jsx';
import NarrowIcon from '../../../../assets/icons/NarrowIcon.jsx';
import { timelineItemTypes as timelineItemTypes } from '../../../../constants/timelineItemTypes.es6';
import TimelineInnerComponent from '../TimelineInnerComponent/TimelineInnerComponent.es6';

import './DashboardPatientsTimelineLiveItem.scss';

class DashboardPatientsTimelineLiveItem extends React.Component {
    headerElement() {
        const { onGetTimelineItemData, itemLiveDetail, patientId } = this.props;
        return (
            <button className="vertical-timeline-expanded-button" onClick={() => onGetTimelineItemData(itemLiveDetail.ActionID, itemLiveDetail.RelatedActionID, patientId)}>
                <span className="vertical-timeline-expand">
                    <ExpandIcon />
                </span>
                <span className="vertical-timeline-narrow"><NarrowIcon /></span>
            </button>
        );
    }

    render() {
        const { itemLiveDetail } = this.props;
        return (
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                iconStyle={{ background: timelineItemTypes[itemLiveDetail.ActionID] ? timelineItemTypes[itemLiveDetail.ActionID].background : timelineItemTypes.default.background }}
                icon={timelineItemTypes[itemLiveDetail.ActionID] ? timelineItemTypes[itemLiveDetail.ActionID].icon : timelineItemTypes.default.icon}
            >
                <div className="vertical-timeline-header">
                    <h4>
                        {itemLiveDetail.CreatedDate}
                        {itemLiveDetail.ActionID === 3 &&
                        <button className="vertical-timeline-element_history-trigger" onClick={() => this.props.triggerHistoryBlock('3', itemLiveDetail.RelatedActionID)}>History</button>
                        }
                    </h4>
                    <p>{itemLiveDetail.Action}</p>
                </div>
                <Collapsible trigger={this.headerElement()}>
                    {itemLiveDetail.detailsLoading ?
                        <Loading />
                        :
                        <div className="vertical-timeline-inner">
                            {itemLiveDetail.details &&
                            <TimelineInnerComponent
                                type={itemLiveDetail.ActionID}
                                details={itemLiveDetail.details}/>
                            }
                        </div>
                    }
                </Collapsible>
            </VerticalTimelineElement>
        );
    }
}

export default DashboardPatientsTimelineLiveItem;