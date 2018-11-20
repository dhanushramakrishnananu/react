import React from 'react';
import moment from 'moment';

class CurrentPaymentTableRow extends React.Component {
    render() {
        const { PaymentID, PaidDate, AmountPaid, Type, Invoice,currentValue } = this.props;
        return (
            <tr key={currentValue} className={'add-attorney_table-row'} data-insurance-id={PaymentID}>
                <td title={moment(PaidDate).format('MM/DD/YYYY')} className='add-attorney_table-cell'>{moment(PaidDate).format('MM/DD/YYYY')}</td>
                <td title={AmountPaid} className='add-attorney_table-cell'>{AmountPaid}</td>
                <td title={Type} className='add-attorney_table-cell'>{Type}</td>
                <td title={Invoice} className='add-attorney_table-cell'>{Invoice}</td>
            </tr>
        );
    }
}

export default CurrentPaymentTableRow;