import React from 'react';
import axios from 'axios';
import Form from './Form';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';


class PoemNew extends React.Component {

  state = {
    user: null,
    poem: {},
    nounscollection: [],
    adjectivescollection: [],
    noun1sarray: ['place', 'thing'],
    noun2sarray: ['locale', 'object'],
    noun3sarray: ['location', 'material'],
    adj1sarray: ['good', 'bad'],
    adj2sarray: ['lovely', 'horrid'],
    adj3sarray: ['excellent', 'disgusting'],
    haiku: {
      line1: '',
      line2: '',
      line3: '',
      attr: ''
    }
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

  handleProcess = () => {
    document.getElementsByClassName('poemform')[0].style.display = 'none';
    document.getElementsByClassName('instructions')[0].style.display = 'none';
    document.getElementsByClassName('process')[0].style.display = 'block';
  }

  handleRefresh = () => {
    document.getElementsByClassName('poemform')[0].style.display = 'block';
    document.getElementsByClassName('instructions')[0].style.display = 'block';
    document.getElementsByClassName('process')[0].style.display = 'none';
  }



  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/poems', this.state.poem, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => {
        this.setState({poem: res.data});
        const poem = this.state.poem;
        this.makenounsarrays(poem);
        this.makeadjectivesarrays0(poem);
        this.makeadjectivesarrays1(poem);
      })
      .catch(()=> {
        Flash.setMessage('denied', 'sorry, the photohaiku robot does not like that photo. please try again.');
        this.handleRefresh();
        this.props.history.replace('/createpoem');
      });
  }

  makenounsarrays = (poem) => {
    poem.nouns.forEach((noun) => {
      if(noun.length <= 3 ||
        ((noun.length === 4) && (noun.slice(-1) === ('e'))) ||
        ((noun.length === 4) && (noun.slice(-1) === ('t')))) {
        this.state.noun1sarray.unshift(noun);
      } else {
        const noun1 = noun.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        const noun2 = noun1.replace(/^y/, '');
        const syllables = noun2.match(/[aeiouy]{1,2}/g).length;
        if (syllables === 2) {
          this.state.noun2sarray.unshift(noun);
        } else if (syllables === 3) {
          this.state.noun3sarray.unshift(noun);
        }
      }
    });
  }



  makeadjectivesarrays0 = (poem) => {
    var string = poem.nouns[0];
    var stringplus = string.replace(/\s+/g, '+');
    axios.get(`http://api.datamuse.com/words?rel_jjb=${stringplus}&md=s&max=20`)
      .then(res => {
        this.setState({adjectivescollection: res.data});
        this.state.adjectivescollection.forEach((adj) => {
          if (adj.numSyllables === 1) {
            this.state.adj1sarray.unshift(adj.word);
          } else if (adj.numSyllables === 2) {
            this.state.adj2sarray.unshift(adj.word);
          } else if (adj.numSyllables === 3) {
            this.state.adj3sarray.unshift(adj.word);
          }
        }
        );
      });
  }

  makeadjectivesarrays1 = (poem) => {
    var string = poem.nouns[1];
    var stringplus = string.replace(/\s+/g, '+');
    axios.get(`http://api.datamuse.com/words?rel_jjb=${stringplus}&md=s&max=10`)
      .then(res => {
        this.setState({adjectivescollection: res.data});
        this.state.adjectivescollection.forEach((adj) => {
          if (adj.numSyllables === 1) {
            this.state.adj1sarray.unshift(adj.word);
          } else if (adj.numSyllables === 2) {
            this.state.adj2sarray.unshift(adj.word);
          } else if (adj.numSyllables === 3) {
            this.state.adj3sarray.unshift(adj.word);
          }
        }
        );
        return this.state.adj3sarray;
      })
      .then(() => {
        const a = this.state;
        console.log('noun1', a.noun1sarray);
        console.log('noun2', a.noun2sarray);
        console.log('noun3', a.noun3sarray);
        console.log('adj1', a.adj1sarray);
        console.log('adj2', a.adj2sarray);
        console.log('adj3', a.adj3sarray);
        return a.adj3sarray;
      })
      .then(() => this.makehaiku());
  }



  makehaiku = () => {
    // const random = 10;
    const random = Math.floor(Math.random()*11);
    const n1 = this.state.noun1sarray;
    const n2 = this.state.noun2sarray;
    const n3 = this.state.noun3sarray;
    const a1 = this.state.adj1sarray;
    const a2 = this.state.adj2sarray;
    const a3 = this.state.adj3sarray;
    if (random === 0) {
      this.setState(prevState => ({
        haiku: {
          ...prevState.haiku,
          line1: `to ${n2[0]} or not`,
          line2: `to ${n2[0]}: only the ${n1[0]}`,
          line3: 'would ask that question',
          attr: '(with apologies to william shakespeare)'
        }
      })
      );
    } else if (random === 1) {
      this.setState(prevState => ({
        haiku: {
          ...prevState.haiku,
          line1: `you say ${n3[0]}`,
          line2: `i say ${a3[0]} ${n2[0]} -`,
          line3: 'i am right, of course!',
          attr: '(with apologies to ira gershwin)'
        }
      })
      );
    } else if (random === 2) {
      this.setState(prevState => ({
        haiku: {
          ...prevState.haiku,
          line1: 'life: nothing more than',
          line2: `${n3[0]}s on the ${n2[0]}...`,
          line3: `but so ${a3[0]}!`,
          attr: '(with apologies to nishiyama soin)'
        }
      })
      );
    } else if (random === 3) {
      this.setState(prevState => ({
        haiku: {
          ...prevState.haiku,
          line1: `do not weep, ${n2[0]} -`,
          line2: `${n3[0]}s and ${n1[0]}s themselves`,
          line3: 'eventually part.',
          attr: '(with apologies to kobayashi issa)'
        }
      })
      );
    } else if (random === 4) {
      this.setState(prevState => ({
        haiku: {
          ...prevState.haiku,
          line1: `behold: the ${n2[0]}`,
          line2: `dreaming that it is the ${n1[0]}:`,
          line3: `isn't that ${a2[0]}?`
        }
      })
      );
    } else if (random === 5) {
      this.setState(prevState => ({
        haiku: {
          ...prevState.haiku,
          line1: `look at this ${n2[0]}:`,
          line2: `so ${a2[0]} and ${a3[0]}.`,
          line3: `that's what i call ${n1[0]}!`
        }
      })
      );
    } else if (random === 6) {
      this.setState(prevState => ({
        haiku: {
          ...prevState.haiku,
          line1: `i dreamed of ${n2[0]}`,
          line2: `now all is ${a1[0]} ${n3[0]}:`,
          line3: 'story of my life!'
        }
      })
      );
    } else if (random === 7) {
      this.setState(prevState => ({
        haiku: {
          ...prevState.haiku,
          line1: `sing, my ${a1[0]} ${n2[0]}!`,
          line2: `let my ${n1[0]} accompany`,
          line3: `your ${a2[0]} ${n2[1]}.`,
          attr: '(with apologies to sappho)'
        }
      })
      );
    } else if (random === 8) {
      this.setState(prevState => ({
        haiku: {
          ...prevState.haiku,
          line1: 'so much depends on',
          line2: `the ${a3[0]} ${n3[0]}`,
          line3: `beside the ${n2[0]}.`,
          attr: '(with apologies to william carlos williams)'
        }
      })
      );
    } else if (random === 9) {
      this.setState(prevState => ({
        haiku: {
          ...prevState.haiku,
          line1: 'let us not speak of',
          line2: `the ${a2[0]} ${n2[0]}; instead`,
          line3: `mind your ${n3[0]}.`
        }
      })
      );
    } else {
      this.setState(prevState => ({
        haiku: {
          ...prevState.haiku,
          line1: `you love ${n3[0]}...`,
          line2: 'but not as much as i love',
          line3: `${a3[0]} ${n2[0]}!`
        }
      })
      );
    }
    return this.handleHaikuSubmit();
  }


  handleHaikuSubmit = () => {
    const poem = this.state.poem;
    axios.post(`/api/poems/${poem._id}/haiku`, this.state.haiku, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => {
        this.setState({poem: res.data, haiku: {} });
      }
      )
      .then(() => this.props.history.push(`/poems/${poem._id}`))
      .catch(()=> {
        Flash.setMessage('denied', 'sorry, the photohaiku robot does not like that photo. please try again.');
        this.props.history.replace('/createpoem');
      });
  }


  render() {
    const {user} = this.state;
    if(!user) return null;

    return (
      <section>
        <div className='instructions'>
          <p>give me a photo</p>
          <p>and i will create for you</p>
          <p>a bespoke haiku.</p>
          <p className='subtitle is-6'>&hearts; <span className='italics'>the photohaiku robot</span></p>
        </div>

        <div className='process'>
          <p>your humble servant</p>
          <p>performs poetic labours:</p>
          <p>thanks for your patience.</p>
          <p className='subtitle is-6'>&hearts; <span className='italics'>the photohaiku robot</span></p>
          <img className='loading' src='images/loading.gif' />
        </div>

        <div className='poemform'>
          <Form
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleProcess={this.handleProcess}
            poem={this.state.poem}
          />
        </div>

      </section>
    );
  }
}

export default PoemNew;
