import React from 'react';
import { Field } from 'redux-form';

import Datepicker from '../../../../../../components/Datepicker/Datepicker.jsx';

class AddPatientStepIV extends React.Component {
    render() {
        const { patientsMasterData } = this.props;

        return (
            <ul className="add-list add-patient-menu">
                <li>
                    <div className="add-list_key">
                        Admit Date
                    </div>
                    <div className="add-list_value">
                        <Field name="AdmitDate" component={Datepicker} />
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Discharge
                    </div>
                    <div className="add-list_value">
                        <Field name="DischargeDate" component={Datepicker} />
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Misc Ref
                    </div>
                    <div className="add-list_value">
                        <Field name="MiscRef" component="input" type="text" />
                    </div>
                </li>
                <li className="margin-bottom">
                    <div className="add-list_key">
                        Date Rec'd
                    </div>
                    <div className="add-list_value">
                        <Field name="DateRec" component={Datepicker} />
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Total Charges $
                    </div>
                    <div className="add-list_value">
                        <Field name="TotalCharges" component="input" type="text" />
                    </div>
                </li>
                <li className="margin-bottom">
                    <div className="add-list_key">
                        Current Balance $
                    </div>
                    <div className="add-list_value">
                        <Field name="CurrentBal" component="input" type="text" />
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Date Billed
                    </div>
                    <div className="add-list_value">
                        <Field name="BilledDate" component={Datepicker} />
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Date Identified
                    </div>
                    <div className="add-list_value">
                        <Field name="DateIdentified" component={Datepicker} />
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Accident Date
                    </div>
                    <div className="add-list_value">
                        <Field name="AccidentDate" component={Datepicker} />
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Date Returned
                    </div>
                    <div className="add-list_value">
                        <Field name="ReturnDate" component={Datepicker} />
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Return Code
                    </div>
                    <div className="add-list_value">
                        <Field name="ReturnCode" component="select">
                            <option value="0">Select</option>
                            {patientsMasterData.ReturnCodes.map(returnCodeObj =>
                                <option key={returnCodeObj.ReturnCode} value={returnCodeObj.ReturnCode}>{returnCodeObj.ReturnDesc}</option>
                            )}
                        </Field>
                    </div>
                </li>
            </ul>
        );
    }
}

export default AddPatientStepIV;