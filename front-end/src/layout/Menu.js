import React from "react";

import {Link} from "react-router-dom";
import "./menu.css";
/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    <nav className="navbar navbar-dark align-items-start p-0">
      <div className="container-fluid d-flex flex-column p-0">
        <Link
          className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
          to="/"
        >
          <div className="sidebar-brand-text mx-3">
            <span className="nav-text font-weight-bold">MY Best Seafood</span>
          </div>
        </Link>
        <hr className="sidebar-divider my-0" />
        <ul className="nav navbar-nav text-light" id="accordionSidebar">
          <li className="nav-item nav-effect">
            <Link className="nav-link" to="/dashboard">
              <span className="oi oi-dashboard nav-text" />
              &nbsp;<span className="nav-text">Dashboard</span>
            </Link>
          </li>
          <li className="nav-item nav-effect">
            <Link className="nav-link" to="/search">
              <span className="oi oi-magnifying-glass nav-text" />
              &nbsp;<span className="nav-text">Search</span>
            </Link>
          </li>
          <li className="nav-item nav-effect">
            <Link className="nav-link" to="/reservations/new">
              <span className="oi oi-plus nav-text" />
              &nbsp;<span className="nav-text">New Reservation</span>
            </Link>
          </li>
          <li className="nav-item nav-effect">
            <Link className="nav-link" to="/tables/new">
              <span className="oi oi-layers nav-text" />
              &nbsp;<span className="nav-text">New Table</span>
            </Link>
          </li>
        </ul>
        <div className="text-center d-none d-md-inline">
          <button
            className="btn rounded-circle border-0"
            id="sidebarToggle"
            type="button"
          />
        </div>
      </div>
    </nav>
  );
}

export default Menu;
