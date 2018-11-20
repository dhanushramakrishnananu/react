import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import urls from './urls.es6';

import cookies from './cookies.es6';
import browserHistory from './browserHistory.es6';

import projectStore from './store.es6';
import './style.scss';

//containers
import Login from './containers/Login/Login.jsx';
import DashboardBase from './containers/DashboardBase/DashboardBase.jsx';
import DashboardIndex from './containers/DashboardIndex/DashboardIndex.jsx';
import DashboardHome from './containers/DashboardHome/DashboardHome.jsx';
import DashboardPatients from './containers/DashboardPatients/DashboardPatients.jsx';
import DashboardGroupActs from './containers/DashboardGroupActs/DashboardGroupActs.jsx';
import DashboardPatientsDetailsContent from './containers/DashboardPatientsDetailsContent/DashboardPatientsDetailsContent.jsx';
import DashboardPatientsTimeline from './containers/DashboardPatientsTimeline/DashboardPatientsTimeline.jsx';
import DashboardPatientsPrintLetter from './containers/DashboardPatientsPrintLetter/DashboardPatientsPrintLetter.jsx';
import DashboardInsurance from './containers/DashboardInsurance/DashboardInsurance.jsx';
import DashboardEmployers from './containers/DashboardEmployers/DashboardEmployers.jsx';
import DashboardAttorney from './containers/DashboardAttorney/DashboardAttorney.jsx';
import DashboardSearch from './containers/DashboardSearch/DashboardSearch.jsx';
const isUserAuthenticated = () => {
    return Boolean(cookies.get('authToken'));
};

const authRequired = (nextState, replace) => {
    if (!isUserAuthenticated()) {
        replace({
            pathname: urls.login,
            state: { nextPathname: nextState.location.pathname }
        });
    }
};

const nonAuthRequired = (nextState, replace) => {
    if (isUserAuthenticated()) {
        replace({
            pathname: urls.home,
            state: { nextPathname: nextState.location.pathname }
        });
    }
};

const routes = (
    <Router history={browserHistory}>
        <Route onEnter={authRequired} component={DashboardBase}>
            <Route components={DashboardHome}>
                <Route components={DashboardIndex} path={urls.home} />
                <Route path={urls.patientDetails} component={DashboardPatients}>
                    <IndexRoute component={DashboardPatientsDetailsContent}/>
                    <Route path={urls.timeline} component={DashboardPatientsTimeline}/>
                    <Route path={urls.groupAccounts} component={DashboardGroupActs}/>
                    <Route path={urls.printLetter} component={DashboardPatientsPrintLetter}/>
                </Route>
                <Route path={urls.groupAccountsPatient} component={DashboardPatients}>
                    <IndexRoute component={DashboardPatientsDetailsContent}/>
                    <Route path={urls.timeline} component={DashboardPatientsTimeline}/>
                    <Route path={urls.groupAccounts} component={DashboardGroupActs}/>
                    <Route path={urls.printLetter} component={DashboardPatientsPrintLetter}/>
                </Route>
            </Route>
            <Route path={urls.insurance} component={DashboardInsurance} />
            <Route path={urls.attorney} component={DashboardAttorney} />
         <Route path={urls.search} component={DashboardSearch} />
         <Route path={urls.employers} component={DashboardEmployers} />
        </Route>
        <Route path={urls.login} component={Login} onEnter={nonAuthRequired}/>
    </Router>
);

ReactDOM.render(
    <Provider store={projectStore}>
        {routes}
    </Provider>,
    document.getElementById('root')
);