import baseService from './baseService.es6';

export function getDropDown() {
    return baseService.get('/PatientTab/GetPatientDropDownData');
}

export function getInitialData(patientId) {
    return baseService.get(`/PatientTab/GetPaymentInitialData/${patientId}`);
}

export function getGroupedPatients(patientId) {
    return baseService.get(`/PatientTab/GetGroupedPatients/${patientId}`);
}

export function getPriority(patientId, priority) {
    return baseService.get(`/PatientTab/GetMasterDataForNotes/${patientId}/${priority}`);
}

export function getTemplates() {
    return baseService.get('/PatientTab/GetNoteTemplates/Payment');
}

export function getReturnCode() {
    return baseService.get('/PatientTab/GetPatientDropDownData');
}

export function addPayment(data) {
    return baseService.post('/PatientTab/InsertPayment', data);
}

export function addPendingPayment(data) {
    return baseService.post('/PatientTab/insertPendingPayment', data);
}

export function addPaymentReturn(data) {
    return baseService.post('/PatientTab/InsertPaymentReturn', data);
}

export function getInvoice(RefId) {
    return baseService.get(`/PatientTab/GetPatientProviderInvoice/${RefId}`);
}

export function addInvoice(data) {
    return baseService.post('/PatientTab/AddToInvoice', data);
}

export function editInvoice(data) {
    return baseService.post('/PatientTab/UpdateInvoice', data);
}

export function voidTransaction(PatientId, InvoiceId) {
    return baseService.post(`/PatientTab/VoidTrans/${PatientId}/${InvoiceId}`);
}

export function deletePendingPayment(data) {
    return baseService.post('/PatientTab/DeletePendingPayment', data);
}