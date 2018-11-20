import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { editAgedAccount} from './actions.es6';
import './DashboardEditAgedAccountMenu.scss';
import cookies from '../../../../cookies.es6';
import Checkbox from '../../../../components/Checkbox/Checkbox.jsx';

class DashboardEditAgedAccountMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.initialize(this.props.editAgedAcctData);
    }
   
    render() {
        const { onHideSideListMenu, onFormSubmit, handleSubmit, patientId } = this.props;
       
        return (
            <form className="side-list-content " onSubmit={handleSubmit(values => onFormSubmit(values,this,patientId))} encType="multipart/form-data">
                <div className="maindiv">
                    <ul className="edit-list edit-Aged-menu">
                        <li>
                            <div className="edit-list_cols-check">
                                <Field name="AgedCheck" component={Checkbox} />
                                <label htmlFor="AgedCheck">Continue to Pursue Aged Account</label>
                            </div>
                        </li>
                        <li>
                            <div className="edit-list_key">
                                Note
                            </div>
                            <div className="edit-list_value">
                                <Field name="Note" component="textarea" />
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="adds-buttons-block">
                  
                    <button className="adds-buttons-block_cancel-btn" onClick={onHideSideListMenu} type="button">
                        Cancel
                    </button>                   
                    <button className="adds-buttons-block_next-btn" ref="btn" type="submit">
                        Save
                    </button>
                    
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        editAgedAcctData: state.homeReducer.editAgedAcctData,
        editAgedAccountForm: state.form.editAgedAccountForm
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFormSubmit: (data,that,patientId) => {
            let agedData={
                'AgedAccountCheck':Number(data.AgedCheck),
                'AgedNote':data.Note,
                'PatientID':patientId,
                'EID':Number(cookies.get('EmployeeId'))            
            };
            dispatch(editAgedAccount(agedData));
            that.props.onHideSideListMenu();
        }
    };
};
DashboardEditAgedAccountMenu = reduxForm({
    form: 'editAgedAccountForm'
})(DashboardEditAgedAccountMenu);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardEditAgedAccountMenu);
