import $ from 'jquery';

import { githubUsernames } from '../../data/github-users-data.json';

// Initial State
const initialState = {
  allCommits: [],
  yearlyCommits: [],
  fetchedCommits: false,
  fetchedYearlyCommits: false,
};

// Actions
const GOT_USER_COMMITS = 'GOT_USER_COMMITS';
const GOT_USER_YEARLY_COMMITS = 'GOT_USER_YEARLY_COMMITS';

// Action Creators
export const gotUserCommitsActionCreator = commits => ({
  type: GOT_USER_COMMITS,
  commits,
});

export const gotUserYearlyCommitsActionCreator = commits => ({
  type: GOT_USER_YEARLY_COMMITS,
  commits,
});

// Thunk Creators
export const getUserCommitsThunkCreator = () => {
  return dispatch => {
    try {
      githubUsernames.forEach((curGithubUser, idx) => {
        setTimeout(() => {
          $.get(
            `https://cors-anywhere.herokuapp.com/https://github.com/${curGithubUser}`,
            function(res) {
              // console.log('res: ', res);

              // Alternative:
              // console.log({ res });

              // console.log('curGithubUser: ', curGithubUser);

              let filtResArr;

              let curMonthCommits;

              const largeViewCheck = window.innerWidth > 1007;

              if (largeViewCheck) {
                curMonthCommits = $(res)
                  .find('span')
                  .text();
              } else {
                curMonthCommits = $(res)
                  .find('div')
                  .text();
              }

              // console.log(curGithubUser, 'curMonthCommits: ', curMonthCommits);

              const curMonthCommitsCheck = !curMonthCommits.includes(
                'no activity'
              );

              // console.log(
              //   curGithubUser,
              //   'curMonthCommitsCheck: ',
              //   curMonthCommitsCheck
              // );

              if (curMonthCommitsCheck) {
                filtResArr = $(res)
                  .find('button')
                  .text()
                  .match(/\d+/g);
              }

              // console.log(curGithubUser, 'filtResArr: ', filtResArr);

              const curGithubUserTotalCommits = filtResArr ? filtResArr[0] : 0;

              // console.log(
              //   curGithubUser,
              //   'curGithubUserTotalCommits: ',
              //   curGithubUserTotalCommits
              // );

              const curGithubUserObj = {
                githubUsername: curGithubUser,
                totalCommits: Number(curGithubUserTotalCommits),
              };

              // console.log('curGithubUserObj: ', curGithubUserObj);

              dispatch(gotUserCommitsActionCreator(curGithubUserObj));
            }
          );
        }, idx * 250);
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getUserYearlyCommitsThunkCreator = () => {
  return dispatch => {
    try {
      githubUsernames.forEach((curGithubUser, idx) => {
        setTimeout(() => {
          $.get(
            `https://cors-anywhere.herokuapp.com/https://github.com/${curGithubUser}`,
            function(res) {
              // console.log('res: ', res);

              // Alternative:
              // console.log({ res });

              // console.log('curGithubUser: ', curGithubUser);

              let filtResArr;

              const largeViewCheck = window.innerWidth > 1007;

              if (largeViewCheck) {
                filtResArr = $(res)
                  .find('h2')
                  .text()
                  .match(/\d+/g);
              }

              // console.log(curGithubUser, 'filtResArr: ', filtResArr);

              const curGithubUserTotalCommits = filtResArr
                ? filtResArr.length === 1
                  ? filtResArr[0]
                  : filtResArr.join('')
                : 0;

              // console.log(
              //   curGithubUser,
              //   'curGithubUserTotalCommits: ',
              //   curGithubUserTotalCommits
              // );

              const curGithubUserObj = {
                githubUsername: curGithubUser,
                totalCommits: Number(curGithubUserTotalCommits),
              };

              // console.log('curGithubUserObj: ', curGithubUserObj);

              dispatch(gotUserYearlyCommitsActionCreator(curGithubUserObj));
            }
          );
        }, idx * 250);
      });
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
const commitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER_COMMITS:
      // console.log(
      //   'fetched all commits successfully in the commitsReducer: ',
      //   action.commits
      // );

      return {
        ...state,
        allCommits: [...state.allCommits, action.commits],
        fetchedCommits: true,
      };

    case GOT_USER_YEARLY_COMMITS:
      // console.log(
      //   'fetched yearly commits successfully in the commitsReducer: ',
      //   action.commits
      // );

      return {
        ...state,
        yearlyCommits: [...state.yearlyCommits, action.commits],
        fetchedYearlyCommits: true,
      };

    default:
      return state;
  }
};

export default commitsReducer;
