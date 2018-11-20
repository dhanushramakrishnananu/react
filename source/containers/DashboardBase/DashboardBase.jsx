import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';

import { ToastContainer } from 'react-toastify';

import { getCurrentUser } from './actions.es6';
import Loading from '../../components/LoadingComponent/Loading.jsx';

import DashboardHeader from './components/DashboardHeader/DashboardHeader.jsx';
import DashboardSidebar from '../DashboardHome/components/DashboardSidebar/DashboardSidebar.jsx';

import './DashboardBase.scss';

class DashboardBase extends React.Component {
    componentDidMount() {
        this.props.onGetCurrentUser();
    }
    render() {
        const { currentUser, searchPatientLoading } = this.props;

        const dashboardPage = classNames({
            'dashboard-page': true,
            'dashboard-page_search-loading': searchPatientLoading
        });

        return (
            <div>
                {
                    _.isEmpty(currentUser) &&
                    <div className="loading-box">
                        <Loading />
                    </div> ||
                    <div className={dashboardPage}>
                        <div className="search-loading">
                            <Loading />
                        </div>
                        <DashboardHeader />
                        <div className="main-block">
                            <DashboardSidebar />
                            {this.props.children}
                        </div>
                    </div>
                }
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    closeOnClick
                    hideProgressBar
                    pauseOnHover
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.authReducer.currentUser,
        sideListMenu: state.homeReducer.sideListMenu,
        searchPatientLoading: state.baseReducer.searchPatientLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetCurrentUser: () => {
            dispatch(getCurrentUser());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardBase);