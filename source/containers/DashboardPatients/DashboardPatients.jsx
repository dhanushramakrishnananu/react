import React from 'react';
import { connect } from 'react-redux';

import { getPatientDetails, getGroupedPatientDetails } from '../DashboardBase/actions.es6';

import DashboardPatientsHeader from './components/DashboardPatientsHeader/DashboardPatientsHeader.jsx';
import DashboardGroupedPatientsHeader from './components/DashboardGroupedPatientsHeader/DashboardGroupedPatientsHeader.jsx';

import Loading from '../../components/LoadingComponent/Loading.jsx';

import './DashboardPatients.scss';

class DashboardPatients extends React.Component {
    componentDidMount() {
        const { params, onGetPatientDetails, onGetGroupedPatientDetails } = this.props;
        if(params.mainPatientId)
        {
            onGetGroupedPatientDetails(params.patientId);
        } else {
            onGetPatientDetails(params.patientId);
        }
    }

    componentWillReceiveProps(newProps) {
        const { params, onGetPatientDetails, onGetGroupedPatientDetails } = this.props;
        if (params.patientId !== newProps.params.patientId) {
            if(newProps.params.mainpatientId)
            {
                onGetGroupedPatientDetails(newProps.params.patientId);
            } else {
                onGetPatientDetails(newProps.params.patientId);
            }
        }
    }

    //Don't re-render component on change patientId in params
    shouldComponentUpdate(newProps) {
        return this.props.params.patientId === newProps.params.patientId;
    }

    renderDetails() {
        const { patientNotesDocsModel, children, location, params } = this.props;
        return (
            <div className="dashboard-patients">
                { location.pathname.includes('group-accounts') &&
                    <DashboardGroupedPatientsHeader
                        patientInfo={patientNotesDocsModel.PatientInfo}
                        location={location}
                        params={params}/>
                }
                { !location.pathname.includes('group-accounts') &&
                    <DashboardPatientsHeader
                        patientInfo={patientNotesDocsModel.PatientInfo}
                        location={location}/>
                }
                {children}
            </div>
        );
    }

    renderLoading() {
        return (
            <Loading/>
        );
    }

    render() {
        return this.props.patientNotesDocsModel ? this.renderDetails() : this.renderLoading();
    }
}

const mapStateToProps = state => {
    return {
        patientNotesDocsModel: state.patientDetailsReducer.patientDetails.PatientNotesDocsModel
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetPatientDetails: (patientId) => {
            dispatch(getPatientDetails(patientId));
        },
        onGetGroupedPatientDetails: (patientId) => {
            dispatch(getGroupedPatientDetails(patientId));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardPatients);