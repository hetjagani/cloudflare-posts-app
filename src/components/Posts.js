import { Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Post from './Post';
import PropTypes from 'prop-types';

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        borderRadius: 1,
        textAlign: 'center',
        fontSize: '1rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${window.BACKEND_URL}/posts`).then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Box sx={{ display: 'grid', width: '80wv', gridTemplateRows: 'repeat(3, 1fr)' }}>
          {posts.map((p) => (
            <Item>
              <Post key={p.id} post={p} />
            </Item>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default Posts;
