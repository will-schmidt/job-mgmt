import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import "./addjob.css"
import 'react-datepicker/dist/react-datepicker.css'


export default class AddJob extends Component {
                 state = {
                   name: '',
                   client: '',
                   description: '',
                   type: '',
                   responsible: '',
                   cost: '',
                   value: '',
                   eta: new Date()
                 }

                 handleChange(event) {
                   const target = event.target
                   console.log(target)
                   const value = target.type === 'checkbox' ? target.checked : target.value
                   const name = target.name

                   this.setState({
                     [name]: value

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
                       console.log(response)
                     })
                     .catch(error => {
                       console.log(error.response)
                     })

                   // console.log(this.state)

                   // event.preventDefault()
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
                             <div class="field">
                               <label class="label">Client</label>
                               <div class="control">
                                 <div class="select is-fullwidth">
                                   <select
                                     name="client"
                                     value={this.state.client}
                                     onChange={this.handleChange}
                                   >
                                     <option value="">
                                       Select a client...
                                     </option>
                                     <option value="Anderosa Investments">
                                       Anderosa Investments
                                     </option>
                                     <option value="Easy Step Podiatry">
                                       Easy Step Podiatry
                                     </option>
                                     <option value="Gametradar">
                                       Gametradar
                                     </option>
                                     <option value="Tribu">Tribu</option>
                                   </select>
                                 </div>
                               </div>
                             </div>
                             <div class="field">
                               <label class="label">
                                 Description of project
                               </label>
                               <div class="control">
                                 <textarea
                                   class="textarea"
                                   placeholder="What's involved in this job?"
                                   value={this.state.description}
                                   onChange={this.handleChange}
                                   name="description"
                                 ></textarea>
                               </div>
                             </div>
                             <div className="columns">
                               <div className="column">
                                 <div class="field">
                                   <label class="label">Type of job</label>
                                   <div class="control">
                                     <label class="radio">
                                       <input
                                         type="radio"
                                         name="type"
                                         value="Design"
                                         checked={this.state.type === 'Design'}
                                         onChange={this.handleChange}
                                       />
                                       &nbsp;Design
                                     </label>
                                     <label class="radio">
                                       <input
                                         type="radio"
                                         name="type"
                                         value="Development"
                                         checked={
                                           this.state.type === 'Development'
                                         }
                                         onChange={this.handleChange}
                                       />
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
                                       <select
                                         name="responsible"
                                         value={this.state.responsible}
                                         onChange={this.handleChange}
                                       >
                                         <option value="">
                                           Select user...
                                         </option>
                                         <option value="Cristian Florea">
                                           Cristian Florea
                                         </option>
                                       </select>
                                     </div>
                                   </div>
                                 </div>
                               </div>
                             </div>

                             <div className="columns">
                               <div className="column">
                                 <div className="field">
                                   <label className="label">
                                     Estimated cost
                                   </label>
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
                                   <label className="label">
                                     Estimated billable
                                   </label>
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

                             <div className="field">
                               <label className="label">
                                 Projected finish date
                               </label>
                               <div className="control">
                                 {/* <input
                    className="input"
                    name="eta"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="ETA for completing this job"
                    value={this.state.eta}
                  /> */}
                                 <DatePicker
                                   type="text"
                                   className="input"
                                   dateFormat="dd/MM/yyyy"
                                   name="eta"
                                  // selected={this.state.eta}
                                   onChange={this.handleChange}
                                   placeholderText="Est. completion date"
                                   value={this.state.eta}
                                 />
                               </div>
                             </div>

                             <div class="field is-grouped is-grouped-right">
                               <div class="control">
                                 <button class="button is-link">
                                   Add new job
                                 </button>
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
