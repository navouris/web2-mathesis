console.log('αρχή προγράμματος');
setTimeout(() => console.log('πρώτο timeout'), 0);
requestAnimationFrame(() => console.log('πρώτο animationFrame'));
Promise.resolve()
    .then(() => console.log('promise1'))
    .then(() => console.log('promise2'));
console.log('τέλος προγράμματος');