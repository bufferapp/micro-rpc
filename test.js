const MicroRPC = require('./index');
const { server, method, createError } = MicroRPC();

method('add', (a, b) => a + b);

method('addAsync', (a, b) => new Promise((resolve) => {
  resolve(a + b);
}));


method('addItems', ({ a, b }) => a + b);

method('addItemsAsync', ({ a, b }) => new Promise((resolve) => {
  resolve(a + b);
}));

method('throwError', () => {
  throw createError({ message: 'I\'m sorry I can\'t do that'});
});

method('throwErrorAsync', () => new Promise((resolve, reject) => {
  reject(createError({ message: 'Something is broke internally', statusCode: 500 }));
}));

server.listen(3000);
