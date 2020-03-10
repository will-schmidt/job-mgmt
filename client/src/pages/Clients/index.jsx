import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Route, Link } from 'react-router-dom'

export default class Clients extends Component {
                 state = {
                   clients: []
                 }

                 async componentDidMount() {
                   try {
                     const res = await axios('http://localhost:5000/clients')

                     this.setState({
                       clients: res.data
                     })

                   } catch (error) {
                     console.error(
                       "Couldn't connect to server " + error.message
                     )
                   }
                 }

                 render() {
                   if (!this.state.clients) return null
                   return (
                     <div className="container is-widescreen">
                       <h1 className="title is-3 has-text-left">Clients</h1>
                       <table>
                         <thead>
                           <tr>
                             <th>
                               <abbr title="Client name">Client</abbr>
                             </th>
                             <th>Country</th>
                             <th>
                               <abbr title="URL to Xero for this client">
                                 Xero
                               </abbr>
                             </th>
                             <th>
                               <abbr title="Number of active jobs">
                                 Active jobs
                               </abbr>
                             </th>
                             <th>
                               <abbr title="Number of completed jobs">
                                 Completed jobs
                               </abbr>
                             </th>
                             <th>
                               <abbr title="Total invoiced amount for this client">
                                 Total value
                               </abbr>
                             </th>
                           </tr>
                         </thead>
                         <tbody>
                           {this.state.clients.map((client, i) => {
                             return (
                               <tr key={i}>
                                 <th>
                                   <Link to={`client/${client._id}`}>
                                     {client.name}
                                   </Link>
                                 </th>

                                 <td>{client.country}</td>
                                 <td>
                                   {client.xeroId !== undefined ? <a target="_blank" href={`https://go.xero.com/Contacts/View/${client.xeroId}`}>View in Xero</a> : `No Xero URL`}
                                   
                                 </td>
                                 <td>&nbsp;</td>
                                 <td>&nbsp;</td>
                                 <td>&nbsp;</td>
                               </tr>
                             )
                           })}
                         </tbody>
                       </table>
                     </div>
                   )
                 }
               } 
