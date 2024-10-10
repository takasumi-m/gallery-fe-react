import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ImageList.css';
import { MAX_FILE_NUM, MAX_TOTAL_FILE_SIZE } from '../../utils/constants';

const ImageListComponent = ({ onChange }) => {

    const [uploadedImageList, setUploadedImageList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleImageChange = (event) => {
        setErrorMessage("");

        const addImageList = Array.from(event.target.files);
        event.target.value = '';

        // 画像の合計数がMAX_FILE_NUMを超える場合はエラーメッセージを表示
        if (uploadedImageList.length + addImageList.length > MAX_FILE_NUM) {
            setErrorMessage(`最大で${MAX_FILE_NUM}枚の画像しかアップロードできません。`);
            return;
        }

        // 画像の合計サイズがMAX_TOTAL_FILE_SIZE_BYTEを超える場合はエラーメッセージを表示
        const uploadedImageListSize = uploadedImageList.reduce((acc, image) => acc + image.size, 0);
        const addImageListSize = addImageList.reduce((acc, file) => acc + file.size, 0);
        if (uploadedImageListSize + addImageListSize > MAX_TOTAL_FILE_SIZE_BYTE) {
            setErrorMessage(`合計ファイルサイズは${MAX_TOTAL_FILE_SIZE_MB}MB以内である必要があります。`);
            return;
        }
        const addImageMapList = addImageList.map(image => ({ file: image, url: URL.createObjectURL(image), size: image.size }));
        const newImageList = [...uploadedImageList, ...addImageMapList];
        setUploadedImageList(newImageList);
        onChange(newImageList);
    };

    const handleRemoveImage = (index) => {
        setErrorMessage("");

        const imageToRemove = uploadedImageList[index];
        URL.revokeObjectURL(imageToRemove.url); 
        const newImageList = uploadedImageList.filter((_, i) => i !== index);
        setUploadedImageList(newImageList);
        onChange(newImageList);
    };

    return (
        <>
            <div className="image-upload-container">
                <label className="image-upload-button">
                    ファイルを選択
                    <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={handleImageChange} 
                        style={{ display: 'none' }}
                    />
                </label>
                {errorMessage.length > 0 && (
                    <div className='image-upload-container-error-message'>
                        <p>{errorMessage}</p>
                    </div>
                )}
            </div>
            <div className="image-preview-container">
                {uploadedImageList.map((image, index) => (
                    <div key={index}>
                        <img src={image.url} alt={`Selected ${index}`} />
                        <button onClick={() => handleRemoveImage(index)} className="remove-button">X</button>
                    </div>
                ))}
            </div>
        </>
    )
};

ImageListComponent.propTypes = {
    onChange: PropTypes.func.isRequired,
};

const ImageUpload = React.memo(ImageListComponent);

export default ImageUpload;
