import React from 'react';
import FormBuilder from '../../../../../components/FormBuilder/FormBuilder.jsx';
import { Field, reduxForm } from 'redux-form';
import '../DashboardDeleteAttorneyMenu.scss';
import { combineArrayAndObjectValues } from '../../../../../components/FormBuilder/FormBuilderHelpers.es6';

import { formStep1Config } from './formStep1Config.es6';

class DashboardDeleteAttorneyStep1 extends React.Component {
    getFormData = () => {
        return this.form1.state;
    }
    render() {        
        const { searchFields } = this.props;
        let configList = combineArrayAndObjectValues({
            configArr: formStep1Config,
            valuesObj: searchFields,
            configField: 'name',
            valuesField: 'name'
        });

        return(
            <FormBuilder
                ref={ ( form1 ) => this.form1 = form1}
                config={configList}
                defaultState={searchFields}
            />
        );
       
    }
}
export default DashboardDeleteAttorneyStep1;
