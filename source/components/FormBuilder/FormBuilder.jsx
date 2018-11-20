import React from 'react';
import formValidator from './formValidator.es6';
import './FormBuilder.sccs';

// components for fields:
import Textfield from '../Textfield/Textfield.jsx';
import NumberField from '../Numberfield/NumberField.jsx'
import Label from '../Label/Label.jsx';
import SuperCheckbox from '../SuperCheckbox/SuperCheckbox.jsx';
import SuperSelect from '../SuperSelect/SuperSelect.jsx';
import SuperDatepicker from '../SuperDatepicker/SuperDatepicker.jsx';
import Textarea from '../Textarea/Textarea.jsx';

class FormBuilder extends React.Component {
    constructor(props) {
        super(props);
        const { defaultState } = this.props;
        this.state = defaultState ? defaultState : {};
    }

    _onChangeGlobal = ({ name, value, event }) => {
        this.setState({ [name]: value });
        if(name === 'TempInsurance') {
            this.props.saveTempInsurance(value);
        }
        this.updateConfig(name,value)
    }
    updateConfig(name,value)
    {
        if(name === 'LOP') {
           this.props.config[13]['value'] = value;
        } else if(name === 'Correspondance') {
           this.props.config[14]['value'] = value;
        } else if(name === 'IsVerified') {
           this.props.config[15]['value'] = value;
        }
    }
    getInput(item, i, _onChangeGlobal) {
        switch (item.type) {
            case 'textfield':
                return <Textfield key={i}
                    text={item.text}
                    name={item.name}
                    value={item.value}
                    onChange={_onChangeGlobal}
                    disable={item.disable}
                    required={item.required}
                />;
            case 'numberfield':
                return <NumberField key={i}
                    text={item.text}
                    name={item.name}
                    value={item.value}
                    onChange={_onChangeGlobal}
                    required={item.required}
                />;
            case 'label':
                return <Label key={i}
                    text={item.text}
                    name={item.name}
                    value={item.value}
                    onChange={_onChangeGlobal}
                />;
            case 'checkbox':
                return <SuperCheckbox key={i}
                    text={item.text}
                    name={item.name}
                    value={item.value}
                    onChange={_onChangeGlobal}
                    required={item.required}
                />;

            //case 'textarea':
            //    return <Textarea key={i}
            //        text={item.text}
            //        name={item.name}
            //        value={item.value}
            //        onChange={_onChangeGlobal}
            //    />;

            case 'selectbox':
                return <SuperSelect
                    list={item.value}
                    text={item.text}
                    name={item.name}
                    key={i}
                    defaultValue={item.defaultValue}
                    valueField={item.valueField}
                    labelField={item.labelField}
                    onChange={_onChangeGlobal}
                    required={item.required}
                />;
            case 'datepicker':
                return <SuperDatepicker
                    key={i} text={item.text}
                    name={item.name}
                    value={item.value}
                    onChange={_onChangeGlobal}
                    required={item.required}
                />;

            //default:
            //    return <span>
            //        <input type='text' value={item.name} key={i} />
            //    </span>
        }
    }

    render() {
        const { config } = this.props;
        const list = config.map( ( item, i ) =>
            this.getInput(item, i, this._onChangeGlobal)
        );

        return (
            <ul className='add-list'>{list}</ul>
        );
    }
}

export default FormBuilder;