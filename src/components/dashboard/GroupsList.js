import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getEventsThunkCreator } from '../../store/reducers/eventsReducer';
import Group from './Group';

class GroupsList extends Component {
  componentDidMount() {
    this.props.getEventsThunk();
  }

  render() {
    const { auth, events } = this.props;

    // console.log('events in the GroupsList component: ', events);

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    } else {
      return (
        <div className="dashboard container">
          <div className="row">
            {events.allEvents
              .sort((groupOne, groupTwo) => {
                if (groupOne.events.length > groupTwo.events.length) {
                  return -1;
                } else if (groupTwo.events.length < groupOne.events.length) {
                  return 1;
                } else {
                  return 0;
                }
              })
              .map((curGroup, idx) => {
                return (
                  <div key={idx} className="col s12 m6 l4">
                    <Group
                      name={curGroup.name}
                      events={curGroup.events}
                      fetchedEvents={events.fetchedEvents}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  users: state.firestore.ordered.users,
  events: state.events,
});

const mapDispatchToProps = dispatch => ({
  getEventsThunk() {
    dispatch(getEventsThunkCreator());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsList);