# Task 1: Event Loop

Given snippet:

```js
setTimeout(() => {
  console.log('timer')
  Promise.resolve().then(
    () => console.log('promise1')
  )
}, 0)

Promise.resolve().then(() => {
  console.log('promise2')
  Promise.resolve().then(
    () => console.log('promise3')
  )
})

console.log('script')
```

Output order:

1. `script`. It was part of the "main" message that is processed.
2. `promise2`. The main messages added two other messages to the event queue: A microtask with `Promise.resolve()` and a macrotask with `setTimeout()`. All microtasks are evaluated first.
3. `promise3`. The microtask adds another microtask, which is evaluated before the macrotask.
4. `timer`. The output of the macrotask.
5. `promise1`. Output of the microtask added with `Promise.resolve()` to the event loop in the macrotask.
