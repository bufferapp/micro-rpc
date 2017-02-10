const micro = require('micro');
const { send, json } = micro;

module.exports = () => {
  const methods = {};
  return {
    server: micro(async (req, res) => {
      const data = await json(req);
      const { name, args } = data;
      send(res, 200, { result: methods[name](...JSON.parse(args)) });
    }),
    method: (name, fn) => methods[name] = fn,
  };
};
