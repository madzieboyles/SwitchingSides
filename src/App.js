
import "./App.css";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './Home';
import GraphicPage from './GraphicPage';
import MapPage from './MapPage';
import NavBar from "./Navbar";


const App = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/graphics" element={<GraphicPage />} />
         </Routes>
      </>
   );
};
 
export default App;