const { expect } = require('chai');
const compileClue = require('./compile-clue');

//  Clues should look like this:
//    "<Number>. Clue Text (<Answer structure>)"

describe('compileClue', () => {
  it('should fail if no clue is provided', () => {
    expect(() => { compileClue(); }).to.throw('\'clue\' is required');
  });

  it('should fail if the clue number is not provided', () => {
    expect(() => { compileClue('Red or green fruit (5)'); }).to.throw('Clue \'Red or green fruit (5)\' does not meet the required structured \'<Number>. Clue Text (<Answer structure>)\'');
  });

  it('should fail if the clue number is not numeric', () => {
    expect(() => { compileClue('a. Red or green fruit (5)'); }).to.throw('Clue \'a. Red or green fruit (5)\' does not meet the required structured \'<Number>. Clue Text (<Answer structure>)\'');
  });

  it('should fail if the answer structure is not provided', () => {
    expect(() => { compileClue('3. Red or green fruit'); }).to.throw('Clue \'3. Red or green fruit\' does not meet the required structured \'<Number>. Clue Text (<Answer structure>)\'');
  });

  it('should fail if the answer structure is not numeric', () => {
    expect(() => { compileClue('3. Red or green fruit (a)'); }).to.throw('Clue \'3. Red or green fruit (a)\' does not meet the required structured \'<Number>. Clue Text (<Answer structure>)\'');
  });

  it('should compile the number and answer lengths of a clue string', () => {
    const clueModel = compileClue('3. Red or green fruit (5)');
    expect(clueModel.number).to.eql(3);
    // expect(clueModel.clue).to.eql('Red or green fruit ');
    expect(clueModel.length).to.eql([5]);
  });
});
