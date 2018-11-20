import React from 'react';

import '../../DashboardAddInsuranceMenu.scss';

import InsuranceTableRow from '../InsuranceTableRow/InsuranceTableRow.jsx';
import { formStep1Config, formEditStep1Config } from '../DashboardAddInsuranceStep1/formStep1Config.es6';
import FormBuilder from '../../../../../../components/FormBuilder/FormBuilder.jsx';
import { combineArrayAndObjectValues } from '../../../../../../components/FormBuilder/FormBuilderHelpers.es6';
import LoadingComponent from '../../../../../../components/LoadingComponent/Loading.jsx';
import _ from 'lodash';

class DashboardAddInsuranceStep2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedAttorney: {}
        };
    }

    getFormData = () => {
        return this.form2;
    };

    onClick = (event) => {
        const InsID = parseInt(event.currentTarget.dataset.insuranceId);
        const selectedInsurance = _.find( this.props.insuranceList, {InsID});
        this.props.onSetSelectedInsurance(selectedInsurance);
    };

    render() {
        const { insuranceList, searchFields, insuranceListLoading, editInsuranceItem, selectedInsurance } = this.props;

        let configList = combineArrayAndObjectValues({
            configArr: _.isEmpty(editInsuranceItem) ? formStep1Config : formEditStep1Config,
            valuesObj: searchFields,
            configField: 'name',
            valuesField: 'name'
        });

        return (
            <div className='add-attorney-step2-wrapper'>
                <FormBuilder
                    ref={ ( form2 ) => this.form2 = form2}
                    config={configList}
                />
                <div className='add-attorney_table-wrapper'>
                    <table className='add-attorney_table'>
                        <thead className='add-attorney_table-row' colSpan={4}>
                            <tr>
                                <th className='add-attorney_table-head'>Adjuster</th>
                                <th className='add-attorney_table-head'>Company</th>
                                <th className='add-attorney_table-head'>State</th>
                            </tr>
                        </thead>
                        <tbody>
                            {insuranceListLoading &&
                            <tr>
                                <td colSpan='4'>
                                    <LoadingComponent/>
                                </td>
                            </tr>
                            ||
                            insuranceList.map((item, i) =>
                                <InsuranceTableRow
                                    key={i}
                                    InsID={item.InsID}
                                    Adjuster={item.Adjuster}
                                    Company={item.Company}
                                    State={item.State}
                                    onClick={this.onClick}
                                    selectedInsurance={selectedInsurance && selectedInsurance.InsID}
                                />
                            )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


export default DashboardAddInsuranceStep2;
