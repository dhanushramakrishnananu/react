import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

import {
    getDropDownAndInitialData
} from './actions.es6';
import LoadingComponent from '../../../../components/LoadingComponent/Loading.jsx';
import DashboardAddPendingPaymentStep1 from './components/DashboardAddPendingPaymentStep1/DashboardAddPendingPaymentStep1.jsx';
import './DashboardAddPendingPaymentMenu.scss';

class DashboardAddPaymentMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isChecked: true
        };
    }

    componentDidMount() {
        const { patientId, onGetDropDownAndInitialData } = this.props;
        onGetDropDownAndInitialData(patientId);
    }

    isChecked = () => {
        this.setState({
            isChecked: !this.state.isChecked
        });
    };

    render() {
        const { selectedStep, onHideSideListMenu,
            paymentDropDownDataLoading, paymentInitialDataLoading,
            paymentDropDownData, paymentInitialData,
            selectPaymentItem, patientId, editPaymentItem } = this.props;

        if(paymentDropDownDataLoading || paymentInitialDataLoading) {
            return (<LoadingComponent />);
        }

        return (
            <div className='side-list-content add-note add-pending-payment'>
                <DashboardAddPendingPaymentStep1
                    patientId={patientId}
                    paymentDropDownData={paymentDropDownData}
                    paymentInitialData={paymentInitialData}
                    onHideSideListMenu={onHideSideListMenu}
                    selectPaymentItem={selectPaymentItem}
                    editPaymentItem={editPaymentItem}
                    isChecked={this.isChecked}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedStep: state.homeReducer.selectedStep,
        paymentDropDownData: state.paymentReducer.paymentDropDownData,
        paymentInitialData: state.paymentReducer.paymentInitialData,
        paymentDropDownDataLoading: state.paymentReducer.paymentDropDownDataLoading,
        editPaymentItem: state.paymentReducer.selectedPendingPaymentItem,
        paymentInitialDataLoading: state.paymentReducer.paymentInitialDataLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetDropDownAndInitialData: (patientId) => {
            dispatch(getDropDownAndInitialData(patientId));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardAddPaymentMenu);