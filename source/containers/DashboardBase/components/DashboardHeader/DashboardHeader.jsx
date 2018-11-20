import React from 'react';
import { connect } from 'react-redux';

import Dropdown, {DropdownTrigger, DropdownContent} from 'react-simple-dropdown';
import 'react-simple-dropdown/styles/Dropdown.css';

import { showSideListMenu, searchPatient } from '../../actions.es6';


import SearchIcon from '../../../../assets/icons/SearchIcon.jsx';
import RevClaimsLogo from '../../../../assets/icons/RevClaimsLogo.jsx';
import AddIcon from '../../../../assets/icons/AddIcon.jsx';
import UserIcon from '../../../../assets/icons/UserIcon.jsx';
import { Link } from 'react-router';

import './DashboardHeader.scss';
import {logout} from './actions.es6';

class DashboardHeader extends React.Component {
    constructor(props) {
        super(props);       
        this.dropdownRef = null;
        this.onCheckInput = this.onCheckInput.bind(this);
    }
    
    onCheckInput(e) {
        const character = String.fromCharCode(e.key);
        if (!character.match(/[0-9]/)) {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        }      
    }
    render() {
        const { onLogout, currentUser, onShowSideListMenu, onSearchPatient } = this.props;

        return (
            <div className="dashboard-header">
                <div className="dashboard-header_left">
                    <a href="/">
                        <RevClaimsLogo />
                    </a>
                </div>
                <div className="dashboard-header_right">
                    <div className="dashboard-header_search-block">
                        <label className="dashboard-header_search-label" htmlFor="search">
                            <SearchIcon />
                        </label>
                        <input className="dashboard-header_search" id="search" placeholder="Search..." onKeyPress={onSearchPatient} results="5" pattern="\d*" onChange={this.onCheckInput} name="header-search" type="search"/>
                    </div>

                    <Dropdown ref={ref => this.dropdownRef = ref}>
                        <DropdownTrigger className="dashboard-header_right_add">
                            <button>
                                <AddIcon />
                                <span>Add</span>
                            </button>
                        </DropdownTrigger>
                        <DropdownContent className="dashboard-header_add-dropdown">
                            <div className="dashboard-header_add-dropdown_title">
                                <div className="dashboard-header_add-dropdown_title-wrapper">Add Menu</div>
                            </div>
                            <ul className="dashboard-header_add-dropdown_list">
                                <li className="dashboard-header_add-dropdown_list-item">
                                    <Link
                                        className="dashboard-header_add-dropdown_list-link"
                                        onClick={() => {
                                            onShowSideListMenu('addPatientMenu');
                                            this.dropdownRef.hide();
                                        }}
                                        to={'/'}
                                    >
                                        Patient
                                    </Link>
                                </li>
                                <li className="dashboard-header_add-dropdown_list-item">
                                    <Link className="dashboard-header_add-dropdown_list-link"
                                          to={'/'}
                                          onClick={() => {
                                              onShowSideListMenu('addInsuranceMenu');
                                              this.dropdownRef.hide();
                                          }}
                                    >Insurance</Link></li>
                                <li className="dashboard-header_add-dropdown_list-item"><Link className="dashboard-header_add-dropdown_list-link" to={'/'}>Attorney</Link></li>
                                <li className="dashboard-header_add-dropdown_list-item"><Link className="dashboard-header_add-dropdown_list-link" to={'/'}>Employer</Link></li>
                                <li className="dashboard-header_add-dropdown_list-item"><Link className="dashboard-header_add-dropdown_list-link" to={'/'}>Hippa Log</Link></li>
                                <li className="dashboard-header_add-dropdown_list-item"><Link className="dashboard-header_add-dropdown_list-link" to={'/'}>Item 1</Link></li>
                                <li className="dashboard-header_add-dropdown_list-item"><Link className="dashboard-header_add-dropdown_list-link" to={'/'}>Item 1</Link></li>
                                <li className="dashboard-header_add-dropdown_list-item"><Link className="dashboard-header_add-dropdown_list-link" to={'/'}>Item 1</Link></li>
                                <li className="dashboard-header_add-dropdown_list-item"><Link className="dashboard-header_add-dropdown_list-link" to={'/'}>Item 1</Link></li>
                                <li className="dashboard-header_add-dropdown_list-item"><Link className="dashboard-header_add-dropdown_list-link" to={'/'}>Item 1</Link></li>
                                <li className="dashboard-header_add-dropdown_list-item"><Link className="dashboard-header_add-dropdown_list-link" to={'/'}>Item 1</Link></li>
                                <li className="dashboard-header_add-dropdown_list-item"><Link className="dashboard-header_add-dropdown_list-link" to={'/'}>Item 1</Link></li>
                                <li className="dashboard-header_add-dropdown_list-item"><Link className="dashboard-header_add-dropdown_list-link" to={'/'}>Item 1</Link></li>
                                <li className="dashboard-header_add-dropdown_list-item"><Link className="dashboard-header_add-dropdown_list-link" to={'/'}>Item 1</Link></li>
                                <li className="dashboard-header_add-dropdown_list-item"><Link className="dashboard-header_add-dropdown_list-link" to={'/'}>Item 1</Link></li>
                            </ul>
                        </DropdownContent>
                    </Dropdown>
                    <Dropdown>
                        <DropdownTrigger className="dashboard-header_user-block">
                            <UserIcon />
                            <div className="dashboard-header_user-text">
                                <div className="dashboard-header_welcome">
                                    Welcome,
                                </div>
                                <div className="dashboard-header_user-name">
                                    {currentUser.EmployeeName}
                                </div>
                            </div>
                        </DropdownTrigger>
                        <DropdownContent className="dashboard-header_user-dropdown">
                            <ul>
                                <li>
                                    <a href="/">Profile</a>
                                </li>
                                <li>
                                    <button onClick={onLogout}>Log Out</button>
                                </li>
                            </ul>
                        </DropdownContent>
                    </Dropdown>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.authReducer.currentUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => {
            dispatch(logout());
        },
        onShowSideListMenu: (menuName) => {
            dispatch(showSideListMenu(menuName));
        },
        onSearchPatient: (e) => {           
            if(e.key === 'Enter') {
                dispatch(searchPatient(e.target.value));
                e.target.value= '';
            }
        }       
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardHeader);