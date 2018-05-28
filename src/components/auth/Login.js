import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

class AuthLogin extends React.Component {
  state ={};

  handleChange = ({target: {name, value}}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/login', this.state)
      .then(res => {
        Auth.setToken(res.data.token);
        Flash.setMessage('welcome', res.data.message);
      })
      .then(()=>
        this.props.history.push('/createpoem'))
      .catch(()=> {
        Flash.setMessage('denied', 'sorry, you made a mistake whilst logging in.');
        this.props.history.replace('/login');
      });
  }


  render() {
    return (

      <form onSubmit={this.handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="email">email address</label>
          <input
            type='email'
            className="input"
            name="email"
            placeholder="please enter your email address"
            onChange={this.handleChange}/>
        </div>
        <div className="field">
          <label htmlFor="name">password</label>
          <input
            type="password"
            className="input"
            name="password"
            placeholder="please enter your password"
            onChange={this.handleChange}/>
        </div>
        <button className ="button is-create">submit</button>
      </form>
    );
  }
}

export default AuthLogin;
