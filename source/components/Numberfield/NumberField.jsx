import React from 'react';

class NumberField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        }
    }

    _onChange = (event) => {
        const onlyNumber = event.target.value.replace(/[^\d.]/g, '');

        this.setState({
            value: onlyNumber
        });
        this.props.onChange({
            value: onlyNumber,
            name: event.target.name,
            event
        });
    };

    render() {
        const { name, value, text, onChange, required } = this.props;

        return (
            <li>
                <div className='add-list_key'>
                    { text } {required && <span className="add-list_required"> *</span>}
                </div>
                <div className='add-list_value'>
                    <input
                        onChange={this._onChange}
                        name={name}
                        value={this.state.value}
                        type='text' />
                </div>
                { /*<p>{this.state.errorMes}</p>*/ }
            </li>
        )
    }
}

export default NumberField;
