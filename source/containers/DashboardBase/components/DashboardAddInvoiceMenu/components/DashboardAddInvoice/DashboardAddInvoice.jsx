import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import {
    addInvoice,
    getInvoice,
    selectedInvoice
} from '../../actions.es6';
import AddInvoiceRow from './AddInvoiceRow.jsx';
import LoadingComponent from '../../../../../../components/LoadingComponent/Loading.jsx';

class DashboardAddInvoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { RefId, onGetInvoice } = this.props;
        onGetInvoice(RefId);
    }

    onClick = (value) => {
        this.props.onSelectedInvoice(value);
    };

    render() {
        const { invoiceDataLoading, invoiceData,
            onHideSideListMenu, patientId,
            selectedInvoiceData, onSelectedInvoice,
            onAddInvoice } = this.props;
        if(invoiceDataLoading) {
            return (<LoadingComponent/>);
        }

        const additionalFormData = {
            PatientId: parseInt(patientId),
            InvoiceNumber: '',
            InvoiceDate: '',
            RefId: 0,
            Eid: 2
        };
        selectedInvoiceData.Eid = additionalFormData.Eid;
        selectedInvoiceData.PatientId = additionalFormData.PatientId;

        return (
            <form>
                <div className="add-attorney_table-wrapper add-invoice-table">
                    <p>Add To Invoice</p>
                    <table className="add-attorney_table">
                        <thead className="add-attorney_table-row" colSpan={4}>
                            <tr>
                                <th className="add-attorney_table-head">Invoice No</th>
                                <th className="add-attorney_table-head">Invoice Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                invoiceData && invoiceData.map((value, i) =>
                                    <AddInvoiceRow
                                        onClick={() => this.onClick(value)}
                                        selectedInvoice={selectedInvoiceData && selectedInvoiceData.InvoiceNumber}
                                        key={i}
                                        currentValue={i}
                                        InvoiceNumber={value.InvoiceNumber}
                                        InvoiceDate={moment(value.InvoiceDate, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY')}
                                    />
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="adds-buttons-block">
                    <button type="button" className="adds-buttons-block_cancel-btn" onClick={onHideSideListMenu}>
                            Cancel
                    </button>
                    <button ref="btn2" type="button" className="adds-buttons-block_next-btn" disabled={!selectedInvoiceData.InvoiceNumber} onClick={() => onAddInvoice(selectedInvoiceData,this)} >
                            Add To Invoice
                    </button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        invoiceData: state.paymentReducer.invoiceData,
        invoiceDataLoading: state.paymentReducer.invoiceDataLoading,
        selectedInvoiceData: state.paymentReducer.selectedInvoice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddInvoice: (value,that) => {
            dispatch(addInvoice(value));
            that.refs.btn2.setAttribute("disabled", "disabled");
        },
        onGetInvoice: (RefId) => {
            dispatch(getInvoice(RefId));
        },
        onSelectedInvoice: (value) => {
            dispatch(selectedInvoice(value));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardAddInvoice);
