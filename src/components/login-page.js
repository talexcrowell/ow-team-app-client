import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import LoginForm from './login-form';
import './login.css';

export function LoginPage (props) {
  if(props.loggedIn){
    return <Redirect to='/dashboard' />
  }

  //Creates error div if error is detected
  let loginError;
  if(props.error){
    loginError = <div className='login-error' aria-live='polite'>Incorrect username and/or password</div>
  }
  return (
    <section role='main' className='login'>
      <img className='login-logo col-12' src={process.env.PUBLIC_URL + '/resources/overwatch-buddy-logo.png'} alt='Overwatch Buddy logo'></img>
      <h2 aria-level='1' className='col-12'>Login</h2>  
      {loginError}
      <LoginForm />
    </section>
  )
}

function mapStateToProps(state){
  return{
    loggedIn: state.auth.currentUser !== null,
    error: state.auth.error
  }
}


export default connect(mapStateToProps)(LoginPage);