import baseService from './baseService.es6';

export function searchAttorneyDetails(data) {
        return baseService.post('/PatientTab/SearchAttorneyDetails', data);
}

export function updateAttorneyByPatientID(data, patientId) {
    return baseService.post('/PatientTab/UpdateAttorneyByPatientID', data, patientId);
}

export function insertAttorney(data) {
    return baseService.post('/PatientTab/UpdateAttorneyByPatientID', data);
}

export function deletePatientAttorney(attorneyId, patientId) {
    return baseService.get(`/PatientTab/DeletePatientAttorney/${attorneyId}/${patientId}`);
}

export function getAttorneyDocs(attorneyId, patientId) {
    return baseService.get(`/PatientTab/GetAttorneyDocs/${attorneyId}/${patientId}`);
}

export function insertDocumentSession(docId, sessionId) {
    return baseService.get(`/PatientTab/InsertDocumentSession/${docId}/${sessionId}`);
}

export function getAttorneyPostGroup(patientId, attorneyId) {
    return baseService.get(`/PatientTab/GetAttorneyPostGroup/${patientId}/${attorneyId}`);
}

export function postToGroupAttorney(data) {
    return baseService.post('/PatientTab/PostToGroupAttorney', data);
}

export function getAttorneyList(data)
{
    return baseService.post('/Attorney/AttorneyList', data);
}

export function saveAttorney(data)
{
    return baseService.post('/Attorney/InsertAttorney', data);
}

export function GetPatientsByAttorney(data)
{
    return baseService.post('/Attorney/AttorneyGridList', data);
}

export function deleteAttorney(deleteId, replaceId) 
{
    return baseService.get(`/Attorney/DeleteAttorney/${deleteId}/${replaceId}`);
}

export function GetPatientsbyAttorneyID(id)
{
    return baseService.get(`/Attorney/GetAttorneyPatientsForDelete/${id}`);    
}