import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { AppBar, Container, Toolbar, Typography, Button } from '@mui/material';

import CapitalQuiz from './components/CapitalQuiz/CapitalQuiz';
import HomePage from './components/HomePage/HomePage';

const App = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              home
            </Button>
            <Button color="inherit" component={Link} to="/SearchCountry">
              Search
            </Button>
            <Button color="inherit" component={Link} to="/CapitalQuiz">
              Quiz
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/SearchCountry" element={<HomePage />} />
          <Route path="/CapitalQuiz" element={<CapitalQuiz />} />
          <Route
            path="/"
            element={
              <Typography component="h1" variant="h4" sx={{ marginBlock: 2 }}>
                Country app
              </Typography>
            }
          />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;

