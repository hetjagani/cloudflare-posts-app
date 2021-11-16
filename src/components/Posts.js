import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Modal,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Post from './Post';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const formEleStyle = {
  margin: '20px',
  width: '100%',
};

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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [username, setUsername] = useState('');

  const createPost = () => {
    const data = { title, content, username };

    axios
      .post(`${window.BACKEND_URL}/posts`, data)
      .then((res) => {
        console.log(res.data);
        setPosts([...posts, res.data]);
        setOpen(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios.get(`${window.BACKEND_URL}/posts`).then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="success">
        CREATE POST
      </Button>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Box sx={{ display: 'grid', width: '80wv', gridTemplateRows: 'repeat(3, 1fr)' }}>
          {posts.map((p) => (
            <Item>
              <Post key={p.id} post={p} />
            </Item>
          ))}
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Post
          </Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '50px',
            }}
          >
            <FormControl sx={formEleStyle}>
              <InputLabel htmlFor="title">Title</InputLabel>
              <Input id="title" onChange={(e) => setTitle(e.target.value)} />
            </FormControl>
            <FormControl sx={formEleStyle}>
              <InputLabel htmlFor="username">User Name</InputLabel>
              <Input id="username" onChange={(e) => setUsername(e.target.value)} />
            </FormControl>
            <FormControl sx={formEleStyle}>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={5}
                placeholder="Contents"
                style={{ width: 200 }}
                onChange={(e) => setContent(e.target.value)}
              />
            </FormControl>
            <FormControl sx={formEleStyle}>
              <Button onClick={createPost} type="submit" variant="contained" color="success">
                CREATE
              </Button>
            </FormControl>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Posts;
