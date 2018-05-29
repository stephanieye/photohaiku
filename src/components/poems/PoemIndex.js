import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

class PoemIndex extends React.Component {
  state = {
    poems: [],
    poem: {}
  }

  componentDidMount() {
    axios.get('/api/poems')
      .then(res => this.setState({poems: res.data}));
  }

  starred = (poem) => {
    console.log(Auth.getPayload().sub);
    if (!poem.stars.includes(Auth.getPayload().sub)) {
      const newstar =
      poem.stars.push(Auth.getPayload().sub);
      this.setState({...poem, [poem.stars]: newstar});
      console.log(poem);
      axios.put(`/api/poems/${poem._id}`, poem, {
        headers: {Authorization: `Bearer ${Auth.getToken()}`}
      });
    } else {
      const index = poem.stars.indexOf(Auth.getPayload().sub);
      if (index > -1) {
        const newstar =
        poem.stars.splice(index, 1);
        this.setState({...poem, [poem.stars]: newstar});
        console.log(poem);
        axios.put(`/api/poems/${poem._id}`, poem, {
          headers: {Authorization: `Bearer ${Auth.getToken()}`}
        });
      }
    }
  }

  render() {
    return (
      <section>
        <div className="columns is-multiline">
          {this.state.poems.map(poem =>
            <div className="column is-one-third-desktop is-half-tablet" key={poem._id}>
              <p className='has-text-right dotdotdot'><Link to={`/poems/${poem._id}`}>&#8226;&#8226;&#8226;</Link></p>
              <div className="card">
                <div className="card-image"
                  style={{ backgroundImage: `url(${poem.image})` }}
                ></div>
                <div className="card-content">
                  <div className='columns is-mobile is-gapless'>
                    <div className='column'>

                      {Auth.isAuthenticated() && <h5><Link to={`/users/${poem.poet._id}`}>{poem.poet.username}</Link></h5>}
                      {!Auth.isAuthenticated() && <h5>a photohaiku poet</h5>}

                      <p className="subtitle is-6">{poem.createdAtRelative}</p>
                    </div>
                    {Auth.isAuthenticated() && <div className='column is-one-quarter has-text-right'>
                      <p>

                        {(!poem.stars.includes(Auth.getPayload().sub)) && <span onClick={()=> this.starred(poem)}>&#9734;</span>}
                        {(poem.stars.includes(Auth.getPayload().sub)) && <span onClick={()=>this.starred(poem)}>&#9733;</span>}

                      </p>

                      <p className='subtitle is-6'>{poem.stars.length} stars</p>
                    </div>}
                  </div>
                  <div>
                    <p> {poem.haiku[0].line1} </p>
                    <p> {poem.haiku[0].line2} </p>
                    <p> {poem.haiku[0].line3} </p>
                    <p className='subtitle is-6'> {poem.haiku[0].attr} </p>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </section>
    );
  }
}

export default PoemIndex;
