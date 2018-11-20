import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { map } from 'lodash';

class AddAtFaultStepI extends React.Component {
    constructor(props) {
        super(props);
        this.onCheckInput = this.onCheckInput.bind(this);
        this.onCheckNumber = this.onCheckNumber.bind(this);
    }
    onCheckInput(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 10) {
            e.target.value=onlyNums;
        } else if (onlyNums.length === 10) {
            const number = onlyNums.replace(/(\d{3})(\d{3})(\d{4})/, '($1) -$2-$3');
            e.target.value=number;
        } 
    }
     onCheckNumber(e) {
         this.setState({isSave:false})
         const onlyNums = e.target.value.replace(/[^0-9]/g, '');
         if (onlyNums.length < 5) {
            e.target.value=onlyNums;
         } else if (onlyNums.length === 5) {
            const number = onlyNums.replace(/(\d{3})(\d{3})(\d{4})/, '($1) -$2-$3');
            e.target.value=number;
        } 
      }

    render() {
        return (
            <ul>
                <li>
                    <div className="add-list_key">
                        First Name<span className="add-list_required"> *</span>
                    </div>
                     <div className="add-list_value">
                        <Field name="FirstName" component="input" type="text" title="First Name Required"/>  
                    </div>                 
                </li>
                <li>
                    <div className="add-list_key">
                           Middle Name
                    </div> 
                    <div className="add-list_value">                 
                        <Field name="MiddleName" component="input" type="text"/>
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Last Name<span className="add-list_required"> *</span>
                    </div>
                    <div className="add-list_value">
                        <Field name="LastName" component="input" type="text" title="Last Name Required"/>
                    </div>
                </li>
                <li> 
                    <div className="add-list_key">
                    Business Name<span className="add-list_required"> *</span>
                    </div>
                    <div className="add-list_value">                   
                        <Field name="BusinessName" component="input" type="text"  title="Business Name Required"/>
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Address 1<span className="add-list_required"> *</span>
                    </div>
                    <div className="add-list_value">
                        <Field name="Address" component="input" type="text" title="Address 1 Required"/>
                    </div>
                </li>
                <li> 
                    <div className="add-list_key">
                        Address 2 
                    </div> 
                    <div className="add-list_value">                 
                        <Field name="Address2" component="textarea" type="text" />
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        City<span className="add-list_required"> *</span>
                    </div>
                    <div className="add-list_value">
                        <Field name="City" component="input" type="text" title="City Required"/>
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        State<span className="add-list_required"> *</span>
                    </div>
                    <div className="add-list_value">
                        <Field name="State" component="select" title="State Required">
                            <option />
                            {
                                map(this.props.atFaultStateData, (value, key) => {
                                    return (<option key={key} value={value.StateCode}>{value.StateName}</option>);
                                })
                            }
                        </Field>
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                    Zip<span className="add-list_required"> *</span>
                    </div>
                    <div className="add-list_value">
                        <Field name="Zip" component="input" type="text" onInput={this.onCheckNumber} title="Zip Required" maxLength="5" pattern="\d*" />
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Home Phone
                    </div> 
                    <div className="add-list_value">            
                        <Field name="HomePhone" component="input" onInput={this.onCheckInput} type="text"  title="Home or Mobile or Work Required"/>
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                       Mobile Phone
                    </div> 
                    <div className="add-list_value">            
                        <Field name="MobilePhone" component="input" onInput={this.onCheckInput} type="text"  title="Home or Mobile or Work Required" />
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        Work Phone
                    </div> 
                    <div className="add-list_value">            
                        <Field name="WorkPhone" component="input" onInput={this.onCheckInput} type="text"  title="Home or Mobile or Work Required" />
                    </div>
                </li>
            </ul>
        );
    }
}
AddAtFaultStepI = reduxForm({
    form: 'addAtFaultMenu'
})(AddAtFaultStepI);
export default AddAtFaultStepI;