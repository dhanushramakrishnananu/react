import React from 'react';

import './Popup.scss';

class PopupComponent extends React.Component {
    render() {
        const { onCLose, onOk, message, noLabel, yesLabel, onlyOkVisible, title, hasTitle, hasNotes, hasTextBox, onChange } = this.props;

        return (
            <div className="popup-wrapper">
                <div className="popup">
                    {hasTitle &&<div className="text-popup-bold">{title}</div>}
                    {!hasNotes && <div className="text-popup">{message}</div>}
                    {hasNotes &&
                    <div className="notetext">
                        <div className="notetextDesc">The following grouped accounts do not have any open notes</div>
                        <div>{message}</div>
                    </div>
                    }
                    {hasTextBox &&
                    <div className="input-text-popup">
                        <textarea onChange={onChange} className="form-control"></textarea>
                    </div>
                    }
                    {!onlyOkVisible && <div className="button-wrapper">
                        
                        <button className='buttons-block_cancel-btn' onClick={onCLose}>
                            {noLabel}
                        </button>
                        <button className='buttons-block_ok-btn' onClick={onOk}>
                            {yesLabel}
                        </button>                                              
                    </div>
                    }
                    {onlyOkVisible && <div className="button-wrapper_right">                        
                        <button className='buttons-block_ok-btn' onClick={onOk}>
                            {yesLabel}
                        </button>                                              
                    </div>
                    }
                </div>
            </div>
        );
    }
}

export default PopupComponent;
