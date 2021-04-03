import React from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';

function Post({ username, caption, imageUrl }) {
    return (
        <div className="post">
            <div className="post_header">
                {/*header -> avatar + username*/}
                <Avatar
                    className="post_avatar"
                    alt='cjcjcjcj'
                    src="/static/images/avatar/1.jpg"
                />
                <h3>{username}</h3>
            </div>

            {/*image*/}
            {/* <img 
                className="post_image" 
                src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80" 
                alt=""
            /> */}
            <img className="post_image" src={imageUrl} alt=""/>
            {/*username + caption*/}
            <h4 className="post_text">
                <strong>{username} </strong> {caption}
            </h4>
        </div>
    );
}


export default Post;