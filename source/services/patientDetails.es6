import baseService from './baseService.es6';
import _ from 'lodash';

export function getPatientDetails(patientId) {
    return baseService.get(`/PatientTab/GetPatientDetails/${patientId}`);
}

export function updatePatientDetails(patientDetails) {
    return baseService.post('/PatientTab/UpdatePatientDetails/', patientDetails);
}

export function getTimeline(patientId) {
    return baseService.get(`/timeline/getInitialTimelinedata/${patientId}`);
}

export function getTimelineItemData(actionId, relatedActionId, patientId) {
    return baseService.get(`/timeline/getTimelinedetails/${actionId}/${relatedActionId}/${patientId}`);
}

export function getDocDetails(params) {
    return baseService.post('/PatientTab/GetHtmlDoc/', {OnlineName: params.OnlineName, ShortPath: params.ShortPath, DocID: params.DocId});
}

export function getDocumentMasterData(patientId) {
    return baseService.get(`/PatientTab/GetDocumentMasterData/${patientId}`);
}

export function getMasterDataForPatient() {
    return baseService.get('/PatientTab/GetMasterDataForPatientInfoTab');
}

export function getTimelyFiling(refId) {
    return baseService.get(`/PatientTab/GetTimelyFilingByProvider/${refId}`);
}

export function saveNewPatient(data) {
    return baseService.post('/PatientTab/UpdatePatientDetails/', _.extend({PatientID: 0}, data));
}

export function getMasterDataForNote(patientId) {
    return baseService.get(`PatientTab/GetMasterDataForNotes/${patientId}/0`);
}

export function getGroupedPatients(patientId) {
    return baseService.get(`PatientTab/GetGroupedPatients/${patientId}`);
}
export function onGetNotesGroupedPatients(noteId,patientId) {
    return baseService.get(`PatientTab/GetGroupedAccountsForPostGroupNotes/${noteId}/0/${patientId}`);
}

export function addNote(noteData,status) {
    return baseService.post(`PatientTab/InsertNotes/${status}`, noteData);
}

export function addDocument(documentData) {
    return baseService.post('PatientTab/InsertPatientDocument', documentData);
}

export function insertPostToNote(data) {
    return baseService.post('PatientTab/InsertPostToGroupForNotes', data);
}

export function insertInsurance(data) {
    return baseService.post('/PatientTab/InsertInsurance', data);
}

export function deleteInsurance(patientId, insId) {
    return baseService.get(`/PatientTab/DeleteInsurance/${patientId}/${insId}`);
}

export function returnInsurance(insId, returnUserInitial) {
    return baseService.get(`/PatientTab/ReturnInsurance/${insId}/${returnUserInitial}`);
}

export function searchAdjusterDetails(data) {
    return baseService.post('/PatientTab/SearchAdjusterDetails', data);
}

export function getInsuranceDocs(insId) {
    return baseService.get(`/PatientTab/GetInsuranceDocs/${insId}`);
}

export function deletePatient(patientId) {
    return baseService.get(`/PatientTab/DeletePatient/${patientId}`);
}

export function deleteDoc(params) {
    return baseService.post('/PatientTab/DeletePatientDocument/', params);
}

export function editDoc(params) {
    return baseService.post('/PatientTab/EditPatientDocument/', params);
}

export function getPatientDropDownData() {
    return baseService.get(`PatientTab/GetPatientDropDownData`);
}

export function updateIndicator(params) {
    return baseService.post('/PatientTab/InsertPatientIndicator/', params);
}

export function deleteIndicator(IndicatorID) {
    return baseService.get(`PatientTab/DeletePatientIndicator/${IndicatorID}`);
}
export function editAgedAccount(data) {
     return baseService.post('/PatientTab/UpdateAgedAccountDetails/', data);
}
export function searchEmployerDetails(employerName) {
     return baseService.get(`/Employers/GetFilteredEmployers/${employerName}`);
}
export function insertEmployer(EmployerID, PatientId) {
    return baseService.get(`/PatientTab/UpdatePatientEmployer/${PatientId}/${EmployerID}`);
}
export function getGroupAccountDetails(PatientId,PatientName) {
    return baseService.get(`/PatientTab/GetGroupAccountsDetailsByPatientName/${PatientId}/${PatientName}`);
}