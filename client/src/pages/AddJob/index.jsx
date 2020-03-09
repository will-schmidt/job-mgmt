import React, { Component } from 'react'
import "./addjob.css"

export default class AddJob extends Component {
  state = {
    jobName: '',
    client: '',
    jobDescription: '',
    typeOfJob: '',
    responsible: '',
    jobCost: '',
    jobBillable: '',
    eta: '' 
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
    console.log(this.state)

    event.preventDefault()
  }


  render() {
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    return (
      <div className="container is-widescreen">
        <h1 className="title is-3 has-text-left">Add New Job</h1>
        <div className="columns">
          <div className="column">
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="label">Name of job</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Name of job"
                    name="jobName"
                    value={this.state.jobName}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Client</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select>
                      <option value="design">Design</option>
                      <option value="development">Development</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label">Description of project</label>
                <div class="control">
                  <textarea
                    class="textarea"
                    placeholder="What's involved in this job?"
                    value={this.state.jobDescription}
                    onChange={this.handleChange} name="jobDescription"
                  ></textarea>
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <div class="field">
                    <label class="label">Type of job</label>
                    <div class="control">
                      <label class="radio">
                        <input type="radio" name="typejob" />
                        &nbsp;Design
                      </label>
                      <label class="radio">
                        <input type="radio" name="typejob" />
                        &nbsp;Development
                      </label>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div class="field">
                    <label class="label">Project lead</label>
                    <div class="control">
                      <div class="select">
                        <select>
                          <option>User one</option>
                          <option>User two</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="columns">
                <div className="column">
                  <div className="field">
                    <label className="label">Estimated cost</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Estimate of what it'll cost us to deliver" value={this.state.jobCost} onChange={this.handleChange} name="jobCost"
                      />
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                    <label className="label">Estimated billable</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Estimate of what client will be invoiced"
                        value={this.state.jobBillable}
                        onChange={this.handleChange} name="jobBillable"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">Projected finish date</label>
                <div className="control">
                  <input
                    className="input"
                    name="eta"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="ETA for completing this job"
                    value={this.state.eta}
                  />
                </div>
              </div>

              <div class="field is-grouped is-grouped-right">
                <div class="control">
                  <button class="button is-link">Add new job</button>
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
