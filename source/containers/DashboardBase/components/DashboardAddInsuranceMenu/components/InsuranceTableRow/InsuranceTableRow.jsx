import React from 'react';

class InsuranceTableRow extends React.Component {
    render() {
        const { InsID, Adjuster, Company, State, onClick, selectedInsurance } = this.props;
        return (
            <tr className={selectedInsurance === InsID ? 'add-attorney_table-row adjuster-active' : 'add-attorney_table-row'} data-insurance-id={InsID} onClick={onClick} >
                <td title='Adjuster' className='add-attorney_table-cell'>{Adjuster}</td>
                <td title='Company' className='add-attorney_table-cell'>{Company}</td>
                <td title='State' className='add-attorney_table-cell'>{State}</td>
            </tr>
        );
    }
}

export default InsuranceTableRow;