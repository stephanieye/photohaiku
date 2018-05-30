import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';
import Poem from './Poem';

class PoemIndex extends React.Component {
  state = {
    poems: [],
    poem: {},
    tags: [],
    tagnounarray: [],
    newtag: {}
  }

  componentDidMount() {
    axios.get('/api/poems')
      .then(res => {
        this.setState({poems: res.data});
        this.handleTagCloud();
      });
  }

  handleTagCloud = () => {
    axios.get('/api/tags')
      .then(res => {
        this.setState({tags: res.data});
        this.state.tags.forEach(tag => {
          this.state.tagnounarray.push(tag.noun);
        });
        // console.log(this.state.poems);
        // console.log(this.state.tagnounarray);
        this.state.poems.forEach(poem => {
          if (!this.state.tagnounarray.includes(poem.nouns[0])) {
            this.state.tagnounarray.push(poem.nouns[0]);
            const tag = poem.nouns[0];
            this.createTags(tag);
          }
        });
        this.state.poems.forEach(poem => {
          if (!this.state.tagnounarray.includes(poem.nouns[1])) {
            this.state.tagnounarray.push(poem.nouns[1]);
            const tag = poem.nouns[1];
            this.createTags(tag);
          }
        });
        this.state.poems.forEach(poem => {
          if (!this.state.tagnounarray.includes(poem.nouns[2])) {
            this.state.tagnounarray.push(poem.nouns[2]);
            const tag = poem.nouns[2];
            this.createTags(tag);
          }
        });
      });
  }

  createTags = (tag) => {
    this.setState({newtag: {noun: tag}});
    // console.log(this.state.newtag);
    axios.post('/api/tags', this.state.newtag, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    });
    axios.get('/api/tags')
      .then(res => {
        this.setState({tags: res.data});
      });
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
        <div className='tagcloud'>
          <h4>discover photohaiku through tags...</h4>
          <p className='has-text-centered'>
            {this.state.tags.map(tag =>
              <span className="hashtag" key={tag._id}><Link to={`/tags/${tag.noun}`}>
                #{tag.noun}
              </Link></span>
            )}
          </p>
        </div>

        <div>
          <h4 className='has-text-right'>...or browse all photohaiku</h4>
          <br />
          <div className="columns is-multiline">
            {this.state.poems.map(poem =>
              <div className="column is-one-third-desktop is-half-tablet" key={poem._id}>
                <p className='has-text-right dotdotdot'><Link to={`/poems/${poem._id}`}>&#8226;&#8226;&#8226;</Link></p>
                <Poem
                  poem={poem}
                  starred={() => this.starred(poem)}
                />
              </div>
            )}
          </div>
        </div>

      </section>
    );
  }
}

export default PoemIndex;
