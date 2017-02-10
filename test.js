const MicroRPC = require('./index');
const { server, method } = MicroRPC();

method('add', (a, b) => a + b);

server.listen(3000);
