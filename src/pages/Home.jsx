import React, { useEffect, useState } from 'react';

const Home = (caption, location, tagList) => {
    const [conditions, setConditions] = useState({
        caption: caption || '',
        location: location || '',
        tagList: tagList || [],
    });

    const [postList, setPostList] = useState([]);
    const [errorMessageList, setErrorMessageList] = useState([]);

    const fetchPosts = async () => {
        try {
            setErrorMessageList([]); // エラーメッセージを初期化

            const response = await fetch("http://localhost:8080/api/posts");

            if (!response.ok) {
                throw new Error('投稿情報の取得に失敗しました');
            }

            const rowData = await response.json();
            // 初期化：各投稿に imageUrl を追加
            const initializedPosts = rowData.map((post) => ({ ...post, imageUrl: null }));
            setPostList(initializedPosts);

            // 各投稿ごとに画像取得
            rowData.forEach((post) => fetchImage(post.postId));

        } catch (err) {
            console.error('投稿情報の取得に失敗しました: ', err.message);
            setErrorMessageList((prevErrors) => [...prevErrors, err.message]);
        }
    };

    const fetchImage = async (postId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/posts/${postId}/images/primary`);

            if (!response.ok) {
                throw new Error('画像情報の取得に失敗しました: ' + postId);
            }

            const blob = await response.blob(); // 画像データをBlob形式で取得
            const imageUrl = URL.createObjectURL(blob); // BlobをURLに変換

            // 画像URLを postList の対応する投稿にセット
            setPostList((prevPostList) =>
                prevPostList.map((post) =>
                    post.postId === postId ? { ...post, imageUrl } : post
                )
            );

        } catch (err) {
            console.error('画像情報の取得に失敗しました: ', err.message);
            setErrorMessageList((prevErrors) => [...prevErrors, err.message]);
        }
    };

    // 初期表示時に投稿を取得
    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <h1>投稿一覧</h1>

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

            <ul>
                {postList.map((post) => (
                    <li key={post.postId}>
                        <h2>{post.caption}</h2>
                        <p>場所: {post.location}</p>
                        <p>投稿日: {post.postDate}</p>
                        <p>投稿日時: {post.postDatetime}</p>
                        <p>タグ: {post.tagList.join(', ')}</p>
                        {post.imageUrl ? (
                            <img src={post.imageUrl} alt={post.caption} style={{ maxWidth: '200px' }} />
                        ) : (
                            <p>画像を読み込み中...</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;