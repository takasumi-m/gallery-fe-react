import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './TagList.css';

const TagListComponent = ({ onChange }) => {

    const [tag, setTag] = useState('');
    const [tagList, setTagList] = useState([]);

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        const inputValue = event.target.value;

        if (inputValue.length > 255) {
            setErrorMessage("入力できるのは255文字までです");
            return;
        }

        setErrorMessage("");
        setTag(inputValue);
    };

    const handleKeyDown = (event) => {
        const trimmedTag = event.target.value.trim();

        if ((event.key === ' ' || event.key === '　') && trimmedTag) {
            if (!tagList.includes(trimmedTag)) {
                event.preventDefault();
                const newTagList = [...tagList, trimmedTag];
                setTagList(newTagList);
                onChange(newTagList);
            }
            setTag('');
        }
    };

    const handleRemoveTag = (index) => {
        const newTagList = tagList.filter((_, i) => i !== index);
        setTagList(newTagList);
        onChange(newTagList); // 更新されたタグリストを親に渡す
    };

    return (
        <>
            <div className="tag-container">
                <div className="tag-container-input">
                    <label htmlFor="tag">Tag</label>
                    <input 
                        type="text"
                        id="tag" 
                        name="tag" 
                        placeholder="タグを入力してスペースで追加"
                        value={tag} 
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                {errorMessage.length > 0 && (
                    <div className='tag-container-error-message'>
                        <p>{errorMessage}</p>
                    </div>
                )}
            </div>
            <div className='taglist-container'>
                {tagList.map((tag, index) => (
                    <span key={index} className="tag-item">
                        {tag}
                        <button type="button" className="remove-tag-button" onClick={() => handleRemoveTag(index)}>
                            &times;
                        </button>
                    </span>
                ))}
            </div>
        </>
    );
};

TagListComponent.propTypes = {
    onChange: PropTypes.func.isRequired,
};

const TagList = React.memo(TagListComponent);

export default TagList;