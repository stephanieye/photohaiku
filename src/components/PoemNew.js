import React from 'react';
import axios from 'axios';
import Form from './users/Form';
import Auth from '../lib/Auth';


class PoemNew extends React.Component {

  state = {
    user: null,
    errors: {},
    poem: {},
    blank: 0,
    nounscollection: [],
    adjectivescollection: [],
    noun1sarray: [],
    noun2sarray: [],
    noun3sarray: [],
    adj1sarray: [],
    adj2sarray: [],
    adj3sarray: []
  }

  componentDidMount() {
    axios.get(`/api/users/${Auth.getPayload().sub}`)
      .then(res => {
        this.setState({user: res.data});
      });
  }

  handleChange = ({ target: { name, value } }) => {
    const poem = {...this.state.poem, [name]: value};
    this.setState({ poem, [name]: value });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`/api/users/${Auth.getPayload().sub}/poems`, this.state.poem, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => {
        this.setState({user: res.data, poem: {} });
        const newku = this.state.user.poems[(this.state.user.poems.length)-1];
        this.makenounsarrays(newku);
        this.makeadjectivesarrays0(newku);
        this.makeadjectivesarrays1(newku);
        if (this.state.blank === 0) {
          document.getElementsByClassName('kudisplay')[0].style.display = 'block';
          document.getElementsByClassName('kuform')[0].style.display = 'none';
          this.setState({blank: 1});
        }
      })
      .then(()=> {
        console.log('noun1', this.state.noun1sarray);
        console.log('noun2', this.state.noun2sarray);
        console.log('noun3', this.state.noun3sarray);
        console.log('adj1', this.state.adj1sarray);
        console.log('adj2', this.state.adj2sarray);
        console.log('adj3', this.state.adj3sarray);
      })
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  makeadjectivesarrays0 = (newku) => {
    var string = newku.nouns[0];
    var stringplus = string.replace(/\s+/g, '+');
    axios.get(`http://api.datamuse.com/words?rel_jjb=${stringplus}&md=s&max=20`)
      .then(res => {
        this.setState({adjectivescollection: res.data});
        this.state.adjectivescollection.forEach((adj) => {
          if (adj.numSyllables === 1) {
            this.state.adj1sarray.push(adj.word);
          } else if (adj.numSyllables === 2) {
            this.state.adj2sarray.push(adj.word);
          } else if (adj.numSyllables === 3) {
            this.state.adj3sarray.push(adj.word);
          }
        }
        );
      });
  }

  makeadjectivesarrays1 = (newku) => {
    var string = newku.nouns[1];
    var stringplus = string.replace(/\s+/g, '+');
    axios.get(`http://api.datamuse.com/words?rel_jjb=${stringplus}&md=s&max=20`)
      .then(res => {
        this.setState({adjectivescollection: res.data});
        this.state.adjectivescollection.forEach((adj) => {
          if (adj.numSyllables === 1) {
            this.state.adj1sarray.push(adj.word);
          } else if (adj.numSyllables === 2) {
            this.state.adj2sarray.push(adj.word);
          } else if (adj.numSyllables === 3) {
            this.state.adj3sarray.push(adj.word);
          }
        }
        );
      });
  }


  makenounsarrays = (newku) => {
    newku.nouns.forEach((noun) => {
      if(noun.length <= 3 || ((noun.length === 4) && (noun.slice(-1) === 'e'))) {
        this.state.noun1sarray.push(noun);
      } else {
        const noun1 = noun.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        const noun2 = noun1.replace(/^y/, '');
        const syllables = noun2.match(/[aeiouy]{1,2}/g).length;
        if (syllables === 2) {
          this.state.noun2sarray.push(noun);
        } else if (syllables === 3) {
          this.state.noun3sarray.push(noun);
        }
      }
    });
  }


  reset = () => {
    location.reload();
  }


  render() {
    const {user} = this.state;
    if(!user) return null;
    const ku = this.state.user.poems[(this.state.user.poems.length)-1];

    return (
      <section>
        <h1>Create a haiku</h1>

        {ku && <div className='kudisplay'>
          <div className="card">
            <div className="card-image" style={{ backgroundImage: `url(${ku.image})` }}>
            </div>
            <div className="card-content">
              <div className="content">
                <p className="subtitle is-6">{ku.nouns[0]}</p>
                <p className="subtitle is-6">{ku.nouns[1]}</p>
                <p className="subtitle is-6">{ku.nouns[2]}</p>
                <p className="subtitle is-6">{ku.nouns[3]}</p>
                <p className="subtitle is-6">{ku.nouns[4]}</p>
                <p className="subtitle is-6">{ku.nouns[5]}</p>
                <p className="subtitle is-6">{ku.nouns[6]}</p>
                <p className="subtitle is-6">{ku.nouns[7]}</p>
                <p className="subtitle is-6">{ku.nouns[8]}</p>
                <p className="subtitle is-6">{ku.nouns[9]}</p>
                <p className="subtitle is-6">{ku.nouns[10]}</p>
              </div>
            </div>
          </div>
          <button onClick={this.reset}>Reset</button>
        </div> }


        {<div className='kuform'>
          <Form
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            errors={this.state.errors}
            poem={this.state.poem}
          />
        </div>}

      </section>
    );
  }
}

export default PoemNew;
