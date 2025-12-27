import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import AllMovies from '../../components/student/AllMovies';
import { Box } from '@mui/material';

const Home = () => {
  return (
    <Box>
      <AllMovies/>
    </Box>
  );
}

export default Home