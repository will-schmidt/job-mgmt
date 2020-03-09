import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link
} from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs } from '@fortawesome/free-solid-svg-icons'

export default class Header extends Component {
  render() {
    return (
      <header className="is-fullhd">
        <nav
          className="has-shadow navbar"
          role="navigation"
          aria-label="main navigation"
        >
          <div class="container is-widescreen">
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

                  <div className="buttons">
                    <a className="button is-primary">
                      <strong>Sign up</strong>
                    </a>
                    <a className="button is-light">Log in</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}
