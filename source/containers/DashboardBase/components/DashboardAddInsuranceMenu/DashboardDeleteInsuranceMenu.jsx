import React from 'react';
import { connect } from 'react-redux';
import {
    deleteInsurance
} from './actions.es6';
import './DashboardAddInsuranceMenu.scss';

class DashboardDeleteInsuranceMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.deleteInsuranceItem = this.deleteInsuranceItem.bind(this);
    }

    deleteInsuranceItem(deleteInsuranceItem) {
        const PatientID = deleteInsuranceItem.PatientID;
        const InsID = deleteInsuranceItem.InsID;
        this.props.onDeleteInsurance({PatientID, InsID});
        this.props.onHideSideListMenu();
    }

    render() {
        const { onHideSideListMenu, deleteInsuranceItem } = this.props;
        return (
            <div className='side-list-content add-note insurance-delete-text delete-insurance'>
                <ul>
                    <li>
                        Are you sure you want to delete this item?
                    </li>
                </ul>
                <div className='adds-buttons-block'>
                    <button className='adds-buttons-block_cancel-btn' onClick={onHideSideListMenu}>Cancel</button>

                    <button
                        className='adds-buttons-block_delete-btn'
                        onClick={() => this.deleteInsuranceItem(deleteInsuranceItem)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        deleteInsuranceItem: state.insuranceReducer.selectedInsuranceItem
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDeleteInsurance: (data) => {
            dispatch(deleteInsurance(data));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardDeleteInsuranceMenu);
