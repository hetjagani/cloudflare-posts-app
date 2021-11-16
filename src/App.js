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
import { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/Posts';

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

function App() {
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
        window.location.reload(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <Typography variant="h3" gutterBottom component="div">
        Posts
      </Typography>
      <Button onClick={handleOpen} variant="contained" color="success">
        CREATE POST
      </Button>
      <Posts />
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
}

export default App;
