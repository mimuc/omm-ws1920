# Assignment 03 - Task 01

Snippet:

```js
setTimeout(() => { 
  console.log('timer') 
  Promise.resolve().then(() => console.log('promise1')) 
}, 0) 
 
Promise.resolve().then(() => { 
  console.log('promise2') 
  Promise.resolve().then(() => console.log('promise3')) 
}) 
console.log('script') 
```

Question: Figure out its output and explain the reason for that.

First all microtasks, then macrotasks will be executed.
It will be executed in the following order:

1. `script` from `console.log` microtask
2. `promise2` in `Promise.resolve` because the microtask `Promise.resolve` starts another microtask
3. `promise3` from the microtask in `Promise.resolve`
4. `time`
5. `promise1`
