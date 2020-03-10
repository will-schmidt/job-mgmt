import React, { Component } from 'react'
import { BrowserRouter as Route, Link } from 'react-router-dom'
import axios from 'axios'

export default class SignUp extends Component {
                 state = {
                   firstName: '',
                   lastName: '',
                   email: '',
                   password: '',
                   phone: '',
                   type: 'standard',
                   showSuccess: false
                 }

                 handleChange(event) {
                   const target = event.target

                   const value =
                     target.type === 'checkbox' ? target.checked : target.value
                   const name = target.name

                   this.setState({
                     [name]: value
                   })
                 }

                 handleSubmit(event) {
                   event.preventDefault()
                   const newUser = this.state

                   axios
                     .post('http://localhost:5000/sign-up', newUser)
                     .then(response => {
                       console.log(response)
                       this.state.showSuccess = true
                     })
                     .catch(error => {
                       console.log(error.response)
                     })

                 }

                 render() {
                   this.handleChange = this.handleChange.bind(this)
                   this.handleSubmit = this.handleSubmit.bind(this)

                   return (
                     <div className="container is-widescreen">
                       <div class="columns is-mobile is-centered">
                         <div class="column is-half">
                           <form onSubmit={this.handleSubmit}>
                             <div className="card">
                               <div className="card-content">
                                 <h1 className="title is-3">Sign Up</h1>
                                 <p class="subtitle">
                                   Already have an account?&nbsp;
                                   <Link to="/signin">
                                     Click here to log in
                                   </Link>
                                   .
                                 </p>

                                 <div className="columns">
                                   <div className="column">
                                     <div className="field">
                                       <label className="label">
                                         First name
                                       </label>
                                       <div className="control">
                                         <input
                                           className="input"
                                           type="text"
                                           placeholder="Type your first name"
                                           name="firstName"
                                           value={this.state.firstName}
                                           onChange={this.handleChange}
                                         />
                                       </div>
                                     </div>
                                   </div>
                                   <div className="column">
                                     <div className="field">
                                       <label className="label">
                                         Last name
                                       </label>
                                       <div className="control">
                                         <input
                                           className="input"
                                           type="text"
                                           placeholder="Type your surname"
                                           name="lastName"
                                           value={this.state.lastName}
                                           onChange={this.handleChange}
                                         />
                                       </div>
                                     </div>
                                   </div>
                                 </div>
                                 <div className="columns">
                                   <div className="column">
                                     <div className="field">
                                       <label className="label">
                                         Email address
                                       </label>
                                       <div className="control">
                                         <input
                                           className="input"
                                           type="email"
                                           placeholder="Type your first name"
                                           name="email"
                                           value={this.state.email}
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
                                           value={this.state.password}
                                           onChange={this.handleChange}
                                         />
                                       </div>
                                     </div>
                                   </div>
                                 </div>
                                 <div className="columns">
                                   <div className="column">
                                     <div className="field">
                                       <label className="label">
                                         Mobile number
                                       </label>
                                       <div className="control">
                                         <input
                                           className="input"
                                           type="text"
                                           placeholder="Enter your mobile number"
                                           name="phone"
                                           value={this.state.phone}
                                           onChange={this.handleChange}
                                         />
                                       </div>
                                     </div>
                                   </div>
                                   <div className="column">&nbsp;</div>
                                 </div>
                               </div>

                               <footer class="card-footer">
                                 <div class="field is-grouped  card-footer-item">
                                   <div class="control container">
                                     <button class="button is-medium is-fullwidth is-primary">
                                       Register New User Account
                                     </button>
                                   </div>
                                 </div>
                               </footer>
                             </div>
                           </form>
                           &nbsp;
                           <br />
                           {this.state.showSuccess ? (
                             <div class="notification is-success signup-success">
                               <button class="delete"></button>
                               <strong class="subtitle">
                                 <b>New User Created</b>
                               </strong>
                               <br />
                               We've created a new account with the details
                               you've provided.
                               <br />
                               <Link to="/signin">Click here to log in</Link>.
                             </div>
                           ) : null}
                         </div>
                       </div>
                     </div>
                   )
                 }
               }
