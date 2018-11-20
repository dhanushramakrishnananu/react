import baseService from './baseService.es6';

export function getSearchList(data) {
 data.PFirstName=data.PFirstName?data.PFirstName:'',
       data.PLastName=data.PLastName?data.PLastName:'' ,
        data.GFirstName=data.GFirstName?data.GFirstName:'' ,
        data.GLastName=data.GLastName?data.GLastName:'',
        data.Phone=data.Phone?data.Phone:'' ,
        data.ACCNo=data.ACCNo?data.ACCNo:'' ,
        data.SSN=data.SSN?data.SSN:'' ,
       data.ReferredBy=data.ReferredBy?data.ReferredBy:'' ,
        data.MedPayID=data.MedPayID?data.MedPayID:'',
        data.ClaimNO=data.ClaimNO?data.ClaimNO:'',
       data.eid=data.eid?data.eid:'',
        data.Status=data.Status?data.Status:'' ,
        data.MPNumber=data.MPNumber?data.MPNumber:'' ,
        data.Adjuster=data.Adjuster?data.Adjuster:''
        data.ServiceDate=data.ServiceDate!='Invalid date'?data.ServiceDate:'' ,
        data.BirthDate=data.BirthDate!='Invalid date'?data.BirthDate:'' ,
        data.ActiveStatus=data.ActiveStatus?data.ActiveStatus:'' ,
        data.HomePhone=data.HomePhone?data.HomePhone:'' ,
        data.CellPhone=data.CellPhone?data.CellPhone:'',
        data.WorkHomePhone=data.WorkHomePhone?data.WorkHomePhone:'',
        data.PatientId=data.PatientId?data.PatientId:'' ,
        data.AdmitDate=data.AdmitDate?data.AdmitDate:''
    return baseService.post('/Search/PatientSearch',data);
}

