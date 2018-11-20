import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import classNames from 'classnames';
import Popup from '../../../../components/Popup/Popup.jsx';

import DashboardCardComponent from '../DashboardCardComponent/DashboardCardComponent.jsx';
import SearchIcon from '../../../../assets/icons/SearchIcon.jsx';
import PdfTypeIcon from '../../../../assets/icons/DocTypes/PdfTypeIcon.jsx';
import cookies from '../../../../cookies.es6';

import './DashboardDocuments.scss';
import { getDocDetails, resetSelectedDoc, showSideListMenu, deleteDoc, showEditSideListMenu } from './actions.es6';
import LoadingComponent from '../../../../components/LoadingComponent/Loading.jsx';

const docTypeIcons = {
    'pdf': <PdfTypeIcon />
};

class DashboardDocuments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false,
            searchInputValue: '',
            isDeleteConfirmOpened:false,
            isDeleteReasonOpened:false,
            isGroup:false
        };

        this.onExpandToggle = this.onExpandToggle.bind(this);
        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.handleconfirmOpen = this.handleconfirmOpen.bind(this);
        this.handleconfirmClose = this.handleconfirmClose.bind(this);
        this.handleReasonOpen = this.handleReasonOpen.bind(this);
        this.handleReasonClose = this.handleReasonClose.bind(this);
        this.handleGroupOpen=this.handleGroupOpen.bind(this);
        this.handleGroupClose = this.handleGroupClose.bind(this);
    }

    onExpandToggle(value) {
        const { selectedDoc, docs, onGetDocDetails, onResetSelectedDoc } = this.props;
        this.setState({
            isExpanded: value
        });

        if (value) {
            if (_.isEmpty(selectedDoc)) {
               // onGetDocDetails(docs[0]);
            }
            
        } else {
            onResetSelectedDoc();
            this.onSearchInputChange('');
        }
    }

    onSearchInputChange(value) {
        this.setState({
            searchInputValue: value
        });
    }

    showDoc(doc) {
        const { onGetDocDetails } = this.props;
        onGetDocDetails(doc);

        this.onExpandToggle(true);
    }

    handleconfirmOpen() {
        this.setState({isDeleteConfirmOpened: true});
    }

    handleconfirmClose() {
        this.setState({isDeleteConfirmOpened: false           
        });
    }

    handleReasonOpen() {
        this.setState({isDeleteReasonOpened: true,
            isDeleteConfirmOpened: false});
    }

    handleReasonClose() {
        this.setState({isDeleteReasonOpened: false ,
            isDeleteConfirmOpened: false          
        });
    }

    handleGroupOpen()
    {
        this.setState({isDeleteReasonOpened: true,
                isGroup:true     
        });
    }

    handleGroupClose()
    {
        this.setState({isDeleteReasonOpened: true,
            isGroup:false,
            isDeleteConfirmOpened: false 

    });
    }

    render() {
        const { docs, index, moveCard, selectedDoc, docPreviewLoading, docPreview, docPreviewError, onShowSideListMenu,onDeleteDoc,onShowEditSideListMenu } = this.props;
        const { isExpanded, searchInputValue } = this.state;
        const docInfo = [
            {key: 'Doc ID', value: selectedDoc.DocId},
            {key: 'Type', value: selectedDoc.Type},
            {key: 'Created Date', value: moment(selectedDoc.Created).format('MM/DD/YYYY')},
            {key: 'Description', value: selectedDoc.Description},
            {key: 'Last Viewed', value: moment(selectedDoc.LastAccessed).format('MM/DD/YYYY')},
            {key: 'Indexed by', value: selectedDoc.Indexedby},
            {key: 'Amount', value: selectedDoc.Amount}
        ];

        const filteredDocs = _.filter(docs, doc => {
            return doc.DocId.toString().includes(searchInputValue) || doc.Type.toLowerCase().includes(searchInputValue.toLowerCase()) || doc.Description.toLowerCase().includes(searchInputValue.toLowerCase());
        });
        return (
            <DashboardCardComponent 
            title="Documents" 
            flex="1" 
            index={index} 
            moveCard={moveCard} 
            count={docs.length}
            deleteItem={() => onDeleteDoc(selectedDoc.DocId)}
            deleteItemId={selectedDoc.DocId}
            openDeletePopUp={this.handleconfirmOpen}
            onExpandToggle={this.onExpandToggle} 
            isExpanded={isExpanded} 
            editItem={() => onShowEditSideListMenu(!_.isEmpty(selectedDoc) && 'editDocumentMenu', selectedDoc)}
            addItem={() => onShowSideListMenu('addDocumentMenu')}>            
                <div className={!isExpanded ? 'dashboard-documents' : 'dashboard-documents dashboard-documents_expand'}>
                {
                    this.state.isDeleteConfirmOpened && selectedDoc.PatientCount <= 1 &&
                        <Popup   message='Are you sure, Do you want to remove the selected item from the list? '
                                    onCLose={() => this.handleconfirmClose()}
                                    onOk={() => this.handleReasonOpen()} 
                                    noLabel='No'
                                    yesLabel='Yes'/>
                }
                {
                    this.state.isDeleteConfirmOpened && selectedDoc.PatientCount > 1 &&
                        <Popup   message='Do you want to delete all grouped patients documents? '
                                    onCLose={() => this.handleGroupClose()}
                                    onOk={() => this.handleGroupOpen()} 
                                    noLabel='No'
                                    yesLabel='Yes'/>                        
                }
                { this.state.isDeleteReasonOpened &&
                    <Popup   message= { <div>
                                            <div className="dialogdiv">Reason:</div>
                                            <div className="divcontent">
                                                <textarea className="textareaborder" ref="reason" type="text" />
                                            </div>
                                        </div>}
                                    onCLose={() => this.handleReasonClose()}
                                    onOk={() => onDeleteDoc(selectedDoc,this)} 
                                    noLabel='Cancel'
                                    yesLabel='Delete'
                                    hasTitle = {true}
                                    title='Delete Document'/>
                }
                    <div className="dashboard-documents_left-block">
                        <div className="dashboard-documents_left-block_search-block">
                            <label className="dashboard-documents_search-label" htmlFor="search">
                                <SearchIcon />
                            </label>
                            <input className="dashboard-documents_search" id="search" type="text" placeholder="Search document" value={searchInputValue} onChange={e => this.onSearchInputChange(e.target.value)}/>
                        </div>
                        <div className="dashboard-documents_left-block_list">
                            {filteredDocs.map(doc => {
                                const itemClasses = classNames({
                                    current: doc.DocId === selectedDoc.DocId,
                                    'dashboard-documents_item': true
                                });
                                return (
                                    <div key={doc.DocId} className={itemClasses} onClick={() => this.showDoc(doc)}>
                                        <div className="dashboard-documents_item_img">
                                            {docTypeIcons.pdf}
                                        </div>
                                        <div className="dashboard-documents_item_info">
                                            <div className="dashboard-documents_item_info-top">
                                                <div>
                                                    <span>ID:</span>
                                                    <span title={doc.DocId}>{doc.DocId}</span>
                                                </div>
                                                {/* <div>
                                                    <span>Type:</span>
                                                    <span title={doc.Type} className="dashboard-documents_item_info-top_type">{doc.Type}</span>
                                                </div> */}
                                            </div>
                                            <div className="dashboard-documents_item_info-bottom">
                                                <span>Type:</span>
                                                <span title={doc.Type} className="dashboard-documents_item_info-bottom_desc">{doc.Type}</span>
                                            </div>
                                            <div className="dashboard-documents_item_info-bottom">
                                                <span>Description:</span>
                                                <span title={doc.Description} className="dashboard-documents_item_info-bottom_desc">{doc.Description}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="dashboard-documents_right-block">
                        {docPreviewLoading &&
                        <div className="dashboard-documents_right-block_preview-block">
                            <LoadingComponent/>
                        </div> ||
                        docPreviewError &&
                        <div className="dashboard-documents_right-block_preview-block">
                            {docPreviewError.Message}
                        </div> ||
                        <iframe className="dashboard-documents_right-block_preview-block" src={`data:text/html;charset=utf-8,${encodeURI(docPreview)}`} />
                        }
                        <div className="dashboard-documents_right-block_doc-info-block">
                            {docInfo.map(infoItem =>
                                <div className="dashboard-documents_doc-info-row" key={infoItem.key}>
                                    <div className="dashboard-documents_doc-info-key">{infoItem.key}:</div>
                                    <div className="dashboard-documents_doc-info-value" title={infoItem.value}>{infoItem.value}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>          
            
            </DashboardCardComponent>
        );
    }
}

const mapStateToProps = state => {
    return {
        docs: state.patientDetailsReducer.patientDetails.PatientNotesDocsModel.Docs,
        selectedDoc: state.patientDetailsReducer.selectedDoc,
        docPreviewLoading: state.patientDetailsReducer.docPreviewLoading,
        docPreview: state.patientDetailsReducer.docPreview,
        docPreviewError: state.patientDetailsReducer.docPreviewError,
        documentMenu: state.homeReducer.documentMenu
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetDocDetails: (doc) => {
            dispatch(getDocDetails(doc));
            dispatch(showSideListMenu(null));
        },
        onResetSelectedDoc: () => {
            dispatch(resetSelectedDoc());
        },
        onShowSideListMenu: (menuName) => {
            dispatch(showSideListMenu(menuName));
        },
        onDeleteDoc: (selectedDoc,that) => {
            let doc={
                'PatientId':selectedDoc.PatientId,
                'DocID':selectedDoc.DocId,
                'DeleteGroup':that.state.isGroup?1:0,
                'EID':cookies.get('EmployeeId'),
                'Reason':that.refs.reason.value
            };
            that.state.isExpanded=false;
            dispatch(deleteDoc(doc));
            that.handleconfirmClose();
            that.handleReasonClose();
            dispatch(showSideListMenu(null));
        },
        onShowEditSideListMenu: (menuName) => {
            dispatch(showEditSideListMenu(menuName));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardDocuments);