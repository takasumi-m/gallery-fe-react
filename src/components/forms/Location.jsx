import React from 'react';
import PropTypes from 'prop-types';
import './Location.css';

const LocationComponent = ({ value, onChange }) => {
    return (
        <div className="location-container">
            <label htmlFor="location">Location</label>
            <input type="text" id="location" name="location" value={value} onChange={(e) => onChange(e.target.value)}/>
        </div>
    );
};

LocationComponent.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const Location = React.memo(LocationComponent);

export default Location;