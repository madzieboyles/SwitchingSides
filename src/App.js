import "./App.css";
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import GraphicPage from './GraphicPage';
import MapPage from './MapPage';
import NavBar from "./Navbar";
import ScrollToTop from "./ScrollToTop"; // optional utility to scroll to top on navigation

const App = () => {
  return (
    <>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/graphics" element={<GraphicPage />} />
      </Routes>
    </>
  );
};

export default App;
