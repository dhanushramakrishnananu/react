import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, reset} from 'redux-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import _ from 'lodash';

import {
    addPaymentReset
} from '../../actions.es6';

class DashboardAddPaymentStep1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        const {editPaymentItem, values} = this.props;
        if (_.isEmpty(editPaymentItem)) {
            values['Continue'] = true;
        } else {
            values['Continue'] = editPaymentItem.Continue;
        }
    }

    componentDidMount() {
        const {initialize, editPaymentItem, values} = this.props;
        
        if (!_.isEmpty(editPaymentItem)) {
            if (!values.AmountPaid) {
                initialize({
                    PaymentID: editPaymentItem.PaymentID,
                    PaidDate: moment(editPaymentItem.PaidDate, 'YYYY-MM-DDTHH:mm:SS').format('MM/DD/YYYY'),
                    InvoiceDate: editPaymentItem.InvoiceDate,
                    AmountPaid: editPaymentItem.AmountPaid,
                    Writeoff: editPaymentItem.Writeoff,
                    PercentRecovery: editPaymentItem.PercentRecovery,
                    CatID: editPaymentItem.CatID,
                    CommissionRate: editPaymentItem.CommissionRate,
                    Continue: editPaymentItem.Continue
                });
            } else {
                initialize({
                    ...values
                });
            }
        }
    }

    normalizeNumber = (value) => {
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

    onCheckChange = () => {
        this.props.isChecked();
    };

    renderPaymentField = ({input, label, type, title, Required, meta: {touched, error}}) => (
        <div title={title}>
            <div className={touched && error ? 'add-list_key alert' : 'add-list_key'}>
                {label}
                {Required && <span className="add-list_required"> *</span>}
            </div>
            <div className="add-list_value" style={{'minWidth': 230, 'maxWidth': 230}}>
                <input {...input} type={type}/>
                {touched && error && <span>*</span>}
            </div>
        </div>
    );

    renderDatePicker = ({input, label, title, Required, meta: {touched, error}}) => (
        <div title={title}>
            <div className={touched && error ? 'add-list_key alert' : 'add-list_key'}>
                {label}
                {Required && <span className="add-list_required"> *</span>}
            </div>
            <div className="add-list_value" style={{'minWidth': 230, 'maxWidth': 230}}>
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

    renderLabelField = ({label, value1, meta: {touched, error}}) => (
        <div className="total-charges">
            <div className={touched && error ? 'add-list_key alert' : 'add-list_key'}>{label}</div>
            <div className="add-list_value" style={{'minWidth': 230, 'maxWidth': 230}}>
                <label>{value1}</label>
            </div>
        </div>
    );

    renderPaymentCheckBox = ({input, label, type, title, meta: {touched, error}}) => (
        <div title={title}>
            <div className={touched && error ? 'add-list_key alert' : 'add-list_key'}>{label}</div>
            <div className="add-list_value" style={{'minWidth': 230, 'maxWidth': 230}}>
                <input {...input} type={type}/>
                {touched && error && <span>{error}</span>}
            </div>
        </div>
    );

    renderSelectField = ({input, label, title, Required, meta: {touched, error}, children}) => (
        <div title={title}>
            <div className={touched && error ? 'add-list_key alert' : 'add-list_key'}>
                {label}
                {Required && <span className="add-list_required"> *</span>}
            </div>
            <div className="add-list_value" style={{'minWidth': 230, 'maxWidth': 230}}>
                <select {...input} >
                    {children}
                </select>
                {touched && error && <span>*</span>}
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
    render() {
        const {
            handleSubmit, onHideSideListMenu,
            paymentInitialData, selectPaymentItem,
            totalBilled, paymentDropDownData,
            syncErrors, patientinfo, onReset
        } = this.props;
        
        return (
            <form onSubmit={handleSubmit ? handleSubmit : this.alertAddPayment(syncErrors)}>
                <ul>
                    <li>
                        <Field
                            name="PaidDate"
                            component={this.renderDatePicker}
                            type="text"
                            label="Date Captured"
                            Required={true}
                            title="Date Captured Required"
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
                            onChange={this.onChange}
                            type="text"
                            Required={true}
                            label="Amount Paid $"
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
                            name="PercentRecovery"
                            component={this.renderPaymentField}
                            type="text"
                            label="Percentage Recovery %"
                            title="Percentage Recovery"
                            normalize={(value) => this.normalizeNumber(value)}
                        />
                    </li>
                    <li>
                        <Field
                            name="CatID"
                            component={this.renderSelectField}
                            type="text"
                            Required={true}
                            label="Type"
                            title="Type"
                        >
                            <option/>
                            {
                                paymentDropDownData.Type.map((value, key) => {
                                    return (<option key={key} value={value.CatID}>{value.Category}</option>);
                                })
                            }
                        </Field>
                    </li>
                    <li>
                        <Field
                            name="CommissionRate"
                            value={paymentInitialData.PatientInfo.CommissionRate * 100}
                            component={this.renderPaymentField}
                            type="text"
                            label="Commission Rate %"
                            title="Commission Rate"
                            normalize={(value) => this.minusNormalizeNumber(value)}
                        />
                    </li>
                    <li>
                        <Field
                            name="Continue"
                            component={this.renderPaymentCheckBox}
                            type="checkbox"
                            defaultChecked={true}
                            onChange={this.onCheckChange}
                            label="Continue"
                            title="Continue"
                        />
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
                            name="totalBilled"
                            component={this.renderLabelField}
                            type="text"
                            value1={this.props.totalBilled && this.props.totalBilled.toFixed(2)}
                            label="Total Billed"
                            title="Total Billed"
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
                        <div className="total-charges insurance-section-heading">
                            <div className="add-list_key" style={{'fontWeight': 600, 'fontSize': 12}}>Attorney</div>
                            <div className="add-list_value" style={{'minWidth': 230, 'maxWidth': 230, 'fontSize': 15}}>
                                <label>{paymentInitialData.PatientInfo && paymentInitialData.PatientInfo.AttorneyName}</label>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul>
                    <li>
                        <div className="total-charges insurance-section-heading">
                            <div className="add-list_key" style={{'fontWeight': 600, 'fontSize': 12}}>Timely Filling 1
                            </div>
                            <div className="add-list_value" style={{'minWidth': 230, 'maxWidth': 230, 'fontSize': 15}}>
                                <label>{patientinfo && patientinfo.Timely1Desc}</label>
                            </div>
                        </div>
                    </li>
                </ul>
                <div className="adds-buttons-block">
                    <button type="button" className="adds-buttons-block_cancel-btn" onClick={() => {
                        onReset();
                        onHideSideListMenu();
                    }}>
                        Cancel
                    </button>
                    <button type="submit" className="adds-buttons-block_next-btn">
                        Post/Close
                    </button>
                </div>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onReset: () => {
            dispatch(addPaymentReset());
        }
    };
};

const mapStateToProps = state => {
    const CommissionRate = state.form.addPaymentMenu.values && state.form.addPaymentMenu.values.CommissionRate && state.form.addPaymentMenu.values.CommissionRate;
    const AmountPaid = state.form.addPaymentMenu.values && state.form.addPaymentMenu.values.AmountPaid && state.form.addPaymentMenu.values.AmountPaid;
    const totalBilledAmount = CommissionRate && AmountPaid && !isNaN(AmountPaid) ? parseFloat(AmountPaid) * (parseFloat(CommissionRate) / 100) : 0;

    if (!state.form.addPaymentMenu.values) {
        state.form.addPaymentMenu['values'] = {};
    }

    if (state.form.addPaymentMenu.values) {
        if (!_.isEmpty(state.paymentReducer.selectedPaymentItem)) {
            state.form.addPaymentMenu.values['Charges'] = state.patientDetailsReducer.patientDetails.PatientNotesDocsModel.PatientInfo.CurrentBal;
        }
        state.form.addPaymentMenu.values['CommissionRate'] = (parseFloat(state.paymentReducer.paymentInitialData.PatientInfo.CommissionRate) * 100).toFixed(2);
        if (state.form.addPaymentMenu.values.AmountPaid) {
            state.form.addPaymentMenu.values['PercentRecovery'] = !isNaN(state.form.addPaymentMenu.values.AmountPaid) ? (parseFloat(state.form.addPaymentMenu.values.AmountPaid) / parseFloat(state.paymentReducer.paymentInitialData.PatientInfo.Balance) * 100).toFixed(2) : 0;
        }
        state.form.addPaymentMenu.values['Type'] = state.form.addPaymentMenu.values.CatID && _.find(state.paymentReducer.paymentDropDownData.Type, {'CatID': parseInt(state.form.addPaymentMenu.values.CatID)}).Category;
        state.form.addPaymentMenu.values['totalBilledAmount'] = totalBilledAmount;
    }
    return {
        totalBilled: totalBilledAmount,
        totalRecovery: (parseFloat(AmountPaid) / parseFloat(parseFloat(state.paymentReducer.paymentInitialData.PatientInfo.Balance).toFixed(2))) * 100,
        values: state.form.addPaymentMenu.values,
        patientinfo: state.patientDetailsReducer.patientDetails.PatientNotesDocsModel.PatientInfo
    };
};

DashboardAddPaymentStep1 = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardAddPaymentStep1);

function validate(values) {
    const errors = {};

    const requiredFields = ['PaidDate', 'CatID', 'AmountPaid'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = '*';
        }
    });
    return errors;
}

export default reduxForm({
    form: 'addPaymentMenu',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})(DashboardAddPaymentStep1);
