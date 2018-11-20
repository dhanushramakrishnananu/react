import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import _ from 'lodash';

import {
    getPriority,
    getReturnCode,
    getTemplates
} from '../../actions.es6';
import LoadingComponent from '../../../../../../components/LoadingComponent/Loading.jsx';

class DashboardAddPaymentStep4 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        const { patientId, onGetReturnCode, onGetPriority, onGetTemplates } = this.props;
        onGetPriority(patientId, 0);
        onGetReturnCode();
        onGetTemplates();
    }

    renderDatePicker = ({input, label, title, meta: {touched, error} }) => (
        <div title={title}>
            <div className={touched && error ? 'add-list_key alert' : 'add-list_key' }>{label}</div>
            <div className="add-list_value">
                <DatePicker
                    {...input} dateForm="MM/DD/YYYY"
                    selected={input.value ? moment(input.value) : null}
                    minDate={moment().startOf('year')}
                    maxDate={moment().endOf('year')}
                />
                {touched && error && <span>{error}</span>}
            </div>
        </div>
    );

    renderSelectField = ({ input, label, title, meta: { touched, error }, children }) => (
        <div title={title}>
            <div className={touched && error ? 'add-list_key alert' : 'add-list_key w41' }>{label}</div>
            <div className="add-list_value">
                <select {...input} >
                    {children}
                </select>
                {touched && error && <span>*</span>}
            </div>
        </div>
    );

    renderPaymentField = ({input, label, type, title, meta: { touched, error } }) => (
        <div title={title}>
            <div className={touched && error ? 'add-list_key alert' : 'add-list_key' }>{label}</div>
            <div className="add-list_value">
                <input {...input} type={type} />
                {touched && error && <span>*</span>}
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


    render() {
        const { handleSubmit, onHideSideListMenu,
            paymentReturnCode, paymentTemplates,
            paymentPriority, paymentPriorityLoading,
            paymentTemplatesLoading, paymentReturnCodeLoading } = this.props;

        if(paymentPriorityLoading || paymentTemplatesLoading || paymentReturnCodeLoading) {
            return (<LoadingComponent />);
        }

        return (
            <form onSubmit={handleSubmit}>
                <ul className='add-payment-4'>
                    <li>
                        <Field
                            name="ReturnTemplates"
                            component={this.renderSelectField}
                            type="text"
                            label="Return Templates"
                            title="Return Templates"
                        >
                            <option />
                            {
                                paymentTemplates.map( (value, key) => {
                                    return (<option key={key} value={value.NotesTemplateId}>{value.TemplateLabel}</option>);
                                })
                            }
                        </Field>
                    </li>
                    <li>
                        <Field
                            name="Notes"
                            component={this.renderPaymentField}
                            type="text"
                            label="Notes *"
                            title="Notes Required"
                        />
                    </li>
                    <li>
                        <Field
                            name="ReturnCode"
                            component={this.renderSelectField}
                            type="text"
                            label="Return Code"
                            title="Return Code"
                        >
                            {
                                paymentReturnCode.ReturnCodes.map( (value, key) => {
                                    return (<option key={key} value={value.ReturnCode}>{value.ReturnDesc}</option>);
                                })
                            }
                        </Field>
                    </li>

                    <li>
                        <Field
                            name="Rdate"
                            component={this.renderDatePicker}
                            type="text"
                            label="Return Date"
                            title="Return Date"
                        />
                    </li>

                    <li>
                        <Field
                            name="Priority"
                            component={this.renderSelectField}
                            type="text"
                            label="Priority"
                            title="Priority"
                        >
                            <option />
                            {
                                paymentPriority.Priority.map( (value, key) => {
                                    return (<option key={key} value={value.PriorityID}>{value.Priority}</option>);
                                })
                            }
                        </Field>
                    </li>

                    <li>
                        <Field
                            name="HealthInsurance"
                            component={this.renderLabelField}
                            type="text"
                            label="Health Insurance"
                            title="Health Insurance"
                            value1={this.props.paymentPatientInfo.HealthInsurance}
                        />
                    </li>
                    <li>
                        <Field
                            name="HealthInsurance2"
                            component={this.renderLabelField}
                            type="text"
                            label="Health Insurance2"
                            title="Health Insurance2"
                            value1={this.props.paymentPatientInfo.HealthInsurance1}
                        />
                    </li>
                    <li>
                        <Field
                            name="Trigger1"
                            component={this.renderLabelField}
                            type="text"
                            label="Trigger 1"
                            title="Trigger 1"
                            value1={this.props.paymentPatientInfo.Trigger1}
                        />
                    </li>
                    <li>
                        <Field
                            name="Trigger2"
                            component={this.renderLabelField}
                            type="text"
                            label="Trigger 2"
                            title="Trigger 2"
                            value1={this.props.paymentPatientInfo.Trigger2}
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

const mapStateToProps = state => {
    return {
        paymentGroupedPatients: state.paymentReducer.paymentGroupedPatients,
        paymentGroupedPatientsLoading: state.paymentReducer.paymentGroupedPatientsLoading,
        paymentPriority: state.paymentReducer.paymentPriority,
        paymentTemplates: state.paymentReducer.paymentTemplates,
        paymentReturnCode: state.paymentReducer.paymentReturnCode,
        paymentPriorityLoading: state.paymentReducer.paymentPriorityLoading,
        paymentReturnCodeLoading: state.paymentReducer.paymentReturnCodeLoading,
        paymentTemplatesLoading: state.paymentReducer.paymentTemplatesLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetTemplates: () => {
            dispatch(getTemplates());
        },
        onGetPriority: (patientId, priority) => {
            dispatch(getPriority(patientId, priority));
        },
        onGetReturnCode: () => {
            dispatch(getReturnCode());
        }
    };
};

DashboardAddPaymentStep4 = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardAddPaymentStep4);

function validate(values) {
    const errors = {};

    const requiredFields = ['Notes'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = '*';
        }
    });

    return errors;
}

export default reduxForm({
    form: 'InsertPaymentReturn',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})(DashboardAddPaymentStep4);
