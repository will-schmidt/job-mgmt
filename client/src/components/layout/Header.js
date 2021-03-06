import React, {Component} from "react";
import {NavLink, Link, withRouter} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCogs} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/logo.png";

import {getToken, removeUserSession} from "../../utils/authentication";

class Header extends Component {
  handleLogout = () => {
    removeUserSession();
    this.props.history.push("/signin");
  };
  render() {
    return (
      <header className="is-fullhd">
        <nav
          className="has-shadow navbar"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="container is-widescreen">
            <div className="navbar-brand">
              <Link to="/">
                <img src={logo} alt="Job Mgmt app" height="131" length="400" />
              </Link>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
              <div className="navbar-start">
                <NavLink
                  to="/"
                  exact
                  activeClassName="active"
                  className="navbar-item"
                >
                  Home
                </NavLink>

                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">Jobs</a>

                  <div className="navbar-dropdown">
                    <a className="navbar-item">All</a>
                    <a className="navbar-item">Quoted</a>
                    <a className="navbar-item">Active</a>
                    <hr className="navbar-divider" />
                    <Link to="/add-job" className="navbar-item">
                      Add new job
                    </Link>
                  </div>
                </div>

                <div className="navbar-item has-dropdown is-hoverable">
                  <Link to="/clients" className="navbar-link">
                    Clients
                  </Link>

                  <div className="navbar-dropdown">
                    <Link to="/clients" className="navbar-item">
                      All clients
                    </Link>
                    <hr className="navbar-divider" />
                    <Link to="/add-client" className="navbar-item">
                      Add new client
                    </Link>
                  </div>
                </div>
              </div>

              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="dropdown is-hoverable">
                    <div className="dropdown-trigger">
                      <button
                        className="button is-text"
                        aria-haspopup="true"
                        aria-controls="dropdown-menu4"
                      >
                        <span>
                          <FontAwesomeIcon icon={faCogs} /> Settings
                        </span>
                        <span className="icon is-small">
                          <i
                            className="fas fa-angle-down"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </button>
                    </div>
                    <div
                      className="dropdown-menu"
                      id="dropdown-menu4"
                      role="menu"
                    >
                      <div className="dropdown-content">
                        <NavLink
                          to="/users"
                          className="dropdown-item"
                          activeClassName="active"
                        >
                          Users
                        </NavLink>

                        <div className="dropdown-item">
                          <p>Additional settings to be added soon</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!getToken() ? (
                    <div className="buttons">
                      <Link to="/signup" className="button is-primary">
                        <strong>Sign up</strong>
                      </Link>
                      <Link to="/signin" className="button is-light">
                        Log in
                      </Link>
                    </div>
                  ) : (
                    <button
                      onClick={this.handleLogout}
                      className="button is-light"
                    >
                      Log out
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default withRouter(Header);
