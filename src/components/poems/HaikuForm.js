import React from 'react';

const HaikuForm = ({ handleHaikuChange, handleHaikuSubmit, haiku, errors }) => {
  const formInvalid = Object.keys(errors).some(key => errors[key]);
  return (
    <form onSubmit={handleHaikuSubmit}>
      <div className="field">
        <label htmlFor="line1">line1</label>
        <input id="line1" name="line1" className="line1" placeholder="line1"  onChange={handleHaikuChange}  value={haiku.line1 || ''}/>
        {errors.name && <small>{errors.name}</small>}
      </div>

      <button disabled={ formInvalid } className="button is-primary">Submit</button>
    </form>
  );
};

export default HaikuForm;
