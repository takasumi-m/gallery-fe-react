import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ImageList.css';

const ImageListComponent = ({ onChange }) => {

    const maxFileNum = 4;
    const maxTotalSize = 10 * 1024 * 1024; // 10MB

    const [uploadedImageList, setUploadedImageList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleImageChange = (event) => {
        const addImageList = Array.from(event.target.files);

        // 画像の合計数がmaxFileNumを超える場合はエラーメッセージを表示
        if (uploadedImageList.length + addImageList.length > maxFileNum) {
            setErrorMessage(`最大で${maxFileNum}枚の画像しかアップロードできません。`);
            return;
        }

        // 画像の合計サイズがmaxTotalSizeを超える場合はエラーメッセージを表示
        const uploadedImageListSize = uploadedImageList.reduce((acc, image) => acc + image.size, 0);
        const addImageListSize = addImageList.reduce((acc, file) => acc + file.size, 0);
        if (uploadedImageListSize + addImageListSize > maxTotalSize) {
            setErrorMessage(`合計ファイルサイズは${maxTotalSize / (1024 * 1024)}MB以内である必要があります。`);
            return;
        }

        setErrorMessage('');
        const addImageMapList = addImageList.map(image => ({ url: URL.createObjectURL(image), size: image.size }));
        setUploadedImageList(prevImageMapList => [...prevImageMapList, ...addImageMapList]);
        onChange(prevImageMapList => [...prevImageMapList, ...addImageMapList]);
    };

    const handleRemoveImage = (index) => {
        setErrorMessage('');
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
