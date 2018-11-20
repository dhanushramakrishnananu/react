import React from 'react';
import _ from 'lodash';

class PostGroupTableRow extends React.Component {
    constructor(props) {
        super(props);

        const { PatientId } = props;

        this.state = {
            [PatientId]: false
        }
    }

    onChange = (event) => {
        const name = event.target.name;
        this.setState({
            [name]: !this.state[name]
        });
    };

    getFormData = () => {
        return this.state;
    };

    render() {
        const { PatientId, Name, selectGroup } = this.props;
        const index = _.findIndex(selectGroup, {'PatientId': PatientId});
        return (
            <tr className='add-attorney_table-row' data-insurance-patient-id={PatientId} >
                <td title='PatientID' className='add-attorney_table-cell'>{PatientId}</td>
                <td title='Name' className='add-attorney_table-cell'>{Name}</td>
                <td title='Select' className='add-attorney_table-cell'>
                    <div className='add-list_value'>
                        <input
                            name={PatientId}
                            type='checkbox'
                            checked={selectGroup.length > 0 && index > -1 && selectGroup[index].selected}
                            onChange={this.props.onClick}
                        />
                    </div>
                </td>
            </tr>
        );
    }
}

export default PostGroupTableRow;