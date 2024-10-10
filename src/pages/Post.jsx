import React, { useState }  from 'react';
import axios from 'axios';
// css
import './Post.css';
// forms
import Caption from '../components/forms/Caption';
import Location from '../components/forms/Location';
import TagList from '../components/forms/TagList';
import DeletePassword from '../components/forms/DeletePassword';
import ImageList from '../components/forms/ImageList';
import { MAX_TEXTAREA_KB, MAX_TEXTAREA_BYTE, MAX_TEXT_LENGTH, API_BASE_URL } from '../utils/constants';

const Post = () => {

    // form data
    const [formData, setFormData] = useState({
        caption: '',
        location: '',
        tagList: [],
        deletePassword: '' ,
        imageList: []
    });
    const [errorMessageList, setErrorMessageList] = useState([]);
    
    const handleChange = (field, value) => {
        setFormData(prevData => ({ ...prevData, [field]: value }));
    };
    
    const handleSubmit = async () => {

        // バリデーション
        if (!validate()) {
            return;
        }

        const requestJson = {
            caption: formData.caption,
            location: formData.location,
            tagList: formData.tagList,
            deletePassword: formData.deletePassword,
        }
        
        const formPayload = new FormData();
        formPayload.append('requestJson', JSON.stringify(requestJson));
        console.log('imageList:', formData.imageList);
        formData.imageList.forEach((image) => {
            formPayload.append('fileList', image.file);
        });

        try {
            const response = await axios.post(`${API_BASE_URL}/post`, formPayload, {});
    
            console.log('アップロード成功:', response.data);
            // TODO 画面遷移
        } catch (error) {
            setErrorMessageList(['投稿に失敗しました']);
        }
    };

    // バリデーション
    const validate = () => {

        const newErrorMessageList = [];

        if (formData.imageList.length === 0) {
            newErrorMessageList.push('画像を選択してください');
        }

        if (new Blob([formData.caption]).size > MAX_TEXTAREA_BYTE) {
            newErrorMessageList.push(`Caption: 入力できるのは${MAX_TEXTAREA_KB}KBまでです`);
        }

        if (formData.location.length > MAX_TEXT_LENGTH) {
            newErrorMessageList.push(`Location: 入力できるのは${MAX_TEXT_LENGTH}文字までです`);
        }

        if (formData.deletePassword.length > MAX_TEXT_LENGTH) {
            newErrorMessageList.push(`DeletePassword: 入力できるのは${MAX_TEXT_LENGTH}文字までです`);
        }

        setErrorMessageList(newErrorMessageList);
        return newErrorMessageList.length === 0;
    };

    return (
        <div className="post-container">
            <div className="form-container">
                <ImageList onChange={(value) => handleChange('imageList', value)} />
                <Caption onChange={(value) => handleChange('caption', value)} />
                <Location onChange={(value) => handleChange('location', value)} />
                <TagList onChange={(value) => handleChange('tagList', value)} />
                <DeletePassword onChange={(value) => handleChange('deletePassword', value)} />
            </div>
            {errorMessageList.length > 0 && (
                <div className='post-container-error-message'>
                    <p>
                        {errorMessageList.map((errorMessage, index) => (
                            <React.Fragment key={index}>
                                {errorMessage}
                                <br />
                            </React.Fragment>
                        ))}
                    </p>
                </div>
            )}
            <div className='post-container-submit-button'>
                <button onClick={handleSubmit}>投稿</button>
            </div>
        </div>
    );
};

export default Post;