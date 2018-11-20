import * as patientDetailsActionsConstants from '../constants/actions/patientDetails.es6';
import * as atFaultConstants from '../constants/actions/atfault.es6';
import * as attorneyConstants from '../constants/actions/attorney.es6';
import * as insuranceConstants from '../constants/actions/insurance.es6';
import {ADD_PAYMENT_SUCCESS, ADD_PAYMENT_RETURN_SUCCESS, EDIT_INVOICE_SUCCESS, DELETE_PENDING_PAYMENT_SUCCESS} from '../constants/actions/payment.es6';

import _ from 'lodash';

const initialState = {
    patientDetails: {},
    addPatientDetails: {},
    patientDetailsLoading: false,
    patientDetailsError: null,
    timeline: [],
    timelineLoading: false,
    timelineError: null,
    historyLoading: false,
    timelineHistory: [],
    selectedDoc: {},
    docPreview: '',
    docPreviewLoading: false,
    docPreviewError: null,
    showPatientForm: false,
    patientsMasterData: {},
    timelyData: [],
    notesMasterData: {},
    groupedPatients: [],
    selectedGroupedPatients: [],
    newNoteId: null,
    documentMasterData: {},
    notesGroupedPatients: [],
    indicatorTypes:[],
    employerListLoading: false,
    employerList: [],
    sideListMenu: null,
    showButtonEdit: false,
    updateFlag: false,
    selectedEmployer: {},
    searchFields: {},
    showEditNoteOpenNoteMessage : false,
    attorneyGroupedPatients:[],
    showNotesPopUpOpened:false,
    selectedMainGroupedPatient:{},
    selectedMainGroupedPatientCharges:{},
    selectedMainGroupedPatientInsurance:[],
    selectedGroupedPatientInsuranceCoList:[]
};

