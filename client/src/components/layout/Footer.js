import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="footer">
          <div className="content has-text-centered">
            <p>
              <strong>Job Mgmt</strong> by{' '}
              <a href="https://www.williamschmidt.com">Will Schmidt</a>. 💻
              Internal job management software to make sure nothing falls
              through the cracks 🌟.
            </p>
          </div>
        </footer>
      </div>
    )
  }
}
