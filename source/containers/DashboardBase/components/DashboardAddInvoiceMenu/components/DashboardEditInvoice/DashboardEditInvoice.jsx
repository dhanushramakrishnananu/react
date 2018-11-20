import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import _ from 'lodash';
import DatePicker from 'react-datepicker';

import {
    editInvoice
} from '../../actions.es6';
import LoadingComponent from '../../../../../../components/LoadingComponent/Loading.jsx';
import notifications from '../../../../../../notifications.jsx';

class DashboardEditInvoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { initialize, editItemData } = this.props;

        if(!_.isEmpty(editItemData)) {
            editItemData.PaidDate = moment(editItemData.PaidDate).format('MM/DD/YYYY');
            editItemData.PercentRecovery = editItemData.PercentRecovery && parseFloat(editItemData.PercentRecovery).toFixed(2);
            editItemData.Charges = editItemData.Charges && parseFloat(editItemData.Charges).toFixed(2);
            editItemData.AmountPaid = editItemData.AmountPaid && parseFloat(editItemData.AmountPaid).toFixed(2);
            editItemData.CommissionRate = editItemData.CommissionRate && parseFloat(editItemData.CommissionRate).toFixed(2) ;
            editItemData.TotalBilledAmount = editItemData.TotalBilledAmount && parseFloat(editItemData.TotalBilledAmount).toFixed(2);

            initialize(editItemData);
        }
    }

    renderPaymentField = ({input, label, type, title, meta: { touched, error } }) => (
        <div title={title}>
            <div className={touched && error ? 'add-list_key alert' : 'add-list_key' }>{label}</div>
            <div className="add-list_value">
                <input {...input} type={type} />
                {touched && error && <span>*</span>}
            </div>
        </div>
    );

    renderDatePicker = ({input, label, title, meta: {touched, error} }) => (
        <div title={title}>
            <div className={touched && error ? 'add-list_key alert' : 'add-list_key' }>{label}</div>
            <div className="add-list_value">
                <DatePicker
                    {...input} dateForm="MM/DD/YYYY"
                    selected={input.value ? moment(input.value) : null}
                    minDate={moment().subtract(10, 'years').startOf('year')}
                    maxDate={moment().endOf('year')}
                />
                {touched && error && <span>{error}</span>}
            </div>
        </div>
    );

    onUpdate = (value) => {
        console.log(value);
        this.props.onEditInvoice(value);
    };

    normalizePhone = (value) => {
        if (!value) {
            return value;
        }
        const onlyDecimal = value.replace(/[^\d.]/g, '');
        return onlyDecimal;
    };

    render() {
        const { handleSubmit, onHideSideListMenu } = this.props;

        const additionalFormData = {
            PaymentID: 0,
            PercentRecovery: 0,
            ReferredBy: 0,
            PaidDate: '',
            Charges: 0,
            AmountPaid: 0,
            CommissionRate: 0,
            TotalBilledAmount: 0,
            CatID: 0,
            Provider: null,
            Type: null,
            InvoiceDate: '',
            Who: null,
            PatientID: 0,
            Continue: null,
            Writeoff: 0,
            ExhaustInsIDs: null
        };

        return (
            <form onSubmit={handleSubmit(value => this.onUpdate(_.extend(additionalFormData, value)))}>
                <p>Invoice Edit</p>
                <ul className='add-payment-4'>
                    <li></li>
                    <li>
                        <Field
                            name="PaidDate"
                            component={this.renderDatePicker}
                            type="text"
                            label="Paid Date"
                            title="Paid Date"
                        />
                    </li>
                    <li>
                        <Field
                            name="InvoiceDate"
                            component={this.renderDatePicker}
                            type="text"
                            label="Invoice Date"
                            title="Invoice Date"
                        />
                    </li>
                    <li>
                        <Field
                            name="AmountPaid"
                            component={this.renderPaymentField}
                            type="text"
                            label="Amount Paid"
                            normalize={(value) => this.normalizePhone(value)}
                            title="Amount Paid"
                        />
                    </li>
                    <li>
                        <Field
                            name="CommissionRate"
                            component={this.renderPaymentField}
                            type="text"
                            label="Commission Rate %"
                            title="Commission Rate"
                            normalize={(value) => this.normalizePhone(value)}
                        />
                    </li>
                    <li>
                        <Field
                            name="Writeoff"
                            component={this.renderPaymentField}
                            type="text"
                            label="Writeoff $"
                            title="Writeoff"
                            normalize={(value) => this.normalizePhone(value)}
                        />
                    </li>
                    <li>
                        <Field
                            name="PercentRecovery"
                            component={this.renderPaymentField}
                            type="text"
                            label="Percent Recovery %"
                            title="Percent Recovery"
                            normalize={(value) => this.normalizePhone(value)}
                        />
                    </li>
                    <li>
                        <Field
                            name="TotalBilledAmount"
                            component={this.renderPaymentField}
                            type="text"
                            label="Total Billed Amount $"
                            title="Total Billed Amount"
                            normalize={(value) => this.normalizePhone(value)}
                        />
                    </li>
                    <li>
                        <Field
                            name="Charges"
                            component={this.renderPaymentField}
                            type="text"
                            label="Charges $"
                            title="Charges"
                            normalize={(value) => this.normalizePhone(value)}
                        />
                    </li>
                </ul>
                <div className="adds-buttons-block">
                    <button type="button" className="adds-buttons-block_cancel-btn" onClick={onHideSideListMenu}>
                        Cancel
                    </button>
                    <button type="submit" className="adds-buttons-block_next-btn">
                        Save
                    </button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = () => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onEditInvoice: (data) => {
            if(data.PaidDate){
                dispatch(editInvoice(data));
            } else {
                notifications.showWarning('Following are required fields:\n '+'Paid Date');
            }

        }
    };
};

DashboardEditInvoice = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardEditInvoice);


export default reduxForm({
    form: 'editInvoice'
})(DashboardEditInvoice);