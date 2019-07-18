import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import './App.scss';

import Auth from '../Auth/Auth';
import MyNavbar from '../MyNavbar/MyNavbar';
import MyDashboard from '../MyDashboard/MyDashboard';
import ExerciseDictionary from '../ExerciseDictionary/ExerciseDictionary';
import CreateNewWorkout from '../CreateNewWorkout/CreateNewWorkout';
import SubmitWorkout from '../SubmitWorkout/SubmitWorkout';

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

  render() {
    const { authed } = this.state;
    return (
      <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed}/>
            <div className="container">
              <div className="row">
                <Switch>
                  <PublicRoute path='/auth' component={Auth} authed={authed}/>
                  <PrivateRoute path='/MyDashboard' component={MyDashboard} authed={authed}/>

                  <PrivateRoute path='/ExerciseDictionary' component={ExerciseDictionary} authed={authed}/>
                  {/* <PrivateRoute path='/ExcerciseStats/:id' component={ExerciseStats} authed={authed}/> */}
                  <PrivateRoute path='/CreateNewWorkout' component={CreateNewWorkout} authed={authed}/>
                  <PrivateRoute path='/SubmitWorkout/:workoutId' component={SubmitWorkout} authed={authed}/>
                  <Redirect from="*" to="/auth"/>
                </Switch>
              </div>
            </div>
          </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;