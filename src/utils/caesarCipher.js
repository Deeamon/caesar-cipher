const arrayOfSymbols = require('./arrayOfSymbols');

//actions
const ENCODE = 'encode';
const DECODE = 'decode';

const encode = (symbol, shift) => {
  const indexOfSymbol = arrayOfSymbols.indexOf(symbol.toLowerCase());
  const newIndex = (indexOfSymbol + shift) % arrayOfSymbols.length;
  const codeOfEncodedSymbol = arrayOfSymbols[newIndex].charCodeAt(0);
  const dif = codeOfEncodedSymbol - symbol.toLowerCase().charCodeAt(0);
  return String.fromCharCode(symbol.charCodeAt(0) + dif);
};

const decode = (symbol, shift) => {
  const indexOfSymbol = arrayOfSymbols.indexOf(symbol.toLowerCase());
  let newIndex = indexOfSymbol - shift;
  if (shift > arrayOfSymbols.length) {
    newIndex = indexOfSymbol - (shift % arrayOfSymbols.length);
  }
  if (newIndex < 0) {
    newIndex = arrayOfSymbols.length - Math.abs(newIndex);
  }
  const codeOfDecodedSymbol = arrayOfSymbols[newIndex].charCodeAt(0);
  const dif = symbol.toLowerCase().charCodeAt(0) - codeOfDecodedSymbol;
  return String.fromCharCode(symbol.charCodeAt(0) - dif);
};

const caesarCipher = (text, shift, action) => {
  const textArr = text.toString().split('');

  return textArr
    .map((symbol) => {
      if (!arrayOfSymbols.includes(symbol.toLowerCase())) return symbol;

      if (action === ENCODE) {
        return encode(symbol, shift);
      }

      if (action === DECODE) {
        return decode(symbol, shift);
      }
    })
    .join('');
};

module.exports = caesarCipher;
