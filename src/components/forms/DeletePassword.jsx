import React from 'react';
import PropTypes from 'prop-types';
import './DeletePassword.css';

const DeletePassordComponent = ({ value, onChange }) => {
    return (
        <div className="deletepassword-container">
            <label htmlFor="deletePassord">DeletePassord</label>
            <input type="text" id="deletePassord" name="deletePassord" value={value} onChange={(e) => onChange(e.target.value)}/>
        </div>
    );
};

DeletePassordComponent.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const DeletePassord = React.memo(DeletePassordComponent);

export default DeletePassord;