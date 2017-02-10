const micro = require('micro');
const { send, json } = micro;

module.exports = () => {
  const methods = {};
  return {
    server: micro(async (req, res) => {
      const data = await json(req);
      const { name, args } = data;
      const parsedArgs = JSON.parse(args);
      const result = Array.isArray(parsedArgs) ?
        await methods[name](...parsedArgs) :
        await methods[name](parsedArgs);
      send(res, 200, { result });
    }),
    method: (name, fn) => methods[name] = fn,
  };
};
