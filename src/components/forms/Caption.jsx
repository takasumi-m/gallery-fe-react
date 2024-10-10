import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './Caption.css';

const CaptionComponent = ({ value, onChange }) => {

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        const inputValue = event.target.value;
        const byteLength = new Blob([inputValue]).size;

        if (byteLength > 65536) { // 64KB = 65536 bytes
            setErrorMessage("入力できるのは64KBまでです");
            return;
        }

        setErrorMessage("");
        onChange(inputValue);
    };

    return (
        <>
            <div className="caption-container">
                <div className="caption-container-input">
                    <label htmlFor="caption">Caption</label>
                    <textarea id="caption" name="caption" value={value} onChange={handleChange}/>
                </div>
                {errorMessage && (
                    <div className='caption-container-error-message'>
                        <p>{errorMessage}</p>
                    </div>
                )}
            </div>
        </>
    );
};

CaptionComponent.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const Caption = React.memo(CaptionComponent);

export default Caption;