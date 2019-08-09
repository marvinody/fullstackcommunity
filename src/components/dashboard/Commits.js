import React, { Component } from 'react';
import { connect } from 'react-redux';

class Commits extends Component {
  render() {
    // console.log(
    //   'this.props.commits.allCommits: ',
    //   this.props.commits.allCommits
    // );

    return (
      <div className="section center">
        <div className="card z-depth-0 center">
          <div className="card-content grey-text text-darken-3 center">
            {/* <span className="card-title">
              <strong>Gitness Tracker</strong>
            </span> */}
            {!this.props.commits.fetchedCommits ? (
              <div className="logos-parent-container">
                <div className="logo-container">Loading commits...</div>
                <br />
                <br />
              </div>
            ) : !this.props.commits.allCommits.length ? (
              <div className="logos-parent-container">
                <div className="logo-container">No users were found.</div>
                <br />
                <br />
              </div>
            ) : (
              <div className="logos-parent-container">
                <div className="logo-container">
                  <table
                    className="striped centered"
                    style={{
                      width: '80%',
                      minWidth: '80%',
                      maxWidth: '80%',
                    }}
                  >
                    <thead>
                      <tr>
                        <th
                          style={{
                            width: '100px',
                            minWidth: '100px',
                            maxWidth: '100px',
                            wordBreak: 'break-all',
                          }}
                        >
                          Rank
                        </th>
                        <th
                          style={{
                            width: '100px',
                            minWidth: '100px',
                            maxWidth: '100px',
                            wordBreak: 'break-all',
                          }}
                        >
                          Github Username
                        </th>
                        <th
                          style={{
                            width: '100px',
                            minWidth: '100px',
                            maxWidth: '100px',
                            wordBreak: 'break-all',
                          }}
                        >
                          Total Commits
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.commits.allCommits
                        .sort((githubUserOne, githubUserTwo) => {
                          if (
                            githubUserOne.totalCommits >
                            githubUserTwo.totalCommits
                          ) {
                            return -1;
                          } else if (
                            githubUserOne.totalCommits <
                            githubUserTwo.totalCommits
                          ) {
                            return 1;
                          } else {
                            return 0;
                          }
                        })
                        .map((curGithubUser, idx) => {
                          return (
                            <tr key={idx}>
                              <td
                                style={{
                                  width: '100px',
                                  minWidth: '100px',
                                  maxWidth: '100px',
                                  wordBreak: 'break-all',
                                }}
                              >
                                <strong>{idx + 1}</strong>
                              </td>
                              <td
                                style={{
                                  width: '100px',
                                  minWidth: '100px',
                                  maxWidth: '100px',
                                  wordBreak: 'break-all',
                                }}
                              >
                                <strong>{curGithubUser.githubUsername}</strong>
                              </td>
                              <td
                                style={{
                                  width: '100px',
                                  minWidth: '100px',
                                  maxWidth: '100px',
                                  wordBreak: 'break-all',
                                }}
                              >
                                <strong>{curGithubUser.totalCommits}</strong>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  users: state.firestore.ordered.users,
  commits: state.commits,
});

export default connect(mapStateToProps)(Commits);