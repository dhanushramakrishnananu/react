import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import _ from 'lodash';

class DashboardAddPaymentStep2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { handleSubmit, previousPage,
            values, patientId, patientInfo,
            paymentInitialData, totalBilled,
            updateBalance, editPaymentItem } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <ul className="add-payment-2">
                    <li>
                        <div>
                            <div className='add-list_key' title={'Patient ID'}>Patient ID</div>
                            <div className='add-list_value'>{patientId}</div>
                        </div>
                    </li>
                    <li>
                        <div>
                            <div className='add-list_key' title={'Patient Name'}>Patient Name</div>
                            <div className='add-list_value'>{patientInfo.FirstName}</div>
                        </div>
                    </li>
                    <li>
                        <div>
                            <div className='add-list_key' title={'Status'}>Status</div>
                            <div className='add-list_value'>{paymentInitialData.PatientInfo.Status}</div>
                        </div>
                    </li>
                    <li>
                        <div>
                            <div className='add-list_key' title={'Total Charges'}>Total Charges $</div>
                            <div className='add-list_value'>{Number(paymentInitialData.PatientInfo.Charges).toFixed(2)}</div>
                        </div>
                    </li>
                    <li>
                        <div>
                            <div className='add-list_key' title={'Current Balance'}>Current Balance $</div>
                            <div className='add-list_value'>
                                {_.isEmpty(editPaymentItem) ?
                                    values.Writeoff ?
                                        Number(paymentInitialData.PatientInfo.Balance - values.AmountPaid - values.Writeoff).toFixed(2) :
                                        Number(paymentInitialData.PatientInfo.Balance - values.AmountPaid).toFixed(2)
                                    : values.AmountPaid !== editPaymentItem.AmountPaid || values.Writeoff !== editPaymentItem.Writeoff ?
                                        Number(paymentInitialData.PatientInfo.Balance - (values.AmountPaid - editPaymentItem.AmountPaid ) - values.Writeoff).toFixed(2) :
                                        Number(paymentInitialData.PatientInfo.Balance).toFixed(2)
                                }
                            </div>
                        </div>
                    </li>
                    <li>
                        <div>
                            <div className='add-list_key' title={'Commission Rate'}>Commission Rate %</div>
                            <div className='add-list_value'>{values.CommissionRate && parseFloat(values.CommissionRate).toFixed(2)}</div>
                        </div>
                    </li>
                    <li>
                        <div>
                            <div className='add-list_key' title={'Total Billed Amount'}>Total Billed Amount $</div>
                            <div className='add-list_value'>{Number(totalBilled).toFixed(2)}</div>
                        </div>
                    </li>
                </ul>
                <div className='adds-buttons-block'>
                    <button type="button" className='adds-buttons-block_cancel-btn' onClick={previousPage}>
                        Back
                    </button>
                    <button type="submit" className='adds-buttons-block_next-btn'>
                        Next
                    </button>
                </div>
            </form>
        );
    }
}

const mapDispatchToProps = () => {
    return {};
};

const mapStateToProps = state => {
    const CommissionRate = state.form.addPaymentMenu.values && state.form.addPaymentMenu.values.CommissionRate && state.form.addPaymentMenu.values.CommissionRate;
    const AmountPaid = state.form.addPaymentMenu.values && state.form.addPaymentMenu.values.AmountPaid && state.form.addPaymentMenu.values.AmountPaid;
    const patientInfo = state.patientDetailsReducer.patientDetails.PatientNotesDocsModel.PatientInfo;

    if(AmountPaid === state.paymentReducer.selectedPaymentItem.AmountPaid) {
        state.form.addPaymentMenu.values.Charges = Number(state.paymentReducer.paymentInitialData.PatientInfo.Balance - (AmountPaid - state.paymentReducer.selectedPaymentItem.AmountPaid ) - state.form.addPaymentMenu.values.Writeoff).toFixed(2);
    }
    return {
        values: state.form.addPaymentMenu.values,
        patientInfo,
        totalBilled: CommissionRate && AmountPaid && parseFloat(AmountPaid) * (parseFloat(CommissionRate) / 100)
    };
};

DashboardAddPaymentStep2 = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardAddPaymentStep2);

export default reduxForm({
    form: 'addPaymentMenu',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
})(DashboardAddPaymentStep2);
