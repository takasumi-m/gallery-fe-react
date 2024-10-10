import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './Location.css';

const LocationComponent = ({ value, onChange }) => {

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length > 255) {
            setErrorMessage("入力できるのは255文字までです");
            return;
        }
        setErrorMessage("");
        onChange(inputValue);
    };

    return (
        <>
            <div className="location-container">
                <div className="location-container-input">
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" name="location" value={value} onChange={handleChange}/>
                </div>
                {errorMessage && (
                    <div className='location-container-error-message'>
                        <p>{errorMessage}</p>
                    </div>
                )}
            </div>
        </>
    );
};

LocationComponent.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const Location = React.memo(LocationComponent);

export default Location;