import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import _ from 'lodash';

import LoadingComponent from '../../../../components/LoadingComponent/Loading.jsx';
import DashboardAddInvoice from './components/DashboardAddInvoice/DashboardAddInvoice.jsx';
import DashboardEditInvoice from './components/DashboardEditInvoice/DashboardEditInvoice.jsx';
import './DashboardAddInvoiceMenu.scss';

class DashboardAddInvoiceMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        const { RefId, patientId,
            onHideSideListMenu, sideListMenu,
            editItemData } = this.props;

        this.stepsList = [
            <DashboardAddInvoice
                RefId={RefId}
                patientId={patientId}
                onHideSideListMenu={onHideSideListMenu}
            />,
            <DashboardEditInvoice
                editItemData={editItemData}
                onHideSideListMenu={onHideSideListMenu}
            />
        ];

        return (
            <div className="side-list-content add-note payment-addinvoice">
                {
                    sideListMenu === 'addInvoice' && this.stepsList[0]
                }
                {
                    sideListMenu === 'editInvoice' && this.stepsList[1]
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        RefId: state.patientDetailsReducer.patientDetails.PatientNotesDocsModel.PatientInfo.ReferredBy,
        sideListMenu: state.homeReducer.sideListMenu,
        editItemData: state.homeReducer.editItemData
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardAddInvoiceMenu);