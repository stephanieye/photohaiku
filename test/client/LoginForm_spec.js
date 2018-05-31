/* global describe, it */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Form from '../../src/components/auth/Form';

describe('Form', () => {
  it('should render 2 input fields', done => {
    const state = {};
    const component = shallow(<Form data={state} />);

    expect(component.find('input').length).to.eq(2);
    done();
  });

  it('should populate the form', done=> {
    const state = {
      email: 'jane@email.com',
      password: 'a'
    };
    const component = shallow(<Form data={state} errors={state.errors} />);
    expect(component.find({name: 'email'}).length).to.eq(1);
    expect(component.find({name: 'password'}).length).to.eq(1);
    done();
  });

});
