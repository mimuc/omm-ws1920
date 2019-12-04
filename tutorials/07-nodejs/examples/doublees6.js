
// lib.js
export function double(x) {
	return x * 2
}

// main.js
import {double} from 'lib';
console.log(double(2));