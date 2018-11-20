import baseService from './baseService.es6';

export function getEmployeeList(searchstring) {
    return baseService.get('/Employers/GetFilteredEmployers/'+searchstring);
}

export function saveEmployee(data) {
data.Address=data.Address?data.Address:'';
data.City=data.City?data.City:'';
data.FaxNumber=data.FaxNumber?data.FaxNumber:'';
data.PhoneExt=data.PhoneExt?data.PhoneExt:'';
data.State=data.State?data.State:'';
data.ZipCode=data.ZipCode?data.ZipCode:'';
data.PhoneNumber=data.PhoneNumber?data.PhoneNumber:'';

    return baseService.post('/Employers/SaveEmployer',data);
}