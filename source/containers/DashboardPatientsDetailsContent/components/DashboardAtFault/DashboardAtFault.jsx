import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Popup from '../../../../components/Popup/Popup.jsx';

import DashboardCardComponent from '../DashboardCardComponent/DashboardCardComponent.jsx';
import DashboardCollapsibleComponent from '../DashboardCollapsibleComponent/DashboardCollapsibleComponent.jsx';
import { showSideListMenu, deleteAtFaultItem, openDeletePopUp, showEditSideListMenu, editAtFaultItem } from './actions.es6';

import './DashboardAtFault.scss';

class DashboardAtFault extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isPopUpOpened: false,
            isExpanded: false
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onExpandToggle = this.onExpandToggle.bind(this);
    }

    componentWillMount() {
        this.props.onSelectAtFaultItem({});
    }

    handleOpen() {
        this.setState({isPopUpOpened: true});
    }

    handleClose() {
        this.setState({isPopUpOpened: false});
    }

    formatPhoneNumber(number) {
        return number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) -$2-$3');
    }

    onExpandToggle(value) {
        this.setState({
            isExpanded: value
        });
    }

    render() {
        const { index, moveCard, atFaults, onShowSideListMenu, onSelectAtFaultItem, deleteAtFaultItemId, onOpenDeletePopUp, onShowEditSideListMenu, editItemData } = this.props;
        const { isExpanded } = this.state;
        let deletemsg = '';
        let name = '';
        name =  deleteAtFaultItemId?(deleteAtFaultItemId.FirstName ? deleteAtFaultItemId.FirstName + ' ' + deleteAtFaultItemId.LastName : deleteAtFaultItemId.BusinessName):'';
        deletemsg= 'Are you sure? you want to remove ' + name +' from the AtFault?';
        return (
            <DashboardCardComponent
                title="AtFault" count={atFaults.length}
                flex="1" index={index}
                moveCard={moveCard}
                addItem={() => onShowSideListMenu('addAtFault')}
                openDeletePopUp={this.handleOpen}
                deleteItemId={deleteAtFaultItemId && deleteAtFaultItemId.AtFaultID}
                editItem={() => onShowEditSideListMenu( !_.isEmpty(editItemData) && 'editAtFault', editItemData)}
                onExpandToggle={this.onExpandToggle}
                isExpanded={isExpanded}>
                <div className="dashboard-altfault">
                        {this.state.isPopUpOpened &&
                            <Popup   message={deletemsg}
                                    noLabel='No'
                                    yesLabel='Yes'
                                    onCLose={() => this.handleClose()}
                                    onOk={() => onOpenDeletePopUp(deleteAtFaultItemId.AtFaultID, this.props.atFaults[0].PatientID, this)} />
                        }  
                    {atFaults.map((atFault, i) =>
                        <DashboardCollapsibleComponent
                            title={atFault.FirstName ? `${atFault.FirstName} ${atFault.LastName}` : atFault.BusinessName}
                            id={atFault.AtFaultID}
                            selectedId={deleteAtFaultItemId && deleteAtFaultItemId.AtFaultID}
                            key={i} deleteItem={() => onSelectAtFaultItem(atFault)}
                        >
                            {
                                isExpanded ?
                                    <ul>
                                        <li>
                                            <div className="title">Phone</div> <div className="content">{ this.formatPhoneNumber(atFault.HomePhone.toString()) || this.formatPhoneNumber(atFault.MobilePhone.toString()) || this.formatPhoneNumber(atFault.WorkPhone.toString()) }</div>
                                        </li>
                                        {
                                            atFault.BusinessName &&
                                            <li>
                                                <div className="title">Business Name</div><div className="content">{atFault.BusinessName}</div>
                                            </li>
                                        }
                                        <li>
                                            <div className="title">Address</div><div className="content">{atFault.Address}</div>
                                        </li>
                                        {
                                            atFault.Address2 &&
                                            <li>
                                                <div className="title">Address 2</div><div className="content">{atFault.Address2}</div>
                                            </li>
                                        }
                                        <li>
                                            <div className="title">City</div> <div className="content">{atFault.City}</div>
                                        </li>
                                        <li>
                                            <div className="title">State</div><div className="content">{atFault.State}</div>
                                        </li>
                                        <li>
                                            <div className="title">Zip</div><div className="content">{atFault.Zip}</div>
                                        </li>
                                        {
                                            atFault.MobilePhone &&
                                            <li>
                                                <div className="title">Mobile Phone</div><div className="content">{ this.formatPhoneNumber(atFault.MobilePhone.toString()) }</div>
                                            </li>
                                        }
                                        {
                                            atFault.WorkPhone &&
                                            <li>
                                                <div className="title">Work Phone</div><div className="content">{ this.formatPhoneNumber(atFault.WorkPhone.toString()) }</div>
                                            </li>
                                        }
                                    </ul>:
                                    <ul>
                                        <li>
                                            <div className="title">Phone</div> <div className="content">{ this.formatPhoneNumber(atFault.HomePhone.toString()) || this.formatPhoneNumber(atFault.MobilePhone.toString()) || this.formatPhoneNumber(atFault.WorkPhone.toString()) }</div>
                                        </li>
                                        <li>
                                            <div className="title">Address</div><div className="content">{atFault.Address}</div>
                                        </li>
                                        <li>
                                            <div className="title">City</div> <div className="content">{atFault.City}</div>
                                        </li>
                                    </ul>
                            }
                        </DashboardCollapsibleComponent>
                    )}
                </div>
            </DashboardCardComponent>
        );
    }
}

const mapStateToProps = state => {
    return {
        atFaults: state.patientDetailsReducer.patientDetails.PatientAgedAcctAndAtFaultModel.AtFaults,
        deleteAtFaultItemId: state.homeReducer.showDeleteDialog,
        editItemData: state.homeReducer.editItemData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onShowSideListMenu: (menuName) => {
            dispatch(showSideListMenu(menuName));
        },
        onShowEditSideListMenu: (menuName, data) => {
            dispatch(showEditSideListMenu(menuName, data));
        },
        onSelectAtFaultItem: (value) => {
            dispatch(deleteAtFaultItem(value));
            dispatch(editAtFaultItem(value));
            dispatch(showSideListMenu(null));
        },
        onOpenDeletePopUp: (atFaultID, patientID, that) => {
            dispatch(openDeletePopUp(atFaultID, patientID));
            that.handleClose();
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardAtFault);