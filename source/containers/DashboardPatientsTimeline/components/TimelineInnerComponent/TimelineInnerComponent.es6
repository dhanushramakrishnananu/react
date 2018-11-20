import React from 'react';
import _ from 'lodash';

import DashboardInsuranceInfo from '../../../DashboardPatientsDetailsContent/components/DashboardInsuranceInfo/DashboardInsuranceInfo.jsx';

class TimelineInnerComponent extends React.Component {
    render() {
        const { type, details } = this.props;
        return (
            <div>
                {type === 5 &&
                <DashboardInsuranceInfo details={details[0]} />
                ||
                type === 3 && <p>{details[0].Note}</p>
                ||
                <div>
                    {details.map((detailObj, index) => <div key={index}>
                        {_.map(detailObj, (detailObjVal, detailObjKey) => <div className="vertical-timeline-inner-text" key={detailObjKey}>{`${detailObjKey}: ${detailObjVal}`}</div>)}
                    </div>)}
                </div>
                }
            </div>
        );
    }
}

export default TimelineInnerComponent;