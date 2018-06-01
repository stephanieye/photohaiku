import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Poem from './Poem';


class PoemShow extends React.Component {
  state = {
    poem: null,
    errors: {},
    tags: [],
    tagnounarray: [],
    newtag: {}
  }

  componentDidMount() {
    axios.get(`/api/poems/${this.props.match.params.id}`)
      .then(res => {
        this.setState({poem: res.data});
      })
      .catch(()=> {
        this.props.history.replace('/404');
      });
  }

  starred = (poem) => {
    console.log(Auth.getPayload().sub);
    if (!poem.stars.includes(Auth.getPayload().sub)) {
      const newstar = poem.stars.push(Auth.getPayload().sub);
      this.setState({...poem, [poem.stars]: newstar});
      console.log(poem);
      axios.put(`/api/poems/${poem._id}`, this.state.poem, {
        headers: {Authorization: `Bearer ${Auth.getToken()}`}
      });
    } else {
      const index = poem.stars.indexOf(Auth.getPayload().sub);
      if (index > -1) {
        const newstar = poem.stars.splice(index, 1);
        this.setState({...poem, [poem.stars]: newstar});
        console.log(poem);
        axios.put(`/api/poems/${poem._id}`, this.state.poem, {
          headers: {Authorization: `Bearer ${Auth.getToken()}`}
        });
      }
    }
  }

  handleDelete = () => {
    axios.delete(`/api/poems/${this.props.match.params.id}`, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push(`/users/${Auth.getPayload().sub}`));
  }

  handleHashtag = (tag) => {
    axios.get('/api/tags')
      .then(res => {
        this.setState({tags: res.data});
        this.state.tags.forEach(tag => this.state.tagnounarray.push(tag.noun));
        // console.log(this.state.tagnounarray);
        if (this.state.tagnounarray.includes(tag)) {
          this.props.history.replace(`/tags/${tag}`);
        } else {
          this.setState({newtag: {noun: tag}});
          console.log(this.state.newtag);
          axios.post('/api/tags', this.state.newtag, {
            headers: {Authorization: `Bearer ${Auth.getToken()}`}
          })
            .then(this.props.history.replace(`/tags/${tag}`));
        }
      })
      .catch(()=> this.props.history.replace('/404')
      );
  }



  render() {
    const {poem} = this.state;

    if(!poem) return null;
    return (
      <section>
        <div className='tagbar'>
          <p className='phashtag'>
            {poem.nouns.map(noun =>
              <span className='hashtag' key={noun} onClick={() => {
                const tag = noun;
                this.handleHashtag(tag);
              }}>
                #{noun}
              </span>)}

          </p>
        </div>
        {poem.haiku &&
          <Poem
            poem={poem}
            starred={() => this.starred(poem)}
          />
        }
        <br />
        {Auth.getPayload().sub === poem.poet._id &&
          <div className='has-text-centered'>
            <button className='button is-destroy' onClick={this.handleDelete}>delete this photohaiku</button>
          </div>}

      </section>
    );
  }
}

export default PoemShow;
