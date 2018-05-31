import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import _ from 'lodash';
import Poem from '../poems/Poem';
import Flash from '../../lib/Flash';



class UsersProfile extends React.Component {

  state = {
    user: null,
    poems: [],
    userpoems: [],
    errors: {},
    poem: {},
    open: false
  }


  componentDidMount() {
    axios.get(`/api/users/${Auth.getPayload().sub}`)
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

  controls = () => {
    if (this.state.open === false) {
      document.getElementsByClassName('profilecontrols')[0].style.display = 'block';
      this.setState({open: true});
    } else {
      document.getElementsByClassName('profilecontrols')[0].style.display = 'none';
      this.setState({open: false});
    }
  }


  handleLogout = () => {
    Auth.logout();
    Flash.setMessage('welcome', 'you have successfully logged out.');
    this.props.history.push('/');
  }


  render() {
    const user = this.state.user;
    const userpoems = this.state.userpoems;
    if(!user) return null;

    return (
      <section>

        <div className='columns'>
          <div className='column'>
            <h2>{user.username}</h2>
            <p className='title is-5'>{userpoems.length} photohaiku</p>
            <p className='profilecontrolsdotdotdot title is-2' onClick={this.controls}>&#8226;&#8226;&#8226;</p>

          </div>
          <div className='column has-text-right-tablet'>
            <div className='profilecontrols has-text-centered-mobile'>
              <p><Link to={`/users/${user._id}/edit`} className="button is-create">update your account</Link></p>
              <p><a onClick={this.handleLogout} className="button is-destroy">logout</a></p>
            </div>
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

export default UsersProfile;
