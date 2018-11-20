import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import DashboardCardComponent from '../DashboardCardComponent/DashboardCardComponent.jsx';
import { showEditSideListMenu, selectNoteItem } from './actions.es6';
import { showSideListMenu } from '../../../DashboardBase/actions.es6';


import './DashboardOpenNotes.scss';

class DashboardOpenNotes extends React.Component {
    constructor(props) {
        super(props);
        this.onSelectNote = this.onSelectNote.bind(this);
    }
    onSelectNote(noteItem)
    {
        this.props.onSelectNoteItem(noteItem);
    }
    render() {
        const { notes, index, moveCard, onShowSideListMenu, onShowEditSideListMenu, editOpenNoteItemData } = this.props;
        return (
            <DashboardCardComponent title="Open Notes" flex="1" index={index} moveCard={moveCard} 
            count={notes.length} noadded
            editItem={() => onShowEditSideListMenu( !_.isEmpty(editOpenNoteItemData) && 'editOpenNoteMenu', editOpenNoteItemData)}>
                <div className="dashboard-opennotes">              
                    {notes.map((noteItem, i) =>{
                        const itemClasses = classNames({
                            current: noteItem.NoteId === editOpenNoteItemData.NoteId ,
                            'dashboard-opennotes_item': true
                        });
                        return (
                            <div key={i} className={itemClasses} 
                                onClick={this.onSelectNote.bind(this,noteItem)}>
                                    <div className="dashboard-opennotes_item_text">
                                        {noteItem.Note}
                                    </div>
                                    <div className="dashboard-opennotes_item_date">
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
        notes: state.patientDetailsReducer.patientDetails.PatientNotesDocsModel.OpenNotes,
        editOpenNoteItemData: state.homeReducer.editOpenNoteItemData,
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
)(DashboardOpenNotes);