import React, {Component} from "react";
import {Link} from "react-router-dom";
import moment from "moment";
import {api} from "../../utils/api";

export default class Jobs extends Component {
  state = {
    jobs: []
  };
  async componentDidMount() {
    try {
      const res = await api("/jobs");

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
    if (!this.state.jobs) return null;
    return (
      <div className="container is-widescreen">
        <nav className="level">
          {/* Left side */}
          <h1 className="title is-3 has-text-left">Jobs</h1>
          {/* Right side */}
          <div className="level-right">
            <p className="level-item">
              <strong>All active</strong>
            </p>
            <p className="level-item">
              <a>Awaiting quote</a>
            </p>
            <p className="level-item">
              <a>Quoted</a>
            </p>
            <p className="level-item">
              <a>Started</a>
            </p>
            <p className="level-item">
              <a>Done</a>
            </p>
            <p className="level-item">
              <a>Invoiced</a>
            </p>
            <p className="level-item">
              <Link to="/add-job" className="button is-success">
                New Job
              </Link>
            </p>
          </div>
        </nav>
        {console.log(this.state.jobs)}
        <table className="table is-bordered is-striped is-hoverable is-fullwidth">
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
            {this.state.jobs.map((job, i) => {
              return (
                <tr key={i}>
                  <th>
                    <Link to={`job/${job._id}`}>{job.name}</Link>
                  </th>
                  <td>{job.client.name}</td>
                  <td>{job.type}</td>
                  <td>
                    {job.responsible.firstName} {job.responsible.lastName}
                  </td>
                  <td>{job.cost}</td>
                  <td>{job.value}</td>
                  <td>{moment(job.eta).format("D MMM YYYY")}</td>
                  <td>{moment(job.eta).diff(moment(), "days") + 1}</td>
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
