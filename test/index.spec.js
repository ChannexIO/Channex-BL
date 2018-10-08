/* global describe, it, before */

import chai from 'chai';
import ChannexBL from '../lib/channex-bl.js';

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of my ChannexBL library', () => {
  before(() => {
    lib = new ChannexBL();
  });
  describe('when I need the name', () => {
    it('should return the name', () => {
      expect(lib.name).to.be.equal('Cat');
    });
  });
});