const patientDetailsReducer = (state = initialState, action) => {
    let currentTimelineAction = null;
    let timelineCopy = null;
    let selectedGroupedPatients = null;
    let groupedPatientsObj = {};
    switch (action.type) {
        case patientDetailsActionsConstants.GET_PATIENT_DETAILS:
            return {
                ...state,
                showPatientForm: false,
                patientDetails: {},
                patientDetailsLoading: true,
                patientDetailsError: null,
                selectedDoc: {}
            };
        case patientDetailsActionsConstants.GET_PATIENT_DETAILS_SUCCESS:
            return {
                ...state,
                patientDetails: action.payload,
                patientDetailsLoading: false
            };
        case patientDetailsActionsConstants.SET_REF_NAME:
            return {
                ...state,
                RefName: action.payload
            };
        case patientDetailsActionsConstants.SET_BIRTHDATE:
            return {
                ...state,
                BirthDate: action.payload
            };
        case patientDetailsActionsConstants.GET_PATIENT_DETAILS_ERROR:
            return {
                ...state,
                patientDetailsLoading: false,
                patientDetailsError: action.payload
            };
        case patientDetailsActionsConstants.ADD_PATIENT_DETAILS:
            return {
                ...state,
                addPatientDetails: action.payload
            };
        case patientDetailsActionsConstants.GET_TIMELINE:
            return {
                ...state,
                showPatientForm: false,
                timeline: [],
                timelineLoading: true,
                timelineError: null
            };
        case patientDetailsActionsConstants.GET_TIMELINE_SUCCESS:
            return {
                ...state,
                timeline: action.payload,
                timelineLoading: false
            };
        case patientDetailsActionsConstants.GET_TIMELINE_ERROR:
            return {
                ...state,
                timelineLoading: false,
                timelineError: action.payload
            };
        case patientDetailsActionsConstants.GET_TIMELINE_ITEM_DETAIL:
            timelineCopy = state.timeline.slice();
            currentTimelineAction = _.find(timelineCopy, action.payload);
            currentTimelineAction.detailsLoading = true;
            currentTimelineAction.detailsError = null;
            return {
                ...state,
                timeline: timelineCopy
            };
        case patientDetailsActionsConstants.GET_TIMELINE_ITEM_DETAIL_SUCCESS:
            timelineCopy = state.timeline.slice();
            currentTimelineAction = _.find(timelineCopy, action.payload.itemIds);
            currentTimelineAction.detailsLoading = false;
            currentTimelineAction.details = action.payload.response.data;
            return {
                ...state,
                timeline: timelineCopy
            };

        case patientDetailsActionsConstants.GET_TIMELINE_HISTORY:
            return {
                ...state,
                historyLoading: true
            };
        case patientDetailsActionsConstants.GET_TIMELINE_HISTORY_SUCCESS:
            return {
                ...state,
                historyLoading: false,
                timelineHistory: action.payload.response.data
            };
        case patientDetailsActionsConstants.GET_DOC_DETAILS:
            return {
                ...state,
                selectedDoc: action.payload,
                docPreview: '',
                docPreviewLoading: true,
                docPreviewError: null
            };
        case patientDetailsActionsConstants.GET_DOC_DETAILS_SUCCESS:
            return {
                ...state,
                docPreview: action.payload,
                docPreviewLoading: false
            };
        case patientDetailsActionsConstants.GET_DOC_DETAILS_ERROR:
            return {
                ...state,
                docPreviewLoading: false,
                docPreviewError: action.payload
            };
        case patientDetailsActionsConstants.RESET_SELECTED_DOC:
            return {
                ...state,
                docPreviewLoading: false,
                selectedDoc: {},
                docPreviewError: null
            };
        case patientDetailsActionsConstants.TOGGLE_PATIENT_FORM:
            return {
                ...state,
                showPatientForm: action.payload
            };
        case patientDetailsActionsConstants.UPDATE_PATIENT_DETAILS_SUCCESS:
            const patientDetails = _.extend({}, state.patientDetails);
            patientDetails.PatientNotesDocsModel.PatientInfo = _.extend(patientDetails.PatientNotesDocsModel.PatientInfo, action.payload);
            return {
                ...state,
                showPatientForm: false,
                patientDetails: patientDetails
            };
        case patientDetailsActionsConstants.REFRESH_PATIENT_SUCCESS:
            return {
                ...state,
                patientDetails: action.payload
            };
        case patientDetailsActionsConstants.GET_PATIENT_MASTER_DATA_SUCCESS:
            return {
                ...state,
                patientsMasterData: action.payload
            };
        case patientDetailsActionsConstants.GET_TIMELY_FILING_SUCCESS:
            return {
                ...state,
                timelyData: action.payload
            };
        case patientDetailsActionsConstants.GET_NOTES_MASTER_DATA_SUCCESS:
            return {
                ...state,
                notesMasterData: action.payload,
                selectedGroupedPatients: []
            };
        case patientDetailsActionsConstants.GET_GROUPED_PATIENTS_SUCCESS:
            return {
                ...state,
                groupedPatients: action.payload
            };
        case patientDetailsActionsConstants.GET_NOTES_GROUPED_PATIENTS_SUCCESS:
            return {
                ...state,
                notesGroupedPatients: action.payload
            };
        case attorneyConstants.GET_ATTORNEY_POST_GROUP_SUCCESS:
            return {
                ...state,
                attorneyGroupedPatients: action.payload
            };
        case patientDetailsActionsConstants.GET_DOCUMENT_MASTER_DATA_SUCCESS:
            return {
                ...state,
                documentMasterData: action.payload
            };
        case patientDetailsActionsConstants.ADD_NOTE_SUCCESS:
            return {
                ...state,
                newNoteId: action.payload
            };
        case patientDetailsActionsConstants.SELECT_ALL_GROUPED_PATIENTS:
            return {
                ...state,
                selectedGroupedPatients: state.selectedGroupedPatients.length === state.groupedPatients.length ? [] : state.groupedPatients.map(patient => patient.PatientId)
            };
        case patientDetailsActionsConstants.SELECT_ALL_NOTES_GROUPED_PATIENTS:
            return {
                ...state,
                selectedGroupedPatients: state.selectedGroupedPatients.length === state.notesGroupedPatients.length ? [] : state.notesGroupedPatients.map(patient => patient.PatientId)
            };
        case patientDetailsActionsConstants.SELECT_ALL_ATTORNEY_GROUPED_PATIENTS:
            return {
                ...state,
                selectedGroupedPatients: state.selectedGroupedPatients.length === state.attorneyGroupedPatients.length ? [] : state.attorneyGroupedPatients.map(patient => patient.PatientId)
            };
        case patientDetailsActionsConstants.SELECT_CURRENT_PATIENT_IN_GROUPED:
            return {
                ...state,
                selectedGroupedPatients: state.selectedGroupedPatients[0] === action.payload ? [] : [action.payload]
            };
        case patientDetailsActionsConstants.SELECT_GROUPED_PATIENT:
            const selectedPatientIndex = state.selectedGroupedPatients.indexOf(action.payload);
            selectedGroupedPatients = state.selectedGroupedPatients.slice();

            if (selectedPatientIndex === -1) {
                selectedGroupedPatients.push(action.payload);
            } else {
                selectedGroupedPatients.splice(selectedPatientIndex, 1);
            }

            return {
                ...state,
                selectedGroupedPatients: selectedGroupedPatients
            };
        case atFaultConstants.ADD_ALFAULT_SUCCESS:
            const AtFaults = _.cloneDeep(action.payload);
            return _.merge(
                {},
                state,
                {
                    patientDetails: {
                        PatientAgedAcctAndAtFaultModel: {
                            AtFaults
                        }
                    }
                });
        case atFaultConstants.ATFAULT_DELETE_ID:
            let patientAtFaultDetails = state.patientDetails;
            patientAtFaultDetails.PatientAgedAcctAndAtFaultModel.AtFaults = _.filter(patientAtFaultDetails.PatientAgedAcctAndAtFaultModel.AtFaults, (value)=>{
                return value.AtFaultID !== action.payload;
            });
            return {
                ...state,
                patientDetails: patientAtFaultDetails
            };
        case attorneyConstants.INSERT_ATTORNEY_SUCCESS:
            const patientDetailsAtty = _.extend({}, state.patientDetails);
            patientDetailsAtty.PatientNotesDocsModel.PatientAtty = action.payload;

            return {
                ...state,
                patientDetails: patientDetailsAtty
            };
        case attorneyConstants.DELETE_PATIENT_ATTORNEY_SUCCESS:
            const patientDetailsAttorney = _.extend({}, state.patientDetails);
            patientDetailsAttorney.PatientNotesDocsModel.PatientAtty = {};

            return {
                ...state,
                patientDetails: patientDetailsAttorney
                };
        case patientDetailsActionsConstants.REFRESH_NOTES_SUCCESS:
            const Notes = _.cloneDeep(action.payload);
            return _.merge(
                {},
                state,
                {
                    patientDetails: {
                        PatientNotesDocsModel: {
                            Notes
                        }
                    }
                });

        case insuranceConstants.SAVE_INSURANCE_SUCCESS:
            const patientDetailsInsurance = {...state.patientDetails};
            patientDetailsInsurance.PatientInsuranceModel.Insurance.push(action.payload);

            return {
                ...state,
                patientDetails: _.cloneDeep(patientDetailsInsurance)
            };
        case insuranceConstants.EDIT_INSURANCE_SUCCESS:
            const editPatientDetailsInsurance = {...state.patientDetails};
            const index = _.findIndex(editPatientDetailsInsurance.PatientInsuranceModel.Insurance, {'InsID': action.payload.InsID});
            editPatientDetailsInsurance.PatientInsuranceModel.Insurance[index] = action.payload;
            return{
                ...state,
                patientDetails: _.cloneDeep(editPatientDetailsInsurance)
            };
        case insuranceConstants.DELETE_INSURANCE_DASHBOARD_SUCCESS:
            const deleteDetailsInsurance = {...state.patientDetails};
            const deleteIndex = _.findIndex(deleteDetailsInsurance.PatientInsuranceModel.Insurance, {PatientID: action.payload.PatientID, InsID: action.payload.InsID})
            deleteDetailsInsurance.PatientInsuranceModel.Insurance.splice(deleteIndex, 1);

            return {
                ...state,
                patientDetails: _.cloneDeep(deleteDetailsInsurance)
            };
        case patientDetailsActionsConstants.FILTER_GROUPED_PATIENTS:
            const patientList = state.groupedPatients.filter(o=> o.PatientId !== Number(action.payload));
                return {
                    ...state,
                    groupedPatients: patientList
                };
        case patientDetailsActionsConstants.ADD_DOCUMENT_SUCCESS:
            const Docs1 = _.cloneDeep(action.payload);
            const Docs = Docs1.Docs;
            const updatedDoc = state.selectedDoc !== null ? Docs.filter(o=> o.DocId === state.selectedDoc.DocId) : {};
            state.selectedDoc = updatedDoc.length >0 &&  state.selectedDoc !== null? updatedDoc[0] : state.selectedDoc;
            return _.merge(
                {},
                state,
                {
                    patientDetails: {
                        PatientNotesDocsModel: {
                            Docs
                        }
                    }
                });
        case patientDetailsActionsConstants.CLEAR_SELECTED_GROUP:
            return {
                ...state,               
                selectedGroupedPatients:[]
            };

        case patientDetailsActionsConstants.DELETE_DOC_SUCCESS:
                const deleteDetailsdocs = {...state.patientDetails};
                const deletedocIndex = _.findIndex(deleteDetailsdocs.PatientNotesDocsModel.Docs, {PatientId: action.payload.PatientId, DocId: action.payload.DocID})
                deleteDetailsdocs.PatientNotesDocsModel.Docs.splice(deletedocIndex, 1);

                return {
                    ...state,
                    patientDetails: _.cloneDeep(deleteDetailsdocs)
                };
        case patientDetailsActionsConstants.GET_INDICATOR_TYPE_SUCCESS:
            const indicator = _.cloneDeep(action.payload);
                return {
                    ...state,
                    indicatorTypes: indicator.IndicatorTypes
                };
        case patientDetailsActionsConstants.ADD_INDICATOR_PATIENT_SUCCESS:
            const PatientIndicators = _.cloneDeep(action.payload);
                return _.merge(
                    {},
                    state,
                    {
                        patientDetails: {
                            PatientAgedAcctAndAtFaultModel: {
                                PatientIndicators
                            }
                        }
                    });
        case patientDetailsActionsConstants.DELETE_INDICATOR_SUCCESS:
        let Indicators = state.patientDetails;
        Indicators.PatientAgedAcctAndAtFaultModel.PatientIndicators = _.filter(Indicators.PatientAgedAcctAndAtFaultModel.PatientIndicators, (value)=>{
            return value.IndicatorID !== action.payload;
        });
        return {
            ...state,
            patientDetails: Indicators
        };

        case patientDetailsActionsConstants.EDIT_AGEDACCOUNT_SUCCESS:
            const patientDetailsAgedAcct = _.extend({}, state.patientDetails);
            patientDetailsAgedAcct.PatientAgedAcctAndAtFaultModel.AgedAcct = action.payload;

            return {
                ...state,
                patientDetails: patientDetailsAgedAcct
            };
        case ADD_PAYMENT_SUCCESS:
            const patientPayment = {...state.patientDetails};
            patientPayment.PatientPaymentModel.PaidPayments.push(action.payload);
            patientPayment.PatientNotesDocsModel.PatientInfo.TotalBal = parseFloat(patientPayment.PatientNotesDocsModel.PatientInfo.TotalBal) - (parseFloat(action.payload.AmountPaid) + parseFloat(action.payload.Writeoff));
            patientPayment.PatientNotesDocsModel.PatientInfo.AccBal = '$ ' + patientPayment.PatientNotesDocsModel.PatientInfo.TotalBal;
            const CurrentBal = parseFloat(patientPayment.PatientNotesDocsModel.PatientInfo.CurrentBal.replace('$ ', '')) - (parseFloat(action.payload.AmountPaid) + parseFloat(action.payload.Writeoff));
            patientPayment.PatientNotesDocsModel.PatientInfo.CurrentBal = CurrentBal;
            return {
                ...state,
                patientDetails: _.cloneDeep(patientPayment)
            };
        case ADD_PAYMENT_RETURN_SUCCESS:
            const patientPaymentReturnNote = {...state.patientDetails};
            patientPaymentReturnNote.PatientNotesDocsModel.Notes.push(action.payload);
            return {
                ...state,
                patientDetails: _.cloneDeep(patientPaymentReturnNote)
            };
        case patientDetailsActionsConstants.SET_SEARCH_FIELDS_QUERY:
            return {
                ...state,
                searchFields: action.payload
            };
        case patientDetailsActionsConstants.SEARCH_EMPLOYER_DETAILS:
            return {
                ...state,
                employerList: [],
                employerListLoading: true
            };
        case patientDetailsActionsConstants.SEARCH_EMPLOYER_DETAILS_SUCCESS:
            return {
                ...state,
                employerListLoading: false,
                employerList: action.payload
            };
        case patientDetailsActionsConstants.SET_SELECTED_EMPLOYER:
            return {
                ...state,
                selectedEmployer: action.payload
            };
        case patientDetailsActionsConstants.INSERT_EMPLOYER_SUCCESS:
            const patientDetailsEmp = _.extend({}, state.patientDetails);
            patientDetailsEmp.PatientNotesDocsModel.EmployerInfo = action.payload;
            return {
                ...state,
                searchFields: {},
                selectedEmployer: {},
                patientDetails: patientDetailsEmp
            };
        case patientDetailsActionsConstants.SHOW_BUTTON_EDIT_EMPLOYER:
            const employer = action.payload;
            var showButtonEdit = false;
            if ( _.isObject(employer) ) {
                if ( employer.EmployerId ) {
                    showButtonEdit = true;
                }
            }
            return {
                ...state,
                showButtonEdit: showButtonEdit
            };
        case patientDetailsActionsConstants.CLEARDATA:
            return {
                ...state,
                searchFields: {},
                selectedEmployer: {}
        };
        case patientDetailsActionsConstants.SHOW_EDIT_NOTE_OPEN_NOTES_MESSAGE:
        return {
                ...state,
                showEditNoteOpenNoteMessage : true
        };
        case patientDetailsActionsConstants.HIDE_EDIT_NOTE_OPEN_NOTES_MESSAGE:
         return {
                ...state,
                showEditNoteOpenNoteMessage : false
        };           
        case EDIT_INVOICE_SUCCESS:
            const editInvoicePayment = {...state.patientDetails};
            const editInvoiceIndex = _.findIndex(editInvoicePayment.PatientPaymentModel.PaidPayments, {PaymentID: action.payload.PaymentID});
            editInvoicePayment.PatientPaymentModel.PaidPayments[editInvoiceIndex] = action.payload;
            return{
                ...state,
                patientDetails: _.cloneDeep(editInvoicePayment)
            };
        case DELETE_PENDING_PAYMENT_SUCCESS:
            const deletePendingPayment = {...state.patientDetails};
            const deletePendingPaymentIndex = _.findIndex(deletePendingPayment.PatientPaymentModel.PendingPayments, {PendingPaymentID: action.payload.PendingID});
            deletePendingPayment.PatientPaymentModel.PendingPayments.splice(deletePendingPaymentIndex, 1);
            return{
                ...state,
                patientDetails: _.cloneDeep(deletePendingPayment)
            };
        case patientDetailsActionsConstants.SET_NOTES_POPUP_OPENED:
        return {
            ...state,
                showNotesPopUpOpened : action.payload
        }
            // Get grouped patients details
        case patientDetailsActionsConstants.GET_GROUP_ACCOUNTS_DETAILS:
            const GroupedPatients = state.patientDetails.PatientNotesDocsModel.GroupedPatients
            groupedPatientsObj = _.find(GroupedPatients, {PatientName: action.payload.PatientName});
            groupedPatientsObj.loading = true;
            groupedPatientsObj.error = null;

            return _.merge(
                    {},
                    state,
                    {
                        patientDetails: {
                            PatientNotesDocsModel: {
                                GroupedPatients
                            }
                        }
                    });
        case patientDetailsActionsConstants.GET_GROUP_ACCOUNTS_DETAILS_SUCCESS:
            const GroupedPatients1 = state.patientDetails.PatientNotesDocsModel.GroupedPatients
            groupedPatientsObj = _.find(GroupedPatients1, {PatientName: action.payload.PatientName});
            groupedPatientsObj.loading = false;
            groupedPatientsObj.patients = action.payload.data.GroupPatients;
            groupedPatientsObj.insuranceData = action.payload.data.GroupPatientsInsurance;
            groupedPatientsObj.charges = action.payload.data.GroupPatientsCharges;
             return _.merge(
                    {},
                    state,                    
                    {
                        patientDetails: {
                            PatientNotesDocsModel: {
                                GroupedPatients:GroupedPatients1
                            }
                        }
                    });
        case patientDetailsActionsConstants.GET_GROUP_ACCOUNTS_DETAILS_ERROR:
            const GroupedPatients2 = state.patientDetails.PatientNotesDocsModel.GroupedPatients
            groupedPatientsObj = _.find(GroupedPatients2, {PatientName: action.payload.PatientName});
            groupedPatientsObj.loading = false;
            groupedPatientsObj.error = action.payload;
             return _.merge(
                    {},
                    state,
                    {
                        patientDetails: {
                            PatientNotesDocsModel: {
                                GroupedPatients:GroupedPatients2
                            }
                        }
                    });
        case patientDetailsActionsConstants.SET_SELECTED_MAIN_GROUPED_PATIENT:
        return {
                ...state,
                selectedMainGroupedPatient:action.payload.groupacct,
                selectedMainGroupedPatientInsurance: action.payload.data.GroupPatientsInsurance,
                selectedMainGroupedPatientCharges : action.payload.data.GroupPatientsCharges,
                selectedGroupedPatientInsuranceCoList:action.payload.data.InsuranceCompanyList
        };
        default:
            return state;

    }
};

export default patientDetailsReducer;
