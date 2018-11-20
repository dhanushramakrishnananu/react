import React from 'react';

import './DashboardAdditionMenu.scss';

class DashboardAdditionMenu extends React.Component {
    render() {
        const { onShowSideListMenu } = this.props;
        const menuList = [
            { add: 'Note', action: 'addNoteMenu'},
            { add: 'Document', action: 'addDocumentMenu'},
            { add: 'Insurance', action: 'addInsuranceMenu'},
            { add: 'Attorney', action: 'addAttorneyMenu'},
            { add: 'Payment', action: 'addPaymentMenu'},
            { add: 'Aged Account', action: null},
            { add: 'AtFault', action: 'addAtFault'},
            { add: 'Notice', action: null},
            { add: 'Lien', action: null},
            { add: 'Employer', action: null},
            { add: 'Questionnaire', action: null},
            { add: 'Indicator', action: 'addIndicatorMenu'}
        ];
        return (
            <div className="side-list-content addition-menu">
                <ul className="menu-list">
                    {menuList.map((menuItem, index) =>
                        <li key={index} onClick={() => onShowSideListMenu(menuItem.action)} className="menualign">
                            {menuItem.add}
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

export default DashboardAdditionMenu;