import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

class Events extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
    };
    this.fetchEvents = this.fetchEvents.bind(this);
  }

  componentDidMount() {
    this.fetchEvents();
  }

  async fetchEvents() {
    const { data } = await axios.get(
      'https://cors-anywhere.herokuapp.com/https://api.meetup.com/2/events?&sign=true&photo-host=public&group_id=31377401&page=20'
    );
    console.log('data: ', data.results);
    this.setState({
      events: data.results,
    });
  }

  render() {
    return (
      <div className="section">
        <div className="card z-depth-0">
          <div className="card-content grey-text text-darken-3">
            <span className="card-title">
              <strong>Upcoming Events</strong>
            </span>
            <ul className="notifications">
              {this.state.events && this.state.events.length ? (
                this.state.events.map(curEvent => {
                  return (
                    <li key={curEvent.id}>
                      <span className="red-text-color">
                        <strong>{curEvent.name} </strong>
                      </span>
                      <div>
                        WeWork space at {curEvent.venue.address_1},{' '}
                        {curEvent.venue.city}{' '}
                      </div>
                      <div className="events-time-and-rsvp-container">
                        <div className="grey-text note-date events-time-and-rsvp-containee">
                          {moment(curEvent.time).fromNow()}
                        </div>
                        <a
                          className="events-time-and-rsvp-containee"
                          href={curEvent.event_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="right">RSVP</span>
                        </a>
                      </div>
                    </li>
                  );
                })
              ) : (
                <li>No upcoming events were found.</li>
              )}

              <li>
                <span className="red-text-color">
                  <strong>Hacker Hours at Fullstack Academy of Code</strong>
                </span>
                <div>5 Hanover Square, New York</div>
                <div className="events-time-and-rsvp-container">
                  <div className="grey-text note-date events-time-and-rsvp-containee">
                    Every second Monday of the Month
                  </div>
                  <a
                    className="events-time-and-rsvp-containee"
                    href="https://www.eventbrite.com/e/hacker-hours-at-fullstack-academy-tickets-63423857465?aff=eac2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="right">RSVP</span>
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

export default Events;
