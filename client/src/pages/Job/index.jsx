import React, { Component } from "react";
import "./job.css";
import axios from "axios";
import moment from "moment";

export default class Job extends Component {
  state = {
    job: null,
    jobNotes: [],
    dateCreated: new Date().toLocaleString(),
    body: "",
    createdby: "5e671514082b3cbdb9b05184",
    isModal: false
  };

  async componentDidMount() {
    const jobId = this.props.match.params.jobId;
    const jobRes = await axios(`http://localhost:5000/jobs/${jobId}`);
    this.setState({
      job: jobRes.data.job
    });
    console.log(this.state.job);

    const jobNotesRes = await axios(
      `http://localhost:5000/get-job-notes/${jobId}`
    );

    this.setState({
      jobNotes: jobNotesRes.data.jobNotes
    });
    console.log(this.state.jobNotes);
  }

  handleClick = e => {
    e.preventDefault();
    this.setState({ isModal: !this.state.isModal });
  };

  render() {
    console.log(`Date is ${this.state.dateCreated}`);
    const active = this.state.isModal ? "is-active" : "";
    if (!this.state.job) return null;
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
                      <strong>Due:</strong>{" "}
                      {moment(this.state.job.eta).format("D MMM YYYY")}
                    </p>
                  </div>
                </div>

                <p className="subtitle is-5 has-text-left">
                  {this.state.job.description}
                </p>
              </div>
            </div>
            <div class="job-notes">
              {this.state.jobNotes.length > 0 ? (
                <div>
                  <div className="columns">
                    <div className="column">
                      <h2 className="title is-5 has-text-left">Notes</h2>
                    </div>
                    <div className="column">
                      <button onClick={this.handleClick} className="button">
                        Add new note
                      </button>
                    </div>
                  </div>

                  {this.state.jobNotes.map(note => {
                    return (
                      <article class="message">
                        <div class="message-body has-text-left">
                          <strong>
                            Added by {note.createdBy.firstName}
                            {note.createdBy.lastName}
                          </strong>
                          on
                          <strong>
                            {moment(note.dateCreated).format("D MMM YYYY")}
                          </strong>
                          <br />
                          {note.body}
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <h2 className="title is-5 has-text-left">No notes added</h2>
              )}
            </div>
          </div>
          <div class="column">
            <h2 className="subtitle is-5 has-text-left">
              <strong>Client:</strong> {this.state.job.client.name}
            </h2>

            <h2 className="subtitle is-5 has-text-left">
              <strong>Responsible:</strong>{" "}
              {this.state.job.responsible.firstName}{" "}
              {this.state.job.responsible.lastName}
            </h2>
          </div>
        </div>
        <div className={`modal ${active} is-clipped`}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <form onSubmit={this.handleSubmit}>
              <header className="modal-card-head">
                <p className="modal-card-title">Add new note</p>
                <button
                  onClick={this.handleClick}
                  className="delete"
                  aria-label="close"
                ></button>
              </header>
              <section className="modal-card-body">
                <div class="content">
                  <div className="field">
                    <label className="label has-text-left">Note details</label>
                    <div className="control">
                      <textarea
                        className="textarea"
                        placeholder="Write your note"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </section>
              <footer className="modal-card-foot">
                <button className="button is-success">Save note</button>
                <button onClick={this.handleClick} className="button">
                  Cancel
                </button>
              </footer>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
