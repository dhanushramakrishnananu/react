import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class EditDocumentStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};      
       
    }
    componentDidMount()
    {
        this.props.initialize(this.props.selectedDoc);
    }   

    render() {
        const { onHideSideListMenu, selectedDoc, onFormSubmit, handleSubmit } = this.props;
        return (           
            <div className="add-step-wrapper add-document-menu">
             <ul className="add-list add-document-menu">
            <li>
            <div className="add-list_key">
                Type<span className="add-list_required">*</span>
            </div>
            <div className="add-list_value">
                <Field name="Type" component="input" type="text">
                      </Field>
            </div>
        </li>
        <li>
            <div className="add-list_key">
                Description<span className="add-list_required">*</span>
            </div>
            <div className="add-list_value">
                <Field name="Description" component="textarea" />
            </div>
        </li>
        </ul>
            </div>
                
        );
    }
}


EditDocumentStep = reduxForm({
    form: 'editDocumentForm'
})(EditDocumentStep);
export default EditDocumentStep;
