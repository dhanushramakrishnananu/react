import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import '../../DashboardAddInsuranceMenu.scss';
import LoadingComponent from '../../../../../../components/LoadingComponent/Loading.jsx';
import PostGroupTableRow from './PostGroupTableRow.jsx'

class PostToGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectAll: false,
            selectGroup: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.getSelectGroup) {
            nextProps.setSelectGroup(this.state.selectGroup);
        }
    }

    getFormData = () => {
        return this.state;
    };

    onClick = (event) => {
        const name = event.target.name;
        const selectGroup = this.state.selectGroup;
        const index = _.findIndex(selectGroup, {'PatientId': name });
        if(index > -1) {
            selectGroup[index].selected = !selectGroup[index].selected;
        } else {
            selectGroup.push({'PatientId': name, 'selected': true});
        }
        if(selectGroup.length === this.props.groupAccountData.length) {
            if(_.find(selectGroup, { 'selected': false })) {
                this.setState({selectAll: false});
            } else {
                this.setState({selectAll: true});
            }
        }
        this.setState({selectGroup});
    };

    onChange = () => {
        const selectGroup = [];
        this.props.groupAccountData.map((value) => {
            selectGroup.push({'PatientId': `${value.PatientId}`, 'selected': !this.state.selectAll});
        });
        this.setState({selectGroup, selectAll: !this.state.selectAll});
    };

    render() {
        const {groupAccountData, groupAccountLoading} = this.props;
        return (
            <div className='add-attorney-step2-wrapper post-group-attorney'>
                <div className="post-title">
                    Post To Group
                </div>
                <div className="post-value-select">
                    <div className='add-list_key'>
                        Select all
                    </div>
                    <div className='add-list_value'>
                        <input
                            name='selectAll'
                            type='checkbox'
                            onChange={this.onChange}
                            checked={this.state.selectAll}
                        />
                    </div>
                </div>

                <table className='add-attorney_table'>
                    <thead className='add-attorney_table-row' colSpan={4}>
                        <tr>
                            <th className='add-attorney_table-head'>PatientID</th>
                            <th className='add-attorney_table-head'>Name</th>
                            <th className='add-attorney_table-head'>Select</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            groupAccountLoading &&
                        <tr>
                            <td colSpan='4'>
                                <LoadingComponent/>
                            </td>
                        </tr>
                            ||
                            groupAccountData.map((item, i) =>
                                <PostGroupTableRow
                                    key={i}
                                    PatientId={`${item.PatientId}`}
                                    Name={`${item.FirstName} ${item.LastName}`}
                                    onClick={this.onClick}
                                    selectGroup={this.state.selectGroup}
                                />
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default PostToGroup;
