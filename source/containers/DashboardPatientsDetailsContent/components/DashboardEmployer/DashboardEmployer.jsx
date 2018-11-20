import React from 'react';
import { connect } from 'react-redux';
import { showSideListMenu } from '../../../DashboardBase/actions.es6';
import DashboardCardComponent from '../DashboardCardComponent/DashboardCardComponent.jsx';
import DashboardPersonInfo from '../DashboardPersonInfo/DashboardPersonInfo.jsx';

import './DashboardEmployer.scss';

class DashboardEmployer extends React.Component {
    render() {
        const { index, moveCard, employer, onShowSideListMenu, showButtonEdit,} = this.props;
        const personName = employer? employer.EmployerName: '';
        const personDesc = employer ?'ID: '+ employer.EmployerId : '';
        const personInfo = [
            {key: 'Address', value: (employer?employer.Address:'')},
            {key: 'City', value: (employer?employer.City:'')},
            {key: 'State', value: (employer?employer.State:'')},
            {key: 'Zip', value: (employer?employer.ZipCode:'')},
            {key: 'Phone No', value: (employer?(employer.PhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) -$2-$3')):'')},
            {key: 'Ext', value: (employer?employer.PhoneExt:'')},
            {key: 'Fax No', value: (employer?(employer.FaxNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) -$2-$3')):'')}
        ];

        return (
            <DashboardCardComponent title="Employer" flex="1" index={index} moveCard={moveCard}
                addItem={() => onShowSideListMenu('addEmployerMenu')}
                noEditing = { !showButtonEdit }
                noadded = { showButtonEdit }
                editItem={() => onShowSideListMenu('editEmployerMenu')}>
                    <DashboardPersonInfo
                        personName={personName}
                        personDesc={personDesc}
                        personInfo={personInfo}
                    />
            </DashboardCardComponent>
        );
    }
}
const mapStateToProps = state => {
    return {
        employer: state.patientDetailsReducer.patientDetails.PatientNotesDocsModel.EmployerInfo,
        showButtonEdit: state.patientDetailsReducer.showButtonEdit
    };
};

const mapDispatchToProps = dispatch => {
    return {      
        onShowSideListMenu: (menuName) => {
            dispatch(showSideListMenu(menuName));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardEmployer);
