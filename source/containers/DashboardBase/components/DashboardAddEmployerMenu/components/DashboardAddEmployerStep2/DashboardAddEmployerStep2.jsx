import React from 'react';

import '../../DashboardAddEmployerMenu.scss';

import EmployerTableRow from '../EmployerTableRow/EmployerTableRow.jsx';
import { formStep1Config } from '../DashboardAddEmployerStep1/formStep1Config.es6';
import FormBuilder from '../../../../../../components/FormBuilder/FormBuilder.jsx';
import { combineArrayAndObjectValues } from '../../../../../../components/FormBuilder/FormBuilderHelpers.es6';
import LoadingComponent from '../../../../../../components/LoadingComponent/Loading.jsx';
import _ from 'lodash';

class DashboardAddEmployerStep2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedEmployer: {},
            currentID: null
        };
    }

    getFormData = () => {
        return this.form2.state;
    }

    _onClick = (event, currentID) => {
        const EmployerId = parseInt(currentID);
        const selectedEmployer = _.find( this.props.employerList, {EmployerId});
        this.props.onSetSelectedEmployer(selectedEmployer);
        this.setState({ currentID: currentID });
    };

    render() {
        const { employerList, searchFields, employerListLoading } = this.props;
        let configList = combineArrayAndObjectValues({
            configArr: formStep1Config,
            valuesObj: searchFields,
            configField: 'name',
            valuesField: 'name'
        });

        return (
            <div className='add-employer-step2-wrapper'>
                <FormBuilder
                    ref={ ( form2 ) => this.form2 = form2}
                    config={configList}
                    defaultState={searchFields}
                />

                <div className='add-employer_table-wrapper'>
                    <table className='add-employer_table'>
                        <thead className='add-employer_table-row' colSpan={4}>
                            <tr>
                                <th className='add-employer_table-head'>Employer</th>
                                <th className='add-employer_table-head'>Address</th>
                                <th className='add-employer_table-head'>City</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employerListLoading &&
                            <tr>
                                <td colSpan='4'>
                                    <LoadingComponent/>
                                </td>
                            </tr>
                            ||
                            employerList.map((item, i) =>
                                <EmployerTableRow
                                    key={i}
                                    EmployerID={item.EmployerId}
                                    EmployerName={item.EmployerName}
                                    Address={item.Address}
                                    City={item.City}
                                    onClick={this._onClick}
                                    currentID={this.state.currentID}
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

export default DashboardAddEmployerStep2;
