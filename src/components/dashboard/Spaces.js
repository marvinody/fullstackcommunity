import React, { Component } from 'react';

class Spaces extends Component {
  componentDidMount() {
    this.props.getEventsThunk();
  }

  render() {
    return (
      <div className="section">
        <div className="card z-depth-0">
          <div className="card-content grey-text text-darken-3">
            <span className="card-title">
              <strong>Work Spaces</strong>
            </span>
            <hr />
            <ul className="notifications">
              <li>
                <span className="red-text-color">
                  <strong>Free working spaces at Freelancers Hub</strong>
                </span>
                <div>30 John Street, Brooklyn</div>
                <div className="events-time-and-rsvp-container">
                  <div className="grey-text note-date events-time-and-rsvp-containee">
                    8 free work spaces a month
                  </div>
                  <a
                    className="events-time-and-rsvp-containee"
                    href="https://freelancershub.nymediacenter.com/member/daypass"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="right">
                      <strong>RSVP</strong>
                    </span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Spaces;
