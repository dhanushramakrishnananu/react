import * as paymentConstants from '../constants/actions/payment.es6';

import _ from 'lodash';

const initialState = {
    paymentDropDownData: [],
    paymentDropDownDataLoading: true,
    paymentDropDownDataError: null,
    paymentInitialData: [],
    paymentInitialDataLoading: true,
    paymentInitialDataError: null,
    paymentGroupedPatients: [],
    paymentGroupedPatientsLoading: true,
    paymentGroupedPatientsError: null,
    paymentReturnCode: [],
    paymentReturnCodeLoading: true,
    paymentReturnCodeError: null,
    paymentTemplates: [],
    paymentTemplatesLoading: true,
    paymentTemplatesError: null,
    paymentPriority: [],
    paymentPriorityLoading: true,
    paymentPriorityError: null,
    invoiceData: [],
    invoiceDataLoading: true,
    invoiceDataError: null,
    selectedInvoice: {},
    selectedPendingPaymentItem: {}
};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case paymentConstants.GET_DROPDOWN_TYPE:
            return {
                ...state,
                paymentDropDownDataLoading: true,
                paymentDropDownDataError: null
            };
        case paymentConstants.GET_DROPDOWN_TYPE_DATA_SUCCESS:
            return {
                ...state,
                paymentDropDownData: action.payload,
                paymentDropDownDataLoading: false
            };
        case paymentConstants.GET_DROPDOWN_TYPE_DATA_ERROR:
            return {
                ...state,
                paymentDropDownDataLoading: false,
                paymentDropDownDataError: action.payload
            };
        case paymentConstants.GET_INITIAL_TYPE:
            return {
                ...state,
                paymentInitialDataLoading: true,
                paymentInitialDataError: null
            };
        case paymentConstants.GET_INITIAL_TYPE_DATA_SUCCESS:
            return {
                ...state,
                paymentInitialData: action.payload,
                paymentInitialDataLoading: false
            };
        case paymentConstants.GET_INITIAL_TYPE_DATA_ERROR:
            return {
                ...state,
                paymentInitialDataLoading: false,
                paymentInitialDataError: action.payload
            };
        case paymentConstants.GET_GROUPED_PATIENTS_TYPE:
            return {
                ...state,
                paymentGroupedPatientsLoading: true,
                paymentGroupedPatients: null
            };
        case paymentConstants.GET_GROUPED_PATIENTS_TYPE_DATA_SUCCESS:
            return {
                ...state,
                paymentGroupedPatientsLoading: false,
                paymentGroupedPatients: action.payload
            };
        case paymentConstants.GET_GROUPED_PATIENTS_TYPE_DATA_ERROR:
            return {
                ...state,
                paymentGroupedPatientsLoading: false,
                paymentGroupedPatientsError: action.payload
            };
        case paymentConstants.GET_PAYMENT_PRIORITY:
            return {
                ...state,
                paymentPriorityLoading: true,
                paymentPriority: null
            };
        case paymentConstants.GET_PAYMENT_PRIORITY_DATA_SUCCESS:
            return {
                ...state,
                paymentPriorityLoading: false,
                paymentPriority: action.payload
            };
        case paymentConstants.GET_PAYMENT_PRIORITY_TYPE_DATA_ERROR:
            return {
                ...state,
                paymentPriorityLoading: false,
                paymentPriorityError: action.payload
            };
        case paymentConstants.GET_PAYMENT_TEMPLATES:
            return {
                ...state,
                paymentTemplatesLoading: true,
                paymentTemplates: null
            };
        case paymentConstants.GET_PAYMENT_TEMPLATES_DATA_SUCCESS:
            return {
                ...state,
                paymentTemplatesLoading: false,
                paymentTemplates: action.payload
            };
        case paymentConstants.GET_PAYMENT_TEMPLATES_TYPE_DATA_ERROR:
            return {
                ...state,
                paymentTemplatesLoading: false,
                paymentTemplatesError: action.payload
            };
        case paymentConstants.GET_PAYMENT_RETURN_CODE:
            return {
                ...state,
                paymentReturnCodeLoading: true,
                paymentReturnCode: null
            };
        case paymentConstants.GET_PAYMENT_RETURN_CODE_DATA_SUCCESS:
            return {
                ...state,
                paymentReturnCodeLoading: false,
                paymentReturnCode: action.payload
            };
        case paymentConstants.GET_PAYMENT_RETURN_CODE_TYPE_DATA_ERROR:
            return {
                ...state,
                paymentReturnCodeLoading: false,
                paymentReturnCodeError: action.payload
            };
        case paymentConstants.ADD_PAYMENT_SUCCESS_THEN:
            const PatientInfo = {...state.PatientInfo};
            PatientInfo.Balance = PatientInfo.Balance - (action.payload.AmountPaid + action.payload.Writeoff);
            return {
                ...state,
                PatientInfo: _.cloneDeep(PatientInfo)
            };
        case paymentConstants.GET_INVOICE:
            return {
                ...state,
                invoiceData: null,
                invoiceDataLoading: true
            };
        case paymentConstants.GET_INVOICE_DATA_SUCCESS:
            return {
                ...state,
                invoiceData: action.payload,
                invoiceDataLoading: false
            };
        case paymentConstants.GET_INVOICE_DATA_ERROR:
            return {
                ...state,
                invoiceDataLoading: false,
                paymentReturnCodeError: action.payload
            };
        case paymentConstants.SELECTED_INVOICE:
            return {
                ...state,
                selectedInvoice: action.payload
            };
        case paymentConstants.SELECTED_PENDING_INVOICE:
            return {
                ...state,
                selectedPendingPaymentItem: action.payload
            };
        case paymentConstants.SELECT_PAYMENT_ITEM:
            return {
                ...state,
                selectedPaymentItem: action.payload
            };
        case  paymentConstants.RESET_SELECT_PAYMENT_ITEM:
            const payments = _.cloneDeep(action.payload.PatientPaymentModel.PaidPayments);
            const updatedpayment = state.selectedPaymentItem !== null ? payments.filter(o=> o.PaymentID === state.selectedPaymentItem.PaymentID) : {};
            const selectedPaymentItem = updatedpayment.length >0 &&  state.selectedPaymentItem !== null? updatedpayment[0] : state.selectedPaymentItem;
            return {
                ...state,
                selectedPaymentItem: selectedPaymentItem
            };
        case paymentConstants.RESET_SELECTED_PAYMENT:
             return {
                ...state,
                selectedPendingPaymentItem: null
            };
        default:
            return state;
    }
};

export default paymentReducer;
