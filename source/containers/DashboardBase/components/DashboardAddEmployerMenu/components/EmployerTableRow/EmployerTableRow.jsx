import React from 'react';
import classNames from 'classnames';

class EmployerTableRow extends React.Component {
    _onClick = (event) => {
        let currentID = this.props.EmployerID;
        this.props.onClick(event, currentID);
    }
    render() {
        const { EmployerID, EmployerName, Address, City, currentID } = this.props;
        const tableRowName = classNames({
            'add-employer_table-row': true,
            'add-employer_table-row_active': EmployerID === currentID
        });
        return (
            <tr className={tableRowName} data-employer-id={EmployerID} onClick={this._onClick} >
                <td className='add-employer_table-cell'>{EmployerName}</td>
                <td className='add-employer_table-cell'>{Address}</td>
                <td className='add-employer_table-cell'>{City}</td>
            </tr>
        );
    }
}

export default EmployerTableRow;