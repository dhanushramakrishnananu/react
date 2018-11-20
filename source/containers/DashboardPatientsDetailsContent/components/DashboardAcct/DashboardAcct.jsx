import React from 'react';
import { connect } from 'react-redux';

import DashboardCardComponent from '../DashboardCardComponent/DashboardCardComponent.jsx';
import DashboardPersonInfo from '../DashboardPersonInfo/DashboardPersonInfo.jsx';
import { editAgedAccount } from './actions.es6';

import './DashboardAcct.scss';

class DashboardAcct extends React.Component {
    render() {
        const { index, moveCard, agedAccts, onEditAgedAccount } = this.props;
        const personInfo = [
            {key: 'Note', value: agedAccts.AgedNote},
            {key: 'Continue to Pursue AgedAcct', value: agedAccts.AgedAccountCheck===1?'Yes':'No'}            
        ];
        const agedData = {AgedCheck:Boolean(agedAccts.AgedAccountCheck), Note:agedAccts.AgedNote}
        return (
            <DashboardCardComponent title="Aged Account" flex="1" index={index} moveCard={moveCard} noadded
            editItem={() => onEditAgedAccount( !_.isEmpty(agedAccts) && 'editAgedAccountMenu', agedData)}>                
                    <DashboardPersonInfo
                        personName={agedAccts.AgedNote}                       
                        personInfo={personInfo}
                    />
            </DashboardCardComponent>
        );
    }
}


const mapStateToProps = state => {
    return {
        agedAccts: state.patientDetailsReducer.patientDetails.PatientAgedAcctAndAtFaultModel.AgedAcct
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onEditAgedAccount:(menuName, data) => {
            dispatch(editAgedAccount(menuName, data));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardAcct);