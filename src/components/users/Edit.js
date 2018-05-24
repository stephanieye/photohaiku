import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

class UsersEdit extends React.Component {
  state = {
    user: null,
    errors: {}
  };

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({user: res.data}));
  }

  handleChange = ({ target: { name, value } }) => {
    const errors ={...this.state.errors, [name]: ''};
    this.setState({ errors, [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    axios.put(`/api/users/${id}`, this.state, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push(`/users/${id}`))
      .catch(()=> {
        Flash.setMessage('danger', 'Invalid credentials...');
        this.props.history.replace('/login');
      });
  }


  render() {
    const {user} = this.state;

    if(!user) return null;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <input
            className="input"
            name="username"
            placeholder={user.username}
            onChange={this.handleChange}/>
        </div>
        <div className="field">
          <input
            className="input"
            name="email"
            placeholder={user.email}
            onChange={this.handleChange}/>
        </div>
        <div className="field">
          <input
            type="password"
            className="input"
            name="password"
            placeholder="Please provide a password"
            onChange={this.handleChange}/>
        </div>
        <div className="field">
          <input
            type="password"
            className="input"
            name="passwordConfirmation"
            placeholder="Please confirm your password"
            onChange={this.handleChange}/>
        </div>
        <button className ="button is-primary">Submit</button>
      </form>
    );
  }
}


export default UsersEdit;
