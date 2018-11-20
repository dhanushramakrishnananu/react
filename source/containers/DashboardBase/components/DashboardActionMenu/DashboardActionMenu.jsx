import React from 'react';

import './DashboardActionMenu.scss';

class DashboardActionMenu extends React.Component {
    render() {
        const actionList = ['Address verify', 'GroupAccts', 'Copy to Group', 'Copy to Data', 'Verify', 'Add Related Claim', 'New Group', 'Return Account', 'Print Latter', 'Create Envelope', 'Edit', 'Delete'];
        return (
            <div className="side-list-content action-menu">
                <ul className="menu-list">
                    {actionList.map(menuItem =>
                        <li key={menuItem} className="menualign">
                            {menuItem}
                        </li>
                    )}
                </ul>
                <button className="side-list-content-cancel-btn" onClick={this.props.onHideSideListMenu}>
                    Cancel
                </button>
            </div>
        );
    }
}

export default DashboardActionMenu;