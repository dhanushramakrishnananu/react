import React from 'react';
import { formEventOptimizer } from '../FormBuilder/formEventOptimizer.es6';

class SuperCheckbox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        }
    }

    _onChange = (event) => {
        this.setState({
            value: event.target.checked
        });
        this.props.onChange({
            value: event.target.checked,
            name: event.target.name,
            event
        });
    };

    render() {
        const { name, text, value, required } = this.props;

        return (
            <li>
                <div className='add-list_key'>
                    { text } {required && <span className="add-list_required"> *</span>}
                </div>
                <div className='add-list_value'>
                    <input
                        name={name}
                        type='checkbox'
                        checked={this.state.value}
                        onChange={this._onChange}
                    />
                </div>

            </li>
        );
    }
}

export default SuperCheckbox;
