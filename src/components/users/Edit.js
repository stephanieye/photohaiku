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
        Flash.setMessage('denied', 'sorry, you made a mistake whilst updating your profile.');
        this.props.history.replace('/login');
      });
  }

  handleDelete = () => {
    axios.delete(`/api/users/${this.props.match.params.id}`, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(this.handleLogout);
  }

  handleLogout = () => {
    Auth.logout();
    this.props.history.push('/');
  }


  render() {
    const {user} = this.state;

    if(!user) return null;
    return (
      <section>
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
          <button className ="button is-create">submit</button>
        </form>
        <div className='dangerzone'>
          <p className="title is-3">Warning! If you delete your account, all your photohaiku will be gone forever.</p>
          <button className="button is-destroy" onClick= {this.handleDelete}>delete your account</button>
        </div>
      </section>
    );
  }
}


export default UsersEdit;
