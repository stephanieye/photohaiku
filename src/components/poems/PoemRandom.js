import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class PoemRandom extends React.Component {
  state = {
    poems: [],
    poem: {}
  }

  componentDidMount() {
    axios.get('/api/poems')
      .then(res => {
        this.setState({poems: res.data});
        const length = this.state.poems.length;
        return length;
      })
      .then(length => {
        const random = Math.floor(Math.random()*(length));
        console.log(random);
        return random;
      })
      .then(random => {
        this.setState({poem: this.state.poems[random]});
        console.log(this.state.poem);
        console.log(this.state.poem.poet.username);
      });
  }

  render() {
    const poem = this.state.poem;
    if(!poem.poet) return null;

    return (
      <section>
        <div className='columns is-variable is-8 reverse'>

          <div className='column'>
            <div className="card">
              <Link to={`/poems/${poem._id}`}>
                <div className="card-image"
                  style={{ backgroundImage: `url(${poem.image})` }}
                ></div></Link>
              <div className="card-content">
                <h3>{poem.poet.username}</h3>
                <p className="subtitle is-6">{poem.createdAtRelative}</p>
                <div>
                  <p> {poem.haiku[0].line1} </p>
                  <p> {poem.haiku[0].line2} </p>
                  <p> {poem.haiku[0].line3} </p>
                </div>
              </div>
            </div>
          </div>

          <div className='column'>
            <h3>photo</h3>
            <p>/ˈfəʊtəʊ/</p>
            <p>a picture made using a camera.</p>
            <br />
            <h3>haiku</h3>
            <p>/ˈhʌɪkuː/</p>
            <p>a japanese poem of 17 syllables, in three lines of five, seven, and five.</p>
            <br />
            <h3>photohaiku</h3>
            <p>/ˈfəʊtəʊˈhʌɪkuː/</p>
            <p>an original haiku based on a submitted photo, created by the photohaiku robot using image content analysis, lexicon-based algorithms, and the poetic muse.</p>
          </div>
        </div>
      </section>
    );
  }
}

export default PoemRandom;
