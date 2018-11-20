import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import classNames from 'classnames';
import Popup from '../../../../components/Popup/Popup.jsx';
import DashboardCardComponent from '../DashboardCardComponent/DashboardCardComponent.jsx';
import { showSideListMenu } from '../../../DashboardBase/actions.es6';
import { showEditSideListMenu, selectIndicatorItem, deleteIndicator } from './actions.es6';

import './DashboardIndicator.scss';

class DashboardIndicator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {            
            isDeleteConfirmOpened:false,            
        };
        this.handleDeleteOpen = this.handleDeleteOpen.bind(this);
        this.handleDeleteClose = this.handleDeleteClose.bind(this);
    }

    handleDeleteOpen() {
        this.setState({isDeleteConfirmOpened: true});
    }

    handleDeleteClose() {
        this.setState({isDeleteConfirmOpened: false           
        });
    }
    render() {
        const { index, moveCard, indicator, onShowSideListMenu, editIndicatorItem, onShowEditSideListMenu, onSelectIndicatorItem, onDeleteIndicator} = this.props;

        return (
            <DashboardCardComponent 
            title="Indicator" 
            flex="1" index={index} 
            moveCard={moveCard} 
            count={indicator.length}
            deleteItem={() => onDeleteIndicator(editIndicatorItem.IndicatorID)}
            deleteItemId={editIndicatorItem.IndicatorID}
            openDeletePopUp={this.handleDeleteOpen}
            editItem={() => onShowEditSideListMenu( !_.isEmpty(editIndicatorItem) && 'editIndicatorMenu', editIndicatorItem)}
            addItem={() => onShowSideListMenu('addIndicatorMenu')}>
                <div className="dashboard-acct">
                {
                    this.state.isDeleteConfirmOpened &&
                        <Popup   message='Are you sure, Do you want to delete this Item ?'
                                    onCLose={() => this.handleDeleteClose()}
                                    onOk={() => onDeleteIndicator(editIndicatorItem,this)} 
                                    noLabel='No'
                                    yesLabel='Yes'/> 
                        
                }
                    {indicator.map((indicatorItem, i) =>
                    {
                        const itemClasses = classNames({
                            current: indicatorItem.IndicatorID === editIndicatorItem.IndicatorID ,
                            'dashboard-indicator_item': true
                        });
                        return (
                        <div key={i} className={itemClasses}
                        onClick={() => onSelectIndicatorItem(indicatorItem)}>
                            
                            <div className="dashboard-indicator_item_text">
                                {indicatorItem.Reason}
                                <br/>
                                <span className="dashboard-indicator_item_text">
                                   Type : {indicatorItem.IndicatorType}
                                </span>
                            </div>
                            <div className="dashboard-indicator_item_date">
                                {moment(indicatorItem.CreatedDate).format('MM/DD/YYYY')}
                            </div>
                        </div>
                        )}
                    )}
                </div>
            </DashboardCardComponent>
        );
    }
}

const mapStateToProps = state => {
    return {
        indicator: state.patientDetailsReducer.patientDetails.PatientAgedAcctAndAtFaultModel.PatientIndicators,
        editIndicatorItem:state.homeReducer.editIndicatorItem
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
        onSelectIndicatorItem:(value)=> {
            dispatch(selectIndicatorItem(value));
            dispatch(showSideListMenu(null));
        },
        onDeleteIndicator: (editIndicatorItem,that) => {                
            dispatch(deleteIndicator(editIndicatorItem.IndicatorID)); 
            that.handleDeleteClose();
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardIndicator);