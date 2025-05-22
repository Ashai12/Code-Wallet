import { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Fragment from './pages/Fragment';
import Tags from './pages/Tags';
import Updates from './pages/Updates';
import Info from './pages/Info';
import Home from './pages/Home';
import './App.css';


function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <header><Link to="/"><h1>Code Wallet</h1></Link></header>
      <nav>
        <ul>
          <li><Link to="/fragment"><h2>Fragment</h2></Link></li>
          <hr />
          <li><Link to="/tags"><h2>Tags</h2></Link></li>
          <hr />
          <li><Link to="/updates"><h2>Updates</h2></Link></li>
          <hr />
          <li><Link to="/info"><h2>Info</h2></Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fragment" element={<Fragment />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/Updates" element={<Updates />} />
        <Route path="/info" element={<Info />} />
      </Routes>

      <footer><h3>Code Wallet - 2025</h3></footer>
    </Router>
  );
}

export default App;

