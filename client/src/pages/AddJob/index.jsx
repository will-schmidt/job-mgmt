import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import './addjob.css'


export default class AddJob extends Component {
  state = {
    name: '',
    client: '',
    description: '',

    type: '',
    responsible: '',
    cost: '',
    value: '',
    eta: null,
    users: [],
    clients: []
  }

  handleChange(event) {
    const target = event.target

    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }
  handleDateChange = date => {
    this.setState({
      eta: date
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const newJob = this.state
    // console.log(newJob)

    // try {
    //   axios.post('http://localhost:5000/add-job', newJob)
    // } catch (error) {
    //   console.log(`Failed {error}`)
    // }

    axios
      .post('http://localhost:5000/add-job', newJob)
      .then(response => {
        this.props.history.push("/")
      })
      .catch(error => {
        console.log(error.response)
      })

    // console.log(this.state)

    // event.preventDefault()
  }

  async componentDidMount() {
    const userResponse = await axios(`http://localhost:5000/users`)
    const clientsResponse = await axios(`http://localhost:5000/clients`)
    this.setState({
      users: userResponse.data,
      clients: clientsResponse.data
    })
    console.log(this.state.clients)
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
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Client</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      name="client"
                      value={this.state.client}
                      onChange={this.handleChange}
                    >
                      <option value="">Select a client...</option>
                      {this.state.clients.map(client => {
                        return <option value={client._id}>{client.name}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Description of project</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    placeholder="What's involved in this job?"
                    value={this.state.description}
                    onChange={this.handleChange}
                    name="description"
                  ></textarea>
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <div className="field">
                    <label className="label">Type of job</label>
                    <div className="control">
                      <label className="radio">
                        <input
                          type="radio"
                          name="type"
                          value="Design"
                          checked={this.state.type === 'Design'}
                          onChange={this.handleChange}
                        />
                        &nbsp;Design
                      </label>
                      <label className="radio">
                        <input
                          type="radio"
                          name="type"
                          value="Development"
                          checked={this.state.type === 'Development'}
                          onChange={this.handleChange}
                        />
                        &nbsp;Development
                      </label>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                    <label className="label">Project lead</label>
                    <div className="control is-expanded">
                      <div className="select is-fullwidth">
                        <select
                          name="responsible"
                          value={this.state.responsible}
                          onChange={this.handleChange}
                        >
                          <option value="">Select user...</option>
                          {this.state.users.map(user => {
                            return (
                              <option value={user._id}>
                                {user.firstName} {user.lastName}
                              </option>
                            )
                          })}
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
                        placeholder="Estimate of what it'll cost us to deliver"
                        value={this.state.cost}
                        onChange={this.handleChange}
                        name="cost"
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
                        value={this.state.value}
                        onChange={this.handleChange}
                        name="value"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <div className="field">
                    <label className="label">Project status</label>
                    <div className="control is-expanded">
                      <div className="select is-fullwidth">
                        <select
                          name="status"
                          value={this.state.responsible}
                          onChange={this.handleChange}
                        >
                          <option value="">Select status...</option>
                          <option value="Quoted 🤞">Quoted 🤞</option>
                          <option value="Started 👨‍💻">Started 👨‍💻</option>
                          <option value="Done 👊">Done 👊</option>
                          <option value="Invoiced 🤑">Invoiced 🤑</option>
                          <option value="Lost 😢">Lost 😢</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                    <label className="label">Projected finish date</label>
                    <div className="control">
                      <DatePicker
                        type="text"
                        className="input"
                        dateFormat="dd/MM/yyyy"
                        name="eta"
                        selected={this.state.eta}
                        onChange={this.handleDateChange}
                        placeholderText="Est. completion date"
                        value={this.state.eta}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="field is-grouped is-grouped-right">
                <div className="control">
                  <button className="button is-link">Add new job</button>
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
