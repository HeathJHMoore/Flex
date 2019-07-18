import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import './Auth.scss';

class Auth extends React.Component {

  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div id="authLandingBanner" className="container">
        <button className="btn btn-danger" onClick={this.loginClickEvent}>Login with google here</button>
        <button className="btn btn-primary">Learn More About Flex</button>
      </div>
    )
  }
}

export default Auth;
