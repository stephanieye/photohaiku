import React from 'react';

const Form = ({ handleChange, handleSubmit, data, errors }) => {
  const formInvalid = Object.keys(errors).some(key => errors[key]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="image">Image</label>
        <input id="image" name="image" className="input" placeholder="image"  onChange={handleChange}  value={data.image || ''}/>
        {errors.name && <small>{errors.name}</small>}
      </div>

      <div className="field">
        <label htmlFor="haiku">Haiku</label>
        <input id="haiku" name="haiku" className="input" placeholder="haiku"  onChange={handleChange} value={data.haiku || ''}/>
        {errors.name && <small>{errors.name}</small>}
      </div>

      <button disabled={ formInvalid } className="button is-primary">Submit</button>
    </form>
  );
};

export default Form;
