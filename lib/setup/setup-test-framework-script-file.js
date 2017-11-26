global.requestAnimationFrame = callback => setTimeout(callback, 0);

// Not sure why, but this throws
// `TypeError: Cannot read property 'results' of undefined`
process.on('unhandledRejection', () => {
  // console.log(reason);
});
