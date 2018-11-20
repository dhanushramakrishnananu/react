import React from 'react';
//import './SuperSelect.scss';

class SuperSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }
    _onChange = event => {
        this.setState({ value: event.target.value });
        this.props.onChange(event.target);
    };
    render() {
        let { list, defaultValue, text,
            valueField, labelField, className,
            name, required } = this.props;

        list.length > 0
            ? defaultValue = list[0].TypeID
            : null;
        const optionsList = list.map( item =>
            <option
                value={item[valueField]}
                key={item[valueField]}>
                {item[labelField]}
            </option>
        );
        return (
            <li>
                <div className='add-list_key'>
                    { text }{required && <span className="add-list_required"> *</span>}
                </div>
                <div className='add-list_value'>
                    <select
                        onChange={this._onChange}
                        className={className}
                        name={name}
                        value={ this.state.value ? this.state.value : _.isString(this.props.defaultValue) ? this.props.defaultValue.trim(): this.props.defaultValue }>
                        <option value='' />
                        {optionsList}
                    </select>
                </div>
            </li>
        );
    }
}
export default SuperSelect;
