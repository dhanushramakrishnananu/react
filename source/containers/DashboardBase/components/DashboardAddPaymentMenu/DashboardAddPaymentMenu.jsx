import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

import { nextStep, prevStep } from '../../../DashboardBase/actions.es6';
import {
    getDropDownAndInitialData,
    addPayment,
    addPaymentReturn,
    groupedInit,
    getGroupedPatients
} from './actions.es6';
import LoadingComponent from '../../../../components/LoadingComponent/Loading.jsx';
import cookies from '../../../../cookies.es6';
import DashboardAddPaymentStep1 from './components/DashboardAddPaymentStep1/DashboardAddPaymentStep1.jsx';
import DashboardAddPaymentStep2 from './components/DashboardAddPaymentStep2/DashboardAddPaymentStep2.jsx';
import DashboardAddPaymentStep3 from './components/DashboardAddPaymentStep3/DashboardAddPaymentStep3.jsx';
import DashboardAddPaymentStep4 from './components/DashboardAddPaymentStep4/DashboardAddPaymentStep4.jsx';
import './DashboardAddPaymentMenu.scss';

class DashboardAddPaymentMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isChecked: true
        };
    }

    componentDidMount() {
        const { patientId, onGetDropDownAndInitialData, onGroupedInit, onGetGroupedPatients } = this.props;
        onGetDropDownAndInitialData(patientId);
        onGroupedInit();
        onGetGroupedPatients(patientId);
    }

    onSubmit = (values, goNextStep) => {
        this.props.onAddPayment(values, parseInt(this.props.patientId));
        if(!goNextStep) {
            this.props.onHideSideListMenu();
        }
    };

    paymentReturn = (values, paymentReturnFormData) => {
        const valuesReturn = values;
        valuesReturn.NoteModel = {Note: values.Notes, Priority: values.Priority ? values.Priority : ''};
        delete valuesReturn.Notes;
        delete valuesReturn.Priority;
        if(values.Rdate) {
            paymentReturnFormData.Rdate = values.Rdate;
        }
        valuesReturn.NoteModel = _.extend(paymentReturnFormData.NoteModel, valuesReturn.NoteModel);
        this.props.onAddPaymentReturn(_.extend(paymentReturnFormData, valuesReturn), parseInt(this.props.patientId));
        this.props.onHideSideListMenu();
    };

    isChecked = () => {
        this.setState({
            isChecked: !this.state.isChecked
        });
    };

    isUnchecked = (value, additionalFirstFormData) => {
        if(this.props.paymentGroupedPatients.length < 0) {
            this.onSubmit(_.extend(additionalFirstFormData, value));
        } else {
            if(!this.state.isChecked) {
                this.onSubmit(_.extend(additionalFirstFormData, value), 'goNextStep');
            }
            this.props.onNextStep();
        }
    };

    render() {
        const { onNextStep, onPrevStep,
            selectedStep, onHideSideListMenu,
            paymentDropDownDataLoading, paymentInitialDataLoading,
            paymentDropDownData, paymentInitialData,
            selectPaymentItem, patientId, editPaymentItem,
            paymentGroupedPatients, paymentGroupedPatientsLoading } = this.props;

        if(paymentDropDownDataLoading || paymentInitialDataLoading || paymentGroupedPatientsLoading) {
            return (<LoadingComponent />);
        }

        const additionalFirstFormData = {
            PatientID: parseInt(patientId),
            PaymentID: 0,
            ReferredBy: cookies.get('EmployeeId'),
            Charges: paymentInitialData.PatientInfo.Charges,
            Provider: paymentInitialData.PatientInfo.AttorneyName,
            PaidDate: '',
            AmountPaid: '',
            CommissionRate: '',
            TotalBilledAmount: '',
            CatID: '',
            Type: '',
            InvoiceDate: '',
            PercentRecovery: 0,
            ExhaustInsIDs: 0,
            Writeoff: 0,
            Continue: '',
            Who: ''
        };

        const paymentReturnFormData = {
            NoteModel: {
                PatientId: parseInt(patientId),
                NoteId: 0,
                date: '',
                Note: '',
                Action: '',
                Completed: '',
                Priority: '',
                LeadingNoteID:0,
                Employee: '',
                NoteTime: '',
                EnteredBy: '',
                Followup: moment().format('MM/DD/YYYY hh:mm:ss A'),
                EnteredDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
                Exported: 0,
                GroupNoteIDS: '',
                CollectionPriority: '',
                SecPriority: 0,
                FrmList: '',
                FinClass: '',
                TeamID: 0,
                PriorityStr: '',
                providerID: 0,
                FollowUpStr: '',
                Mode: 0,
                EID: 2,
                PostToGroup: 0,
                ModifiedBy: 0,
                NoteResultID: 0
            },
            ReturnCode: '',
            Recommendation: '',
            Rdate: moment().format('MM/DD/YYYY'),
            Eid: cookies.get('EmployeeId'),
            PatientId:parseInt(patientId)
        };

        this.stepsList = [
            <DashboardAddPaymentStep1
                onSubmit={onNextStep}
                paymentDropDownData={paymentDropDownData}
                paymentInitialData={paymentInitialData}
                previousPage={onPrevStep}
                onHideSideListMenu={onHideSideListMenu}
                selectPaymentItem={selectPaymentItem}
                editPaymentItem={editPaymentItem}
                isChecked={this.isChecked}
                checked={true}
            />,
            <DashboardAddPaymentStep2
                onSubmit={value => this.isUnchecked(value, additionalFirstFormData)}
                patientId={patientId}
                paymentInitialData={paymentInitialData}
                editPaymentItem={editPaymentItem}
                previousPage={onPrevStep}
            />,
            <DashboardAddPaymentStep3
                previousPage={onPrevStep}
                patientId={patientId}
                paymentGroupedPatients={paymentGroupedPatients}
                onSubmit={value => this.onSubmit(_.extend(additionalFirstFormData, value))}
            />,
            <DashboardAddPaymentStep4
                previousPage={onPrevStep}
                patientId={patientId}
                onHideSideListMenu={onHideSideListMenu}
                paymentPatientInfo={paymentInitialData.PatientInfo}
                onSubmit={value => this.paymentReturn(value, paymentReturnFormData)}
            />
        ];

        if(!this.state.isChecked) {
            this.stepsList.splice(2, 1);
        }

        return (
            <div className='side-list-content add-note'>
                {this.stepsList[selectedStep - 1]}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedStep: state.homeReducer.selectedStep,
        paymentDropDownData: state.paymentReducer.paymentDropDownData,
        paymentInitialData: state.paymentReducer.paymentInitialData,
        paymentDropDownDataLoading: state.paymentReducer.paymentDropDownDataLoading,
        editPaymentItem: state.paymentReducer.selectedPaymentItem,
        paymentInitialDataLoading: state.paymentReducer.paymentInitialDataLoading,
        paymentGroupedPatients: state.paymentReducer.paymentGroupedPatients,
        paymentGroupedPatientsLoading: state.paymentReducer.paymentGroupedPatientsLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onNextStep: () => {
            dispatch(nextStep());
        },
        onPrevStep: () => {
            dispatch(prevStep());
        },
        onGetDropDownAndInitialData: (patientId) => {
            dispatch(getDropDownAndInitialData(patientId));
        },
        onAddPayment: (data, patientId) => {
            dispatch(addPayment(data, patientId));
        },
        onAddPaymentReturn: (data, patientId) => {
            dispatch(addPaymentReturn(data, patientId));
        },
        onGroupedInit: () => {
            dispatch(groupedInit());
        },
        onGetGroupedPatients: (patientId) => {
            dispatch(getGroupedPatients(parseInt(patientId)));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardAddPaymentMenu);

