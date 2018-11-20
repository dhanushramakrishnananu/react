import React from 'react';
import { connect } from 'react-redux';

import { hideSideListMenu, showSideListMenu } from '../../../DashboardBase/actions.es6';

import DashboardAdditionMenu from '../../../DashboardBase/components/DashboardAdditionMenu/DashboardAdditionMenu.jsx';
import DashboardActionMenu from '../../../DashboardBase/components/DashboardActionMenu/DashboardActionMenu.jsx';
import DashboardAddPatient from '../../../DashboardBase/components/DashboardAddPatient/DashboardAddPatient.jsx';
import DashboardAddNoteMenu from '../../../DashboardBase/components/DashboardAddNoteMenu/DashboardAddNoteMenu.jsx';
import DashboardAddDocumentMenu from '../../../DashboardBase/components/DashboardAddDocumentMenu/DashboardAddDocumentMenu.jsx';
import DashboardAddIndicatorMenu from '../../../DashboardBase/components/DashboardAddIndicator/DashboardAddIndicatorMenu.jsx';
import DashboardAddAtFaultMenu from '../../../DashboardBase/components/DashboardAddAtFaultMenu/DashboardAddAtFaultMenu.jsx';
import DashboardAddAttorneyMenu from '../../../DashboardBase/components/DashboardAddAttorneyMenu/DashboardAddAttorneyMenu.jsx';
import DashboardAddInsuranceMenu from '../../../DashboardBase/components/DashboardAddInsuranceMenu/DashboardAddInsuranceMenu.jsx';
import DashboardDeleteInsuranceMenu from '../../../DashboardBase/components/DashboardAddInsuranceMenu/DashboardDeleteInsuranceMenu.jsx';
import DashboardEditDocumentMenu from '../../../DashboardBase/components/DashboardAddDocumentMenu/DashboardEditDocumentMenu.jsx';
import DashboardEditAgedAccountMenu from '../../../DashboardBase/components/DashboardEditAgedAccountMenu/DashboardEditAgedAccountMenu.jsx';
import DashboardAddPaymentMenu from '../../../DashboardBase/components/DashboardAddPaymentMenu/DashboardAddPaymentMenu.jsx';
import DashboardAddPendingPaymentMenu from '../../../DashboardBase/components/DashboardAddPendingPaymentMenu/DashboardAddPendingPaymentMenu.jsx';
import DashboardAddEmployerMenu from '../../../DashboardBase/components/DashboardAddEmployerMenu/DashboardAddEmployerMenu.jsx';
import DashboardAddInvoiceMenu from '../../../DashboardBase/components/DashboardAddInvoiceMenu/DashboardAddInvoiceMenu.jsx';

import './DashboardSideListMenu.scss';

