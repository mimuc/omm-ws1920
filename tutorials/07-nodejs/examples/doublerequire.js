// lib.js 
function double(x) {
	return x * 2;
}

module.exports = {
	double: double,
};


// main.js
var double = require('lib').double;
console.log(double(2));