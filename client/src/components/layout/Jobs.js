import React, { Component } from 'react'
import axios from 'axios'

export default class Jobs extends Component {
  async componentDidMount() {
    try {
      const res = await axios('http://localhost:5000/jobs')
      console.log(res.data)
    } catch (error) {
      console.error("Couldn't connect to server " + error.message)
    }
  }

  render() {
    return (
      <div className="container is-widescreen">
        <h1 className="title is-1 has-text-left">Jobs</h1>
      </div>
    )
  }
}
