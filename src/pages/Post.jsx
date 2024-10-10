import React, { useState }  from 'react';
// css
import './Post.css';
// forms
import Caption from '../components/forms/Caption';
import Location from '../components/forms/Location';
import TagList from '../components/forms/TagList';
import DeletePassword from '../components/forms/DeletePassword';
import ImageList from '../components/forms/ImageList';

const Post = () => {
    // form data
    const [formData, setFormData] = useState({
        caption: '',
        location: '',
        tagList: [],
        deletePassword: '' ,
        imageList: []
    });
    
    const handleChange = (field, value) => {
        setFormData(prevData => ({ ...prevData, [field]: value }));
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
        </div>
    );
};

export default Post;