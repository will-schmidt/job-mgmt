import React, { Component } from 'react'
import logo from '../../assets/images/logo.png'

export default class Header extends Component {
  render() {
    return (
      <header className="container is-fullhd">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <img src={logo} alt="Job Mgmt app" height="131" length="400" />
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item">Home</a>

              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">Jobs</a>

                <div className="navbar-dropdown">
                  <a className="navbar-item">All</a>
                  <a className="navbar-item">Quoted</a>
                  <a className="navbar-item">Active</a>
                  <hr className="navbar-divider" />
                  <a className="navbar-item">Add new job</a>
                </div>
              </div>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <a className="button is-primary">
                    <strong>Sign up</strong>
                  </a>
                  <a className="button is-light">Log in</a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}
