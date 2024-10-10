import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './Caption.css';
import { MAX_TEXTAREA_BYTE } from '../../utils/constants';

const CaptionComponent = ({ onChange }) => {

    const [caption, setCaption] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        const inputValue = event.target.value;
        const byteLength = new Blob([inputValue]).size;

        if (byteLength > MAX_TEXTAREA_BYTE) { // 64KB
            setErrorMessage(`入力できるのは${MAX_TEXTAREA_BYTE / 1024}KBまでです`);
            return;
        } else {
            setErrorMessage("");
        }

        setCaption(inputValue);
        onChange(inputValue);
    };

    return (
        <>
            <div className="caption-container">
                <div className="caption-container-input">
                    <label htmlFor="caption">Caption</label>
                    <textarea id="caption" name="caption" value={caption} onChange={handleChange}/>
                </div>
                {errorMessage.length > 0 && (
                    <div className='caption-container-error-message'>
                        <p>{errorMessage}</p>
                    </div>
                )}
            </div>
        </>
    );
};

CaptionComponent.propTypes = {
    onChange: PropTypes.func.isRequired
};

const Caption = React.memo(CaptionComponent);

export default Caption;