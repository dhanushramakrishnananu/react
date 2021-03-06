import React from 'react';
import classNames from 'classnames';

class AttorneyTableRow extends React.Component {
    _onClick = (event) => {
        let currentID = this.props.AttorneyID;
        this.props.onClick(event, currentID);
    }
    render() {
        const { AttorneyID, FirstName, LastName, Firm, currentID } = this.props;
        const tableRowName = classNames({
            'add-attorney_table-row': true,
            'add-attorney_table-row_active': AttorneyID === currentID
        });
        return (
            <tr className={tableRowName} data-attorney-id={AttorneyID} onClick={this._onClick} >
                <td className='add-attorney_table-cell'>{FirstName}</td>
                <td className='add-attorney_table-cell'>{LastName}</td>
                <td className='add-attorney_table-cell'>{Firm}</td>
            </tr>
        );
    }
}

export default AttorneyTableRow;