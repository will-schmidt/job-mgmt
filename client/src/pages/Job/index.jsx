import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

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
        <div class="columns">
          <div class="column is-four-fifths">
            <div className="card">
              <div className="card-content">
                <div className="level">
                  <h1 className="title is-4 has-text-left">
                    {this.state.job.name}
                  </h1>
                  <div className="level-right">
                    <p className="subtitle is-5 has-text-left">
                      <strong>Due:</strong> {moment(this.state.job.eta).format('D MMM YYYY')}
                    </p>
                  </div>
                </div>

                <p className="subtitle is-5 has-text-left">
                  {this.state.job.description}
                </p>
              </div>
            </div>
          </div>
          <div class="column">
            <h2 className="subtitle is-5 has-text-left">
              <strong>Client:</strong> {this.state.job.client.name}
            </h2>

            <h2 className="subtitle is-5 has-text-left">
              <strong>Responsible:</strong> {this.state.job.responsible}
            </h2>
          </div>
        </div>
      </div>
    )
  }
}
