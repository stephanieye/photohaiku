import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import Form from './Form';


class UsersShow extends React.Component {
  state = {
    user: null,
    errors: {},
    poem: {}
  }

  handleChange = ({ target: { name, value } }) => {
    const poem = {...this.state.poem, [name]: value};
    this.setState({ poem, [name]: value });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const {id} = this.props.match.params;
    axios.post(`/api/users/${id}/poems`, this.state.poem, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({user: res.data, poem: {} }))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  handlePoemDelete = (poem) => {
    axios.delete(`/api/users/${this.props.match.params.id}/poems/${poem._id}`, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({user: res.data}));
  }


  // handleChange = ({ target: { name, value } }) => {
  //   const errors = {...this.state.errors, [name]: ''};
  //   this.setState({ errors, [name]: value });
  // }
  //
  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios.post('/api/users', this.state, {
  //     headers: {Authorization: `Bearer ${Auth.getToken()}`}
  //   })
  //     .then(() => this.props.history.push('/users'))
  //     .catch(err => this.setState({ errors: err.response.data.errors }));
  // }


  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({user: res.data}));
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
        <div className="columns">
          <div className="column">
            <div className="largeimage" style={{ backgroundImage: `url(${user.image})` }} />
          </div>
          <div className='column'>
            <h1 className='title is-1'>{user.username}</h1>
            <h2 className='subtitle is-2'>{user.email}</h2>
          </div>
          <Link to={`/users/${user._id}/edit`} className="button">Edit</Link>
          <button className="button is-danger" onClick= {this.handleDelete}>Delete</button>
        </div>

        <div className="columns is-multiline">

          {user.poems.map(poem =>
            <div className="column is-one-third-desktop is-half-tablet" key={poem._id}>

              <div className="card">
                <div
                  className="card-image"
                  style={{ backgroundImage: `url(${poem.image})` }}
                ></div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">{poem.haiku}</p>
                      <p className="subtitle is-6">{poem.nouns[0]}</p>
                      <p className="subtitle is-6">{poem.nouns[1]}</p>
                      <p className="subtitle is-6">{poem.nouns[2]}</p>
                    </div>
                  </div>
                  { Auth.isAuthenticated() && (Auth.getPayload().sub === user._id) &&
                  <button className="button is-danger" onClick= {() => {
                    this.handlePoemDelete(poem);
                  }}>Delete this poem</button> }
                </div>
              </div>
            </div> )}

        </div>

        { Auth.isAuthenticated() && (Auth.getPayload().sub === user._id) &&
        <Form
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
          poem={this.state.poem}
        /> }

      </section>);
  }
}

export default UsersShow;
