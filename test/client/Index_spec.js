/* global describe, it, before, after, beforeEach */

/* global describe, it */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

// import components
import PoemsIndex from '../../src/components/poems/PoemIndex';
// import App from '../src/app';



describe('PoemsIndex', () => {

  it('should display the tag cloud', done => {
    const wrapper = shallow(<PoemsIndex />);
    expect(wrapper.find('.tagcloud').length).to.eq(1);
    done();
  });



  // it('should display 6 poem cards', done => {
  //   promise.then(() => {
  //     expect(wrapper.find('.card').length).to.eq(poemData.length);
  //     done();
  //   });
  // });
  //
  // xit('should display the correct image for each poem', done => {
  //   promise.then(() => {
  //     _.orderBy(poemData, 'index', 'asc').forEach((poem, index) => {
  //       expect(wrapper.find('.card-image').at(index).prop('style').backgroundImage).to.include(poem.image);
  //       done();
  //     });
  //     done();
  //   });
  // });
  //
  // xit('should create a link for each poem', done => {
  //   promise.then(() => {
  //     poemData.forEach(poem => {
  //       expect(wrapper.find({ href: `/poems/${poem._id}`}).length).to.eq(1);
  //     });
  //     done();
  //   });
  //   // done();
  // });

});
