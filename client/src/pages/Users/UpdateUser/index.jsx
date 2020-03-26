import React, { Component } from 'react'
import { BrowserRouter as Route, Link } from 'react-router-dom'
import axios from 'axios'

const selectValues = ['Standard', 'Admin']

const Field = ({ label, placeholder, value, name, handleChange }) => (
  <div className="field">
    <label className="label">{label}</label>
    <div className="control">
      <input
        className="input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        name={name}
      />
    </div>
  </div>
)

export default class UpdateUser extends Component {
  state = {
    user: []
  }
  handleChange(event) {
    const target = event.target

    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const newUser = this.state.user
    console.log(`newUser: ${newUser}`)
    // this.props.setIsNotified(true)
    // this.props.history.push('/')
  }

  async componentDidMount() {
    const usrId = this.props.match.params.userId
    const usrRes = await axios(`http://localhost:5000/users/${usrId}`)
    this.setState({
      user: usrRes.data.user
    })
    console.log(usrRes)
    console.log(this.state.user)
  }

  render() {
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    if (!this.state.user) return null
    return (
      <div className="container is-widescreen">
        <h1 className="title is-3 has-text-left">
          Update user: {this.state.firstName}&nbsp;
          {this.state.user.lastName}
        </h1>
        <div className="columns">
          <div className="column">
            <form Submit={this.handleSubmit}>
              <div className="columns">
                <div className="column">
                  <Field
                    value={this.state.user.firstName}
                    handleChange={this.handleChange}
                    label="First name"
                    name="firstName"
                  />
                </div>
                <div className="column">
                  <Field
                    value={this.state.user.lastName}
                    handleChange={this.handleChange}
                    label="Last name"
                    name="lastName"
                  />
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <Field
                    value={this.state.user.email}
                    handleChange={this.handleChange}
                    label="Email address"
                    name="email"
                  />
                </div>
                <div className="column">
                  <Field
                    value={this.state.user.phone}
                    handleChange={this.handleChange}
                    label="Phone number"
                    name="phone"
                  />
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <label className="label">User type</label>
                  <div className="select is-fullwidth">
                    <select
                      name="type"
                      value={this.state.user.type}
                      onChange={this.handleChange}
                    >
                      {selectValues.map(value => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <input
                        className="input"
                        type="password"
                        name="password"
                        value={this.state.user.password}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-grouped is-grouped-right">
                <div className="control">
                  <a class="button is-light" href="/users/">
                    Cancel
                  </a>
                </div>
                <div className="control">
                  <button className="button is-link">Update user</button>
                </div>
              </div>
            </form>
          </div>
          <div className="column"></div>
        </div>
      </div>
    )
  }
}
