/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {
    if(/\/.*\//g.test(input)) return false;
    if(!/[0-9]{1,99}\s?[.]?\/?[0-9]?[A-Za-z]/g.test(input)) return 1;
    input = input.replace(/\s/g, '');
    let re = /[A-Za-z]/gi.exec(input);
    let lastIdx = re !== null ? re.index : input.length - 1;
    let num = input.slice(0, lastIdx);
    if(/\//g.test(num)){
      let n = num.split('/');
      num = +((+n[0] / +n[1]).toFixed(5));
    }
    return +num;
  };
  
  this.getUnit = function(input) {    
    if(!/[0-9]?\s?[.]?\/?[A-Za-z]{1,3}/g.test(input)) return false;
    input = input.replace(/\s/g, '');
    let re = /[A-Za-z]/gi.exec(input);
    let firstIdx = re !== null ? re.index : 0;
    let unit = input.slice(firstIdx, input.length);
    if(!/\b(L|gal|kg|lbs|km|mi)\b/i.test(unit)) return false;
    return unit;
  };
  
  this.getReturnUnit = initUnit => {
    if(!initUnit) return false;
    let init = initUnit.toLowerCase();
    switch(init) {
      case 'l':
        return 'gal';
      case 'gal':
        return 'l';
      case 'kg':
        return 'lbs';
      case 'lbs':
        return 'kg';
      case 'km':
        return 'mi';
      case 'mi':
        return 'km';
    }
  };

  this.spellOutUnit = unit => {
    if(!unit) return false;
    unit = unit.toLowerCase();
    switch(unit) {
      case 'l':
        return 'liters';
      case 'gal':
        return 'gallons';
      case 'kg':
        return 'kilograms';
      case 'lbs':
        return 'pounds';
      case 'km':
        return 'kilometers';
      case 'mi':
        return 'miles';
    }
  };
  
  this.convert = (initNum, initUnit) => {
    if(!initUnit || !initNum) return false;
    let num = initNum;
    initUnit = initUnit.toLowerCase(); 
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch(initUnit) {
      case 'l':
        return +(num/galToL).toFixed(5);
      case 'gal':
        return +(num * galToL).toFixed(5);
      case 'kg':
        return +(num/lbsToKg).toFixed(5);
      case 'lbs':
        return +(num * lbsToKg).toFixed(5);
      case 'km':
        return +(num / miToKm).toFixed(5);
      case 'mi':
        return +(num * miToKm).toFixed(5);
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
