import baseService from './baseService.es6';

export function getTeamList() {
    return baseService.get('/Insurance/GetTeamList');
}

export function getInsuranceList(teamId) {
    return baseService.post('/Insurance/InsuranceList', {MainId: 0, TypeID: 1, PatientID: 0, TeamID: teamId, Firm: null});
}

export function insertInsuranceData(data) {
    return baseService.post('/Insurance/InsertInsuranceData', data);
}

export function searchInsuranceDetails(data) {
    return baseService.post('/PatientTab/SearchAdjusterDetails', data);
}

export function saveInsurance(data) {
    return baseService.post('/PatientTab/InsertInsurance', data);
}

export function deleteInsurance(data) {
    return baseService.post('/PatientTab/DeleteInsurance', data);
}

export function tempSaveInsurance(data) {
    return baseService.post('/PatientTab/InsertInsurance', data);
}

export function getGroupAccounts(PatientId, MainId, TypeId) {
    return baseService.get(`/PatientTab/GetGroupedAccountsForPostGroupInsurance/${PatientId}/${MainId}/${TypeId}`);
}
export function GetInsuranceEditDetails(data){
 return baseService.get('/Insurance/GetInsuranceEditDetails/'+data);
	
}
export function deleteInsurancebyID(data) {
    return baseService.get('/Insurance/DeleteInsurance/'+data.DeleteinsID+'/'+data.ReplaceinsID);
}

export function getPatientDetails(data) {
var data=
{
	MainId:data.MainID,
	TypeID:1,
	PatientID:0,
	TeamID:data.team
}
    return baseService.post('/Insurance/InsuranceClaimList/',data);
}
export function getPatientsForDelete(data) {
    return baseService.get('/Insurance/GetInsurancePatientsForDelete/'+data);
}
