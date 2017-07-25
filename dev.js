const { rpc, method, createError } = require('./index');
module.exports = rpc(
  method('add', (a, b) => a + b),
  method('addAsync', (a, b) => new Promise((resolve) => {
    resolve(a + b);
  })),
  method('addItems', ({ a, b }) => a + b),
  method('addItemsAsync', ({ a, b }) => new Promise((resolve) => {
    resolve(a + b);
  })),
  method('throwError', () => {
    throw createError({ message: 'I\'m sorry I can\'t do that'});
  }),

  method('throwErrorAsync', () => new Promise((resolve, reject) => {
    reject(createError({ message: 'Something is broke internally', statusCode: 500 }));
  })),
  method('documentation',
  `
  # documentation

  Document what a method does.
  `,
  () => new Promise((resolve, reject) => {
    reject(createError({ message: 'Something is broke internally', statusCode: 500 }));
  })),
  method('unhandledError', () => {
    throw new Error('Not expected');
  })
);
