import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import _ from 'lodash';
import Poem from '../poems/Poem';



class TagShow extends React.Component {

  state = {
    tag: null,
    poems: [],
    tagpoems: [],
    errors: {},
    poem: {}
  }


  componentDidMount() {
    axios.get(`/api/tags/${this.props.match.params.noun}`)
      .then(res => {
        this.setState({tag: res.data});
        const tag = this.state.tag[0].noun;
        return tag;
      })
      .then((tag) => {
        axios.get('/api/poems')
          .then(res => {
            this.setState({poems: res.data});
            this.tagpoems(tag);
          });
      })
      .catch(()=> {
        this.props.history.replace('/404');
      });
  }

  tagpoems = (tag) => {
    this.setState({tagpoems: _.filter(this.state.poems, (poem) => poem.nouns.includes(tag))});
    // console.log(this.state.tagpoems);
  }

  starred = (poem) => {
    console.log(Auth.getPayload().sub);
    if (!poem.stars.includes(Auth.getPayload().sub)) {
      const newstar = poem.stars.push(Auth.getPayload().sub);
      this.setState({...poem, [poem.stars]: newstar});
      console.log(poem);
      axios.put(`/api/poems/${poem._id}`, poem, {
        headers: {Authorization: `Bearer ${Auth.getToken()}`}
      });
    } else {
      const index = poem.stars.indexOf(Auth.getPayload().sub);
      if (index > -1) {
        const newstar = poem.stars.splice(index, 1);
        this.setState({...poem, [poem.stars]: newstar});
        console.log(poem);
        axios.put(`/api/poems/${poem._id}`, poem, {
          headers: {Authorization: `Bearer ${Auth.getToken()}`}
        });
      }
    }
  }


  render() {
    const tag = this.state.tag;
    const tagpoems = this.state.tagpoems;
    if(!tag) return null;

    return (
      <section>

        <div className='columns'>
          <div className='column'>
            <h2 className='grey'>#{tag[0].noun}</h2>
            <p className='title is-5'>{tagpoems.length} photohaiku</p>
          </div>
        </div>
        {tagpoems.length === 0 && <div>
          <div className='instructions'>
            <p>alas! there are no</p>
            <p>photohaiku with this tag.</p>
            <Link to={'/createpoem'}><p>but you could change this...</p></Link>
            <p className='subtitle is-6'>&hearts; <span className='italics'>the photohaiku robot</span></p>
          </div>
        </div>}
        {tagpoems.length !== 0 && <div className="columns is-multiline">
          {tagpoems.map(poem =>
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

export default TagShow;
