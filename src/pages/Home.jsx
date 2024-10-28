import React, { useEffect, useState, useCallback } from 'react';
import JSZip from 'jszip';
import './Home.css';

const Home = () => {
    const [errorMessageList, setErrorMessageList] = useState([]);
    const [postList, setPostList] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [displayedImage, setDisplayedImage] = useState('');

    const fetchAdditionalImages = useCallback(async (post) => {
        try {
            const response = await fetch(`http://localhost:8080/api/posts/${post.postId}/images`);
            if (response.status === 404) {
                console.log(`追加画像が見つかりません: postId=${post.postId}`);
                return [];
            }
            if (!response.ok) throw new Error('追加画像の取得に失敗しました: ' + post.postId);

            const zipBlob = await response.blob();
            const zip = await JSZip.loadAsync(zipBlob);

            const additionalImages = await Promise.all(
                Object.keys(zip.files)
                    .filter((filename) => /\.(jpg|jpeg|png|gif)$/i.test(filename))
                    .map(async (filename) => {
                        const file = await zip.files[filename].async('blob');
                        return URL.createObjectURL(file);
                    })
            );

            return additionalImages;
        } catch (err) {
            console.error('追加画像の取得に失敗しました: ', err.message);
            setErrorMessageList((prev) => [...prev, err.message]);
            return [];
        }
    }, []);

    const fetchImage = useCallback(async (post) => {
        try {
            const response = await fetch(`http://localhost:8080/api/posts/${post.postId}/images/primary`);
            if (!response.ok) throw new Error('画像の取得に失敗しました: ' + post.postId);

            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);

            const additionalImages = await fetchAdditionalImages(post);

            // postListの同期的な更新
            setPostList((prevList) =>
                prevList.map((p) =>
                    p.postId === post.postId
                        ? { ...p, imageUrl, images: [imageUrl, ...additionalImages] }
                        : p
                )
            );
        } catch (err) {
            console.error('画像の取得に失敗しました: ', err.message);
            setErrorMessageList((prev) => [...prev, err.message]);
        }
    }, [fetchAdditionalImages]);

    const fetchPosts = useCallback(async () => {
        try {
            setErrorMessageList([]);
            const response = await fetch('http://localhost:8080/api/posts');
            if (!response.ok) throw new Error('投稿情報の取得に失敗しました');

            const rowData = await response.json();
            const initializedPosts = rowData.map((post) => ({
                ...post,
                imageUrl: null,
                images: [],
            }));
            setPostList(initializedPosts);

            // すべての投稿のfetchImageを並列で実行
            await Promise.all(rowData.map((post) => fetchImage(post)));
        } catch (err) {
            console.error('投稿情報の取得に失敗しました: ', err.message);
            setErrorMessageList((prev) => [...prev, err.message]);
        }
    }, [fetchImage]);

    const loadMorePosts = useCallback(async () => {
        try {
            // 現在の postList の最後の投稿日時を取得
            const lastPost = postList[postList.length - 1]; 
            console.log('lastPost: ', lastPost);    
            const lastPostDatetime = lastPost ? lastPost.postDatetime : '';
    
            // APIをクエリパラメータ付きで呼び出し
            const response = await fetch(`http://localhost:8080/api/posts?postDatetime=${lastPostDatetime}`);
            if (!response.ok) throw new Error('追加の投稿情報の取得に失敗しました');
    
            const rowData = await response.json();
            const newPosts = rowData.map((post) => ({
                ...post,
                imageUrl: null,
                images: [],
            }));
    
            // 既存の postList に新しい投稿を追加
            setPostList((prevList) => [...prevList, ...newPosts]);
    
            // 新しい投稿の画像を取得
            await Promise.all(newPosts.map((post) => fetchImage(post)));
        } catch (err) {
            console.error('追加投稿の取得に失敗しました: ', err.message);
            setErrorMessageList((prev) => [...prev, err.message]);
        }
    }, [postList, fetchImage]);

    const handleImageClick = (post) => {
        setSelectedPost(post);
        setDisplayedImage(post.imageUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPost(null);
        setDisplayedImage('');
    };

    const handleThumbnailClick = (url) => {
        setDisplayedImage(url);
    };

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return (
        <div>
            {errorMessageList.length > 0 && (
                <div className="post-container-error-message">
                    <p>
                        {errorMessageList.map((msg, index) => (
                            <React.Fragment key={index}>
                                {msg}
                                <br />
                            </React.Fragment>
                        ))}
                    </p>
                </div>
            )}

            <div className="post-home-container">
                <div className="post-list-container">
                    {postList.map((post) => (
                        <div
                            className="post-item"
                            key={post.postId}
                            onClick={() => handleImageClick(post)}
                        >
                            {post.imageUrl ? (
                                <img src={post.imageUrl} alt={post.caption} />
                            ) : (
                                <p>画像を読み込み中...</p>
                            )}
                        </div>
                    ))}
                </div>
                <button className="load-more-button" onClick={() => loadMorePosts()}>
                    もっと読み込む
                </button>
            </div>

            {isModalOpen && selectedPost && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button onClick={closeModal} className="close-button">X</button>
                        <div className="post-details">
                            <div className="thumbnail-container">
                                {selectedPost.images.map((url, index) => (
                                    <img
                                        key={index}
                                        src={url}
                                        alt={`Thumbnail ${index + 1}`}
                                        onClick={() => handleThumbnailClick(url)}
                                    />
                                ))}
                            </div>
                            <div className="large-image-container">
                                <img src={displayedImage} alt="表示画像" />
                            </div>
                            <h2>{selectedPost.caption}</h2>
                            <p><strong>場所:</strong> {selectedPost.location}</p>
                            <p><strong>タグ:</strong> {selectedPost.tagList.join(', ')}</p>
                            <p><strong>投稿日時:</strong> {selectedPost.postDatetime}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;