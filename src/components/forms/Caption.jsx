import React from 'react';
import PropTypes from 'prop-types';
import './Caption.css';

const CaptionComponent = ({ value, onChange }) => {
    return (
        <div className="caption-container">
            <label htmlFor="caption">Caption</label>
            <input type="text" id="caption" name="caption" value={value} onChange={(e) => onChange(e.target.value)}/>
        </div>
    );
};

CaptionComponent.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const Caption = React.memo(CaptionComponent);

export default Caption;