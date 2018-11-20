import React from 'react';

import './Checkbox.scss';

class Checkbox extends React.Component {
    render() {
        const { input: {name, size, value, onChange} } = this.props;

        return (
            <div className="checkbox">
                <input id={name} type="checkbox" value={value} onChange={onChange} />
                <label htmlFor={name} className={size}/>
            </div>
        );
    }
}

export default Checkbox;