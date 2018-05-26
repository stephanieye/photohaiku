import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';



class UsersShow extends React.Component {

  state = {
    user: null,
    errors: {},
    poem: {},
    poems: []
  }


  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({user: res.data}));
    axios.get('/api/poems')
      .then(res => {
        this.setState({poems: res.data});
        // console.log(this.state.poems);
      });
  }


  render() {
    const {user} = this.state;
    if(!user) return null;

    return (
      <section>
        <div className='box'>
          <h1 className='title is-1'>{user.username}</h1>
          { Auth.isAuthenticated() && (Auth.getPayload().sub === user._id) && <Link to={`/users/${user._id}/edit`} className="button">Edit</Link>}
        </div>

        <div className="columns is-multiline">
          {this.state.poems.map(poem =>
            ((poem.poet === user._id) && (poem.haiku[0] !== undefined)) &&
            <div className="column is-one-third-desktop is-half-tablet" key={poem._id}>
              <Link to={`/poems/${poem._id}`}>
                <div className="card">
                  <div className="card-image"
                    style={{ backgroundImage: `url(${poem.image})` }}
                  ></div>
                  <div className="card-content">
                    <p className="subtitle is-6">{poem.createdAtRelative}</p>
                    <div>
                      <p> {poem.haiku[0].line1} </p>
                      <p> {poem.haiku[0].line2} </p>
                      <p> {poem.haiku[0].line3} </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>

      </section>);
  }
}

export default UsersShow;
