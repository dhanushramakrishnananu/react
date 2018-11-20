import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { formEventOptimizer } from '../FormBuilder/formEventOptimizer.es6';

import CalendarIcon from '../../assets/icons/CalendarIcon.jsx';

import './SuperDatepicker.scss';

import 'react-datepicker/dist/react-datepicker.css';

class SuperDatepicker extends React.Component {
    constructor(props) {
        super(props);
        // "2018-01-23T00:00:00"
        this.state = {
            startDate: props.value ? props.value.length < 11 ? moment(props.value, 'MM/DD/YYYY') : moment(props.value, 'YYYY-MM-DDTHH-mm-ss') : null
        }
    }

    _onChange = (date) => {
        this.setState({
            startDate: date
        });

        this.props.onChange({name: this.props.name, value: date.format('MM/DD/YYYY')});
    }

    render() {
        const { value, text, disabled, onChange, required } = this.props;
        return (
            <li>
                <div className='add-list_key'>
                    { text } {required && <span className="add-list_required"> *</span>}
                </div>

                <div className='add-list_value'>

                <div className='datepicker'>
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this._onChange}
                            //onChange={ ( e ) => formEventOptimizer(e, onChange) }
                            disabled={disabled}
                        />
                        <div className='calendar-block'>
                            <CalendarIcon
                                //onClick={this.datepicker}
                            />
                        </div>
                    </div>
                </div>

            </li>
        );
    }
}

export default SuperDatepicker;