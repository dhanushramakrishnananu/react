import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import DashboardCardComponent from '../DashboardCardComponent/DashboardCardComponent.jsx';
import { showEditSideListMenu, selectNoteItem } from './actions.es6';
import { showSideListMenu } from '../../../DashboardBase/actions.es6';


import './DashboardNotes.scss';

class DashboardNotes extends React.Component {
    constructor(props) {
        super(props);
        this.onSelectNote = this.onSelectNote.bind(this);
    }
    onSelectNote(noteItem)
    {
        this.props.onSelectNoteItem(noteItem);
    }
    render() {
        const { notes, index, moveCard, onShowSideListMenu, onShowEditSideListMenu, editNoteItemData } = this.props;
        return (
            <DashboardCardComponent title="Notes" flex="1" index={index} moveCard={moveCard} 
            count={notes.length} addItem={() => onShowSideListMenu('addNoteMenu')}
            editItem={() => onShowEditSideListMenu( !_.isEmpty(editNoteItemData) && 'editNoteMenu', editNoteItemData)}>
                <div className="dashboard-notes">              
                    {notes.map((noteItem, i) =>{
                        const itemClasses = classNames({
                            current: noteItem.NoteId === editNoteItemData.NoteId ,
                            'dashboard-notes_item': true
                        });
                        return (
                            <div key={i} className={itemClasses} 
                                onClick={this.onSelectNote.bind(this,noteItem)}>
                                    <div className="dashboard-notes_item_text">
                                        {noteItem.Note}
                                    </div>
                                    <div className="dashboard-notes_item_date">
                                        Follow up
                                        <br/>
                                        {noteItem.FollowUpStr}
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
        notes: state.patientDetailsReducer.patientDetails.PatientNotesDocsModel.Notes,
        editNoteItemData: state.homeReducer.editNoteItemData,
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
        onSelectNoteItem:(value)=> {
            dispatch(selectNoteItem(value));
            dispatch(showSideListMenu(null));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardNotes);