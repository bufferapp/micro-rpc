const micro = require('micro');
const { send, json } = micro;

const server = micro(async (req, res) => {
  const data = await json(req);
  console.log('data', data);
  send(res, 200, 'ok');
});

server.listen(3000);
