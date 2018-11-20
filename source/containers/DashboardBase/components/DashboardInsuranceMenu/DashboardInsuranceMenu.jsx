import React from 'react';

import { connect } from 'react-redux';
import moment from 'moment';

import AddInsuranceFormStep33 from './components/AddInsuranceFormStep33.jsx';



class DashboardInsuranceMenu extends React.Component {
    render() {
        return(
            <AddInsuranceFormStep33 />
        );
    }
}

export default DashboardInsuranceMenu;