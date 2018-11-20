import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import _ from 'lodash';

import CurrentPaymentTableRow from './CurrentPaymentTableRow.jsx';
import {
    addPendingPayment
} from '../../actions.es6';
import notifications from '../../../../../../notifications.jsx';
import cookies from '../../../../../../cookies.es6';

class DashboardAddPendingPaymentStep1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        const { initialize, editPaymentItem } = this.props;
        if(!_.isEmpty(editPaymentItem)) {
            if(editPaymentItem.ContinueFlag) {
                editPaymentItem.ContinueFlag = true;
            } else {
                editPaymentItem.ContinueFlag = false;
            }
            editPaymentItem.PaymentDate = moment(editPaymentItem.PaymentDate).format('MM/DD/YYYY');
            initialize(editPaymentItem);
        }
    }

    normalizePhone = (value) => {
        if (!value) {
            return value;
        }
        const onlyDecimal = value.replace(/[^\d.]/g, '');
        return onlyDecimal;
    };

    minusNormalizeNumber = (value) => {
        if (!value) {
            return value;
        }
        const onlyDecimal = value.replace(/[^(\-)?\d*(\.\d+)?$]/g, '');
        return onlyDecimal;
    };

    renderPaymentField = ({input, label, type, title, disabled, Required, meta: { touched, error } }) => (
        <div title={title}>
            <div className={touched && error ? 'add-list_key alert' : 'add-list_key' }>
                {label}
                {Required && <span className="add-list_required"> *</span>}
            </div>
            <div className="add-list_value">
                <input {...input} type={type} disabled={disabled} />
                {touched && error && <span>*</span>}
            </div>
        </div>
    );

    renderDatePicker = ({input, label, title, Required, meta: {touched, error} }) => (
        <div title={title}>
            <div className={touched && error ? 'add-list_key alert' : 'add-list_key' }>
                {label}
                {Required && <span className="add-list_required"> *</span>}
            </div>
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

    renderLabelField = ({label, value1, meta: {touched, error} }) => (
        <div className="total-charges">
            <div className={touched && error ? 'add-list_key alert' : 'add-list_key' }>{label}</div>
            <div className="add-list_value">
                <label>{value1}</label>
            </div>
        </div>
    );

    renderCheckBoxField = ({ label, required, options, input, meta }) => {
        return options.map((option, index) => {
            return (
                <li>
                    <div className="total-charges" key={index}>
                        <input type="checkbox"
                            name={`${input.InsID}[${index}]`}
                            value={option.InsID}
                            checked={input.value.indexOf(option.InsID) !== -1}
                            onChange={(event) => {
                                const newValue = [...input.value];
                                if (event.target.checked) {
                                    newValue.push(option.InsID);
                                } else {
                                    newValue.splice(newValue.indexOf(option.InsID), 1);
                                }
                                return input.onChange(newValue);
                            }}/>
                        <div className="add-list_key">{option.Coverage}</div>
                        <div className="add-list_value">
                            <label> - {option.InsuranceCo}</label>
                            <label> - {option.ClaimNo}</label>
                        </div>
                    </div>
                </li>
            );
        });
    };

    renderPaymentCheckBox = ({ input, label, type, Required, title, meta: {touched, error} }) => (
        <div title={title} className="continue">
            <div className={touched && error ? 'add-list_key alert' : 'add-list_key' }>
                {label}
                {Required && <span className="add-list_required"> *</span>}
            </div>
            <div className="add-list_value">
                <input {...input} type={type} />
                {touched && error && <span>{error}</span>}
            </div>
        </div>
    );

    renderSelectField = ({ input, label, title, Required, meta: { touched, error }, children }) => (
        <div title={title}>
            <div className={touched && error ? 'add-list_key alert' : 'add-list_key' }>
                {label}
                {Required && <span className="add-list_required"> *</span>}
            </div>
            <div className="add-list_value">
                <select {...input} >
                    {children}
                </select>
                {touched && error && <span>*</span>}
            </div>
        </div>
    );

    validateOnSubmit = (value, additionalFormData, patientId, onHideSideListMenu) => {
        const errors = {};

        const requiredFields = ['PaymentDate', 'PaymentTypeID', 'AmtPaid'];
        requiredFields.forEach(field => {
            if (!value[field]) {
                errors[field] = '*';
            }
        });
        if(_.isEmpty(errors)) {
            this.props.onAddPendingPayment(_.extend(additionalFormData, value), patientId, onHideSideListMenu);
        } else {
            let mandatory = '';
            if (errors.PaymentDate) {
                mandatory = mandatory + '\n Date Captured';
            }
            if (errors.PaymentTypeID) {
                mandatory = mandatory + '\n Type';
            }
            if (errors.AmtPaid) {
                mandatory = mandatory + '\n Amount Paid';
            }
            notifications.showWarning('Following are required fields:\n '+mandatory);
        }
    };

    render() {
        const { handleSubmit, onHideSideListMenu,
            paymentInitialData, totalBilled,
            paymentDropDownData, isChecked,
            currentPayment, patientId, patientinfo } = this.props;
        
        const additionalFormData = {
            PendingPaymentID: 0,
            PatientID: parseInt(patientId),
            RefID: 0,
            PaymentDate: '',
            AmtPaid: 0,
            Writeoff: 0,
            PaymentTypeID: 0,
            PaymentType: '',
            Charges: '',
            TotalBilledAmount: 0,
            ContinueFlag: 0,
            ExhaustInsIDs: '',
            EID: parseInt(cookies.get('EmployeeId'))
        };

        return (
            <form onSubmit={handleSubmit(value => this.validateOnSubmit(value, additionalFormData, parseInt(patientId), onHideSideListMenu))}>
                <ul>
                    <li>
                        <Field
                            name="PaymentDate"
                            component={this.renderDatePicker}
                            type="text"
                            label="Date Captured"
                            Required={true}
                            title="Date Captured Required"
                        />
                    </li>
                    <li>
                        <Field
                            name="AmtPaid"
                            component={this.renderPaymentField}
                            type="text"
                            label="Amount Paid $"
                            Required={true}
                            normalize={(value) => this.minusNormalizeNumber(value)}
                            title="Amount Paid Required"
                        />
                    </li>
                    <li>
                        <Field
                            name="Writeoff"
                            component={this.renderPaymentField}
                            type="text"
                            value={this.state.value1}
                            label="Settlement W/O $"
                            title="Settlement W/O "
                            normalize={(value) => this.minusNormalizeNumber(value)}
                        />
                    </li>
                    <li>
                        <Field
                            name="PaymentTypeID"
                            component={this.renderSelectField}
                            type="text"
                            Required={true}
                            label="Type"
                            title="Type"
                        >
                            <option />
                            {
                                paymentDropDownData.Type.map( (value, key) => {
                                    return (<option key={key} value={value.CatID}>{value.Category}</option>);
                                })
                            }
                        </Field>
                    </li>
                    <li>
                        <Field
                            name="totalBilled"
                            component={this.renderLabelField}
                            type="text"
                            value1={this.props.totalBilled && this.props.totalBilled.toFixed(2)}
                            label="Total Billed Amount $"
                            title="Total Billed"
                        />
                    </li>
                    <li>
                        <Field
                            name="ContinueFlag"
                            component={this.renderPaymentCheckBox}
                            type="checkbox"
                            onChange={isChecked}
                            label="Continue"
                            title="Continue"
                        />
                    </li>
                     <li>
                    <div className="total-charges insurance-section-heading">
                            Current Payments
                    </div>
                </li>
                    <li>
                        <div className="add-attorney-step2-wrapper">
                            <div className="add-attorney_table-wrapper">
                                <table className="add-attorney_table">
                                    <thead className="add-attorney_table-row" colSpan={4}>
                                        <tr>
                                            <th className="add-attorney_table-head" title={'Paid Date'}>Paid Date</th>
                                            <th className="add-attorney_table-head" title={'Amount Paid'}>Amount</th>
                                            <th className="add-attorney_table-head" title={'Type'}>Type</th>
                                            <th className="add-attorney_table-head" title={'Invoice'}>Invoice</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            currentPayment && currentPayment.map((item, i) =>
                                                <CurrentPaymentTableRow
                                                    key={i}
                                                    currentValue={i}
                                                    PaymentID={item.PaymentID}
                                                    PaidDate={item.PaidDate}
                                                    AmountPaid={item.AmountPaid}
                                                    Type={item.Type}
                                                    Invoice={ item.InvoiceDate ? 'Yes':'No' }
                                                />
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </li>
                    <li>
                        <Field
                            name="TotalCharges"
                            component={this.renderLabelField}
                            type="text"
                            value1={parseFloat(paymentInitialData.PatientInfo.Charges).toFixed(2)}
                            label="Total Charges $"
                            title="Total Charges"
                        />
                    </li>
                    <li>
                        <Field
                            name="CurrentBalance"
                            component={this.renderLabelField}
                            type="text"
                            value1={parseFloat(paymentInitialData.PatientInfo.Balance).toFixed(2)}
                            label="Current Balance $"
                            title="Current Balance"
                        />
                    </li>
                    <li>
                        <Field
                            name="Status"
                            component={this.renderLabelField}
                            type="text"
                            value1={paymentInitialData.PatientInfo.Status}
                            label="Status"
                            title="Status"
                        />
                    </li>
                     <li>
                        <Field
                            name="NewBalance"
                            component={this.renderLabelField}
                            type="text"
                            value1={(0).toFixed(2)}
                            label="New Balance $"
                            title="New Balance"
                        />
                    </li>
                </ul>
                <li>
                    <div className="total-charges insurance-section-heading">
                            Insurance
                    </div>
                </li>

                <div className="scroll-div">
                    <ul className="payment-insurance">
                        <Field name="ExhaustInsIDs"
                            component={this.renderCheckBoxField}
                            options={paymentInitialData.InsuranceInfo && paymentInitialData.InsuranceInfo}
                        />
                    </ul>
                </div>
                <ul>
                    <li>
                        <div className="total-charges mt5">
                            <div className="add-list_key" style={{'fontWeight': 600,'fontSize': 12}}>Attorney</div>
                            <div className="add-list_value" style={{'minWidth': 230,'maxWidth': 230, 'fontSize':15}}>
                                <label>{paymentInitialData.PatientInfo && paymentInitialData.PatientInfo.AttorneyName}</label>
                            </div>
                        </div>
                    </li>
                </ul>
                 <ul>
                    <li>
                        <div className="total-charges insurance-section-heading">
                            <div className="add-list_key" style={{'fontWeight': 600,'fontSize': 12}}>Timely Filling 1</div>
                            <div className="add-list_value" style={{'minWidth': 230,'maxWidth': 230, 'fontSize':15}}>
                                <label>{patientinfo && patientinfo.Timely1Desc}</label>
                            </div>
                        </div>
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

const mapDispatchToProps = dispatch => {
    return {
        onAddPendingPayment: (data, patientId, onHideSideListMenu) => {
            onHideSideListMenu();
            dispatch(addPendingPayment(data, patientId));
        }
    };
};

const mapStateToProps = state => {
    const CommissionRate = state.form.addPendingPaymentMenu && state.form.addPendingPaymentMenu.values && state.form.addPendingPaymentMenu.values.CommissionRate && state.form.addPendingPaymentMenu.values.CommissionRate;
    const AmtPaid = state.form.addPendingPaymentMenu && state.form.addPendingPaymentMenu.values && state.form.addPendingPaymentMenu.values.AmtPaid && state.form.addPendingPaymentMenu.values.AmtPaid;
    const totalBilledAmount = CommissionRate && !isNaN(AmtPaid) ? parseFloat(AmtPaid) * (parseFloat(CommissionRate) / 100) : 0;

    if(state.form.addPendingPaymentMenu && !state.form.addPendingPaymentMenu.values) {
        state.form.addPendingPaymentMenu['values'] = {};
    }

    if(state.form.addPendingPaymentMenu && state.form.addPendingPaymentMenu.values) {

        state.form.addPendingPaymentMenu.values['CommissionRate'] = (parseFloat(state.paymentReducer.paymentInitialData.PatientInfo.CommissionRate) * 100).toFixed(2);
        if(state.form.addPendingPaymentMenu.values.AmtPaid) {
            state.form.addPendingPaymentMenu.values['PercentRecovery'] = !isNaN(state.form.addPendingPaymentMenu.values.AmtPaid) ? (parseFloat(state.form.addPendingPaymentMenu.values.AmtPaid) / parseFloat(state.paymentReducer.paymentInitialData.PatientInfo.Balance) * 100).toFixed(2) : 0;
        }
        state.form.addPendingPaymentMenu.values['PaymentType'] = state.form.addPendingPaymentMenu.values.PaymentTypeID && _.find(state.paymentReducer.paymentDropDownData.Type, {'CatID': parseInt(state.form.addPendingPaymentMenu.values.PaymentTypeID)}).Category;
        state.form.addPendingPaymentMenu.values['TotalBilledAmount'] = totalBilledAmount && totalBilledAmount.toFixed(2);

        if(_.isEmpty(state.paymentReducer.paymentInitialData.selectedPendingPaymentItem)) {
            state.form.addPendingPaymentMenu.values['Charges'] = state.patientDetailsReducer.patientDetails.PatientNotesDocsModel.PatientInfo.CurrentBal;
        } else {
            state.form.addPendingPaymentMenu.values['Charges'] = state.paymentReducer.paymentInitialData.PatientInfo.Charges && Number(state.paymentReducer.paymentInitialData.PatientInfo.Charges).toFixed(2);
        }

    }
    return {
        totalBilled: totalBilledAmount,
        totalRecovery: (parseFloat(AmtPaid) / parseFloat(parseFloat(state.paymentReducer.paymentInitialData.PatientInfo.Balance).toFixed(2))) * 100,
        currentPayment: state.paymentReducer.paymentInitialData.CurrentPayment,
        patientinfo:state.patientDetailsReducer.patientDetails.PatientNotesDocsModel.PatientInfo
    };
};

DashboardAddPendingPaymentStep1 = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardAddPendingPaymentStep1);

export default reduxForm({
    form: 'addPendingPaymentMenu'
})(DashboardAddPendingPaymentStep1);
