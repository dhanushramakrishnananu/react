import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import DashboardCardComponent from '../../DashboardCardComponent/DashboardCardComponent.jsx';
import DashboardCollapsibleComponent from '../../DashboardCollapsibleComponent/DashboardCollapsibleComponent.jsx';
import Popup from '../../../../../components/Popup/Popup.jsx';
import {
    showSideListMenu,
    showEditSideListMenu,
    selectPaymentItem,
    appPayment,
    voidTransaction
} from './actions.es6';
import './DashboardPostPayments.scss';

class DashboardPayments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false,
            isPopUpOpened: false
        };
        this.onExpandToggle = this.onExpandToggle.bind(this);
    }

    renderTitle(payment) {
        return (<div>${payment.AmountPaid} – {payment.Type}</div>);
    }

    onExpandToggle(value) {
        this.setState({
            isExpanded: value
        });
    }

    handleOpen = () => {
        this.setState({isPopUpOpened: true});
    };

    handleClose = () => {
        this.setState({isPopUpOpened: false});
    }

    appPayment = () => {
        this.props.onAppPayment();
        this.props.onShowSideListMenu('addPaymentMenu');
    };

    render() {
        const { index, moveCard, paidPayments,
            onShowSideListMenu, onShowEditSideListMenu,
            onSelectPaymentItem, selectedItemData, onVoidTransaction } = this.props;
        const { isExpanded } = this.state;
        return (
            <DashboardCardComponent
                title="Post Payment"
                flex="2"
                count={paidPayments.length}
                index={index}
                moveCard={moveCard}
                addItem={this.appPayment}
                selectedItemData={selectedItemData}
                voidTransaction={selectedItemData && selectedItemData.InvoiceDate && this.handleOpen}
                addNewItem={() => onShowSideListMenu('addInvoice')}
                editItem={() => onShowEditSideListMenu(!_.isEmpty(selectedItemData) && 'editPaymentMenu', selectedItemData)}
                editNewItem={() => onShowEditSideListMenu(!_.isEmpty(selectedItemData) && 'editInvoice', selectedItemData)}
                onExpandToggle={this.onExpandToggle}
                isExpanded={isExpanded}
            >
                <div className="dashboard-altfault dashboard-post-payment">
                    {this.state.isPopUpOpened &&
                    <Popup
                        message="Would you like to void out this transaction?"
                        noLabel="No"
                        yesLabel="Yes"
                        onCLose={() => this.handleClose()}
                        onOk={() => onVoidTransaction(selectedItemData.PatientID, selectedItemData.PaymentID, this.handleClose)} />
                    }
                    {paidPayments.map((payment, i) =>
                        <DashboardCollapsibleComponent title={this.renderTitle(payment)}
                            id={payment.PaymentID}
                            selectedId={selectedItemData && selectedItemData.PaymentID} key={i}
                            deleteItem={() => onSelectPaymentItem(payment)}>
                            {!isExpanded &&
                            <ul>
                                <li title={'Paid Date'}>
                                    <div className="title" title={'Paid Date'}>Paid Date</div>
                                    <div className="content" title={moment(payment.PaidDate).format('MM/DD/YYYY')}>{moment(payment.PaidDate).format('MM/DD/YYYY')}</div>
                                </li>
                                <li title={'Amount Paid'}>
                                    <div className="title" title={'Amount Paid'}>Amount Paid</div>
                                    <div className="content" title={payment.AmountPaid}>{payment.AmountPaid}</div>
                                </li>
                                <li title={'Charges'}>
                                    <div className="title" title={'Charges'}>Charges</div>
                                    <div className="content" title={payment.Charges}>{payment.Charges}</div>
                                </li>
                            </ul>
                            }
                            {isExpanded &&
                            <ul className="post-payment-list">
                                <li title={'Paid Date'}>
                                    <div className="title" title={'Paid Date'}>Paid Date</div>
                                    <div className="content" title={moment(payment.PaidDate).format('MM/DD/YYYY')}>{payment.PaidDate?moment(payment.PaidDate).format('MM/DD/YYYY'):'Nil'}</div>
                                </li>
                                <li title={'Amount Paid'}>
                                    <div className="title" title={'Amount Paid'}>Amount Paid</div>
                                    <div className="content" title={payment.AmountPaid}>{payment.AmountPaid?payment.AmountPaid:'0'}</div>
                                </li>
                                <li title={'Charges'}>
                                    <div className="title" title={'Charges'}>Charges</div>
                                    <div className="content" title={payment.Charges}>{payment.Charges?payment.Charges:'0'}</div>
                                </li>
                                <li title={'Invoice Date'}>
                                    <div className="title" title={'Invoice Date'}>Invoice Date</div>
                                    <div className="content" title={payment.InvoiceDate}>{payment.InvoiceDate?payment.InvoiceDate:'Nil'}</div>
                                </li>
                                <li title={'% Recovery'}>
                                    <div className="title" title={'% Recovery'}>% Recovery</div>
                                    <div className="content" title={payment.PercentRecovery}>{payment.PercentRecovery?payment.PercentRecovery:'0'}</div>
                                </li>
                                <li title={'Bill Amount'}>
                                    <div className="title" title={'Bill Amount'}>Bill Amount</div>
                                    <div className="content" title={payment.TotalBilledAmount}>{payment.TotalBilledAmount?payment.TotalBilledAmount:'0.00'}</div>
                                </li>
                                <li title={'Commission Rate'}>
                                    <div className="title" title={'Commission Rate'}>Commission Rate</div>
                                    <div className="content" title={payment.CommissionRate}>{payment.CommissionRate?payment.CommissionRate:'0.00'}</div>
                                </li>
                                <li title={'Type'}>
                                    <div className="title" title={'Type'}>Type</div>
                                    <div className="content" title={payment.Type?payment.Type:'Nil'}>{payment.Type}</div>
                                </li>
                                <li title={'Write Off'}>
                                    <div className="title" title={'Write Off'}>Write Off</div>
                                    <div className="content" title={payment.Writeoff}>{payment.Writeoff?payment.Writeoff:'0'}</div>
                                </li>
                                <li title={'Continue'}>
                                    <div className="title" title={'Continue'}>Continue</div>
                                    <div className="content" title={payment.Continue}>{payment.Continue?'true':'false'}</div>
                                </li>
                            </ul>
                            }
                        </DashboardCollapsibleComponent>
                    )}
                </div>
            </DashboardCardComponent>
        );
    }
}

const mapStateToProps = state => {
    return {
        paidPayments: state.patientDetailsReducer.patientDetails.PatientPaymentModel.PaidPayments,
        editPaymentItem: state.paymentReducer.selectedPaymentItem,
        selectedItemData: state.paymentReducer.selectedPaymentItem
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onShowSideListMenu: (menuName) => {
            dispatch(selectPaymentItem({}));
            dispatch(showSideListMenu(menuName));
        },
        onShowEditSideListMenu: (menuName, data) => {
            dispatch(showEditSideListMenu(menuName, data));
        },
        onSelectPaymentItem: (value) => {
            dispatch(selectPaymentItem(value));
            dispatch(showSideListMenu(null));
        },
        onAppPayment: () => {
            dispatch(appPayment());
        },
        onVoidTransaction: (PatientId, InvoiceId, handleClose) => {
            handleClose();
            dispatch(voidTransaction(PatientId, InvoiceId));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardPayments);