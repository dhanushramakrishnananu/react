import React from 'react';
import { formEventOptimizer } from '../FormBuilder/formEventOptimizer.es6';

class Textfield extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        };
    }

    _onChange = (event) => {
        this.setState({
            value: event.target.value
        });
        this.props.onChange({
            value: event.target.value,
            name: event.target.name,
            event
        });
    }
    render() {
        const { name, value, text, onChange, disable, required } = this.props;

        return (
            <li>
                <div className='add-list_key'>
                    { text }{required && <span className="add-list_required"> *</span>}
                </div>
                <div className='add-list_value'>
                    <input
                        onChange={this._onChange}
                        name={name}
                        value={this.state.value}
                        type='text'
                        readOnly={disable}/>
                </div>
                { /*<p>{this.state.errorMes}</p>*/ }
            </li>
        );
    }
}

export default Textfield;
