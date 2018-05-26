import React from 'react';
import axios from 'axios';
import Form from './Form';
import Auth from '../../lib/Auth';


class PoemNew extends React.Component {

  state = {
    user: null,
    errors: {},
    poem: {},
    haiku: {
      line1: '',
      line2: '',
      line3: ''
    },
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
    axios.post('/api/poems', this.state.poem, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => {
        this.setState({poem: res.data});
        // const newku = this.state.user.poems[(this.state.user.poems.length)-1];
        this.makenounsarrays();
      });
    // .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  makenounsarrays = () => {
    const poem = this.state.poem;
    console.log(poem);
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
    return this.makeadjectivesarrays0();
  }



  makeadjectivesarrays0 = () => {
    const poem = this.state.poem;
    var string = poem.nouns[0];
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
      });
    return this.makeadjectivesarrays1();
  }

  makeadjectivesarrays1 = () => {
    const poem = this.state.poem;
    var string = poem.nouns[1];
    var stringplus = string.replace(/\s+/g, '+');
    axios.get(`http://api.datamuse.com/words?rel_jjb=${stringplus}&md=s&max=5`)
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
    return this.makehaiku();
  }



  makehaiku = () => {
    const a = this.state;
    console.log('adj1', a.adj1sarray);
    console.log('adj2', a.adj2sarray);
    console.log('adj3', a.adj3sarray);
    this.setState(prevState => ({
      haiku: {
        ...prevState.haiku,
        line1: a.noun1sarray[0],
        line2: a.noun2sarray[0],
        line3: a.adj3sarray[0]
      }
    }));
    console.log('here is the haiku', this.state.haiku);
    return this.handleHaikuSubmit();
  }


  handleHaikuSubmit = () => {
    const poem = this.state.poem;
    axios.post(`/api/poems/${poem._id}/haiku`, this.state.haiku, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => {
        this.setState({poem: res.data, haiku: {} });
        // if (this.state.blank === 0) {
        //   document.getElementsByClassName('poemdisplay')[0].style.display = 'block';
        //   document.getElementsByClassName('poemform')[0].style.display = 'none';
        //   this.setState({blank: 1});
      }
      )
      .then(() => this.props.history.push(`/poems/${poem._id}`));
    // .catch(err => this.setState({ errors: err.response.data.errors }));
  }





  reset = (poem) => {
    axios.delete(`/api/poems/${poem._id}`
      , {
        headers: {Authorization: `Bearer ${Auth.getToken()}`
        }
      }
    )
      .then(res => this.setState({poems: res.data}))
      .then(location.reload());
  }


  render() {
    const {user} = this.state;
    if(!user) return null;
    const poem = this.state.poem;

    return (
      <section>
        <h1 className='title is-1'>Create a photohaiku</h1>

        {/* {poem && <div className='poemdisplay'>
          <div className="card">
            <div className="card-image" style={{ backgroundImage: `url(${poem.image})` }}>
            </div>
            <div className="card-content">
              <div className="content">
                <p>Thank you for your photo!</p>
                {/* <p> {poem.haiku[0].line1} </p>
                <p> {poem.haiku[0].line2} </p>
                <p> {poem.haiku[0].line3} </p> */}
              {/* </div>
            </div>
          </div>
          <button className='button is-primary'>Create my haiku</button>
          <button className='button is-danger' onClick={() => {
            this.reset(poem);
          }}>I would like to start over again</button>
        </div> } */}


        <div className='poemform'>
          <h2 className='title is-2'>First, submit a photo:</h2>
          <Form
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            errors={this.state.errors}
            poem={this.state.poem}
          />
        </div>


      </section>
    );
  }
}

export default PoemNew;
