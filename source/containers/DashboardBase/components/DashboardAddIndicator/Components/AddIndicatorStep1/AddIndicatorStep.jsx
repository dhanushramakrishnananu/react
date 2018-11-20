import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import '../../DashboardAddIndicatorMenu.scss';


class AddIndicatorStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
      
    }
   

    render() {
        const { onHideSideListMenu, indicatorTypes, editIndicatorItem, isEdit } = this.props;
        return (           
            <div className="add-step-wrapper add-indicator-menu">
             <ul className="add-list add-indicator-menu">
            <li>
            <div className="add-list_key">
                Type<span className="add-list_required"> *</span>
            </div>
            <div className="add-list_value">
            <Field name="IndicatorType" component="select">
                <option />
                {indicatorTypes && indicatorTypes.map(typeObj => <option key={typeObj.PITypeID} value={typeObj.Description}>{typeObj.Description}</option>)}
            </Field>
        </div>
        </li>
        <li>
            <div className="add-list_key">
                Reason<span className="add-list_required"> *</span>
            </div>
            <div className="add-list_value">
                <Field name="Reason" component="textarea" />
            </div>
        </li>
        </ul>
            </div>
                
        );
    }
}


AddIndicatorStep = reduxForm({
    form: 'addIndicatorForm'
})(AddIndicatorStep);
export default AddIndicatorStep;
