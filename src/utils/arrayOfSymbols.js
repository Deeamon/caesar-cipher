const arrayOfSymbols = [];

const startSymbol = 'a'.charCodeAt(0);
const endSymbol = 'z'.charCodeAt(0);

for (let i = startSymbol; i <= endSymbol; i++) {
  arrayOfSymbols.push(String.fromCharCode(i));
}

module.exports = arrayOfSymbols;
