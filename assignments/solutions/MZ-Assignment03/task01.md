# Task 1



### Code

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



### Output

```
script
promise2
promise3
timer
promise1
```



### Explanation

- `setTimeout` gets called first and adds the anonymous function to the queue
- `Promise.resolve()` gets called next and adds the anonymous function to the end of the stack
- `console.log` gets called and emits the first ouput
- Next, the Promise is on top of the stack, and `console.log('promise2')` is called
- `Promise.resolve()` gets called next and adds the anonymous function to the end of the stack
- On top of the stack, now there is `() => console.log('promise3')`
- While the stack is now empty, we still have items in the queue: `console.log('timer')` gets called
- Finally, `Promise.resolve().then(() => console.log('promise1'))` is called