import React from 'react';

const Form = ({ handleChange, handleSubmit, handleProcess, poem }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="image">image url</label>
        <input id="image" name="image" className="input" placeholder="image url"  onChange={handleChange}  value={poem.image || ''}/>
      </div>

      <button className="button is-create" onClick={handleProcess}>submit</button>
    </form>
  );
};

export default Form;
