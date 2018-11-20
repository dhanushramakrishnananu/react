import React from 'react';
import { Field, change } from 'redux-form';
import Dropzone from 'react-dropzone';

import { connect } from 'react-redux';

import AddIcon from '../../../../../../assets/icons/AddIcon.jsx';
import WordTypeIcon from '../../../../../../assets/icons/DocTypes/WordTypeIcon.jsx';

class AddDocumentStepIContainer extends React.Component {
    render() {
        const { documentMasterData, onSubmit, fullName, patientId,addDocumentForm } = this.props;        
        return (
            <div className="add-step-wrapper add-document-menu">
                <div className="side-list-content_documents">
                    <WordTypeIcon />
                    Documents<span className="add-list_required"> *</span>
                </div>
                <div className="side-list-content_dropzone">
                    <Field name="fileContent" component="input" type="hidden" />
                    <Field name="fileName" component="input" type="hidden" />
                    <Dropzone className="content_dropzone"
                        ref="dropzone"
                        onDropAccepted={onSubmit}
                        accept="application/pdf">
                        {({ acceptedFiles, rejectedFiles }) => {
                            return (acceptedFiles.length || rejectedFiles.length
                                ? <div className="side-list-content_dropzone-text">{`Accepted ${acceptedFiles.length} file(s),
                                rejected ${rejectedFiles.length} file(s)`}</div>
                                : (<div>
                                    <AddIcon />
                                    <div className="side-list-content_dropzone-text">Drop documents to upload or click to browse</div>
                                </div>));
                        }}
                    </Dropzone>
                </div>
                <ul className="add-list add-document-menu">
                    <li>
                        <div className="add-list_key">
                            Rename document 

                        </div>
                        <div className="add-list_value">
                            <Field name="renameDocument" component="input" type="text" />
                        </div>
                    </li>
                    <li>
                        <div className="add-list_key">
                            Type <span className="add-list_required"> *</span>
                        </div>
                        <div className="add-list_value">
                            <Field name="Type" component="select">
                                <option />
                                {documentMasterData.DocTypes.map(typeObj => <option key={typeObj.ID} value={typeObj.Type}>{typeObj.Type}</option>)}
                            </Field>
                        </div>
                    </li>
                    <li>
                        <div className="add-list_key">
                            Description
                        </div>
                        <div className="add-list_value">
                            <Field name="Description" component="textarea" />
                        </div>
                    </li>
                    <li>
                        <div className="add-list_key">
                            Indexed by
                        </div>
                        <div className="add-list_value">
                            {fullName}
                        </div>
                    </li>
                    <li>
                        <div className="add-list_key">
                            Active account
                        </div>
                        <div className="add-list_value">
                            {patientId}
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}
const removeExtension = (fileName) => {
    let fileArr = fileName.split('.');
    fileArr.splice(-1, 1);
    return fileArr.join('');
};
const convertFileToBase64 = (file, dispatch) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        dispatch(change('addDocumentForm', 'fileContent', btoa(reader.result)));
        dispatch(change('addDocumentForm', 'fileName', removeExtension(file.name)));
        dispatch(change('addDocumentForm', 'renameDocument', removeExtension(file.name)));
        dispatch(change('addDocumentForm', 'Description', ''));
    };
    reader.onerror = (error) => {
        console.log('Error: ', error);
    };
};

const mapStateToProps = state => {
    return {
        addDocumentForm: state.form.addDocumentForm,
        selectedStep: state.homeReducer.selectedStep,
        groupedPatients: state.patientDetailsReducer.groupedPatients,
        documentMasterData: state.patientDetailsReducer.documentMasterData,
        initials: state.authReducer.currentUser.Initials,
        fullName: state.authReducer.currentUser.FullName
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (upload) => {
            convertFileToBase64(upload[0], dispatch);
        }
    };
};

const AddDocumentStepI = connect(mapStateToProps, mapDispatchToProps)(AddDocumentStepIContainer);

export default AddDocumentStepI;
