import React from 'react';
import Collapsible from 'react-collapsible';
import _ from 'lodash';

import CaretIcon from '../../../../assets/icons/CaretIcon.jsx';

import './DashboardCollapsibleComponent.scss';

class DashboardCollapsibleComponent extends React.Component {
    collapseHeader() {
        return (
            <div className="dashboard-collapsible-component_header">
                <div className="dashboard-collapsible-component_header-left">
                    {this.props.title}
                </div>
                <div className="dashboard-collapsible-component_header-right">
                    <button>
                        <CaretIcon />
                    </button>
                </div>
            </div>
        );
    }
    render() {
        const { selectedId, id } = this.props;
        let className;
        if(selectedId && selectedId == id) {
            className = 'dashboard-collapsible-component is-open';
        } else if(selectedId !== id) {
            className = 'dashboard-collapsible-component is-closed';
        } else {
            className = 'dashboard-collapsible-component';
        }
        return (
            <div style={{cursor: 'pointer'}} className={className} onClick={this.props.deleteItem} >
                <Collapsible trigger={this.collapseHeader()} open={this.props.isClose}>
                    <div className="dashboard-collapsible-component_content">
                        {this.props.children}
                    </div>
                </Collapsible>
            </div>

        );
    }
}

export default DashboardCollapsibleComponent;