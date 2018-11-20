import React from 'react';

import Dropzone from 'react-dropzone';

import '../DashboardAddDocumentMenu/DashboardDocumentMenu.scss';

import CaretIcon from '../../../../assets/icons/CaretIcon.jsx';
import AddIcon from '../../../../assets/icons/AddIcon.jsx';
import WordTypeIcon from '../../../../assets/icons/DocTypes/WordTypeIcon.jsx';

class DashboardDocumentMenu extends React.Component {
    render() {
        return (
            <div className="dashboard-document-menu">
                <div className="dashboard-document-menu_header">
                    <div className="dashboard-document-menu_header_icon">
                        <CaretIcon />
                    </div>
                    <h3>Add document (1/2)</h3>
                </div>
                <div className="dashboard-document-menu_menu">
                    <div className="dashboard-document-menu_menu_documents">
                        <WordTypeIcon /> Documents
                    </div>
                    <div className="dashboard-document-menu_menu_dropzone">
                        <Dropzone>
                            <AddIcon />
                            <div className="dashboard-document-menu_menu_dropzone-text">Drop documents to upload or click to browse</div>
                        </Dropzone>
                    </div>
                    <div className="dashboard-document-menu_menu_document-info">
                        <label className="dashboard-document-menu_menu_label">
                        Rename Document
                            <input type="text" />
                        </label>
                        <label className="dashboard-document-menu_menu_label">
                            Type
                            <select>
                                <option value="Select" defaultValue>Select</option>
                                <option>option B</option>
                                <option>option C</option>
                            </select>
                        </label>
                        <label className="dashboard-document-menu_menu_label">
                            Description
                            <textarea></textarea>
                        </label>
                        <div className="dashboard-document-menu_menu_document-info_item">
                            <div className="dashboard-document-menu_menu_key">Indexed by</div>
                            <div className="dashboard-document-menu_menu_value">John Smith</div>
                        </div>
                        <div className="dashboard-document-menu_menu_document-info_item">
                            <div className="dashboard-document-menu_menu_key">Active account</div>
                            <div className="dashboard-document-menu_menu_value">840469</div>
                        </div>
                    </div>
                </div>
                <div className="dashboard-document-menu_controls">
                    <div className="dashboard-document-menu_cancel dashboard-document-menu_btn">Cancel</div>
                    <div className="dashboard-document-menu_next dashboard-document-menu_btn">Next</div>
                </div>
            </div>
        );
    }
}

export default DashboardDocumentMenu;