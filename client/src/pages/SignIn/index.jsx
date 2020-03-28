import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../../utils/api'

export default class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => this.setState({  [e.target.name]: e.target.value })

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(this.state);
      if (response.ok) {
        this.props.history.push('/');
      }
     
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    return (
      <div className="container is-widescreen">
        <div className="columns is-mobile is-centered">
          <div className="column is-half">
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
                            onChange={this.handleChange}
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
                            onChange={this.handleChange}
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


