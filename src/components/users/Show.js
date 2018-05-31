import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import _ from 'lodash';
import Poem from '../poems/Poem';



class UsersShow extends React.Component {

  state = {
    user: null,
    poems: [],
    userpoems: [],
    errors: {},
    poem: {}
  }


  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => {
        this.setState({user: res.data});
        this.getPoems();
      })
      .catch(()=> {
        this.props.history.replace('/404');
      });
  }


  getPoems = () => {
    axios.get('/api/poems')
      .then(res => {
        this.setState({poems: res.data});
        // console.log(res.data);
        this.userpoems();
      })
      .catch(()=> {
        this.props.history.replace('/404');
      });
  }


  userpoems = () => {
    this.setState({userpoems: _.filter(this.state.poems, (poem) => poem.poet._id === this.state.user._id && poem.haiku[0] !== undefined)});
    // console.log(this.state.userpoems);
  }

  starred = (poem) => {
    console.log(Auth.getPayload().sub);
    if (!poem.stars.includes(Auth.getPayload().sub)) {
      const newstar = poem.stars.push(Auth.getPayload().sub);
      this.setState({...poem, [poem.stars]: newstar});
      // console.log(poem);
      axios.put(`/api/poems/${poem._id}`, poem, {
        headers: {Authorization: `Bearer ${Auth.getToken()}`}
      });
    } else {
      const index = poem.stars.indexOf(Auth.getPayload().sub);
      if (index > -1) {
        const newstar = poem.stars.splice(index, 1);
        this.setState({...poem, [poem.stars]: newstar});
        // console.log(poem);
        axios.put(`/api/poems/${poem._id}`, poem, {
          headers: {Authorization: `Bearer ${Auth.getToken()}`}
        });
      }
    }
  }


  render() {
    const user = this.state.user;
    const userpoems = this.state.userpoems;
    if(!user) return null;

    return (
      <section>

        <div className='columns'>
          <div className='column has-text-centered-mobile'>
            <h2>{user.username}</h2>
            <p className='title is-5'>{userpoems.length} photohaiku</p>
          </div>
        </div>
        {userpoems.length === 0 && <div>
          <div className='instructions'>
            <p>as yet you have no</p>
            <p>photohaiku. change your life:</p>
            <Link to={'/createpoem'}><p>submit a photo.</p></Link>
            <p className='subtitle is-6'>&hearts; <span className='italics'>the photohaiku robot</span></p>
          </div>
        </div>}
        {userpoems.length !== 0 && <div className="columns is-multiline">
          {userpoems.map(poem =>
            <div className="column is-one-third-desktop is-half-tablet" key={poem._id}>
              <p className='has-text-right dotdotdot'><Link to={`/poems/${poem._id}`}>&#8226;&#8226;&#8226;</Link></p>
              <Poem
                poem={poem}
                starred={() => this.starred(poem)}

              />
            </div>
          )}
        </div>}

      </section>);
  }
}

export default UsersShow;
