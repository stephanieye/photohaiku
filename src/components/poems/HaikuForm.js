import React from 'react';

const HaikuForm = ({ handleHaikuSubmit, errors, noun1sarray, noun2sarray, noun3sarray, adj1sarray, adj2sarray, adj3sarray }) => {
  const formInvalid = Object.keys(errors).some(key => errors[key]);
  return (
    <form onSubmit={handleHaikuSubmit}>
      <div className="field">
        <input id="line1" name="line1" className="line1"  value={noun1sarray[0]}/>
        {errors.name && <small>{errors.name}</small>}
      </div>
      <div className="field">
        <input id="line2" name="line2" className="line2" value={noun2sarray[0]}/>
        {errors.name && <small>{errors.name}</small>}
      </div>
      <div className="field">
        <input id="line3" name="line3" className="line3" value={adj1sarray[0]}/>
        {errors.name && <small>{errors.name}</small>}
      </div>



      <button disabled={ formInvalid } className="button is-primary">Submit</button>
    </form>
  );
};

export default HaikuForm;
