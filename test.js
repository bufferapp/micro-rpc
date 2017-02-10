const MicroRPC = require('./index');
const { server, method } = MicroRPC();

method('add', (a, b) => new Promise((resolve) => {
  resolve(a + b);
}));

method('addItems', ({ a, b }) => new Promise((resolve) => {
  resolve(a + b);
}));

server.listen(3000);
