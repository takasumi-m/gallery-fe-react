import React, { useState }  from 'react';
// css
import './Post.css';
// forms
import Caption from '../components/forms/Caption';
import Location from '../components/forms/Location';
import Tag from '../components/forms/Tag';
import DeletePassword from '../components/forms/DeletePassword';
import ImageUpload from '../components/forms/ImageUpload'; 
// utils
import ErrorMessage from '../components/utils/ErrorMessage';

const Post = () => {
    // form data
    const [formData, setFormData] = useState({
        caption: '',
        location: '',
        tag: '',
        deletePassword: ''
    });
    // image data
    const [selectedImageList, setSelectedImageList] = useState([]);
    // error message
    const [errorMessage, setErrorMessage] = useState('');
    
    return (
        <div class="post-container">
            <div className="form-container">
                <Caption value={formData.caption} onChange={(value) => setFormData(prevData => ({ ...prevData, caption: value }))}/>
                <Location value={formData.location} onChange={(value) => setFormData(prevData => ({ ...prevData, location: value }))}/>
                <Tag value={formData.tag} onChange={(value) => setFormData(prevData => ({ ...prevData, tag: value }))}/>
                <DeletePassword value={formData.deletePassword} onChange={(value) => setFormData(prevData => ({ ...prevData, deletePassword: value }))}/>
            </div>

            <ErrorMessage errorMessage={errorMessage}/>
        </div>
    );
};

export default Post;