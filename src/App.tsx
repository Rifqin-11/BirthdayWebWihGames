import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Library from './pages/Library';
import PuzzlePage from './pages/Puzzle';
import Books from './pages/Books';
import Puzzle2 from './pages/Puzzle2';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/Puzzle" element={<PuzzlePage />} />
        <Route path="/Puzzle2" element={<Puzzle2 />} />
        <Route path="/Books" element={<Books />} />
      </Routes>
    </Router>
  );
}

export default App;
