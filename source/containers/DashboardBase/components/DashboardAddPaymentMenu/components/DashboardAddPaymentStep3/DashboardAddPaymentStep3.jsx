import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import _ from 'lodash';

class DashboardAddPaymentStep3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { handleSubmit, previousPage, paymentGroupedPatients} = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <div className='add-attorney_table-wrapper'>
                    <p>Grouped accounts with balance</p>
                    <table className='add-attorney_table'>
                        <thead className='add-attorney_table-row' colSpan={4}>
                            <tr>
                                <th className='add-attorney_table-head'>Patient Name</th>
                                <th className='add-attorney_table-head'>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                paymentGroupedPatients && paymentGroupedPatients.map((value) =>
                                    <tr className='add-attorney_table-row' >
                                        <td title='Patient Name' className='add-attorney_table-cell'>{value.PatientName}</td>
                                        <td title='Balance' className='add-attorney_table-cell'>{value.Balance}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

                <div className='adds-buttons-block'>
                    <button type="button" className='adds-buttons-block_cancel-btn' onClick={previousPage}>
                        Back
                    </button>
                    <button type="submit" className='adds-buttons-block_next-btn'>
                        Confirm
                    </button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = () => {
    return {};
};

DashboardAddPaymentStep3 = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardAddPaymentStep3);

export default reduxForm({
    form: 'addPaymentMenu',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
})(DashboardAddPaymentStep3);
