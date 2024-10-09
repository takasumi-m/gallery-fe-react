import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Tag.css';

const TagComponent = ({ value, onChange }) => {
    const [tagInput, setTagInput] = useState('');
    const [tagList, setTagList] = useState([]);

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length === 1 && (inputValue === ' ' || inputValue === '　')) {
            event.target.value = '';
            return;
        }
        setTagInput(inputValue);
    };

    const handleKeyDown = (event) => {
        const trimmedTag = tagInput.trim();

        if ((event.key === ' ' || event.key === '　') && trimmedTag) { // 半角スペース、全角スペース
            if (!tagList.includes(trimmedTag)) {
                const newTagList = [...tagList, trimmedTag];
                setTagList(newTagList);
                onChange(newTagList.join(', ')); // 親コンポーネントにタグリストを文字列で渡す
            }
            setTagInput('');
        }
    };

    const handleRemoveTag = (index) => {
        const newTagList = tagList.filter((_, i) => i !== index);
        setTagList(newTagList);
        onChange(newTagList.join(', ')); // 更新されたタグリストを親に渡す
    };

    return (
        <>
            <div className="tag-container-input">
                <label htmlFor="tag">Tag</label>
                <input
                    type="text"
                    value={tagInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="タグを入力してスペースで追加"
                    onBlur={() => setTagInput(tagInput.trimStart())} // トリムしてスペースを削除
                />
            </div>
            <div className="tag-container-list">
                <div className="tag-list">
                    {tagList.map((tag, index) => (
                        <span key={index} className="tag-item">
                            {tag}
                            <button type="button" className="remove-tag-button" onClick={() => handleRemoveTag(index)}>
                                &times;
                            </button>
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
};

TagComponent.propTypes = {
    value: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
};

const Tag = React.memo(TagComponent);

export default Tag;