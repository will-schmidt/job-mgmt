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
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    type: undefined,
    phone: undefined
  }

  handleChange(event) {
    const target = event.target

    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
    console.log(this.state)
  }

  handleSubmit(event) {
    event.preventDefault()

    const updateUser = this.state
    const usrId = this.props.match.params.userId
    // console.log(newJob)

    axios
      .patch(`http://localhost:5000/update-user/${usrId}`, updateUser)
      .then(response => {
        console.log('user updated')
      })
      .catch(error => {
        console.log(error.response)
      })
    


    // const newUser = this.state
    // console.log(`newUser: ${newUser}`)
    // this.props.setIsNotified(true)
    // this.props.history.push('/')
  }

  async componentDidMount() {
    const usrId = this.props.match.params.userId
    const usrRes = await axios(`http://localhost:5000/users/${usrId}`)
    

    this.setState({
      email: usrRes.data.user.email,
      firstName: usrRes.data.user.firstName,
      lastName: usrRes.data.user.lastName,
      type: usrRes.data.user.type,
      phone: usrRes.data.user.phone,
      userId: usrId
    })
    console.log(this.state)
    
  }

  render() {
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    
    if (!this.state.email) return null
    return (
      <div className="container is-widescreen">
        <h1 className="title is-3 has-text-left">
          Update user:{' '}
          {this.state.firstName && this.state.lastName
            ? this.state.firstName + ` ` + this.state.lastName
            : this.state.email}
        </h1>
        <div className="columns">
          <div className="column">
            <form onSubmit={this.handleSubmit}>
              <div className="columns">
                <div className="column">
                  <Field
                    value={this.state.firstName}
                    handleChange={this.handleChange}
                    label="First name"
                    name="firstName"
                  />
                </div>
                <div className="column">
                  <Field
                    value={this.state.lastName}
                    handleChange={this.handleChange}
                    label="Last name"
                    name="lastName"
                  />
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <Field
                    value={this.state.email}
                    handleChange={this.handleChange}
                    label="Email address"
                    name="email"
                  />
                </div>
                <div className="column">
                  <Field
                    value={this.state.phone}
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
                      value={this.state.type}
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
                  {/* <div className="field">
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
                  </div> */}
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <div className="field is-grouped is-grouped-left">
                    <div className="control">
                      <a class="button is-danger" href={`/users/delete/${this.state.userId}`}>Delete user</a>
                    </div>
                  </div>
                </div>
                <div className="column">
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
