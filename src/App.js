import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
// import Footer from './components/layout/Footer';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetails from './components/projects/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/projects/CreateProject';
import Map from './components/map/Map';
import Commits from './components/dashboard/Commits';
import CommitsYearly from './components/dashboard/CommitsYearly';
import GroupsList from './components/dashboard/GroupsList';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar>Fullstack Community</Navbar>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/project/:id" component={ProjectDetails} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/create" component={CreateProject} />
            <Route path="/map" component={Map} />
            <Route path="/leaderboard" component={Commits} />
            <Route path="/yearlyleaderboard" component={CommitsYearly} />
            <Route path="/meetups" component={GroupsList} />
          </Switch>
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
