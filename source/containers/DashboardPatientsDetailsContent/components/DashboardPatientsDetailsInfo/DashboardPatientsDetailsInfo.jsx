import React from 'react';
import moment from 'moment';
import classNames from 'classnames';

import './DashboardPatientsDetailsInfo.scss';

class DashboardPatientsDetailsInfo extends React.Component {
    render() {
        const {patientsMasterData, patientInfo, timelyData} = this.props;

        const infoClass = classNames({
            'dashboard-patients-details': true,
            'mva-accident': parseInt(patientInfo.AccdntType, 10) === 1
        });
        let ref=[];
        ref=patientsMasterData.ReferredBy && patientsMasterData.ReferredBy.filter(item =>
            item.RefID===parseInt(patientInfo.ReferredBy, 10));
        const refby=ref && ref.length>0?ref[0].RefName:patientInfo.Provider;

        let timely2=[];
        timely2= timelyData && timelyData.filter(item =>
            item.TFID===parseInt(patientInfo.Timely2, 10));       
        const timelyDesc2=timely2 && timely2.length>0?timely2[0].Insurance:patientInfo.Timely2Desc;

        let timely1=[];
        timely1= timelyData && timelyData.filter(item =>
            item.TFID===parseInt(patientInfo.Timely1, 10));       
        const timelyDesc1=timely1 && timely1.length>0?timely1[0].Insurance:patientInfo.Timely1Desc;

        let returnco=[];
        returnco=patientsMasterData.ReturnCodes && patientsMasterData.ReturnCodes.filter(item =>
            item.ReturnCode===patientInfo.ReturnCode);
        const returnCodeDesc=returnco && returnco.length>0?returnco[0].ReturnDesc:patientInfo.ReturnCodeDesc;

        let accType=[];
        accType=patientsMasterData.AccidentClassification && patientsMasterData.AccidentClassification.filter(item =>
            item.AccidentTypeID=== parseInt(patientInfo.AccdntType, 10));
        const accidentDesc=accType && accType.length>0?accType[0].AccidentDesc:patientInfo.AccdntType;
        let CurrentBal=0;
        CurrentBal= Number(patientInfo.CurrentBal).toFixed(2);
        return (
            <div className={infoClass}>
                <div className="dashboard-patients-details_group-top">
                    <div className="dashboard-patients-details_group">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Referred By">
                                Referred By
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.Provider}>                               
                                {refby}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Account #">
                                Account #
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.ProviderAcct}>
                                {patientInfo.ProviderAcct}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Episode ID">
                                Episode ID
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                {patientInfo.EpisodeId}
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-patients-details_group">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="First Name">
                                First Name
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.FirstName}>
                                {patientInfo.FirstName}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Middle Name">
                                Middle Name
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.MiddleName}>
                                {patientInfo.MiddleName}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Last Name">
                                Last Name
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.LastName}>
                                {patientInfo.LastName}
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-patients-details_group">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Address">
                                Address
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.Address}>
                                {patientInfo.Address}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="City">
                                City
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.City}>
                                {patientInfo.City}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Country">
                                Country
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.Country}>
                                {patientInfo.Country}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="State">
                                State
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.State}>
                                {patientInfo.State}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Zip">
                                Zip
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.Zip}>
                                {patientInfo.Zip}
                            </div>
                        </div>                  
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Birth Date">
                                Birth Date
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.BirthDate && patientInfo.BirthDate !== '0001-01-01T00:00:00' ? moment(patientInfo.BirthDate).format('MM/DD/YYYY') : ''}>
                                {patientInfo.BirthDate && patientInfo.BirthDate !== '0001-01-01T00:00:00' ? moment(patientInfo.BirthDate).format('MM/DD/YYYY') : ''}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="SS #">
                                SS #
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.SSN}>
                                {patientInfo.SSN}
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-patients-details_group not-expand">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Phone">
                                Phone
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.MobilePhone}>
                                {patientInfo.MobilePhone}
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-patients-details_group">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Patient ID">
                                Patient ID
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.PatientID}>
                                {patientInfo.PatientID}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Status">
                                Status
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.Status}>
                                {patientInfo.Status}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Verified">
                                Verified
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.IsVerify ? 'Yes' : 'No'}>
                                {patientInfo.IsVerify ? 'Yes' : '-'}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="MRN">
                                MRN
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.MPNumber}>
                                {patientInfo.MPNumber}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Guarantor First Name">
                                Guarantor First Name
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.GuarFirstName}>
                                {patientInfo.GuarFirstName}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Guarantor Last Name">
                                Guarantor Last Name
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.GuarLastName}>
                                {patientInfo.GuarLastName}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Medicaid #">
                                Medicaid #
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.MedicaidNo}>
                                {patientInfo.MedicaidNo}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Medicare #">
                                Medicare #
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.MedicareNo}>
                                {patientInfo.MedicareNo}
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-patients-details_group not-expand">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Admit Date">
                                Admit Date
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.AdmitDate && patientInfo.AdmitDate !== '0001-01-01T00:00:00' ? moment(patientInfo.AdmitDate).format('MM/DD/YYYY') : ''}>
                                {patientInfo.AdmitDate && patientInfo.AdmitDate !== '0001-01-01T00:00:00' ? moment(patientInfo.AdmitDate).format('MM/DD/YYYY') : ''}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Discharge Date">
                                Discharge Date
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.DischargeDate && patientInfo.DischargeDate !== '0001-01-01T00:00:00' ? moment(patientInfo.DischargeDate).format('MM/DD/YYYY') : ''}>
                                {patientInfo.DischargeDate && patientInfo.DischargeDate !== '0001-01-01T00:00:00' ? moment(patientInfo.DischargeDate).format('MM/DD/YYYY') : ''}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Misc Ref">
                                Misc Ref
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.MiscRef}>
                                {patientInfo.MiscRef}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Date Recorded">
                                Date Recorded
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.DateRec && patientInfo.DateRec !== '0001-01-01T00:00:00' ? moment(patientInfo.DateRec).format('MM/DD/YYYY') : ''}>
                                {patientInfo.DateRec && patientInfo.DateRec !== '0001-01-01T00:00:00' ? moment(patientInfo.DateRec).format('MM/DD/YYYY') : ''}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Total Charges $">
                                Total Charges $
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.TotalCharges}>
                                {Number(patientInfo.TotalCharges).toFixed(2)}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Current Balance $">
                                Current Balance $
                            </div>
                            <div className="dashboard-patients-details_row_value" title={CurrentBal}>
                                {CurrentBal}
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-patients-details_group expand-only">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Employer">
                                Employer
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.EmployerName}>
                                {patientInfo.EmployerName}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Address">
                                Address
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.EAddress}>
                                {patientInfo.EAddress}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="City">
                                City
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.ECity}>
                                {patientInfo.ECity}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="State">
                                State
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.EState}>
                                {patientInfo.EState}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Zip">
                                Zip
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.EZip}>
                                {patientInfo.EZip}
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-patients-details_group expand-only">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Que">
                                Que
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                {patientInfo.Que}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Patient - Deceased">
                                Patient - Deceased
                            </div>
                            <div className="dashboard-patients-details_row_value">
                                {patientInfo.PatientDeceased ? 'Yes' : '-'}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Intent to Pursue">
                                Intent to Pursue
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.IntentToPurse ? 'Yes' : 'No'}>
                                {patientInfo.IntentToPurse ? 'Yes' : '-'}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="No Lien">
                                No Lien
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.NoLien ? 'Yes' : '–'}>
                                {patientInfo.NoLien ? 'Yes' : '–'}
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-patients-details_group expand-only">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Home Phone">
                                Home Phone
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.HomePhone}>
                                {patientInfo.HomePhone}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Work Phone">
                                Work Phone
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.WorkPhone}>
                                {patientInfo.WorkPhone}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Mobile Phone">
                                Mobile Phone
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.MobilePhone}>
                                {patientInfo.MobilePhone}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Relative Phone">
                                Relative Phone
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.RelativePhone}>
                                {patientInfo.RelativePhone}
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-patients-details_group expand-only">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="ALt Phone1">
                                ALt Phone1
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.AltPhone1}>
                                {patientInfo.AltPhone1}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="ALt Phone2">
                                ALt Phone2
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.AltPhone2}>
                                {patientInfo.AltPhone2}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="ALt Phone3">
                                ALt Phone3
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.AltPhone3}>
                                {patientInfo.AltPhone3}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="ALt Phone4">
                                ALt Phone4
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.AltPhone4}>
                                {patientInfo.AltPhone4}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="ALt Phone5">
                                ALt Phone5
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.AltPhone5}>
                                {patientInfo.AltPhone5}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard-patients-details_group-bottom expand-only">
                    <div className="dashboard-patients-details_group">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Admit Date">
                                Admit Date
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.AdmitDate && patientInfo.AdmitDate !== '0001-01-01T00:00:00' ? moment(patientInfo.AdmitDate).format('MM/DD/YYYY') : ''}>
                                {patientInfo.AdmitDate && patientInfo.AdmitDate !== '0001-01-01T00:00:00' ? moment(patientInfo.AdmitDate).format('MM/DD/YYYY') : ''}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Discharge Date">
                                Discharge Date
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.DischargeDate && patientInfo.DischargeDate !== '0001-01-01T00:00:00' ? moment(patientInfo.DischargeDate).format('MM/DD/YYYY') : ''}>
                                {patientInfo.DischargeDate && patientInfo.DischargeDate !== '0001-01-01T00:00:00' ? moment(patientInfo.DischargeDate).format('MM/DD/YYYY') : ''}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Misc Ref">
                                Misc Ref
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.MiscRef}>
                                {patientInfo.MiscRef}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Date Recorded">
                                Date Recorded
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.DateRec && patientInfo.DateRec !== '0001-01-01T00:00:00' ? moment(patientInfo.DateRec).format('MM/DD/YYYY') : ''}>
                                {patientInfo.DateRec && patientInfo.DateRec !== '0001-01-01T00:00:00' ? moment(patientInfo.DateRec).format('MM/DD/YYYY') : ''}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Total Charges $">
                                Total Charges $
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.TotalCharges}>
                                {Number(patientInfo.TotalCharges).toFixed(2)}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Current Balance $">
                                Current Balance $
                            </div>
                            <div className="dashboard-patients-details_row_value" title={CurrentBal}>
                                {CurrentBal}
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-patients-details_group">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Date Billed">
                                Date Billed
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.BilledDate && patientInfo.BilledDate !== '0001-01-01T00:00:00' ? moment(patientInfo.BilledDate).format('MM/DD/YYYY') : ''}>
                                {patientInfo.BilledDate && patientInfo.BilledDate !== '0001-01-01T00:00:00' ? moment(patientInfo.BilledDate).format('MM/DD/YYYY') : ''}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Date Identified">
                                Date Identified
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.DateIdentified && patientInfo.DateIdentified !== '0001-01-01T00:00:00' ? moment(patientInfo.DateIdentified).format('MM/DD/YYYY') : ''}>
                                {patientInfo.DateIdentified && patientInfo.DateIdentified !== '0001-01-01T00:00:00' ? moment(patientInfo.DateIdentified).format('MM/DD/YYYY') : ''}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Accident Date">
                                Accident Date
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.AccidentDate && patientInfo.AccidentDate !== '0001-01-01T00:00:00' ? moment(patientInfo.AccidentDate).format('MM/DD/YYYY') : ''}>
                                {patientInfo.AccidentDate && patientInfo.AccidentDate !== '0001-01-01T00:00:00' ? moment(patientInfo.AccidentDate).format('MM/DD/YYYY') : ''}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Date Returned">
                                Date Returned
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.ReturnDate && patientInfo.ReturnDate !== '0001-01-01T00:00:00' ? moment(patientInfo.ReturnDate).format('MM/DD/YYYY') : ''}>
                                {patientInfo.ReturnDate && patientInfo.ReturnDate !== '0001-01-01T00:00:00' ? moment(patientInfo.ReturnDate).format('MM/DD/YYYY') : ''}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Return Code">
                                Return Code
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.ReturnCodeDesc}>
                                {returnCodeDesc}
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-patients-details_group">
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Fin Class">
                                Fin Class
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.FinClass}>
                                {patientInfo.FinClass}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Primary Ins">
                                Primary Ins
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.HealthIns1}>
                                {patientInfo.HealthIns1}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Secondary Ins">
                                Secondary Ins
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.HealthIns2}>
                                {patientInfo.HealthIns2}
                            </div>
                        </div>
                        
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Secondary Ins">
                                Billed Health
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.HealthIns2}>
                                {patientInfo.BilledPrimary ? moment(patientInfo.BilledInsDate).format('MM/DD/YYYY') : '-'}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Health Ins Priority">
                                Health Ins Priority
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.HealthInsPrioirty === '1' ? 'Primary' : 'Secondary'}>
                                {patientInfo.HealthInsPrioirty === 1 ? 'Primary' : 'Secondary'}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Timely Filling 1">
                                Timely Filling 1
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.Timely1Desc}>
                                {timelyDesc1}
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Timely Filling 2">
                                Timely Filling 2
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.Timely2Desc}>                               
                                {timelyDesc2}                               
                            </div>
                        </div>
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Accident Classification">
                                Accident Classification
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.AccidentDesc}>
                                {accidentDesc}
                            </div>
                        </div>
                        { parseInt(patientInfo.AccdntType, 10) === 1 &&
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Accident Classification">
                                MVA Type
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.AccidentDesc}>
                                {patientInfo.MVAType}
                            </div>
                        </div>
                        }
                        {parseInt(patientInfo.AccdntType, 10) === 1 &&
                        <div className="dashboard-patients-details_row">
                            <div className="dashboard-patients-details_row_key" title="Accident Classification">
                                Occupant
                            </div>
                            <div className="dashboard-patients-details_row_value" title={patientInfo.AccidentDesc}>
                                {patientInfo.Occupant}
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardPatientsDetailsInfo;
