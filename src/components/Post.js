import React from 'react';

const Post = ({ post }) => {
  return (
    <div>
      {post?.username}: {post?.title}: {post?.content}
    </div>
  );
};

export default Post;
