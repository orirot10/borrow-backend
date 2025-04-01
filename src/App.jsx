import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import Rentals from './pages/Rentals';
import Services from './pages/Services';
import Property from './pages/Property';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Search />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/services" element={<Services />} />
          <Route path="/property/:id" element={<Property />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;