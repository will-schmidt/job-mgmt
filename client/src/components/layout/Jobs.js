import React, { Component } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

export default class Jobs extends Component {
  state = {
    jobs: []
  };
  async componentDidMount() {
    try {
      const res = await axios("http://localhost:5000/jobs");

      // const parsed = queryString.parse(this.props.location.search);

      this.setState({
        jobs: res.data
      });
      // this.setState({
      //   jobs: res.data.filter(
      //     el => el.status && el.status.toLowerCase() === parsed.status
      //   )
      // });
    } catch (error) {
      console.error("Couldn't connect to server " + error.message);
    }
  }

  render() {
    return (
      <div className="container is-widescreen">
        <h1 className="title is-1 has-text-left">Jobs</h1>
        <table>
          <thead>
            <tr>
              <th>
                <abbr title="Job name">Job</abbr>
              </th>
              <th>
                <abbr title="Client">Client</abbr>
              </th>
              <th>
                <abbr title="Type of work">Type</abbr>
              </th>
              <th>
                <abbr title="Staff resonsible">Respons.</abbr>
              </th>
              <th>
                <abbr title="Estimated cost">Est. cost</abbr>
              </th>
              <th>
                <abbr title="Billable amount">Billable</abbr>
              </th>
              <th>
                <abbr title="ETA">ETA</abbr>
              </th>
              <th>
                <abbr title="Days until due">Days</abbr>
              </th>
              <th>
                <abbr title="Job status">Status</abbr>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.jobs.map(job => {
              return (
                <tr>
                  <th>
                    <Link to={`job/${job._id}`}>{job.name}</Link>
                  </th>
                  <td>{job.client}</td>
                  <td>{job.type}</td>
                  <td>{job.responsible}</td>
                  <td>{job.cost}</td>
                  <td>{job.value}</td>
                  <td>{job.eta}</td>
                  <td>{job.days}</td>
                  <td>{job.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

/**
 * 
 *  {Object.keys(job)
                    .filter(key => key !== "_id")
                    .filter(key => key !== "__v")
                    .filter(key => key !== "notes")
                    .map(key => (
                      <th>{job[key]}</th>
                    ))}
 */
