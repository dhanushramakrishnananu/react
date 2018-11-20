import React from 'react';
import { Field } from 'redux-form';
import moment from 'moment';
import _ from 'lodash';

import Datepicker from '../../../../../../components/Datepicker/Datepicker.jsx';
import Checkbox from '../../../../../../components/Checkbox/Checkbox.jsx';
import notifications from '../../../../../../notifications.jsx';

class AddNoteStepI extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTemplate: '',
            hospitalRequestSelected: false,
            accAdvancedEnabled: true,
            actionVisible: true,
            priorities: this.props.notesMasterData.Priority,
            isNoteDisabled: false,
            isTemplateDisabled: false,
            priority: ''
        };

        this.followUpDate = [
            {
                val: 0,
                label: 'Today'
            },
            {
                val: 1,
                label: '1'
            },
            {
                val: 3,
                label: '3'
            },
            {
                val: 7,
                label: '7'
            },
            {
                val: 10,
                label: '10'
            },
            {
                val: 14,
                label: '14'
            },
            {
                val: 30,
                label: '30'
            },
            {
                val: 45,
                label: '45'
            },
            {
                val: 60,
                label: '60'
            }
        ];

        this.applyTemplate = this.applyTemplate.bind(this);
        this.resetSelectedTemplate = this.resetSelectedTemplate.bind(this);
        this.setFollowUpDate = this.setFollowUpDate.bind(this);
        this.resetPriorityAccAdvanced = this.resetPriorityAccAdvanced.bind(this);
        this.onAccAdvancedChange = this.onAccAdvancedChange.bind(this);
        this.onPriorityChange = this.onPriorityChange.bind(this);
    }

    applyTemplate(e) {
        const { change, notesMasterData } = this.props;
        const newValue = e.target.value;
        if(newValue) {
            this.state.isNoteDisabled = true;
            change('Note', _.find(notesMasterData.NotesTemplates, {TemplateLabel: newValue}).TemplateText);
        } else {
            this.state.isNoteDisabled = false;
        }
        this.setState({
            selectedTemplate: newValue
        });
    }

    resetSelectedTemplate(e) {
        this.setState({
            selectedTemplate: ''
        });
        const newValue = e.target.value;
        if(newValue) {
            this.state.isTemplateDisabled = true;
        } else {
            this.state.isTemplateDisabled = false;
        }
    }
   
    setFollowUpDate(followObjVal) {
        const { change } = this.props;
        change('Followup', moment().add(followObjVal, 'day'));
    }
    resetPriorityAccAdvanced(e) {
        const { change, notesMasterData } = this.props;
        if(e.target.checked === true) {
            let hrAcc = notesMasterData.AccAdvanced.filter(o=> o.ResultCode === 'HIR');
            change('NoteResultID', hrAcc[0].NoteResultID);
            this.setState({
                hospitalRequestSelected: e.target.checked,
                accAdvancedEnabled: false,
                actionVisible: false,
                priorities: notesMasterData.MissionPriority
            });
        } else {
            change('NoteResultID', -1);
            this.setState({
                hospitalRequestSelected: e.target.checked,
                accAdvancedEnabled: true,
                actionVisible: true,
                priorities: notesMasterData.Priority
            });
        }
    }
    onAccAdvancedChange(e) {
        const { change, notesMasterData } = this.props;
        let selectedAccValue = notesMasterData.AccAdvanced.filter(o=> o.NoteResultID === parseInt(e.target.value, 10));
        if(selectedAccValue !== null) {
            if(selectedAccValue[0].Note !== null && selectedAccValue[0].Note.trim() !== '') {
                let prority = this.state.priorities.filter(i=> i.PriorityID === selectedAccValue[0].priority);
                change('Note', selectedAccValue[0].Note);
                change('Action', selectedAccValue[0].Action);
                change('Priority', prority[0].Priority);
            }
        }
    }
    onPriorityChange(e) {
        const { notesMasterData } = this.props;
        this.setState({
            prority: e.target.value
        });
        if(e.target.value === 'Insurance Update') {
            if(notesMasterData.NotesRE.length === 0) {
                notifications.showWarning('Please add atleast one Insurance before add Insurance Update Note.');
            }
        }
    }
    render() {
        const { notesMasterData, patientinfo, isEdit } = this.props;
        const { selectedTemplate, hospitalRequestSelected, accAdvancedEnabled, actionVisible, priorities, prority} = this.state;
        return (
            <ul className="add-list add-note-menu">
                <li className="add-list_cols">
                    <div className="add-list_cols-left add-list_key ">
                        <div>
                            <span>
                                Date:
                            </span>
                            <span className="value"> {moment().format('MM/DD/YYYY')}</span>
                        </div>
                    </div>
                    <div>
                        <div className="add-list_cols-check">
                            <Field name="Completed" component={Checkbox} />
                            <label htmlFor="Completed">Completed</label>
                        </div>
                        {!isEdit && patientinfo.GRID === 47 && <div className="add-list_cols-check">
                            <Checkbox
                                input={{
                                    name: 'HospitalRequest',
                                    onChange: this.resetPriorityAccAdvanced,
                                    value: hospitalRequestSelected,
                                    checked: hospitalRequestSelected ? 'checked': null
                                }}/>
                            <label htmlFor="HospitalRequest">Hospital Request</label>
                        </div>
                        }
                    </div>
                </li>
                <li className="add-list_textarea">
                    <div className="add-list_key">
                        Note<span className="add-list_required"> *</span>
                    </div>
                    <div className="add-list_value">
                        <Field
                            name="Note"
                            component="textarea"
                            onChange={this.resetSelectedTemplate}
                            disabled={this.state.isNoteDisabled}
                        />
                    </div>
                </li>
                {actionVisible && <li className="add-list_textarea">
                    <div className="add-list_key">
                        Action
                    </div>
                    <div className="add-list_value">
                        <Field name="Action" component="textarea" />
                    </div>
                </li>}                
                <li>
                    <div className="add-list_key">
                        Priority<span className="add-list_required"> *</span>
                    </div>
                    <div className="add-list_value">     
                        <Field name="Priority" component="select" onChange={this.onPriorityChange} >
                            <option/>
                            {priorities.map(priorityObj => <option key={priorityObj.PriorityID} value={priorityObj.Priority}>{priorityObj.Priority}</option>)}
                        </Field>
                    </div>
                </li>
                <li>
                    <div className="add-list_key">
                        RE{prority === 'Insurance Update' && <span className="add-list_required"> *</span>}
                    </div>
                    <div className="add-list_value">
                        <Field name="SecPriority" component="select">
                            <option/>
                            {notesMasterData.NotesRE.map(reObj => <option key={reObj.InsID} value={reObj.InsID}>{reObj.RE}</option>)}
                        </Field>
                    </div>
                </li>
                {!isEdit && <li>
                    <div className="add-list_key">
                        Templates
                    </div>
                    <div className="add-list_value">
                        <select
                            name="Templates"
                            onChange={this.applyTemplate}
                            value={selectedTemplate}
                            disabled={this.state.isTemplateDisabled}>
                            <option />
                            {notesMasterData.NotesTemplates.map(templateObj => <option key={templateObj.TemplateLabel} value={templateObj.TemplateLabel}>{templateObj.TemplateLabel}</option>)}
                        </select>
                    </div>
                </li>}
                <li className="add-list_datepicker">
                    <div className="add-list_key">
                        Follow Up Date/Time
                    </div>
                    <div className="add-list_value" style={{'minWidth': 245,'maxWidth': 245}}>
                        <Field name="Followup" component={Datepicker} />
                    </div>
                </li>
                <li className="add-list_follow-up">
                    {this.followUpDate.map(followObj =>
                        <span key={followObj.val} onClick={() => this.setFollowUpDate(followObj.val)}>
                            {followObj.label}
                        </span>
                    )}
                </li>
                <li className="add-list_acc-adv">
                    <div className="add-list_key">
                        Acc Advanced<span className="add-list_required"> *</span>
                    </div>
                    <div className="add-list_value">
                        <Field name="NoteResultID" component="select" disabled={!accAdvancedEnabled} onChange={this.onAccAdvancedChange} >
                            <option/>
                            {notesMasterData.AccAdvanced.map(accAdvancedObj => <option key={accAdvancedObj.NoteResultID} value={accAdvancedObj.NoteResultID}>{accAdvancedObj.Description}</option>)}
                        </Field>
                    </div>
                </li>
            </ul>
        );
    }
}

export default AddNoteStepI;