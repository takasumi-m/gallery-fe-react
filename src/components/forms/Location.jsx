import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './Location.css';
import { MAX_TEXT_LENGTH } from '../../utils/constants';

const LocationComponent = ({ onChange }) => {

    const [location, setLocation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length > MAX_TEXT_LENGTH) {
            setErrorMessage(`入力できるのは${MAX_TEXT_LENGTH}文字までです`);
            return;
        }
        setErrorMessage("");
        setLocation(inputValue);
        onChange(inputValue);
    };

    return (
        <>
            <div className="location-container">
                <div className="location-container-input">
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" name="location" value={location} onChange={handleChange}/>
                </div>
                {errorMessage.length > 0 && (
                    <div className='location-container-error-message'>
                        <p>{errorMessage}</p>
                    </div>
                )}
            </div>
        </>
    );
};

LocationComponent.propTypes = {
    onChange: PropTypes.func.isRequired
};

const Location = React.memo(LocationComponent);

export default Location;