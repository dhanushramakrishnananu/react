import React from 'react';

import './SimpleSelect.scss';

import 'react-datepicker/dist/react-datepicker.css';

class SimpleSelect extends React.Component {
    render() {
        const { input: { value, onChange }, options } = this.props;
        return (
            <select onChange={onChange} value={value}>
                {options.map(option => <option value={option.value} key={option.label}>{option.label}</option>)}
            </select>
        );
    }
}

export default SimpleSelect;