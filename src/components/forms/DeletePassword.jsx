import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './DeletePassword.css';
import { MAX_TEXT_LENGTH } from '../../utils/constants';

const DeletePasswordComponent = ({ onChange }) => {

    const [deletepassword, setDeletePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length > MAX_TEXT_LENGTH) {
            setErrorMessage(`入力できるのは${MAX_TEXT_LENGTH}文字までです`);
            return;
        }
        setErrorMessage("");
        setDeletePassword(inputValue);
        onChange(inputValue);
    };

    return (
        <>
            <div className="deletepassword-container">
                <div className="deletepassword-container-input">
                    <label htmlFor="deletepassword">DeletePassword</label>
                    <input type="text" id="deletepassword" name="deletepassword" value={deletepassword} onChange={handleChange}/>
                </div>
                {errorMessage.length > 0 && (
                    <div className='deletepassword-container-error-message'>
                        <p>{errorMessage}</p>
                    </div>
                )}
            </div>
        </>
    );
};

DeletePasswordComponent.propTypes = {
    onChange: PropTypes.func.isRequired
};

const DeletePassword = React.memo(DeletePasswordComponent);

export default DeletePassword;