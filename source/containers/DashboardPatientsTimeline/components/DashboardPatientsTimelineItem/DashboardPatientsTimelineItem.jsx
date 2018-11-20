import React from 'react';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import Collapsible from 'react-collapsible';

import ExpandIcon from '../../../../assets/icons/ExpandIcon.jsx';
import NarrowIcon from '../../../../assets/icons/NarrowIcon.jsx';
import NoteIcon from '../../../../assets/icons/NoteIcon.jsx';
import LibraIcon from '../../../../assets/icons/LibraIcon.jsx';
import InstitutionIcon from '../../../../assets/icons/InstitutionIcon.jsx';
import DashboardPersonInfo from '../../../DashboardPatientsDetailsContent/components/DashboardPersonInfo/DashboardPersonInfo.jsx';
import DashboardInsuranceInfo from '../../../DashboardPatientsDetailsContent/components/DashboardInsuranceInfo/DashboardInsuranceInfo.jsx';


import './DashboardPatientsTimelineItem.scss';

class DashboardPatientsTimelineItem extends React.Component {
    constructor(props) {
        super(props);

        this.typeChanges = {
            note: {
                background: '#3db4e5',
                icon: <NoteIcon />,
                title: 'Create Note ID: 4564869'

            },
            attorney: {
                background: '#6a78dd',
                icon: <LibraIcon />,
                title: 'Add Attorney'
            },
            insurance: {
                background: '#0aa89e',
                icon: <InstitutionIcon />,
                title: 'Add Insurance'
            }
        };
    }

    headerElement() {
        return (
            <button className="vertical-timeline-expanded-button">
                <span className="vertical-timeline-expand"><ExpandIcon /></span>
                <span className="vertical-timeline-narrow"><NarrowIcon /></span>
            </button>
        );
    }

    note() {
        const { timelineItemData } = this.props;
        return (
            <p>
                {timelineItemData}
            </p>
        );
    }

    attorney() {
        const { timelineItemName, timelineItemDesc, timelineItemData } = this.props;
        return (
            <DashboardPersonInfo
                personName={timelineItemName}
                personDesc={timelineItemDesc}
                personInfo={timelineItemData}
            />);
    }

    insurance() {
        const { timelineItemName, timelineItemDesc, timelineItemData } = this.props;
        return (
            <DashboardInsuranceInfo
                insuranceName={timelineItemName}
                insuranceDesc={timelineItemDesc}
                insuranceInfo={timelineItemData}
            />);
    }

    render() {
        const { timelineItemType, timelineItemDate, historyBtn } = this.props;
        return (
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                iconStyle={{ background: this.typeChanges[timelineItemType].background }}
                icon={this.typeChanges[timelineItemType].icon}
            >
                <div className="vertical-timeline-header">
                    <h4>{timelineItemDate}
                        {historyBtn &&
                        <button className="vertical-timeline-element_history-trigger" onClick={this.props.triggerHistoryBlock}>History</button>
                        }
                    </h4>
                    <p>{this.typeChanges[timelineItemType].title}
                    </p>
                </div>
                <Collapsible trigger={this.headerElement()}>
                    <div className="vertical-timeline-inner">
                        {this[timelineItemType]()}
                    </div>
                </Collapsible>
            </VerticalTimelineElement>
        );
    }
}

export default DashboardPatientsTimelineItem;