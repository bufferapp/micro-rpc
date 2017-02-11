const MicroRPC = require('./index');
const { server, method } = MicroRPC();

method('add', (a, b) => a + b);

method('addAsync', (a, b) => new Promise((resolve) => {
  resolve(a + b);
}));


method('addItems', ({ a, b }) => a + b);

method('addItemsAsync', ({ a, b }) => new Promise((resolve) => {
  resolve(a + b);
}));


server.listen(3000);
