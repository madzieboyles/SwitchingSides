// component/NavBar.js

import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/map">Map</NavLink>
        </li>
        <li>
          <NavLink to="/graphics">The Political Parties</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;