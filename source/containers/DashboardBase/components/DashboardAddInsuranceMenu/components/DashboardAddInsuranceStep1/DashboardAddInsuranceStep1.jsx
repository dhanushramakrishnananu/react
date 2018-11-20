import React from 'react';
import _ from 'lodash';

import FormBuilder from '../../../../../../components/FormBuilder/FormBuilder.jsx';
import '../../DashboardAddInsuranceMenu.scss';


import { formStep1Config, formTempStep1Config, formEditStep1Config } from './formStep1Config.es6';

class DashboardAddInsuranceStep1 extends React.Component {
    getFormData = () => {
        return this.form1.state;
    };

    render() {

        return(
            <FormBuilder
                ref={ ( form1 ) => this.form1 = form1}
                config={this.props.tempValue ? !_.isEmpty(this.props.editInsuranceItem) ? formEditStep1Config : formStep1Config : formTempStep1Config}
                saveTempInsurance={this.props.saveTempInsurance}
            />
        );
    }
}

export default DashboardAddInsuranceStep1;
