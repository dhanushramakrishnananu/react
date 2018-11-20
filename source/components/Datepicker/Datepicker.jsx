import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import CalendarIcon from '../../assets/icons/CalendarIcon.jsx';

import './Datepicker.scss';

import 'react-datepicker/dist/react-datepicker.css';

class Datepicker extends React.Component {
    datepicker() {

    }

    render() {
        const { input: { value, onChange }, disabled } = this.props;
        return (
            <div className="datepicker">
                <DatePicker
                    selected={value ? moment(value) : null}
                    onChange={onChange}
                    disabled={disabled}
                />
                <div className="calendar-block">
                    <CalendarIcon onClick={this.datepicker}
                    />
                </div>
            </div>
        );
    }
}

export default Datepicker;