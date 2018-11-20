import React from 'react';

class Label extends React.PureComponent {
    render() {
        const { value, text } = this.props;

        return (
            <li>
                <div className='add-list_key'>
                    { text }
                </div>
                <div className='add-list_value'>
                    {value}
                </div>
            </li>
        )
    }
}

export default Label;