class DashboardSideListMenu extends React.Component {
    render() {
        const { sideListMenu, onShowSideListMenu, onHideSideListMenu, selectedStep, patientId, hasGroupedPatients, hasNotesGroupedPatients, hasAttorneyGroupedPatients} = this.props;

        const title = {
            additionMenu: 'Addition Menu',
            actionMenu: 'Action Menu',
            addPatientMenu: 'Add Patient (' + selectedStep + '/5)',
            addNoteMenu: `Add Note${hasGroupedPatients ? ' (' + selectedStep + '/2)' : ''}`,
            addDocumentMenu: `Add Document${hasGroupedPatients ? ' (' + selectedStep + '/2)' : ''}`,
            addIndicatorMenu: 'Add Indicator',
            addAtFault: `Add AtFault ${hasGroupedPatients ? ' (' + selectedStep + '/2)' : ''}`,
            editAtFault: `Edit AtFault ${hasGroupedPatients ? ' (' + selectedStep + '/2)' : ''}`,
            addAttorneyMenu: `Add Attorney ${hasGroupedPatients ? ' (' + selectedStep + '/4)' : ' (' + selectedStep + '/3)'}`,
            editAttorneyMenu: `Edit Attorney ${hasAttorneyGroupedPatients ? ' (' + selectedStep + '/4)' : ' (' + selectedStep + '/3)'}`,
            editInsuranceMenu: `Edit Insurance (${selectedStep === 4 ? selectedStep + '/4)' : selectedStep + '/3)' }`,
            editDocumentMenu: 'Edit Document',
            addInsuranceMenu: 'Add Insurance (' + selectedStep + '/3)',
            deleteInsuranceMenu: 'Delete Insurance ',
            editNoteMenu: `Edit Note${hasNotesGroupedPatients ? ' (' + selectedStep + '/2)' : ''}`,
            editIndicatorMenu: 'Edit Indicator',
            editAgedAccountMenu: 'Edit Aged Account',
            addEmployerMenu: 'Add Employer(' + selectedStep + '/2)',
            editEmployerMenu: 'Change Employer(' + selectedStep + '/2)',
            addPaymentMenu: 'Add Payment Menu ('+ selectedStep +'/3)',
            editPaymentMenu: 'Edit Payment Menu ('+ selectedStep +'/3)',
            addInvoice: 'Payment',
            editOpenNoteMenu: `Edit Note${hasNotesGroupedPatients ? ' (' + selectedStep + '/2)' : ''}`,
            editInvoice: 'Payment',
            addPendingPaymentMenu: 'Add Pending Payment',
            editPendingPaymentMenu: 'Edit Pending Payment'
        };

        return (
            <div className="dashboard-side-list-menu">
                <div className="dashboard-side-list-menu_header">
                    <h3>{title[sideListMenu]}</h3>
                </div>
                <div className="dashboard-side-list-menu_content">
                    {sideListMenu === 'additionMenu' && <DashboardAdditionMenu onHideSideListMenu={onHideSideListMenu} onShowSideListMenu={onShowSideListMenu} />}
                    {sideListMenu === 'actionMenu' && <DashboardActionMenu onHideSideListMenu={onHideSideListMenu} />}
                    {sideListMenu === 'addPatientMenu' && <DashboardAddPatient onHideSideListMenu={onHideSideListMenu} />}
                    {sideListMenu === 'addInsuranceMenu' && <DashboardAddInsuranceMenu onHideSideListMenu={onHideSideListMenu} patientId={patientId} />}
                    {sideListMenu === 'addDocumentMenu' && <DashboardAddDocumentMenu onHideSideListMenu={onHideSideListMenu} patientId={patientId} />}
                    {sideListMenu === 'addNoteMenu' && <DashboardAddNoteMenu onHideSideListMenu={onHideSideListMenu} patientId={patientId} />}
                    {sideListMenu === 'addIndicatorMenu' && <DashboardAddIndicatorMenu onHideSideListMenu={onHideSideListMenu} patientId={patientId} />}
                    {sideListMenu === 'addAtFault' && <DashboardAddAtFaultMenu onHideSideListMenu={onHideSideListMenu} patientId={patientId} />}                   
                    {sideListMenu === 'addAttorneyMenu' && <DashboardAddAttorneyMenu onHideSideListMenu={onHideSideListMenu} patientId={patientId} />}
                    {sideListMenu === 'editAtFault' && <DashboardAddAtFaultMenu onHideSideListMenu={onHideSideListMenu} patientId={patientId} isEdit={true} />}
                    {sideListMenu === 'editAttorneyMenu' && <DashboardAddAttorneyMenu onHideSideListMenu={onHideSideListMenu} patientId={patientId} isEdit={true} />}
                    {sideListMenu === 'editInsuranceMenu' && <DashboardAddInsuranceMenu onHideSideListMenu={onHideSideListMenu} patientId={patientId} />}
                    {sideListMenu === 'deleteInsuranceMenu' && <DashboardDeleteInsuranceMenu onHideSideListMenu={onHideSideListMenu} patientId={patientId} />}
                    {sideListMenu === 'editDocumentMenu' && <DashboardEditDocumentMenu onHideSideListMenu={onHideSideListMenu} patientId={patientId} />}
                    {sideListMenu === 'editNoteMenu' && <DashboardAddNoteMenu onHideSideListMenu={onHideSideListMenu} patientId={patientId} isEdit={true}/>}
                    {sideListMenu === 'editIndicatorMenu' && <DashboardAddIndicatorMenu onHideSideListMenu={onHideSideListMenu} patientId={patientId} isEdit={true}/>}
                    {sideListMenu === 'editAgedAccountMenu' && <DashboardEditAgedAccountMenu onHideSideListMenu={onHideSideListMenu} patientId={patientId} />}
                    {sideListMenu === 'addPaymentMenu' && <DashboardAddPaymentMenu onHideSideListMenu={onHideSideListMenu} patientId={patientId} />}
                    {sideListMenu === 'editPaymentMenu' && <DashboardAddPaymentMenu onHideSideListMenu={onHideSideListMenu} patientId={patientId} />}
                    {sideListMenu === 'addInvoice' && <DashboardAddInvoiceMenu onHideSideListMenu={onHideSideListMenu} patientId={patientId} />}
                    {sideListMenu === 'addEmployerMenu' && <DashboardAddEmployerMenu onHideSideListMenu={onHideSideListMenu} patientId={patientId} /> }
                    {sideListMenu === 'editEmployerMenu' && <DashboardAddEmployerMenu onHideSideListMenu={onHideSideListMenu} patientId={patientId} />}
                    {sideListMenu === 'editOpenNoteMenu' && <DashboardAddNoteMenu onHideSideListMenu={onHideSideListMenu} patientId={patientId} isEdit={true} isOpenNote={true}/>}
                    {sideListMenu === 'editInvoice' && <DashboardAddInvoiceMenu onHideSideListMenu={onHideSideListMenu} patientId={patientId} />}
                    {sideListMenu === 'addPendingPaymentMenu' && <DashboardAddPendingPaymentMenu onHideSideListMenu={onHideSideListMenu} patientId={patientId} />}
                    {sideListMenu === 'editPendingPaymentMenu' && <DashboardAddPendingPaymentMenu onHideSideListMenu={onHideSideListMenu} patientId={patientId} />}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        sideListMenu: state.homeReducer.sideListMenu,
        selectedStep: state.homeReducer.selectedStep,
        hasGroupedPatients: Boolean(state.patientDetailsReducer.groupedPatients.length),
        hasNotesGroupedPatients: Boolean(state.patientDetailsReducer.notesGroupedPatients.length),
        hasAttorneyGroupedPatients: Boolean(state.patientDetailsReducer.attorneyGroupedPatients.length)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onHideSideListMenu: () => {
            dispatch(hideSideListMenu());
        },
        onShowSideListMenu: (menuName) => {
            dispatch(showSideListMenu(menuName));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSideListMenu);