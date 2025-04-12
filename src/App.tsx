import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Library from './pages/Library';
import PuzzlePage from './pages/Puzzle';
import Books from './pages/Books';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/Puzzle" element={<PuzzlePage />} />
        <Route path="/Books" element={<Books />} />
      </Routes>
    </Router>
  );
}

export default App;
