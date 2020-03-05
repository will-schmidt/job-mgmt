import React, { Component } from 'react'
import axios from 'axios'

export default class User extends Component {
  state = {
    job: null
  }

  async componentDidMount() {
    const jobId = this.props.match.params.jobId
    const jobRes = await axios(
      `http://localhost:5000/jobs/${jobId}`
    )
    this.setState({
      job: jobRes.data.job
    })
    console.log(this.state.job)
  }


  render() {
    if (!this.state.job) return null
    return (
      <div className="container is-widescreen">
        <div className="card">
          <div className="card-content">
            <h1 className="title is-4 has-text-left">{this.state.job.name}</h1>
            <p class="subtitle is-5 has-text-left">
              {this.state.job.description}
            </p>
          </div>
        </div>
      </div>
    )
  }
}
