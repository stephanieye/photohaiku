import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';
import Poem from './Poem';
import _ from 'lodash';

class PoemIndex extends React.Component {
  state = {
    poems: [],
    poem: {},
    tags: [],
    tagnounarray: [],
    newtag: {},
    gridshow: false,
    frequencyArray: []
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
        this.state.poems.forEach(poem => {
          poem.nouns.forEach(noun => {
            if (!this.state.tagnounarray.includes(noun)) {
              this.state.tagnounarray.push(noun);
              const tag = noun;
              this.createTags(tag);
            } else {
              this.state.tagnounarray.push(noun);
            }
          });
          this.handleFrequency();
        });
      });
  }

  createTags = (tag) => {
    this.setState({newtag: {noun: tag}});
    axios.post('/api/tags', this.state.newtag, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    });
    // axios.get('/api/tags')
    //   .then(res => {
    //     this.setState({tags: res.data});
    //   });
  }

  handleFrequency = () => {
    this.setState({frequencyArray: _.countBy(this.state.tagnounarray)});
  }


  starred = (poem) => {
    // console.log(Auth.getPayload().sub);
    if (!poem.stars.includes(Auth.getPayload().sub)) {
      const newstar =
      poem.stars.push(Auth.getPayload().sub);
      this.setState({...poem, [poem.stars]: newstar});
      // console.log(poem);
      axios.put(`/api/poems/${poem._id}`, poem, {
        headers: {Authorization: `Bearer ${Auth.getToken()}`}
      });
    } else {
      const index = poem.stars.indexOf(Auth.getPayload().sub);
      if (index > -1) {
        const newstar =
        poem.stars.splice(index, 1);
        this.setState({...poem, [poem.stars]: newstar});
        // console.log(poem);
        axios.put(`/api/poems/${poem._id}`, poem, {
          headers: {Authorization: `Bearer ${Auth.getToken()}`}
        });
      }
    }
  }

  handleViewChange = () => {
    if (this.state.gridshow === false) {
      document.getElementsByClassName('tagcloud')[0].style.display = 'none';
      document.getElementsByClassName('tagcloudtab')[0].style.opacity = '0.5';
      document.getElementsByClassName('poemgrid')[0].style.display = 'block';
      document.getElementsByClassName('poemgridtab')[0].style.opacity = '1';
      this.setState({gridshow: true});
    } else {
      document.getElementsByClassName('tagcloud')[0].style.display = 'block';
      document.getElementsByClassName('tagcloudtab')[0].style.opacity = '1';
      document.getElementsByClassName('poemgrid')[0].style.display = 'none';
      document.getElementsByClassName('poemgridtab')[0].style.opacity = '0.5';
      this.setState({gridshow: false});
    }
  }



  render() {
    return (
      <section>


        <div className='columns is-mobile has-text-centered'>
          <div className='column tagcloudtab' onClick={this.handleViewChange}>
            <h1>&#9729;</h1>
            <p>tag cloud</p>
          </div>
          <div className='column poemgridtab' onClick={this.handleViewChange}>
            <h1>&#9638;</h1>
            <p>poem grid</p>
          </div>
        </div>

        <div className='tagcloud'>
          <p className='has-text-centered'>
            {/* {this.state.tags.map(tag =>
              <Link to={`/tags/${tag.noun}`} key={tag._id}>
                <span className="hashtag">
                #{tag.noun}
                </span>
              </Link>
            )} */}

            {Object.keys(this.state.frequencyArray).map(x =>
              <Link to={`/tags/${x}`} key={x}>
                {this.state.frequencyArray[x] < 3 &&
                <span className="hashtag indigo">
                #{x}
                </span>}
                {this.state.frequencyArray[x] === 3 &&
                <span className="hashtag blue">
                #{x}
                </span>}
                {this.state.frequencyArray[x] === 4 &&
                <span className="hashtag green">
                #{x}
                </span>}
                {this.state.frequencyArray[x] === 5 &&
                <span className="hashtag yellow">
                #{x}
                </span>}
                {this.state.frequencyArray[x] === 6 &&
                <span className="hashtag orange">
                #{x}
                </span>}
                {this.state.frequencyArray[x] > 6 &&
                <span className="hashtag red">
                #{x}
                </span>}


              </Link>
            )}
          </p>
        </div>

        <div className='poemgrid'>
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
