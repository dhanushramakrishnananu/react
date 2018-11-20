import React from 'react';

import '../../DashboardAddAttorneyMenu.scss';

import AttorneyTableRow from '../AttorneyTableRow/AttorneyTableRow.jsx';
import { formStep1Config } from '../DashboardAddAttorneyStep1/formStep1Config.es6';
import FormBuilder from '../../../../../../components/FormBuilder/FormBuilder.jsx';
import { combineArrayAndObjectValues } from '../../../../../../components/FormBuilder/FormBuilderHelpers.es6';
import LoadingComponent from '../../../../../../components/LoadingComponent/Loading.jsx';
import _ from 'lodash';

class DashboardAddAttorneyStep2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedAttorney: {},
            currentID: null
        };
    }

    getFormData = () => {
        return this.form2.state;
    }

    _onClick = (event, currentID) => {
        const AttorneyID = parseInt(event.currentTarget.dataset.attorneyId);
        const selectedAttorney = _.find( this.props.attorneyList, {AttorneyID});
        this.props.onSetSelectedAttorney(selectedAttorney);
        this.setState({ currentID: currentID });
    };

    render() {
        const { attorneyList, searchFields, attorneyListLoading } = this.props;
        let configList = combineArrayAndObjectValues({
            configArr: formStep1Config,
            valuesObj: searchFields,
            configField: 'name',
            valuesField: 'name'
        });

        return (
            <div className='add-attorney-step2-wrapper'>
                <FormBuilder
                    ref={ ( form2 ) => this.form2 = form2}
                    config={configList}
                    defaultState={searchFields}
                />

                <div className='add-attorney_table-wrapper'>
                    <table className='add-attorney_table'>
                        <thead className='add-attorney_table-row' colSpan={4}>
                            <tr>
                                <th className='add-attorney_table-head'>First name</th>
                                <th className='add-attorney_table-head'>Last name</th>
                                <th className='add-attorney_table-head'>Firm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attorneyListLoading &&
                            <tr>
                                <td colSpan='4'>
                                    <LoadingComponent/>
                                </td>
                            </tr>
                            ||
                            attorneyList.map((item, i) =>
                                <AttorneyTableRow
                                    key={i}
                                    AttorneyID={item.AttorneyID}
                                    FirstName={item.AttFirstName}
                                    LastName={item.AttLastName}
                                    Firm={item.Firm}
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

export default DashboardAddAttorneyStep2;
