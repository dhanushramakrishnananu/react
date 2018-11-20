import React from 'react';
import { formEventOptimizer } from '../FormBuilder/formEventOptimizer.es6';

class Textarea extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { name, value, text, onChange } = this.props;

        return (
            <li className=''>
                <div className='add-list_key'>
                    { text }
                </div>
                <div className='add-list_value'>
{/*                    <input
                        value={ value }
                        name={ name }
                        type='text' />*/}

                    <textarea
                        name={name}
                        onChange={ ( e ) => formEventOptimizer(e, onChange) }
                    >
                        {value}
                    </textarea>
                </div>
                { /*<p>{this.state.errorMes}</p>*/ }


            </li>

        )
    }
}

export default Textarea;
