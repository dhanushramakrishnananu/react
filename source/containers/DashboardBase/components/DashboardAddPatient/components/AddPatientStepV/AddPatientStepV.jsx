import React from 'react';
import { Field } from 'redux-form';
import _ from 'lodash';
import Checkbox from '../../../../../../components/Checkbox/Checkbox.jsx';
import Datepicker from '../../../../../../components/Datepicker/Datepicker.jsx';

class AddPatientStepV extends React.Component {
    constructor(props) {
        super(props);        
    }
    
    render() {
        const { patientsMasterData, timelyData, addPatientForm } = this.props;
     
        return (
            <ul className="add-list add-patient-menu">
                <li>
                    <div className="add-list_key">
                        Fin Class<span className="add-list_required"> *</span>
                    </div>
                    <div className="add-list_value">
                        <Field name="FinClass" component="select">
                            <option value="0">Select</option>
                            {patientsMasterData.FinClass.map(finClassObj =>
                                <option key={finClassObj.FCID} value={finClassObj.FC}>{finClassObj.FC}</option>
                            )}
                        </Field>
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Primary Ins
                    </div>
                    <div className="add-list_value">
                        <Field name="HealthIns1" component="input" type="text" />
                    </div>
                </li>
                <li className="margin-bottom">
                    <div className="add-list_key">
                        Secondary Ins
                    </div>
                    <div className="add-list_value">
                        <Field name="HealthIns2" component="input" type="text" />
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Billed Health
                        {addPatientForm.values.BilledPrimary && <span className="dashboard-patients-details_row_required"> *</span>}
                    </div>
                    <div className="add-list_value check-detapicker">
                        <Field name="BilledPrimary" component={Checkbox} />
                        {addPatientForm.values.BilledPrimary && <Field name="BilledInsDate" component={Datepicker}/>}
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Health Ins Priority
                    </div>
                    <div className="add-list_value">
                        <Field name="HealthInsPriority" component="select">
                            {!addPatientForm.values.BilledPrimary && <option value="" />}
                            {(addPatientForm.values.BilledPrimary ? _.filter(patientsMasterData.HealthInsurancePriority, {HID: 1}) : patientsMasterData.HealthInsurancePriority).map(healthInsurancePriorityObj =>
                                <option key={healthInsurancePriorityObj.HealthInsPriority} value={healthInsurancePriorityObj.HealthInsPriority}>{healthInsurancePriorityObj.HealthInsPriority}</option>
                            )}

                        </Field>
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Timely Filling1<span className="add-list_required"> *</span>
                    </div>
                    <div className="add-list_value">
                        <Field name="Timely1" component="select">
                            <option value="0">Select</option>
                            {timelyData.map(timelyDataObj =>
                                <option key={timelyDataObj.TFID} value={timelyDataObj.TFID}>{timelyDataObj.Insurance}</option>
                            )}
                        </Field>
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Timely Filling2
                    </div>
                    <div className="add-list_value">
                        <Field name="Timely2" component="select">
                            <option value="0">Select</option>
                            {timelyData.map(timelyDataObj =>
                                <option key={timelyDataObj.TFID} value={timelyDataObj.TFID}>{timelyDataObj.Insurance}</option>
                            )}
                        </Field>
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Accident Classification
                    </div>
                    <div className="add-list_value">
                        <Field name="AccdntType" component="select">
                            <option value="0">Select</option>
                            {patientsMasterData.AccidentClassification.map(accidentClassificationObj =>
                                <option key={accidentClassificationObj.AccidentTypeID} value={accidentClassificationObj.AccidentTypeID}>{accidentClassificationObj.AccidentDesc}</option>
                            )}
                        </Field>
                    </div>
                </li>
                {addPatientForm && addPatientForm.values.AccdntType === '1' &&
                <li>
                    <div className="add-list_key">
                        MVA Type
                    </div>
                    <div className="add-list_value">
                        <Field name="MVAType" component="select">                            
                            <option value="Select"/>
                            <option value="Single">Single</option>
                            <option value="Multiple">Multiple</option>
                            <option value="None">None</option>
                        </Field>
                    </div>
                </li>
                }
                {addPatientForm && addPatientForm.values.AccdntType === '1' &&
                <li>
                    <div className="add-list_key">
                        Occupant
                    </div>
                    <div className="add-list_value">
                        <Field name="Occupant" component="select">
                            <option value="Select"/>
                            <option value="Driver">Driver</option>
                            <option value="Passenger">Passenger</option>
                            <option value="Pedestrian">Pedestrian</option>
                            <option value="None">None</option>
                        </Field>
                    </div>
                </li>
                }
            </ul>
        );
    }
}

export default AddPatientStepV;