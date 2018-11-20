import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import DashboardCardComponent from '../../DashboardCardComponent/DashboardCardComponent.jsx';
import DashboardCollapsibleComponent from '../../DashboardCollapsibleComponent/DashboardCollapsibleComponent.jsx';
import {
    showSideListMenu,
    showEditSideListMenu,
    selectPaymentItem,
    deletePendingPayment
} from './actions.es6';
import cookies from '../../../../../cookies.es6';
import Popup from '../../../../../components/Popup/Popup.jsx';
import _ from 'lodash';
import './DashboardPendingPayments.scss';

class DashboardPendingPayments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false,
            popUpOpened: false,
            isDeleteConfirmOpened:false
        };
        this.onExpandToggle = this.onExpandToggle.bind(this);
    }

    renderTitle(payment) {
        return (<div>${payment.AmtPaid} – {payment.PaymentType}</div>);
    }

    onExpandToggle(value) {
        this.setState({
            isExpanded: value
        });
    }

    handleOpen = () => {
        this.setState({isDeleteConfirmOpened: true});
    };

    handleClose = () => {
        this.setState({popUpOpened: false});
    };
    handleconfirmClose= () => {
        this.setState({isDeleteConfirmOpened: false});
    };
    handleReasonOpen= () => {
        this.setState({popUpOpened: true,isDeleteConfirmOpened: false});
    };
    onChange = (e) => {
        const value = e.target.value;
        this.setState({reason: value});
    };

    render() {
        const { index, moveCard, pendingPayments, onShowSideListMenu, onShowEditSideListMenu, onSelectPaymentItem, selectedItemData, onDeletePendingPayment } = this.props;
        const { isExpanded, reason } = this.state;
        const additionalData = {
            PendingID: selectedItemData && selectedItemData.PendingPaymentID,
            Reason: '',
            EID: cookies.get('EmployeeId')
        };
        return (
            <DashboardCardComponent
                title="Pending Payment"
                flex="1"
                count={pendingPayments.length}
                index={index}
                moveCard={moveCard}
                selectedItemData={selectedItemData}
                openDeletePopUp={this.handleOpen}
                deleteItemId={selectedItemData && selectedItemData.PendingPaymentID}
                addItem={() => onShowSideListMenu('addPendingPaymentMenu')}
                addNewItem={() => onShowSideListMenu('addInvoice')}
                editItem={() => onShowEditSideListMenu(!_.isEmpty(selectedItemData) && 'editPendingPaymentMenu', selectedItemData)}
                editNewItem={() => onShowEditSideListMenu(!_.isEmpty(selectedItemData) && 'editInvoice', selectedItemData)}
                onExpandToggle={this.onExpandToggle}
                isExpanded={isExpanded}
            >
                <div className="dashboard-altfault dashboard-pending-payment">
                {
                    this.state.isDeleteConfirmOpened && 
                        <Popup   message='Are you sure, Do you want to remove the selected item from the list? '
                                    onCLose={() => this.handleconfirmClose()}
                                    onOk={() => this.handleReasonOpen()} 
                                    noLabel='No'
                                    yesLabel='Yes'/>
                }
                    {this.state.popUpOpened &&
                    <Popup
                        message="Reason"
                        noLabel="Cancel"
                        hasTitle={true}
                        title="Delete Pending Payment"
                        yesLabel="Delete"
                        hasTextBox={true}
                        onCLose={() => this.handleClose()}
                        onChange={this.onChange}
                        onOk={() => onDeletePendingPayment(_.extend(additionalData, {Reason: reason}), this.handleClose)} />
                    }
                    {pendingPayments.map((payment, i) =>
                        <DashboardCollapsibleComponent title={this.renderTitle(payment)}
                            id={payment.PendingPaymentID}
                            selectedId={selectedItemData && selectedItemData.PendingPaymentID} key={i}
                            deleteItem={() => onSelectPaymentItem(payment)}>
                            {!isExpanded &&
                            <ul>
                                <li title={'Paid Date'}>
                                    <div className="title" title={'Paid Date'}>Paid Date</div>
                                    <div className="content" title={moment(payment.PaymentDate).format('MM/DD/YYYY')}>{moment(payment.PaymentDate).format('MM/DD/YYYY')}</div>
                                </li>
                                <li title={'Amount Paid'}>
                                    <div className="title" title={'Amount Paid'}>Amount Paid</div>
                                    <div className="content" title={Number(payment.AmtPaid).toFixed(2)}>{Number(payment.AmtPaid).toFixed(2)}</div>
                                </li>
                                <li title={'Charges'}>
                                    <div className="title" title={'Charges'}>Charges</div>
                                    <div className="content" title={Number(payment.Charges).toFixed(2)}>{Number(payment.Charges).toFixed(2)}</div>
                                </li>
                            </ul>
                            }
                            {isExpanded &&
                            <ul className="pending-lists">
                                <li title={'Paid Date'}>
                                    <div className="title" title={'Paid Date'}>Paid Date</div>
                                    <div className="content" title={moment(payment.PaymentDate).format('MM/DD/YYYY')}>{moment(payment.PaymentDate).format('MM/DD/YYYY')}</div>
                                </li>
                                <li title={'Amount Paid'}>
                                    <div className="title" title={'Amount Paid'}>Amount Paid</div>
                                    <div className="content" title={Number(payment.AmtPaid).toFixed(2)}>{payment.AmtPaid ? Number(payment.AmtPaid).toFixed(2) : ' '}</div>
                                </li>
                                <li title={'Charges'}>
                                    <div className="title" title={'Charges'}>Charges</div>
                                    <div className="content" title={Number(payment.Charges).toFixed(2)}>{Number(payment.Charges).toFixed(2)}</div>
                                </li>
                                <li title={'Settlement W/O'}>
                                    <div className="title" title={'Settlement W/O'}>Settlement W/O</div>
                                    <div className="content" title={Number(payment.Writeoff).toFixed(2)}>{Number(payment.Writeoff).toFixed(2)}</div>
                                </li>
                                <li title={'Type'}>
                                    <div className="title" title={'Type'}>Type</div>
                                    <div className="content" title={payment.PaymentType}>{payment.PaymentType}</div>
                                </li>
                                <li title={'Continue'}>
                                    <div className="title" title={'Continue'}>Continue</div>
                                    <div className="content" title={payment.ContinueFlag ? 'true':'false'}>{payment.ContinueFlag ? 'true':'false'}</div>
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
        pendingPayments: state.patientDetailsReducer.patientDetails.PatientPaymentModel.PendingPayments,
        editPaymentItem: state.paymentReducer.selectedPendingPaymentItem,
        selectedItemData: state.paymentReducer.selectedPendingPaymentItem
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
        onDeletePendingPayment: (value, handleClose) => {
            handleClose();
            dispatch(deletePendingPayment(value));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardPendingPayments);
