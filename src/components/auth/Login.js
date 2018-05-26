import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

class AuthLogin extends React.Component {
  state ={};

  handleChange = ({target: {name, value}}) => {
    this.setState({[name]: value});
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/login', this.state)
      .then(res => {
        Auth.setToken(res.data.token);
        Flash.setMessage('info', res.data.message);
      })
      .then(()=>
        this.props.history.push('/createpoem'))
      .catch(()=> {
        Flash.setMessage('danger', 'Invalid credentials...');
        this.props.history.replace('/login');
      });
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <input
            className="input"
            name="email"
            placeholder="email"
            onChange={this.handleChange}/>
        </div>
        <div className="field">
          <input
            type="password"
            className="input"
            name="password"
            placeholder="password"
            onChange={this.handleChange}/>
        </div>
        <button className ="button is-primary">Submit</button>
      </form>
    );
  }
}

export default AuthLogin;
