import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './DeletePassword.css';

const DeletePasswordComponent = ({ value, onChange }) => {

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
            <div className="deletepassword-container">
                <div className="deletepassword-container-input">
                    <label htmlFor="deletepassword">DeletePassword</label>
                    <input type="text" id="deletepassword" name="deletepassword" value={value} onChange={handleChange}/>
                </div>
                {errorMessage && (
                    <div className='deletepassword-container-error-message'>
                        <p>{errorMessage}</p>
                    </div>
                )}
            </div>
        </>
    );
};

DeletePasswordComponent.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const DeletePassword = React.memo(DeletePasswordComponent);

export default DeletePassword;