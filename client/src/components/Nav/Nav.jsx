import React from "react";
import { Link } from "react-router-dom";

import "./Nav.scss";

const Nav = () => {

  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-list-element">
          <Link to="/" className="nav-list-element-home">
            <img
              
              src="assets/Nav/home.svg"
              alt="nav_home"
            />
          </Link>
        </li>
        <li className="nav-list-element">
          <Link to="/aquarium">
            <img
              className="nav-list-element-aquarium"
              src="assets/Nav/aquarium.svg"
              alt="nav_aquarium"
            />
          </Link>
        </li>
        <li className="nav-list-element">
          <Link to="/camera">
            <img
              className="nav-list-element-identify"
              src="assets/Nav/central.png"
              alt="nav_identify"
            />
          </Link>
        </li>
        <li className="nav-list-element">
          <Link to="/diagnosis">
            <img
              className="nav-list-element-diagnosis"
              src="assets/Nav/diagnosis.svg"
              alt="nav_diagnosis"
            />
          </Link>
        </li>
        <li className="nav-list-element">
          <Link to="/expert">
            <img
              className="nav-list-element-expert "
              src="assets/Nav/expert.svg"
              alt="nav_expert"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
