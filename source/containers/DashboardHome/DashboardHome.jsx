import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { getMasterDataForPatient } from './actions.es6';

import DashboardTasklists from './components/DashboardTasklists/DashboardTasklists.jsx';
import DashboardSideListMenu from './components/DashboardSideListMenu/DashboardSideListMenu.jsx';
import DashboardGroupedPatientMenu from './components/DashboardGroupedPatientMenu/DashboardGroupedPatientMenu.jsx';

import './DashboardHome.scss';

class DashboardHome extends React.Component {
    componentDidMount() {
        this.props.onGetMasterDataForPatient();
    }

    render() {
        const { sideListMenu, location, params } = this.props;

        const sideListClass = classNames({
            'main-block_side-list': true,
            'main-block_side-list_side-list-menu': Boolean(sideListMenu)
        });

        return (
            <div className="dashboard-home">
                {! location.pathname.includes('insurance') && !location.pathname.includes('group-accounts') &&  
                        <div className={sideListClass}>
                        <DashboardTasklists/>
                        <DashboardSideListMenu
                            patientId={params.patientId}
                        />
                    </div>
                }
                {location.pathname.includes('group-accounts') &&
                    <div className={sideListClass}>
                        <DashboardGroupedPatientMenu  
                            patientId={params.patientId}
                        />
                    </div>
                }
                <div className="content-block">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        sideListMenu: state.homeReducer.sideListMenu
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetMasterDataForPatient: () => {
            dispatch(getMasterDataForPatient());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardHome);