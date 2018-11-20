import baseService from './baseService.es6';

export function getState() {
    return baseService.get('/Insurance/GetStates');
}

export function addAtFault(atFaultData) {
    return baseService.post('/PatientTab/InsertPatientAtFault', atFaultData);
}

export function removeAtFault(atFaultData, patientID) {
    return baseService.get(`/PatientTab/DeletePatientAtFault/${atFaultData}/${patientID}`);
}

export function postToGroup(data)
{
    return baseService.post('/PatientTab/PostToGroupAtFault', data);   
}