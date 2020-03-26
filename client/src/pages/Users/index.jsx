import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import axios from 'axios'

export default class Users extends Component {
  state = {
    users: []
  }

  async componentDidMount() {
    try {
      const res = await axios('http://localhost:5000/users')

      this.setState({
        users: res.data
      })
      console.log(this.state.users)
    } catch (error) {
      console.error("Couldn't connect to server " + error.message)
    }
  }

  render() {
    if (!this.state.users) return null
    return (
      <div className="container is-widescreen">
        <h1 className="title is-3 has-text-left">Users</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(user => {
              return (
                <tr>
                  <th>
                    {user.firstName}&nbsp;
                    {user.lastName}
                  </th>
                  <td>{user.type}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Link to={`/users/update/${user._id}`}>Update</Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
