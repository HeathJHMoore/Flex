import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import './App.scss';

import Auth from '../components/Auth/Auth';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import MyDashboard from '../components/MyDashboard/MyDashboard';
import ExerciseDictionary from '../components/ExerciseDictionary/ExerciseDictionary';
import CreateNewWorkout from '../components/CreateNewWorkout/CreateNewWorkout';
import SubmitWorkout from '../components/SubmitWorkout/SubmitWorkout';
import ExerciseStatistics from '../components/ExerciseStatistics/ExerciseStatistics';
import firebaseConnection from '../helpers/data/connection';

firebaseConnection();



const PublicRoute = ({ component: Component, authed, ...rest}) => {
  const routeChecker = props => ( authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/MyDashboard', state: { from: props.location }}}/>)
  );
  return <Route {...rest} render={props => routeChecker(props)}/>
};

const PrivateRoute = ({ component: Component, authed, ...rest}) => {
  const routeChecker = props => ( authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location }}}/>)
  );
  return <Route {...rest} render={props => routeChecker(props)}/>
};

class App extends React.Component {

  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({authed: true});
      } else {
        this.setState({authed: false})
      }
    })
  };

  componentWillUnmount() {
    this.removeListener();
  };

  render() {
    const { authed } = this.state;
    return (
      <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed}/>
            <div className="backgroundContainer1 h-100"></div>
            <div className="backgroundContainer2 h-100"></div>
            <div className="appContainer">
              <div className="container">
                <div className="row d-flex justify-content-center">
                  <Switch>
                    <PublicRoute path='/auth' component={Auth} authed={authed}/>
                    <PrivateRoute path='/MyDashboard' component={MyDashboard} authed={authed}/>

                    <PrivateRoute path='/ExerciseDictionary' component={ExerciseDictionary} authed={authed}/>
                    {/* <PrivateRoute path='/ExcerciseStats/:id' component={ExerciseStats} authed={authed}/> */}
                    <PrivateRoute path='/CreateNewWorkout' component={CreateNewWorkout} authed={authed}/>
                    <PrivateRoute path='/SubmitWorkout/:workoutId' component={SubmitWorkout} authed={authed}/>
                    <PrivateRoute path='/ExerciseStatistics' component={ExerciseStatistics} authed={authed}/>
                    <Redirect from="*" to="/auth"/>
                  </Switch>
                </div>
              </div>
            </div>
          </React.Fragment>
      </BrowserRouter>
      
    );
  }
}

export default App;