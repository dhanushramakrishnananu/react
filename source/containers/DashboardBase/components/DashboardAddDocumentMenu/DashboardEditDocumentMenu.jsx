import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
    editDocument
} from './actions.es6';
import './DashboardAddDocumentMenu.scss';
import EditDocumentStep from './components/EditDocument/EditDocumentStep.jsx';
import cookies from '../../../../cookies.es6';
import notifications from '../../../../notifications.jsx';

class DashboardEditDocumentMenu extends React.Component {
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
        const steps = [
            <EditDocumentStep
                selectedDoc={selectedDoc}
               
            />          
        ];
        return (
            <form className="side-list-content add-document" onSubmit={handleSubmit(values => onFormSubmit(values,this))} encType="multipart/form-data">
              { steps[0]}
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
        selectedDoc: state.patientDetailsReducer.selectedDoc,
        editDocumentForm: state.form.editDocumentForm
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFormSubmit: (data,that) => {
            if(data.Description.trim().length===0 && data.Type.trim().length===0)
            {
                notifications.showWarning('Following are required fields: \n Type & Description');  
            }
            else if(data.Description.trim().length===0)
            {
                notifications.showWarning('Following are required fields: \n Description');  
            }
            else if(data.Type.trim().length===0)
            {
                notifications.showWarning('Following are required fields: \n Type');  
            }
            else
            {
                let doc={
                    'PatientId':data.PatientId,
                    'DocID':data.DocId,
                    'Type':data.Type,
                    'EID':Number(cookies.get('EmployeeId')),
                    'Description':data.Description
                };
                dispatch(editDocument(doc));
                that.props.onHideSideListMenu();
            }
        }
    };
};
DashboardEditDocumentMenu = reduxForm({
    form: 'editDocumentForm'
})(DashboardEditDocumentMenu);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardEditDocumentMenu);
