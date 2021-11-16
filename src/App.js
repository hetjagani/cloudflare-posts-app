import { Typography } from '@mui/material';
import './App.css';
import Posts from './components/Posts';

function App() {
  return (
    <div className="App">
      <Typography variant="h3" gutterBottom component="div">
        Posts
      </Typography>
      <Posts />
    </div>
  );
}

export default App;
