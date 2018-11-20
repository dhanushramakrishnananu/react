import React from 'react';
import moment from 'moment';

class AddInvoiceRow extends React.Component {
    render() {
        const { currentValue, InvoiceNumber, InvoiceDate, onClick, selectedInvoice } = this.props;
        return (
            <tr key={currentValue} className={selectedInvoice === InvoiceNumber ? 'add-attorney_table-row adjuster-active' : 'add-attorney_table-row'} onClick={onClick}>
                <td title={InvoiceNumber} className="add-attorney_table-cell">{InvoiceNumber}</td>
                <td title={InvoiceDate} className="add-attorney_table-cell">{InvoiceDate}</td>
            </tr>
        );
    }
}

export default AddInvoiceRow;