import React, { Component } from 'react'
import { BrowserRouter as Route, Link } from 'react-router-dom'

export default class SignIn extends Component {
  render() {
    return (
      <div className="container is-widescreen">
        <div class="columns is-mobile is-centered">
          <div class="column is-half">
            <form onSubmit={this.handleSubmit}>
              <div className="card">
                <div className="card-content">
                  <h1 className="title is-3">Log into your account</h1>
                  <p class="subtitle">
                    Don't have an account?&nbsp;
                    <Link to="/signup">Click here to register</Link>.
                  </p>
                  
                  <div className="columns">
                    <div className="column">
                      <div className="field">
                        <label className="label">Email address</label>
                        <div className="control">
                          <input
                            className="input"
                            type="email"
                            placeholder="Type your first name"
                            name="email"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                          <input
                            className="input"
                            type="password"
                            placeholder="Enter a password"
                            name="password"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>

                <footer class="card-footer">
                  <div class="field is-grouped  card-footer-item">
                    <div class="control container">
                      <button class="button is-medium is-fullwidth is-primary">
                        Log in now
                      </button>
                    </div>
                  </div>
                </footer>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
