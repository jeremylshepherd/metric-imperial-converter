/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/
'use strict';

const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('Unit Tests', () => {
  
  suite('Function convertHandler.getNum(input)', () => {
    
    test('Whole number input', done => {
      let input = '32L';
      assert.equal(convertHandler.getNum(input), 32, 'Should return a whole number');
      done();
    });
    
    test('Decimal Input', done => {
      let input = "33.3gal";
      assert.equal(convertHandler.getNum(input), 33.3, 'Should return a float');
      done();
    });
    
    test('Fractional Input', done => {
      let input = "33/3km";
      assert.equal(convertHandler.getNum(input), 11, 'Fraction Should return a number');
      done();
    });
    
    test('Fractional Input w/ Decimal', done => {
      let input = "10.2/2kg";
      assert.equal(convertHandler.getNum(input), 5.1, 'Should return a fraction with a decimal');
      done();
    });
    
    test('Invalid Input (double fraction)', done => {
      let input = '33.3//5gal';
      assert.equal(convertHandler.getNum(input), false, `${input} should return false.`);
      done();
    });
    
    test('No Numerical Input', done => {
      let input = 'gal';
      assert.equal(convertHandler.getNum(input), 1, `${input} should return 1.`);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', () => {
    
    test('For Each Valid Unit Inputs', done => {
      let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach((ele) => {
        assert.equal(convertHandler.getUnit(ele), ele, `${ele} should return ${ele}.`);
      });
      done();
    });
    
    test('Unknown Unit Input', done => {
      let input = 'gallons';
      assert.equal(convertHandler.getUnit(input), false, `An unknown unit should return false.`);
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', () => {
    
    test('For Each Valid Unit Inputs', done => {
      let input = ['gal','l','mi','km','lbs','kg'];
      let expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i], `${ele} input unit should return ${expect[i]}.`);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', () => {
    
    test('For Each Valid Unit Inputs', done => {
      let input = ['L','gal','km','mi','kg','lbs'];
      let expect = ['liters','gallons','kilometers','miles','kilograms','pounds'];
      input.forEach((ele, i) => assert.equal(convertHandler.spellOutUnit(ele), expect[i], `${ele} as input unit should return ${expect[i]}.`));
      done();
    });    
  });
  
  suite('Function convertHandler.convert(num, unit)', () => {
    
    test('Gal to L', done => {
      let input = [5, 'gal'];
      let expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', done => {
      let input = [5, 'l'];
      let expected = 1.32087;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Mi to Km', done => {
      let input = [5, 'mi'];
      let expected = 8.0467;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Km to Mi', done => {
      let input = [5, 'km'];
      let expected = 3.10687;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Lbs to Kg', done => {
      let input = [5, 'lbs'];
      let expected = 2.26796;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Kg to Lbs', done => {
      let input = [5, 'kg'];
      let expected = 11.02312;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
  });

});