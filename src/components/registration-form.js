import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import { registerUser } from '../actions/user';
import './registration.css';

export class RegistrationForm extends React.Component {
  onSubmit(e) {
    const newUser = {
      username: e.target.regUsername.value,
      email: e.target.regEmail.value,
      password: e.target.regPassword.value
    };
    return this.props.dispatch(registerUser(newUser))
  }
  
  
  render() {
    if(this.props.loggedIn){
      return <Redirect to='/dashboard' />
    }

    //Creates error div if error is detected
    let registrationError;
    if(this.props.error){
      registrationError = <div className='registration-error' aria-live='polite'>{this.props.error.location} {this.props.error.message}</div>
    }

    return (
      <form className='regForm' onSubmit={(e)=> {
        e.preventDefault();
        this.onSubmit(e);
        }}>
        <img className='register-logo' src={process.env.PUBLIC_URL + '/resources/overwatch-buddy-logo.png'} alt='Overwatch Buddy logo'></img>
        <h2 aria-level='1' className='registration-title'>Registration</h2>
        {registrationError}
        <section className='email col-12'>
          <label htmlFor='regEmail' className='email-label'>Email</label>
          <input type='text' aria-label='regEmail' name='regEmail' className='regEmail'></input>
        </section>
        <section className='username col-12'>
          <label htmlFor='regUsername' className='username-label'>Username</label>
          <input type='text' aria-label='regUsername' name='regUsername' className='regUsername'></input>
        </section>
        <section className='password col-12'>
          <label htmlFor='regPassword' className='password-label'>Password</label>
          <input type='password' aria-label='regPassword' name='regPassword' className='regPassword'></input>
        </section>
        <button>Register</button> <br/>
        <Link to='/'><button>Back</button></Link>
        <Link to='/login'><button>Already registered?</button></Link>
      </form>
    )
  }
}

const mapPropsToState = state => ({
  loggedIn: state.auth.currentUser !== null,
  error: state.user.error
});

export default connect(mapPropsToState)(RegistrationForm);
