import React from 'react';
import { connect } from 'react-redux';

import DashboardCardComponent from '../DashboardCardComponent/DashboardCardComponent.jsx';
import DashboardPersonInfo from '../DashboardPersonInfo/DashboardPersonInfo.jsx';
import Popup from '../../../../components/Popup/Popup.jsx';

import { showSideListMenu } from '../../../DashboardBase/actions.es6';
import { editAttorney } from './actions.es6';
import { closePopupDeleteAttorney } from './actions.es6';
import { showPopupDeleteAttorney, deletePatientAttorney } from './actions.es6';

import './DashboardAttorney.scss';

const ATT_NAME_INDEX = 1;
const ATT_FIRM_INDEX = 2;

class DashboardAttorney extends React.Component {
    _onCLose = () => {
        this.props.onClosePopupDeleteAttorney();
    }

    _onOk = () => {
        this.props.onDeletePatientAttorney(
            this.props.patientInfo.Attorney,
            this.props.patientInfo.PatientID
        );
        this._onCLose();
    }

    _onShowPopup = () => {
        this.props.onShowPopupDeleteAttorney();
    }

    render() {
        const { index, moveCard,
            patientAtty,
            showPopupDeleteAtty,
            onShowSideListMenu,
            showButtonDelete,
            onEditAttorney ,
            selectedAttorney} = this.props;

        let personInfo = [
                {key: 'Attention', value: ''},
                {key: 'Attorney', value: ''},
                {key: 'Firm', value: ''},                
                {key: 'Address', value: ''},
                {key: 'City', value: ''},
                {key: 'State', value: ''},
                {key: 'Zip', value: ''},
                {key: 'Phone', value: ''},
                {key: 'Fax', value: ''},
                {key: 'Email', value: ''}
        ];

        if (patientAtty) {
            personInfo = [
                {key: 'Attention', value: patientAtty.Attention},
                {key: 'Attorney', value:patientAtty.AttFirstName? patientAtty.AttFirstName +' '+patientAtty.AttLastName:''},
                {key: 'Firm', value: patientAtty.Firm},                
                {key: 'Address', value: patientAtty.Address},
                {key: 'City', value: patientAtty.City},
                {key: 'State', value: patientAtty.State},
                {key: 'Zip', value: patientAtty.Zip},
                {key: 'Phone', value: patientAtty.Phone},
                {key: 'Fax', value: patientAtty.Fax},
                {key: 'Email', value: patientAtty.Email},
                {key: 'Letter of Protection Signed', value: patientAtty.LOP === true?'Yes':'No'},
                {key: 'Attorney-Correspondence', value: patientAtty.Correspondance=== true?'Yes':'No'},
                patientAtty.IsVerified? {key: 'Verified', value: 'Yes - ' + patientAtty.VerifiedBy+' - ' + patientAtty.VerifiedDate}:{}

            ];
        }

        let showIcon = showButtonDelete;

        return (
            <DashboardCardComponent
                title="Attorney"
                flex="1"
                index={index}
                customEdit
                noEditing = { !showIcon }
                deleted = { showIcon }
                moveCard={moveCard}
                editItem={() => onEditAttorney( !_.isEmpty(selectedAttorney) && 'editAttorneyMenu', selectedAttorney)}
                deleteItem={ this._onShowPopup }
                noadded={showIcon}
                addItem={() => onShowSideListMenu('addAttorneyMenu')}
            >
                <DashboardPersonInfo
                    personName={personInfo[ATT_NAME_INDEX].value}
                    personDesc={personInfo[ATT_FIRM_INDEX].value}
                    personInfo={personInfo}
                />
                { showPopupDeleteAtty && <Popup
                    message='Do you want to delete Attorney?'
                    noLabel='No'
                    yesLabel='Yes'
                    onCLose={this._onCLose}
                    onOk={this._onOk}
                /> }
            </DashboardCardComponent>
        );
    }
}

const mapStateToProps = state => {
    return {
        patientAtty: state.patientDetailsReducer.patientDetails.PatientNotesDocsModel.PatientAtty,
        patientInfo: state.patientDetailsReducer.patientDetails.PatientNotesDocsModel.PatientInfo,
        showPopupDeleteAtty: state.popupReducer.showPopupDeleteAttorney,
        showButtonDelete: state.attorneyReducer.showButtonDelete,
        selectedAttorney: state.patientDetailsReducer.patientDetails.PatientNotesDocsModel.PatientAtty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onShowSideListMenu: (menuName) => {
            dispatch(showSideListMenu(menuName));
        },
        onEditAttorney:(menuName, data) => {
            dispatch(editAttorney(menuName, data));
        },
        onDeletePatientAttorney: (attorneyId, patientId) => {
            dispatch(deletePatientAttorney(attorneyId, patientId));
        },
        onClosePopupDeleteAttorney: () => {
            dispatch(closePopupDeleteAttorney());
        },      
        onShowPopupDeleteAttorney: () => {
            dispatch(showPopupDeleteAttorney());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardAttorney);
