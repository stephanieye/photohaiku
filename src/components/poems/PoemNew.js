import React from 'react';
import axios from 'axios';
import Form from './Form';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';


class PoemNew extends React.Component {

  state = {
    user: null,
    errors: {},
    poem: {},
    nounscollection: [],
    adjectivescollection: [],
    noun1sarray: [],
    noun2sarray: [],
    noun3sarray: [],
    adj1sarray: [],
    adj2sarray: [],
    adj3sarray: [],
    haiku: {
      line1: '',
      line2: '',
      line3: ''
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
        Flash.setMessage('danger', 'Sorry, the photohaiku robot does not like that photo. Please try again!');
        this.props.history.replace('/createpoem');
      });
  }

  makenounsarrays = (poem) => {
    poem.nouns.forEach((noun) => {
      if(noun.length <= 3 ||
        ((noun.length === 4) && (noun.slice(-1) === ('e'))) ||
        ((noun.length === 4) && (noun.slice(-1) === ('t')))) {
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
      const a = this.state;
      console.log('noun1', a.noun1sarray);
      console.log('noun2', a.noun2sarray);
      console.log('noun3', a.noun3sarray);
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

  makeadjectivesarrays1 = (poem) => {
    var string = poem.nouns[1];
    var stringplus = string.replace(/\s+/g, '+');
    axios.get(`http://api.datamuse.com/words?rel_jjb=${stringplus}&md=s&max=10`)
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
        return this.state.adj1sarray;
      })
      .then(() => {
        console.log('adj1', this.state.adj1sarray);
        console.log('adj2', this.state.adj2sarray);
        console.log('adj3', this.state.adj3sarray);
        this.makehaiku();
      });
  }



  makehaiku = () => {
    const a = this.state;
    const random = Math.floor(Math.random()*10);
    if (random % 2 === 0) {
      this.setState(prevState => ({
        haiku: {
          ...prevState.haiku,
          line1: `oh how i like the ${a.noun1sarray[0]}`,
          line2: `it is so ${a.noun2sarray[0]} is it not`,
          line3: `lovely ${a.adj1sarray[0]} lalala`
        }
      })
      );
    } else if (random % 2 !== 0) {
      this.setState(prevState => ({
        haiku: {
          ...prevState.haiku,
          line1: `what is the ${a.noun1sarray[0]}`,
          line2: `what is the ${a.noun2sarray[0]} is it not`,
          line3: `lovely jubbly ${a.adj1sarray[0]} fafafa`
        }
      })
      );
    }
    // console.log('here is the haiku', this.state.haiku);
    this.handleHaikuSubmit();
  }
  // makehaiku = () => {
  //   const a = this.state;
  //   this.setState(prevState => ({
  //     haiku: {
  //       ...prevState.haiku,
  //       line1: a.noun1sarray[0],
  //       line2: a.noun2sarray[0],
  //       line3: a.adj3sarray[0]
  //     }
  //   }));
  //   // console.log('here is the haiku', this.state.haiku);
  //   this.handleHaikuSubmit();
  // }


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
        Flash.setMessage('danger', 'Sorry, the photohaiku robot does not like that photo. Please try again!');
        this.props.history.replace('/createpoem');
      });
  }


  render() {
    const {user} = this.state;
    if(!user) return null;

    return (
      <section>
        <h1 className='title is-1'>Submit a photo</h1>

        <div className='poemform'>
          <Form
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            errors={this.state.errors}
            poem={this.state.poem}
          />
        </div>

        {/* <button onClick={this.makehaiku}>make haiku</button> */}
      </section>
    );
  }
}

export default PoemNew;
