import React from 'react';

const CommentForm = ({ handleChange, handleSubmit, errors, comment }) => {
  const formInvalid = Object.keys(errors).some(key => errors[key]);
  return (
    <form onSubmit={handleSubmit}>
      <h1 className="title is-1">Post a comment</h1>
      <div className="field">
        <label htmlFor="content">Content</label>
        <input id="content" name="content" className="input" placeholder="Content"  onChange={handleChange}  value={comment.content || ''}/>
        {errors.name && <small>{errors.name}</small>}
      </div>


      <div className="field">
        <label htmlFor="rating">Rating</label>
        <div className="control">
          <div className="select" onChange={handleChange} >
            <select id="rating" name="rating" value={comment.rating || ''}>
              <option>Please select</option>
              <option value="1">⭐️</option>
              <option value="2">⭐️⭐️</option>
              <option value="3">⭐️⭐️⭐️</option>
              <option value="4">⭐️⭐️⭐️⭐️</option>
              <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
            </select>
          </div>
        </div>
        {errors.name && <small>{errors.name}</small>}
      </div>
      <button disabled={ formInvalid } className="button is-primary">Submit</button>
    </form>
  );
};

export default CommentForm;
