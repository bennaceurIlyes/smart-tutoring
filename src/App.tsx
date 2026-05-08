import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tutors from './pages/Tutors';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tutors" element={<Tutors />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        
        <footer style={{ padding: '4rem 2rem', borderTop: '1px solid var(--border)', marginTop: '4rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>© 2026 SmartTutoring. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
