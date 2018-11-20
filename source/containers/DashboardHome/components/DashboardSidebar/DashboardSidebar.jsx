import React from 'react';
import { Link } from 'react-router';
import HomeIcon from '../../../../assets/icons/HomeIcon.jsx';
import UmbrellaIcon from '../../../../assets/icons/UmbrellaIcon.jsx';
import LibraIcon from '../../../../assets/icons/LibraIcon.jsx';
import EmployerIcon from '../../../../assets/icons/EmployerIcon.jsx';
import ProductivityIcon from '../../../../assets/icons/ProductivityIcon.jsx';
import GearIcon from '../../../../assets/icons/GearIcon.jsx';
import SearchIcon from '../../../../assets/icons/SearchIcon.jsx';

import './DashboardSidebar.scss';

class DashboardSidebar extends React.Component {
    render() {
        return (
            <div className="dashboard-sidebar">
                <Link to="/" activeClassName="dashboard-sidebar_active-link" onlyActiveOnIndex >
                    <HomeIcon />
                    <span>Home</span>
                </Link>
                <Link to="/search" activeClassName="dashboard-sidebar_active-link" >
                    <SearchIcon />
                    <span>Search</span>
                </Link>
                <Link to="/insurance" activeClassName="dashboard-sidebar_active-link" >
                    <UmbrellaIcon />
                    <span>Insurance</span>
                </Link>
                <Link to="/attorney" activeClassName="dashboard-sidebar_active-link" >
                    <LibraIcon />
                    <span>Attorney</span>
                </Link>
                <Link to="/employers" activeClassName="dashboard-sidebar_active-link" >
                    <EmployerIcon />
                    <span>Employers</span>
                </Link>
                <Link activeClassName="dashboard-sidebar_active-link" >
                    <ProductivityIcon />
                    <span>Productivity</span>
                </Link>
                <Link activeClassName="dashboard-sidebar_active-link" >
                    <GearIcon />
                    <span>Settings</span>
                </Link>
            </div>
        );
    }
}

export default DashboardSidebar;