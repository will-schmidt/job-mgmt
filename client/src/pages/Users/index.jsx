import React, { Component } from 'react'
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
                     console.error(
                       "Couldn't connect to server " + error.message
                     )
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
                               </tr>
                             )
                           })}
                         </tbody>
                       </table>
                     </div>
                   )
                 }
               }

